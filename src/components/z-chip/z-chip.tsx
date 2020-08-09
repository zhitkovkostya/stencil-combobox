import {Component, h, Event, EventEmitter, Prop, Element} from '@stencil/core';

@Component({
  tag: 'z-chip',
  styleUrl: 'z-chip.scss',
  shadow: true
})
export class ZChip {
  @Element() el: HTMLElement;

  @Prop() data = {};

  @Prop({attribute: 'dismissible'}) isDismissible: boolean = false;

  @Event({
    eventName: 'z-chip-dismiss',
    composed: true,
    cancelable: true,
    bubbles: true
  }) dismissEvent: EventEmitter;

  render() {
    return (
      <span class='chip'>
        <span class='chip__text'>
          <slot></slot>
        </span>
        {this.isDismissible &&
          <button
            class='chip__dismiss'
            onClick={this.onDeleteClick.bind(this)}
          >
            <z-icon name="navigation-cancel"></z-icon>
          </button>
        }
      </span>
    );
  }

  onDeleteClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.dismissEvent.emit(this.data);
  }
}
