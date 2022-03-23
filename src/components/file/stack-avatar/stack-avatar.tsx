import {Component, h, Host, Prop} from '@stencil/core';
import {IAvatar} from '../../../interfaces/avatar';
import {FirstLetter} from '../../../helpers/string-utils';
import {CssRgb} from '../../../helpers/css-utils';

@Component({
  tag: 'flx-file-stack-avatar',
  styleUrl: 'stack-avatar.scss',
  shadow: true
})
export class StackAvatar {

  @Prop() name: string = '';
  @Prop() imgTitle: string = '';
  @Prop() background: any = 'var(--ion-color-primary, #3880ff)';
  @Prop() color: any = '#ffffff';
  @Prop() width: number = 200;
  @Prop() height: number = 200;
  @Prop() placeholder: string = null;
  @Prop() ext: string = 'jpg';
  @Prop() link: string;
  @Prop() avatar: IAvatar = null;

  renderAvatar(styleNoAvatar, styleAvatar, fontSize) {
    const fileStackSize = [{size: (this.width * 2 + 'x' + this.height * 2), pixelRatio: '1x'}]
    return (
      <ion-avatar style={(!this.avatar && !this.placeholder) ? styleNoAvatar : styleAvatar} class="avatar">
        {(!this.avatar && !this.placeholder)
          ? <ion-text style={fontSize}>
            <h2 class="ion-align-self-center">{FirstLetter(this.name)}</h2>
          </ion-text>
          : <div class="content-aspect">
            <file-stack-image fileStack={this.avatar}
                              fileStackSize={fileStackSize}
                              ext={this.ext}
                              placeholder={this.placeholder}>
            </file-stack-image>
          </div>
        }
      </ion-avatar>
    )
  }

  renderAvatarLink(avatarRender) {
    return (
      <ion-router-link href={this.link}>
        {avatarRender}
      </ion-router-link>
    )
  }

  render() {

    // change background style on render change
    const styleNoAvatar = {
      backgroundColor: (typeof this.background === 'string') ? this.background : CssRgb(this.background),
      width: this.width.toString() + 'px',
      height: this.height.toString() + 'px'
    };
    // change Avatar style on render change
    const styleAvatar = {
      backgroundColor: (this.avatar?.dominantColor) ? CssRgb(this.avatar.dominantColor) : 'transparent',
      width: this.width.toString() + 'px',
      height: this.height.toString() + 'px'
    };
    // change FontStyle style on render change
    const fontSize = {
      color: (typeof this.color === 'string') ? this.color : CssRgb(this.color),
      fontSize: this.width / 2 + 'px',
    };

    return (
      <Host style={{width: this.width + "px", height: this.height + "px", display: 'block'}}>
        {(this.link)
          ? this.renderAvatarLink(this.renderAvatar(styleNoAvatar, styleAvatar, fontSize))
          : this.renderAvatar(styleNoAvatar, styleAvatar, fontSize)
        }
        <slot/>
      </Host>
    )
  }

}
