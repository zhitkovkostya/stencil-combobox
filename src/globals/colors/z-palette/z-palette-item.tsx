import {Component, Prop, Host, h} from '@stencil/core';

@Component({
  tag: 'z-palette-item',
  styleUrl: 'z-palette-item.scss',
  shadow: false,
})
export class ZPaletteItem {

  @Prop({reflect: true}) name!: string;
  @Prop({reflect: true}) isLarge: boolean = false;

  render() {
    const colorNameRaw = this.name;
    const colorValueRaw = this.getColorValue(colorNameRaw);
    const colorValue = this.formatColorValue(colorValueRaw);
    const colorName = this.formatColorName(colorNameRaw);
    const isColorBright = this.checkColorBrightness(colorValue);

    return (
      <Host
        class={{
          "palette-item": true,
          "palette-item--large": this.isLarge,
          "palette-item--light": isColorBright,
        }}
        style={{backgroundColor: `var(--color-${colorNameRaw})`}}
      >
        <span class="palette-item__name">{colorName}</span>
        <span class="palette-item__value">{colorValue}</span>
      </Host>
    );
  }

  getColorValue(name) {
    const colorValue = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-' + name)
      .trim();

    return colorValue;
  }

  formatColorValue(color) {
    const isHex = /^#/.test(color);

    if (isHex) {
      return color;
    }

    const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;

    return hex;
  }

  formatColorName(colorName) {
    function clearAndUpper(text) {
      return text.replace(/-/, ' ').toUpperCase();
    }

    const nameTemp = colorName.replace(/-\w/g, clearAndUpper);
    const name = nameTemp[0].toUpperCase() + nameTemp.slice(1);

    return name;
  }

  checkColorBrightness(color) {
    const hex = color.replace('#', '');
    const red = parseInt(hex.substr(0, 2), 16);
    const green = parseInt(hex.substr(2, 2), 16);
    const blue = parseInt(hex.substr(4, 2), 16);
    const brightness = (red * 0.2126) + (green * 0.7152) + (blue * 0.0722);

    return brightness >= 160;
  }
}
