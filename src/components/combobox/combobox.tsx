import {Component, Element, Event, Prop, State, EventEmitter, h, Listen} from '@stencil/core';
import uniqueId from 'lodash.uniqueid';
import {isTouchCapable} from '../../utils/utils';


interface ComboboxOption {
  text: string;
  value: string;
  selected: boolean;
}

@Component({
  tag: 'my-combobox',
  styleUrl: 'combobox.css',
  shadow: true
})
export class ComboBox {
  private _comboboxElement?: HTMLElement;
  private _selectElement?: HTMLSelectElement;
  private _listboxElement?: HTMLUListElement;

  @Element() el: HTMLElement;

  @Prop() placeholder: string = 'Select value';

  @Prop() multiple: boolean = false;

  @Prop() disabled: boolean = false;

  @Prop() options = [];

  @Prop() selectedOptions = [];

  @State() value: ComboboxOption[] = [];

  @State() _isExpanded: boolean = false;

  @State() _focusedOptionIndex: number = -1;

  @Event({eventName: 'my-change'}) changeEvent: EventEmitter;

  @Listen('click', {target: 'window'})
  onOuterClick(event) {
    if (!this.el.contains(event.target)) {
      this.collapse(false);
    }
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent) {
    switch(event.key) {
      case 'Backspace':
        this.onBackspaceKeyDown();
        break;
      case 'Enter':
        this.onEnterKeyDown();
        break;
      case ' ':
        this.onSpaceKeyDown();
        break;
      case 'Tab':
        this.onTabKeyDown();
        break;
      case 'Escape':
        this.onEscapeKeyDown();
        break;
      case 'ArrowDown':
        this.onArrowDownKeyDown();
        break;
      case 'ArrowUp':
        this.onArrowUpKeyDown();
        break;
    }
  }

  @Listen('my-chip-delete')
  onChipDelete(event) {
    this.deselectOption(event.detail);
    this.collapse(true);
  }

  componentWillLoad() {
    this.value = [
      ...this.value,
      ...this.selectedOptions
    ]
  }

  render() {
    return (
      <div
        id={uniqueId('combobox-')}
        class='combobox'
        ref={el => this._comboboxElement = el as HTMLElement}
        onClick={this.onClick.bind(this)}
        role='combobox'
        aria-expanded={String(this._isExpanded)}
        tabIndex={0}
      >
        <div class='combobox-field'>
          {this.multiple && this.value.map(option => (
            <ul class='combobox-chips'>
              <li class='combobox-chip'>
                <my-chip data={option} isDeletable={true}>
                  {option.text}
                </my-chip>
              </li>
            </ul>
          ))}

          {!this.multiple && this.value.length === 1 &&
            <span class='combobox-placeholder'>
              {this.value[0].text}
            </span>
          }

          {this.value.length === 0 &&
            <span class='combobox-placeholder'>
              {this.placeholder}
            </span>
          }
        </div>
        <div class='combobox-dropdown'>
          <ul
            class='combobox-listbox'
            ref={el => this._listboxElement = el as HTMLUListElement}
            role='listbox'
          >
            {this.options.map((option, index) => (
              <li
                class='combobox-option'
                role='option'
                aria-selected={String(this.checkSelectedState(option))}
                aria-activedescendant={String(this._focusedOptionIndex === index)}
                data-value={option.value}
                onMouseDown={this.onOptionMouseDown.bind(this, option)}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>

        <select
          hidden={true}
          aria-hidden='true'
          multiple={this.multiple}
          ref={el => this._selectElement = el as HTMLSelectElement}
        >
          {this.options.map(option => (
            <option
              value={option.value}
              selected={this.checkSelectedState(option)}
            >
              {option.text}
            </option>
          ))}
        </select>
      </div>
    );
  }

  checkSelectedState(option: ComboboxOption) {
    return this.value.some(selectedOption => selectedOption.value === option.value);
  }

  onClick() {
    this._isExpanded ? this.collapse() : this.expand();
  }

  onOptionMouseDown(option: ComboboxOption, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.toggleOption(option);
  }

  onBackspaceKeyDown() {
    const lastOptionIndex = this.value.length - 1;
    const lastOption = this.value[lastOptionIndex];

    if (lastOption) {
      this.deselectOption(lastOption);
    }
  }

  onEnterKeyDown() {
    const focusedOption = this.options[this._focusedOptionIndex];

    if (this._isExpanded) {
      if (focusedOption) {
        this.toggleOption(focusedOption);
      } else {
        this.collapse();
      }
    } else {
      this.expand();
    }
  }

  onSpaceKeyDown() {
    if (!this._isExpanded) {
      this.expand();
    }
  }

  onTabKeyDown() {
    this.collapse(false);
  }

  onEscapeKeyDown() {
    this.collapse();
  }

  onArrowDownKeyDown() {
    const focusedOptionIndex = this._focusedOptionIndex + 1;

    if (focusedOptionIndex < this.options.length) {
      this.focusOption(focusedOptionIndex);
    }
  }

  onArrowUpKeyDown() {
    const focusedOptionIndex = this._focusedOptionIndex - 1;

    if (focusedOptionIndex >= 0) {
      this.focusOption(focusedOptionIndex);
    }
  }

  expand() {
    if (isTouchCapable()) {
      // TODO: display native option list
    } else {
      this.togglePopup(true);
    }

    this.focusOption(-1);
  }

  collapse(shouldFocusField: boolean = true) {
    this.togglePopup(false);

    if (shouldFocusField) {
      this._comboboxElement.focus();
    }
  }

  focusOption(index: number) {
    const optionElements = this._selectElement.options;
    const newOptionElement = optionElements[index];

    let scrollBottom: number;
    let elementBottom: number;

    this._focusedOptionIndex = index;

    if (newOptionElement && this._listboxElement.scrollHeight > this._listboxElement.clientHeight) {
      scrollBottom = this._listboxElement.clientHeight + this._listboxElement.scrollTop;
      elementBottom = newOptionElement.offsetTop + newOptionElement.offsetHeight;

      if (elementBottom > scrollBottom) {
        this._listboxElement.scrollTop = elementBottom - this._listboxElement.clientHeight;
      }

      else if (newOptionElement.offsetTop < this._listboxElement.scrollTop) {
        this._listboxElement.scrollTop = newOptionElement.offsetTop;
      }
    }
  }

  togglePopup(isExpanded: boolean) {
    this._isExpanded = isExpanded;
  }

  toggleOption(option: ComboboxOption) {
    const isSelected = this.checkSelectedState(option);

    if (this.multiple === false) {
      this.clearSelection();
    }

    if (isSelected) {
      this.deselectOption(option);
    } else {
      this.selectOption(option);
    }

    this.changeEvent.emit();
    this.collapse();
  }

  selectOption(option: ComboboxOption) {
    this.value = [
      ...this.value,
      option
    ];
  }

  deselectOption(option: ComboboxOption) {
    const value = [...this.value];
    const optionIndex = value.findIndex(selectedOption => selectedOption.value === option.value);

    this.value = [...value.slice(0, optionIndex), ...value.slice(optionIndex + 1)];
  }

  clearSelection() {
    this.value = [];
  }
}
