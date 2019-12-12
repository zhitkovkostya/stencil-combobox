import {Component, Prop, h} from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'button.css'
})
export class Button {
  /**
   * Text
   */
  @Prop() text: string;

  render() {
    return (
      <button>
        {this.text}
        {/*<slot></slot>*/}
      </button>
    );
  }
}
