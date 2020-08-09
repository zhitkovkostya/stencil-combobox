import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-banner',
  styleUrl: 'banner.scss',
  shadow: false
})
export class Banner {

  @Prop({reflect: true}) color: string = 'gray';

  render() {
    return (
        <slot></slot>
    );
  }

}
