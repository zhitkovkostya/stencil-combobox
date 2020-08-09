import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'z-label',
  styleUrl: 'z-label.scss',
  shadow: true
})
export class ZLabel {

  @Prop() color: string;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
