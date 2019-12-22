/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface MySelect {
    'placeholder': string;
  }
}

declare global {


  interface HTMLMySelectElement extends Components.MySelect, HTMLStencilElement {}
  var HTMLMySelectElement: {
    prototype: HTMLMySelectElement;
    new (): HTMLMySelectElement;
  };
  interface HTMLElementTagNameMap {
    'my-select': HTMLMySelectElement;
  }
}

declare namespace LocalJSX {
  interface MySelect {
    'onFieldChange'?: (event: CustomEvent<any>) => void;
    'placeholder'?: string;
  }

  interface IntrinsicElements {
    'my-select': MySelect;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'my-select': LocalJSX.MySelect & JSXBase.HTMLAttributes<HTMLMySelectElement>;
    }
  }
}


