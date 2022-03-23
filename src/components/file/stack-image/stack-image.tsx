import {Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop, State, Watch} from '@stencil/core';
import {FileStackToPreviewUrl} from '../../../helpers/file-stack-utils';
import {IFileStack} from '../../../interfaces/filestack';

@Component({
  tag: 'flx-file-stack-image',
  styleUrl: 'stack-image.scss',
  shadow: true
})
export class StackImage implements ComponentInterface {

  @Prop() trackViewTimeout = null;
  @Prop() autoAspectRatio = true;
  @Prop() fileStack: IFileStack;
  @Prop() rootElement: HTMLElement;
  @Prop() fileStackSize: { size: string, pixelRatio: string }[] = [{size: '340xxx', pixelRatio: '1x'}];
  @Prop() placeholder: string = null;
  @Prop() ext: string = 'jpg';
  @State() loadSrc?: string = null;
  @State() loadError?: () => void;

  @Event() trackViewImage: EventEmitter;

  @Element() el!: HTMLElement;
  private io?: IntersectionObserver;
  private img: HTMLImageElement;
  private timeOutId = null;

  @Watch('fileStack')
  fileStackChange(newFileStack, oldFileStack) {
    this.removeTrackView();
    this.addIO();
    if (newFileStack._id !== oldFileStack._id) {
      this.onUnLoad();
    }
    this.load();
  }

  @Watch('placeholder')
  placeholderChange() {
    this.addIO();
    this.load();
  }

  componentWillLoad(): Promise<void> | void {
    this.load();
  }

  componentDidLoad(): void {
    this.img = this.el?.shadowRoot.querySelector('img');
    this.addIO();
  }

  disconnectedCallback() {
    this.removeTrackView();
  }

  removeTrackView() {
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }
  }

  createTrackView() {
    if (this.trackViewTimeout) {
      this.removeTrackView();
      this.timeOutId = setTimeout(() => {
        this.trackViewImage.emit(this.fileStack);
      }, this.trackViewTimeout);
    }
  }

  render() {
    let style = null;
    if (this.fileStack && this.autoAspectRatio && (this.fileStack?.width > 0 && this.fileStack?.height > 0)) {
      style = {"--aspect-ratio": (this.fileStack.width / this.fileStack.height).toString()}
    }
    return (
      <Host style={style}>
        {(this.loadSrc) &&
          <img alt={this.fileStack?.name} src={this.loadSrc} onLoad={this.onLoad} onError={this.loadError}/>
        }
      </Host>
    );
  }

  private load() {
    if (this.fileStack?._id) {
      this.loadError = this.onError;
      this.loadSrc = FileStackToPreviewUrl(this.fileStack, this.fileStackSize[0].size, this.ext, this.placeholder);
    } else if (this.placeholder) {
      this.loadSrc = this.placeholder;
    }
  }

  private addIO() {
    if (this.fileStack === null) {
      return;
    }
    if ('IntersectionObserver' in window) {
      this.removeIO();
      this.io = new IntersectionObserver(data => {
        if (data[0].isIntersecting) {
          this.createTrackView();
          this.removeIO();
        } else {
          this.removeTrackView();
        }
      }, {root: this.rootElement});
      this.io.observe(this.el);
    } else {
      // fall back to setTimeout for Safari and IE
      setTimeout(() => this.load(), 200);
    }
  }

  private removeIO() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  private onLoad = () => {
    if (this.img) {
      this.img.style.display = 'block';
    }
  }

  private onUnLoad = () => {
    if (this.img) {
      this.img.style.display = 'none';
    }
  }

  private onError = () => {
    if (this.img) {
      this.img.style.display = 'none';
    }
  }

}
