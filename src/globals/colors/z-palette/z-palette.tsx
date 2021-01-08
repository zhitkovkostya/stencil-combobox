import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'z-palette',
  styleUrl: 'z-palette.scss',
  shadow: false,
})
export class ZPalette {

  render() {
    return (
      <Host class="palette">
        <slot></slot>
      </Host>
    );
  }

}
