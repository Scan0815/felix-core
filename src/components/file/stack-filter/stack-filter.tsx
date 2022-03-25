import {Component, ComponentInterface, Event, h, Host, Prop, State} from '@stencil/core';
import {IFilter} from '../../../interfaces/filter';
import {EventChangeFilter} from "../../../events/change-filter-event";

@Component({
  tag: 'flx-file-stack-filter',
  styleUrl: 'stack-filter.scss',
  shadow: true
})
export class StackFilter implements ComponentInterface {

  @Prop({mutable: true}) filter: IFilter[] = [];
  @Event() changeFilter: EventChangeFilter | undefined;
  @State() selected: IFilter | null = null;

  componentWillLoad() {
    this.selected = this.filter.filter($filter => $filter.selected)[0];
  }

  clickFilter(filter: IFilter) {

    if (this.selected && filter && filter.value !== this.selected.value) {
      this.filter.map($filter => $filter.selected = false);
      filter.selected = !filter.selected;
      this.filter = [...this.filter];
      this.selected = filter;
      this.changeFilter?.emit(this.filter);
    }
  }


  segmentChanged(ev: CustomEvent) {
    this.clickFilter(this.filter.filter($filter => $filter.value === ev.detail.value)[0]);
  }

  render() {
    return (<Host>
      <ion-item class="ion-no-margin ion-no-padding" lines="none">
        <ion-segment mode="md"
                     class="ion-no-padding"
                     value={this.selected?.value}
                     onIonChange={(ev) => this.segmentChanged(ev)}>
          {(this.filter.map(filter$ => {
            return <ion-segment-button layout="icon-start" value={filter$.value}>
              {(filter$?.label) &&
                <ion-label mode="md" class="ion-hide-md-down">{filter$.label}</ion-label>
              }
              {(filter$?.icon) &&
                <ion-icon name={filter$.icon}>
                </ion-icon>
              }
            </ion-segment-button>
          }))}
        </ion-segment>
      </ion-item>
      <slot/>
    </Host>);
  }

}
