import {Component, Element, Event, EventEmitter, h, Host, Listen, Prop} from '@stencil/core';

@Component({
  tag: 'file-upload',
  styleUrl: 'upload.scss',
  shadow: true
})
export class Upload {
  @Event() selected: EventEmitter;
  @Prop() accept: string;
  @Prop() multiple = false;
  @Prop() capture = null;
  @Element() private element: HTMLElement;
  private uploadElement;

  @Listen('click', {passive: false})
  click(ev) {
    ev.stopPropagation();
  }

  componentDidLoad() {
    this.uploadElement = this.element.shadowRoot.querySelector('input');
    if (this.multiple) {
      this.uploadElement.setAttribute('multiple', '');
    }
    if (this.capture !== null) {
      this.uploadElement.setAttribute('capture', this.capture);
    }
  }

  change(event) {
    let files: FileList = event.target.files;
    this.selected.emit([...Array.from(files)]);
    setTimeout(() => {
      this.uploadElement.value = '';
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
