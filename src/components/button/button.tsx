import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button {

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
