import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-grid-cell',
  shadow: false
})
export class GridCell {

  @Prop({attribute: 'span'}) span: String
  @Prop({attribute: 'span-s'}) spanSmall: String

  render() {
    return (
      <slot></slot>
    );
  }

}
