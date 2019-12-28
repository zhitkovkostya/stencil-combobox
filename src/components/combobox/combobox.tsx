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
  private _comboboxElement: HTMLElement;
  private _listboxElement: HTMLUListElement;
  private _fieldElement: HTMLElement;
  private _selectElement: HTMLSelectElement;
  private _inputElement: HTMLInputElement;

  id = uniqueId('combobox-');

  @Element() el: HTMLElement;

  @Prop() placeholder: string = 'Select value';

  @Prop() multiple: boolean = false;

  @Prop() disabled: boolean = false;

  @Prop({attribute: 'options'}) defaultOptions = [];

  @Prop() selectedOptions = [];

  @State() options: ComboboxOption[] = [];

  @State() value: ComboboxOption[] = [];

  @State() searchText: string = '';

  @State() isExpanded: boolean = false;

  @State() isFocused: boolean = false;

  @State() focusedOptionIndex: number = -1;

  @Event({eventName: 'my-change'}) changeEvent: EventEmitter;

  @Listen('click', {target: 'window'})
  onOuterClick(event) {
    if (!this.el.contains(event.target)) {
      this.collapse();
      this.blur();
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
        this.onArrowDownKeyDown(event);
        break;
      case 'ArrowUp':
        this.onArrowUpKeyDown(event);
        break;
    }
  }

  @Listen('my-chip-delete')
  onChipDelete(event) {
    this.deselectOption(event.detail);
    this.collapse();
    this.focus();
  }

  componentWillLoad() {
    this.value = [
      ...this.value,
      ...this.selectedOptions
    ];

    this.options = [
      ...this.options,
      ...this.defaultOptions
    ];
  }

  render() {
    return (
      <div
        id={this.id}
        class={{'combobox': true, 'combobox-focused': this.isFocused}}
        ref={el => this._comboboxElement = el as HTMLElement}
        onFocus={this.onFocus.bind(this)}
        role='combobox'
        aria-expanded={String(this.isExpanded)}
        tabIndex={0}
      >
        <div
          class='combobox-field'
          ref={el => this._fieldElement = el as HTMLElement}
          onClick={this.onFieldClick.bind(this)}
        >
          {this.multiple && this.value.map(option => (
            <my-chip data={option} isDeletable={true}>
              {option.text}
            </my-chip>
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

          <input
            type='text'
            size={this.searchText.length + 1}
            class='combobox-input'
            ref={el => this._inputElement = el as HTMLInputElement}
            tabIndex={-1}
            onKeyUp={this.onSearchFieldKeyUp.bind(this)}
          />
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
                aria-activedescendant={String(this.focusedOptionIndex === index)}
                data-value={option.value}
                onMouseDown={this.onOptionMouseDown.bind(this, option)}
              >
                {option.text}
              </li>
            ))}

            {this.options.length === 0 &&
              <li class='combobox-option'>No options available</li>
            }
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

  onFieldClick() {
    this.isExpanded ? this.collapse() : this.expand();
    this.focus();
  }

  onFocus() {
    this.focus();
  }

  onSearchFieldKeyUp(event) {
    this.searchText = event.target.value.toLowerCase();

    if (!this.isExpanded) {
      this.expand();
    }

    this.options = this.defaultOptions.filter(option => option.text.toLowerCase().includes(this.searchText));
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
    const isFilterDisabled = this.searchText.length === 0;

    if (lastOption && isFilterDisabled) {
      this.deselectOption(lastOption);
    }
  }

  onEnterKeyDown() {
    const focusedOption = this.options[this.focusedOptionIndex];

    if (this.isExpanded) {
      if (focusedOption) {
        this.toggleOption(focusedOption);
      } else {
        this.collapse();
        this.focus();
      }
    } else {
      this.expand();
    }
  }

  onSpaceKeyDown() {
    if (!this.isExpanded) {
      this.expand();
    }
  }

  onTabKeyDown() {
    this.collapse();
    this.blur();
  }

  onEscapeKeyDown() {
    this.collapse();
    this.focus();
  }

  onArrowDownKeyDown(event) {
    event.preventDefault();

    const focusedOptionIndex = this.focusedOptionIndex + 1;

    if (focusedOptionIndex < this.options.length) {
      this.focusOption(focusedOptionIndex);
    }
  }

  onArrowUpKeyDown(event) {
    event.preventDefault();

    const focusedOptionIndex = this.focusedOptionIndex - 1;

    if (focusedOptionIndex >= 0) {
      this.focusOption(focusedOptionIndex);
    }
  }

  focus() {
    this.isFocused = true;
    this._inputElement.focus();
  }

  blur() {
    this.isFocused = false;
  }

  expand() {
    if (isTouchCapable()) {
      // TODO: display native option list
    } else {
      this.togglePopup(true);
    }

    this.focusOption(-1);
  }

  collapse() {
    this.togglePopup(false);
  }

  focusOption(index: number) {
    const optionElements = this._selectElement.options;
    const newOptionElement = optionElements[index];

    let scrollBottom: number;
    let elementBottom: number;

    this.focusedOptionIndex = index;

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
    this.isExpanded = isExpanded;
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

    this._inputElement.value = '';

    this.changeEvent.emit();
    this.collapse();
    this.focus();
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
