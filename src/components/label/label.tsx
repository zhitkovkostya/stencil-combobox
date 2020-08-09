import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-label',
  styleUrl: 'label.scss',
  shadow: true
})
export class Label {

  @Prop() color: string;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
