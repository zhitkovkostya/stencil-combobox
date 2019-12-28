import {Component, h, Event, EventEmitter, Prop, Element} from '@stencil/core';

@Component({
  tag: 'my-chip',
  styleUrl: 'chip.css',
  shadow: true
})
export class Chip {
  @Element() el: HTMLElement;

  @Prop() data = {};

  @Prop({attribute: 'deletable'}) isDeletable = false;

  @Event({
    eventName: 'my-chip-delete',
    composed: true,
    cancelable: true,
    bubbles: true
  }) deleteEvent: EventEmitter;

  render() {
    return (
      <span class='chip'>
        <span class='chip-text'>
          <slot></slot>
        </span>
        {this.isDeletable &&
          <button
            class='chip-delete-button'
            onClick={this.onDeleteClick.bind(this)}
          >
            <svg
              class='chip-delete-icon'
              focusable='false'
              viewBox='0 0 24 24' aria-hidden='true'
              role='presentation'
            >
              <path
                d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'></path>
            </svg>
          </button>
        }
      </span>
    );
  }

  onDeleteClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.deleteEvent.emit(this.data);
  }
}
