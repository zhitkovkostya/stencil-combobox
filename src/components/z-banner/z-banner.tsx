import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'z-banner',
  styleUrl: 'z-banner.scss',
  shadow: false
})
export class ZBanner {

  @Prop({reflect: true}) color: string = 'gray';

  render() {
    return (
        <slot></slot>
    );
  }

}
