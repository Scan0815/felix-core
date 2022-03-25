import {Component, Element, Event, EventEmitter, h, Host, Listen, Prop} from '@stencil/core';

@Component({
  tag: 'flx-file-upload',
  styleUrl: 'upload.scss',
  shadow: true
})
export class Upload {
  @Prop() accept: string = "image/*";
  @Prop() multiple = false;
  @Prop() capture = null;

  @Event() selected: EventEmitter | undefined;
  @Element() el?: HTMLElement | undefined;
  private uploadElement: HTMLInputElement | undefined | null;

  @Listen('click', {passive: false})
  click(ev:Event) {
    ev.stopPropagation();
  }

  componentDidLoad() {
    this.uploadElement = this.el?.shadowRoot?.querySelector('input');
    if (this.multiple) {
      this.uploadElement?.setAttribute('multiple', '');
    }
    if (this.capture !== null) {
      this.uploadElement?.setAttribute('capture', this.capture);
    }
  }

  change(event:any) {
    let files: FileList = event.target.files;
    this.selected?.emit([...Array.from(files)]);
    setTimeout(() => {
      if(this.uploadElement){
        this.uploadElement.value = '';
      }
    }, 200);
  }

  render() {
    return (
      <Host>
        <label class="file-upload">
          <input id="upload" type="file" value="" accept={this.accept} onChange={(event) => {
            this.change(event)
          }}>
          </input>
          <slot>
          </slot>
        </label>
      </Host>
    );
  }

}
