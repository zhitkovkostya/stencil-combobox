import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'z-grid-cell',
  shadow: false
})
export class ZGridCell {

  @Prop({attribute: 'span'}) span: String
  @Prop({attribute: 'span-s'}) spanSmall: String

  render() {
    return (
      <slot></slot>
    );
  }

}
