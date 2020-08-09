import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'z-input',
  styleUrl: 'z-input.scss',
  shadow: true
})
export class ZInput {

  @Prop() value: string;

  render() {
    return (
      <Host>
        <input type="text" value={this.value} class="input" />
      </Host>
    );
  }

}
