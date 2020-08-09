import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'z-button',
  styleUrl: 'z-button.scss',
  shadow: true
})
export class ZButton {

  @Prop() color: string;

  render() {
    return (
      <Host>
        <button type="button" class="button">
          <span class="button__text">
            <slot></slot>
          </span>
        </button>
      </Host>
    );
  }

}
