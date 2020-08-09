/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface MyChip {
    'data': {};
    'isDeletable': boolean;
  }
  interface MyCombobox {
    'defaultOptions': any[];
    'isClearable': boolean;
    'isDisabled': boolean;
    'isMultiple': boolean;
    'isOrdered': boolean;
    'isRequired': boolean;
    'label': string;
    'placeholder': string;
  }
  interface MyGrid {
    'columns': String;
    'columnsSmall': String;
  }
  interface MyGridCell {
    'span': String;
    'spanSmall': String;
  }
}

declare global {


  interface HTMLMyChipElement extends Components.MyChip, HTMLStencilElement {}
  var HTMLMyChipElement: {
    prototype: HTMLMyChipElement;
    new (): HTMLMyChipElement;
  };

  interface HTMLMyComboboxElement extends Components.MyCombobox, HTMLStencilElement {}
  var HTMLMyComboboxElement: {
    prototype: HTMLMyComboboxElement;
    new (): HTMLMyComboboxElement;
  };

  interface HTMLMyGridElement extends Components.MyGrid, HTMLStencilElement {}
  var HTMLMyGridElement: {
    prototype: HTMLMyGridElement;
    new (): HTMLMyGridElement;
  };

  interface HTMLMyGridCellElement extends Components.MyGridCell, HTMLStencilElement {}
  var HTMLMyGridCellElement: {
    prototype: HTMLMyGridCellElement;
    new (): HTMLMyGridCellElement;
  };
  interface HTMLElementTagNameMap {
    'my-chip': HTMLMyChipElement;
    'my-combobox': HTMLMyComboboxElement;
    'my-grid': HTMLMyGridElement;
    'my-grid-cell': HTMLMyGridCellElement;
  }
}

declare namespace LocalJSX {
  interface MyChip {
    'data'?: {};
    'isDeletable'?: boolean;
    'onMy-chip-delete'?: (event: CustomEvent<any>) => void;
  }
  interface MyCombobox {
    'defaultOptions'?: any[];
    'isClearable'?: boolean;
    'isDisabled'?: boolean;
    'isMultiple'?: boolean;
    'isOrdered'?: boolean;
    'isRequired'?: boolean;
    'label'?: string;
    'onMy-change'?: (event: CustomEvent<any>) => void;
    'placeholder'?: string;
  }
  interface MyGrid {
    'columns'?: String;
    'columnsSmall'?: String;
  }
  interface MyGridCell {
    'span'?: String;
    'spanSmall'?: String;
  }

  interface IntrinsicElements {
    'my-chip': MyChip;
    'my-combobox': MyCombobox;
    'my-grid': MyGrid;
    'my-grid-cell': MyGridCell;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'my-chip': LocalJSX.MyChip & JSXBase.HTMLAttributes<HTMLMyChipElement>;
      'my-combobox': LocalJSX.MyCombobox & JSXBase.HTMLAttributes<HTMLMyComboboxElement>;
      'my-grid': LocalJSX.MyGrid & JSXBase.HTMLAttributes<HTMLMyGridElement>;
      'my-grid-cell': LocalJSX.MyGridCell & JSXBase.HTMLAttributes<HTMLMyGridCellElement>;
    }
  }
}


