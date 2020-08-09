import {Component, Prop, h} from '@stencil/core';

@Component({
  tag: 'z-grid',
  styleUrl: 'z-grid.scss',
  shadow: false
})
export class ZGrid {

  @Prop({attribute: 'columns'}) columns: String;
  @Prop({attribute: 'columns-s'}) columnsSmall: String;

  render() {
    return (
      <slot></slot>
    );
  }

}
