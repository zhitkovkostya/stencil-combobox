import {Component, Element, Event, Prop, State, EventEmitter, h, Listen} from '@stencil/core';
import uniqueId from 'lodash.uniqueid';
import {isTouchCapable} from '../../utils/utils';

type ComboboxOption = {
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
  private _fieldElement?: HTMLElement;
  private _dropdownElement?: HTMLElement;
  private _listboxElement?: HTMLUListElement;

  @Element() el: HTMLElement;

  @Prop() placeholder: string = 'Select value';

  @Prop() disabled: boolean = false;

  @Prop() options: Array<ComboboxOption> = [];

  @Prop() selectedOptions: Array<ComboboxOption> = [];

  @State() value: Array<ComboboxOption> = [];

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
        role='combobox'
        aria-expanded={String(this._isExpanded)}
      >
        <div
          class='combobox-field'
          ref={el => this._fieldElement = el as HTMLElement}
          onClick={this.onFieldClick.bind(this)}
          tabIndex={0}
        >
          {this.value.map(option => (
            <div
              class='combobox-tag'
              data-value={option.value}
            >
              <div class='combobox-tag-text'>
                {option.text}
              </div>
              <button
                class='combobox-tag-remove-button'
                onClick={this.onListItemClick.bind(this, option)}
              ></button>
            </div>
          ))}
          <li>
            {this.value.length === 0 &&
              this.placeholder
            }
          </li>
        </div>
        <div
          class='combobox-dropdown'
          ref={el => this._dropdownElement = el as HTMLElement}
        >
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
                onClick={this.onListItemClick.bind(this, option)}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  getItemSelectedState(itemElement: HTMLElement) {
    return itemElement.getAttribute('aria-selected') === 'true';
  }

  checkSelectedState(option: ComboboxOption) {
    return this.value.some(selectedOption => selectedOption.value === option.value);
  }

  onFieldClick() {
    this._isExpanded ? this.collapse() : this.expand();
  }

  onListItemClick(option: ComboboxOption, event) {
    event.preventDefault();
    event.stopPropagation();

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
      this.focusItem(focusedOptionIndex);
    }
  }

  onArrowUpKeyDown() {
    const focusedOptionIndex = this._focusedOptionIndex - 1;

    if (focusedOptionIndex >= 0) {
      this.focusItem(focusedOptionIndex);
    }
  }

  expand() {
    if (isTouchCapable()) {
      // TODO: display native option list
    } else {
      this.togglePopup(true);
    }

    this.focusItem(-1);
  }

  collapse(shouldFocusField: boolean = true) {
    this.togglePopup(false);

    if (shouldFocusField) {
      this._fieldElement.focus();
    }
  }

  focusItem(index: number) {
    const optionElements = this._dropdownElement.querySelectorAll('li');
    const newItemElement = optionElements[index];

    let scrollBottom: number;
    let elementBottom: number;

    this._focusedOptionIndex = index;

    if (newItemElement && this._listboxElement.scrollHeight > this._listboxElement.clientHeight) {
      scrollBottom = this._listboxElement.clientHeight + this._listboxElement.scrollTop;
      elementBottom = newItemElement.offsetTop + newItemElement.offsetHeight;

      if (elementBottom > scrollBottom) {
        this._listboxElement.scrollTop = elementBottom - this._listboxElement.clientHeight;
      }

      else if (newItemElement.offsetTop < this._listboxElement.scrollTop) {
        this._listboxElement.scrollTop = newItemElement.offsetTop;
      }
    }
  }

  togglePopup(isExpanded: boolean) {
    this._isExpanded = isExpanded;
  }

  toggleOption(option: ComboboxOption) {
    const isSelected = this.checkSelectedState(option);

    if (isSelected) {
      this.deselectOption(option);
    } else {
      this.selectOption(option);
    }

    this.fireChangeEvent();
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

  fireChangeEvent() {
    this.changeEvent.emit();
  };
}
