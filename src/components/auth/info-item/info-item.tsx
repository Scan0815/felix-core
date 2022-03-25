import {Component, h, Prop} from '@stencil/core';
import {IonicColor} from '../../../interfaces/IonicColor';

@Component({
  tag: 'flx-auth-info-item',
  styleUrl: 'info-item.scss'
})
export class InfoItem {

  @Prop() color: IonicColor| undefined;
  @Prop() icon: string| undefined;
  @Prop() infos: string[] = [];

  render() {
    return (
      this.infos?.map(info =>
        <ion-item color={this.color} lines="full">
          {(this.icon) &&
            <ion-icon slot="start" name={this.icon}/>
          }
          <ion-label mode="md" class="ion-text-wrap">{info}</ion-label>
        </ion-item>
      )
    );
  }

}
