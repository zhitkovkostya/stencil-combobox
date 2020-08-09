import { Build, Component, Element, h, Host, Prop, State, Watch, getAssetPath } from '@stencil/core';
import {getSvgContent} from './utils';

@Component({
  tag: 'z-icon',
  styleUrl: 'z-icon.scss',
  assetsDir: 'assets',
  shadow: true
})
export class ZIcon {
  private io?: IntersectionObserver;

  @Element() el!: HTMLElement;

  @State() private svgContent?: string;
  @State() private isVisible = false;

  /**
   * Specifies the label to use for accessibility. Defaults to the icon name.
   */
  @Prop({ mutable: true, reflect: true }) ariaLabel?: string;

  /**
   * Specifies which icon to use from the built-in set of icons.
   */
  @Prop() name?: string;

  /**
   * The size of the icon.
   * Available options are: `"small"` and `"large"`.
   */
  @Prop() size?: string;

  @Prop() color?: string;

  /**
   * If enabled, icon will be loaded lazily when it's visible in the viewport.
   * Default, `false`.
   */
  @Prop() lazy = false;

  connectedCallback() {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }

  disconnectedCallback() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  private waitUntilVisible(el: HTMLElement, rootMargin: string, cb: () => void) {
    if (Build.isBrowser && this.lazy && typeof window !== 'undefined' && (window as any).IntersectionObserver) {
      const io = this.io = new (window as any).IntersectionObserver((data: IntersectionObserverEntry[]) => {
        if (data[0].isIntersecting) {
          io.disconnect();
          this.io = undefined;
          cb();
        }
      }, { rootMargin });

      io.observe(el);

    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }

  @Watch('name')
  loadIcon() {
    if (Build.isBrowser && this.isVisible) {
      const url = getAssetPath(`assets/${this.name}.svg`);;
      if (url) {
        getSvgContent(url)
          .then(svgContent => this.svgContent = svgContent);
      }
    }

    if (!this.ariaLabel) {
      const label = this.name;
      // user did not provide a label
      // come up with the label based on the icon name
      if (label) {
        this.ariaLabel = label.replace(/\-/g, ' ');
      }
    }
  }

  render() {
    return (
      <Host role='img'>
        <span class='icon__inner' innerHTML={this.svgContent}/>
      </Host>
    );
  }
}
