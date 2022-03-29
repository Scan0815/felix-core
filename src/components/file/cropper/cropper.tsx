import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State
} from '@stencil/core';
import Croppie, {CropType} from 'croppie';
import {Crop} from '../../../interfaces/crop';
import {ModalService} from '../../../services/modal.service';
import {i18n} from '../../../services/i18n.service';

@Component({
  tag: 'flx-image-cropper',
  styleUrl: 'cropper.scss'
})
export class ModalCropper implements ComponentInterface{
  @Prop() file: Blob | undefined;
  @Prop() orientation: number| undefined;
  @Prop() displayHeader = true;
  @Prop() displayFooter = true;
  @Prop() displayIonContent = true;
  @Prop() enableResize = false;
  @Prop() enforceBoundary = true;
  @Prop() boundary = null;
  @Prop() enableZoom = true;
  @Prop() viewPort:{width: number; height: number; type?: CropType} = {width: 300, height: 300, type: 'circle'};
  @Prop() minZoomImageWidth = false;
  @State() src: string| undefined;
  @Element() el!: HTMLElement;
  @Event() updateCrop: EventEmitter| undefined;
  private cropInstance: Croppie| undefined;
  private contentEl: HTMLIonContentElement | null | undefined;
  private imageEl: HTMLImageElement | undefined;

  @Listen('popstate', {target: 'window'})
  async handleHardwareBackButton(_e: PopStateEvent) {
    await this.close(null, "closeHistory");
  }

  @Method()
  async getBlob() {
    const croppie = (this.cropInstance as any);
    await croppie?.result('blob', 'original');
  }

  async getBlobInstance() {
    const croppie = (this.cropInstance as any);
    await croppie?.result('blob');
  }

  async save() {
    const blob = await this.getBlobInstance();
    const position = this.cropInstance?.get();

    if(position && position.points) {
      const cropperPosition = new Crop().deserialize({
        x1: Math.round(position.points[0]),
        y1: Math.round(position.points[1]),
        x2: Math.round(position.points[2]),
        y2: Math.round(position.points[3])
      });

      await this.close({
        blob: blob,
        width: this.imageEl?.width,
        height: this.imageEl?.height,
        cropperPosition: cropperPosition
      });

    }
  }

  async close(data:any, role = "close") {
    await ModalService.closeModal(data, role);
  }

  connectedCallback() {
    if(this.file) {
      this.src = URL.createObjectURL(this.file);
    }
  }

  componentDidLoad() {
    if (!this.displayIonContent) {
      this.contentEl = this.el?.closest('ion-content');
    }
    if(this.contentEl) {
      new ResizeObserver((_entries, _observer) => this.init(_observer)).observe(this.contentEl);
    }
  }

  async init(observer:any) {
    observer.disconnect();
    if(this.imageEl && this.contentEl) {
      this.cropInstance = new Croppie(this.imageEl, {
        boundary: this.boundary ? this.boundary : {
          width: this.contentEl.offsetWidth,
          height: this.contentEl.offsetHeight
        },
        viewport: this.viewPort && this.viewPort,
        customClass: "croopie-element",
        showZoomer: this.enableZoom,
        enableOrientation: true,
        enableResize: this.enableResize,
        enforceBoundary: this.enforceBoundary
      });


      if(this.src) {
        await this.cropInstance.bind({
          url: this.src,
          orientation: this.orientation
        });
      }

      if (this.minZoomImageWidth) {
        const options = (this.cropInstance as any).options;
        const elements = (this.cropInstance as any).elements;
        const zoomMin = options.viewport.width / elements.img.width;
        elements.viewport.style.boxShadow = 'none';
        elements.zoomer.min = parseFloat((zoomMin).toString()).toFixed(4);
      }
      await this.getResultAndEmit();
      const croppieContainer = this.el?.querySelector('div.croppie-container');
      if(croppieContainer) {
        croppieContainer.addEventListener('update', async () => {
          await this.getResultAndEmit();
        });
      }

    }

  }

  async getResultAndEmit() {
    const blob = await this.getBlobInstance();
    const position = this.cropInstance?.get();

    if(position && position.points) {
      const cropperPosition = new Crop().deserialize({
        x1: Math.round(position.points[0]),
        y1: Math.round(position.points[1]),
        x2: Math.round(position.points[2]),
        y2: Math.round(position.points[3])
      });
      if (cropperPosition.x1 !== 0
        || cropperPosition.x2 !== 0
        || cropperPosition.y1 !== 0
        || cropperPosition.y2 !== 0) {
        this.updateCrop?.emit({
          blob: blob,
          width: this.imageEl?.width,
          height: this.imageEl?.height,
          cropperPosition: cropperPosition
        });
      }
    }
  }


  disconnectedCallback() {
    if(this.src) {
      URL.revokeObjectURL(this.src);
    }
  }

  renderHeader() {
    if (this.displayHeader) {
      return (
        <ion-header mode="md" no-border={true}>
          <ion-toolbar>
            <ion-title>{i18n('crop image').t('de', 'Bildausschnitt wählen').get()}</ion-title>
            <ion-buttons slot="end">
              <ion-button mode="md" onClick={() => this.close(null)}>
                <ion-icon name="close">
                </ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
      )
    }

    return null;
  }


  renderContent() {
    if (this.displayIonContent) {
      return (
        <ion-content ref={ref => this.contentEl = ref}>
          <img alt="" ref={ref => this.imageEl = ref} src={this.src} id="image"/>
        </ion-content>
      )
    } else {
      return (
        <img alt="" ref={ref => this.imageEl = ref} src={this.src} id="image"/>
      )
    }
  }

  renderFooter() {
    if (this.displayFooter) {
      return (
        <ion-footer no-border={true}>
          <ion-toolbar>
            <ion-button mode="md" color="secondary" no-border={true} expand="block" onClick={() => this.save()}
                        size="default">
              <ion-icon slot="start" name="checkmark">
              </ion-icon>
              {i18n('select').t('de', 'auswählen').get()}
            </ion-button>
          </ion-toolbar>
        </ion-footer>
      )
    }
    return null;
  }


  render() {
    return [
      this.renderHeader(),
      this.renderContent(),
      this.renderFooter()
    ];
  }

}
