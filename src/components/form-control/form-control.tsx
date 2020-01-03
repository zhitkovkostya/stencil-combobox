import {Component, Host, h, Prop, Event, EventEmitter} from '@stencil/core';

@Component({
  tag: 'my-form-control',
  styleUrl: 'form-control.scss',
  shadow: true
})
export class FormControl {

  @Prop() id: string = null;

  @Prop() label: string = null;

  @Event({eventName: 'my-label-click'}) labelClickEvent: EventEmitter;

  render() {
    return (
      <Host>
        <div class='form-control'>
          <label class='form-control-label' htmlFor={this.id} onClick={this.onLabelClick.bind(this)}>
            {this.label}
          </label>
          <div class='form-control-field'>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

  onLabelClick() {
    this.labelClickEvent.emit();
  }

}
