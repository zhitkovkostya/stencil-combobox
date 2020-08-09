import {Component, Prop, h} from '@stencil/core';

@Component({
  tag: 'my-grid',
  styleUrl: 'grid.scss',
  shadow: false
})
export class Grid {

  @Prop({attribute: 'columns'}) columns: String;
  @Prop({attribute: 'columns-s'}) columnsSmall: String;

  render() {
    return (
      <slot></slot>
    );
  }

}
