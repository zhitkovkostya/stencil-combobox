/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ZBanner {
        "color": string;
    }
    interface ZButton {
        "color": string;
    }
    interface ZChip {
        "data": {};
        "isDismissible": boolean;
    }
    interface ZCombobox {
        "defaultOptions": any[];
        "isClearable": boolean;
        "isDisabled": boolean;
        "isMultiple": boolean;
        "isOrdered": boolean;
        "isRequired": boolean;
        "label": string;
        "placeholder": string;
    }
    interface ZGrid {
        "columns": String;
        "columnsSmall": String;
    }
    interface ZGridCell {
        "span": String;
        "spanSmall": String;
    }
    interface ZIcon {
        /**
          * Specifies the label to use for accessibility. Defaults to the icon name.
         */
        "ariaLabel"?: string;
        "color"?: string;
        /**
          * If enabled, icon will be loaded lazily when it's visible in the viewport. Default, `false`.
         */
        "lazy": boolean;
        /**
          * Specifies which icon to use from the built-in set of icons.
         */
        "name"?: string;
        /**
          * The size of the icon. Available options are: `"small"` and `"large"`.
         */
        "size"?: string;
    }
    interface ZInput {
        "value": string;
    }
    interface ZLabel {
        "color": string;
    }
    interface ZPalette {
    }
    interface ZPaletteItem {
        "isLarge": boolean;
        "name": string;
    }
}
declare global {
    interface HTMLZBannerElement extends Components.ZBanner, HTMLStencilElement {
    }
    var HTMLZBannerElement: {
        prototype: HTMLZBannerElement;
        new (): HTMLZBannerElement;
    };
    interface HTMLZButtonElement extends Components.ZButton, HTMLStencilElement {
    }
    var HTMLZButtonElement: {
        prototype: HTMLZButtonElement;
        new (): HTMLZButtonElement;
    };
    interface HTMLZChipElement extends Components.ZChip, HTMLStencilElement {
    }
    var HTMLZChipElement: {
        prototype: HTMLZChipElement;
        new (): HTMLZChipElement;
    };
    interface HTMLZComboboxElement extends Components.ZCombobox, HTMLStencilElement {
    }
    var HTMLZComboboxElement: {
        prototype: HTMLZComboboxElement;
        new (): HTMLZComboboxElement;
    };
    interface HTMLZGridElement extends Components.ZGrid, HTMLStencilElement {
    }
    var HTMLZGridElement: {
        prototype: HTMLZGridElement;
        new (): HTMLZGridElement;
    };
    interface HTMLZGridCellElement extends Components.ZGridCell, HTMLStencilElement {
    }
    var HTMLZGridCellElement: {
        prototype: HTMLZGridCellElement;
        new (): HTMLZGridCellElement;
    };
    interface HTMLZIconElement extends Components.ZIcon, HTMLStencilElement {
    }
    var HTMLZIconElement: {
        prototype: HTMLZIconElement;
        new (): HTMLZIconElement;
    };
    interface HTMLZInputElement extends Components.ZInput, HTMLStencilElement {
    }
    var HTMLZInputElement: {
        prototype: HTMLZInputElement;
        new (): HTMLZInputElement;
    };
    interface HTMLZLabelElement extends Components.ZLabel, HTMLStencilElement {
    }
    var HTMLZLabelElement: {
        prototype: HTMLZLabelElement;
        new (): HTMLZLabelElement;
    };
    interface HTMLZPaletteElement extends Components.ZPalette, HTMLStencilElement {
    }
    var HTMLZPaletteElement: {
        prototype: HTMLZPaletteElement;
        new (): HTMLZPaletteElement;
    };
    interface HTMLZPaletteItemElement extends Components.ZPaletteItem, HTMLStencilElement {
    }
    var HTMLZPaletteItemElement: {
        prototype: HTMLZPaletteItemElement;
        new (): HTMLZPaletteItemElement;
    };
    interface HTMLElementTagNameMap {
        "z-banner": HTMLZBannerElement;
        "z-button": HTMLZButtonElement;
        "z-chip": HTMLZChipElement;
        "z-combobox": HTMLZComboboxElement;
        "z-grid": HTMLZGridElement;
        "z-grid-cell": HTMLZGridCellElement;
        "z-icon": HTMLZIconElement;
        "z-input": HTMLZInputElement;
        "z-label": HTMLZLabelElement;
        "z-palette": HTMLZPaletteElement;
        "z-palette-item": HTMLZPaletteItemElement;
    }
}
declare namespace LocalJSX {
    interface ZBanner {
        "color"?: string;
    }
    interface ZButton {
        "color"?: string;
    }
    interface ZChip {
        "data"?: {};
        "isDismissible"?: boolean;
        "onZ-chip-dismiss"?: (event: CustomEvent<any>) => void;
    }
    interface ZCombobox {
        "defaultOptions"?: any[];
        "isClearable"?: boolean;
        "isDisabled"?: boolean;
        "isMultiple"?: boolean;
        "isOrdered"?: boolean;
        "isRequired"?: boolean;
        "label"?: string;
        "onZ-change"?: (event: CustomEvent<any>) => void;
        "placeholder"?: string;
    }
    interface ZGrid {
        "columns"?: String;
        "columnsSmall"?: String;
    }
    interface ZGridCell {
        "span"?: String;
        "spanSmall"?: String;
    }
    interface ZIcon {
        /**
          * Specifies the label to use for accessibility. Defaults to the icon name.
         */
        "ariaLabel"?: string;
        "color"?: string;
        /**
          * If enabled, icon will be loaded lazily when it's visible in the viewport. Default, `false`.
         */
        "lazy"?: boolean;
        /**
          * Specifies which icon to use from the built-in set of icons.
         */
        "name"?: string;
        /**
          * The size of the icon. Available options are: `"small"` and `"large"`.
         */
        "size"?: string;
    }
    interface ZInput {
        "value"?: string;
    }
    interface ZLabel {
        "color"?: string;
    }
    interface ZPalette {
    }
    interface ZPaletteItem {
        "isLarge"?: boolean;
        "name": string;
    }
    interface IntrinsicElements {
        "z-banner": ZBanner;
        "z-button": ZButton;
        "z-chip": ZChip;
        "z-combobox": ZCombobox;
        "z-grid": ZGrid;
        "z-grid-cell": ZGridCell;
        "z-icon": ZIcon;
        "z-input": ZInput;
        "z-label": ZLabel;
        "z-palette": ZPalette;
        "z-palette-item": ZPaletteItem;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "z-banner": LocalJSX.ZBanner & JSXBase.HTMLAttributes<HTMLZBannerElement>;
            "z-button": LocalJSX.ZButton & JSXBase.HTMLAttributes<HTMLZButtonElement>;
            "z-chip": LocalJSX.ZChip & JSXBase.HTMLAttributes<HTMLZChipElement>;
            "z-combobox": LocalJSX.ZCombobox & JSXBase.HTMLAttributes<HTMLZComboboxElement>;
            "z-grid": LocalJSX.ZGrid & JSXBase.HTMLAttributes<HTMLZGridElement>;
            "z-grid-cell": LocalJSX.ZGridCell & JSXBase.HTMLAttributes<HTMLZGridCellElement>;
            "z-icon": LocalJSX.ZIcon & JSXBase.HTMLAttributes<HTMLZIconElement>;
            "z-input": LocalJSX.ZInput & JSXBase.HTMLAttributes<HTMLZInputElement>;
            "z-label": LocalJSX.ZLabel & JSXBase.HTMLAttributes<HTMLZLabelElement>;
            "z-palette": LocalJSX.ZPalette & JSXBase.HTMLAttributes<HTMLZPaletteElement>;
            "z-palette-item": LocalJSX.ZPaletteItem & JSXBase.HTMLAttributes<HTMLZPaletteItemElement>;
        }
    }
}
