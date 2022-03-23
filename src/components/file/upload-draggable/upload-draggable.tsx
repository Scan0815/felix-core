import {Component, Element, Event, EventEmitter, h, Host, Listen, Prop} from '@stencil/core';

@Component({
  tag: 'flx-file-upload-draggable',
  styleUrl: 'upload-draggable.scss',
  shadow: true
})
export class UploadDraggable {

  @Prop() iconName: string;
  @Prop() accept: string = "image\/jpg|image\/jpeg|image\/png|video.*";
  @Element() el!: HTMLElement;
  @Event() selected: EventEmitter;
  @Event() errorAccepted: EventEmitter;

  @Listen('drag', {passive: false})
  @Listen('dragstart', {passive: false})
  @Listen('dragend', {passive: false})
  @Listen('dragover', {passive: false})
  @Listen('dragenter', {passive: false})
  @Listen('dragleave', {passive: false})
  @Listen('drop', {passive: false})
  dragDefault(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  @Listen('dragover')
  @Listen('dragenter')
  dragOver() {
    this.el?.shadowRoot.querySelector('.drop-zone')?.classList.add('is-dragover');
  }

  @Listen('dragend')
  @Listen('dragleave')
  @Listen('drop')
  dragLeave() {
    this.el?.shadowRoot.querySelector('.drop-zone')?.classList.remove('is-dragover');
  }

  @Listen('drop')
  drop(ev) {
    this.change(ev);
  }


  change(event) {
    let files: FileList = event.dataTransfer.files;
    let result: File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match(this.accept)) {
        result.push(files.item(i));
      } else {
        this.errorAccepted.emit(files.item(i).name);
        return;
      }
    }

    this.selected.emit(result);
  }

  render() {
    return (
      <Host>
        <div class="drop-zone">
          <slot name="icon">
          </slot>
          <slot name="text">
          </slot>
        </div>
      </Host>
    );
  }

}
