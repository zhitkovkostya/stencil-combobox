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
  private _searchElement: HTMLInputElement;

  id = uniqueId('combobox-');

  @Element() el: HTMLElement;

  @Prop() placeholder: string = 'Select value';

  @Prop({attribute: 'multiple'}) isMultiple: boolean = false;

  @Prop({attribute: 'disabled'}) isDisabled: boolean = false;

  @Prop({attribute: 'ordered'}) isOrdered: boolean = false;

  @Prop({attribute: 'options'}) defaultOptions = [];

  @Prop() selectedOptions = [];

  @State() options: ComboboxOption[] = [];

  @State() value: ComboboxOption[] = [];

  @State() searchText: string = '';

  @State() isExpanded: boolean = false;

  @State() isFocused: boolean = false;

  @State() focusedOptionIndex: number = 0;

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

    if (this.isOrdered) {
      this.sortOptions();
    }
  }

  render() {
    return (
      <div
        id={this.id}
        class={{
          'combobox': true,
          'combobox-focused': this.isFocused
        }}
        ref={el => this._comboboxElement = el as HTMLElement}
        onFocus={this.onFocus.bind(this)}
        role='combobox'
        aria-haspopup='listbox'
        aria-owns={this.id + '-listbox'}
        aria-controls={this.id + '-listbox'}
        aria-expanded={String(this.isExpanded)}
        aria-disabled={String(this.isDisabled)}
        tabIndex={0}
      >
        <div
          class='combobox-field'
          ref={el => this._fieldElement = el as HTMLElement}
          onClick={this.onFieldClick.bind(this)}
        >
          {this.isMultiple && this.value.map(option => (
            <my-chip data={option} deletable={!this.isDisabled}>
              {option.text}
            </my-chip>
          ))}


          {!this.isMultiple && this.value.length > 0 && this.searchText.length === 0 &&
            <span class='combobox-placeholder'>{this.value[0].text}</span>
          }

          <input
            type='text'
            placeholder={this.value.length > 0 ? '' : this.placeholder}
            class='combobox-search'
            ref={el => this._searchElement = el as HTMLInputElement}
            value={this.searchText}
            tabIndex={-1}
            autoComplete='off'
            aria-autocomplete='list'
            onKeyPress={this.onSearchFieldKeyPress.bind(this)}
            onKeyUp={this.onSearchFieldKeyUp.bind(this)}
          />
        </div>
        <ul
          id={this.id + '-listbox'}
          class='combobox-listbox'
          ref={el => this._listboxElement = el as HTMLUListElement}
          role='listbox'
          aria-multiselectable={String(this.isMultiple)}
          aria-activedescendant={this.focusedOptionIndex !== null && (this.id + '-option-' + this.options[this.focusedOptionIndex].value)}
        >
          {this.options.map((option, index) => (
            <li
              id={this.id + '-option-' + option.value}
              class={{
                'combobox-option': true,
                'combobox-option-focused': this.focusedOptionIndex === index
              }}
              role='option'
              aria-selected={String(this.checkSelectedState(option))}
              onClick={this.onOptionClick.bind(this, option)}
            >
              {option.text}
            </li>
          ))}

          {this.options.length === 0 &&
            <li class='combobox-option'>No options available</li>
          }
        </ul>

        <select
          hidden={true}
          disabled={this.isDisabled}
          multiple={this.isMultiple}
          aria-hidden='true'
          aria-disabled={String(this.isDisabled)}
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

  onSearchFieldKeyPress(event) {
    if (event.code !== 'Enter' && !this.isExpanded) {
      this.expand();
    }
  }

  onSearchFieldKeyUp(event) {
    this.searchText = event.target.value;

    this.options = this.defaultOptions.filter(option => option.text.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  onOptionClick(option: ComboboxOption, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.toggleOption(option);
    this.collapse();
    this.focus();
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
      }

      this.collapse();
    } else {
      this.expand();
    }

    this.focus();
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
    this.clearSearch();
  }

  onArrowDownKeyDown(event) {
    event.preventDefault();

    const expectedIndex = this.focusedOptionIndex + 1;
    const maxIndex = this.options.length;
    const minIndex = 0;
    const focusedOptionIndex = expectedIndex === maxIndex ? minIndex : expectedIndex;

    if (this.isExpanded) {
      this.focusOption(focusedOptionIndex);
    } else {
      this.expand();
    }
  }

  onArrowUpKeyDown(event) {
    event.preventDefault();

    const expectedIndex = this.focusedOptionIndex - 1;
    const maxIndex = this.options.length - 1;
    const minIndex = 0;
    const focusedOptionIndex = expectedIndex < minIndex ? maxIndex : expectedIndex;

    if (!this.isExpanded) {
      this.expand();
    }

    setTimeout(this.focusOption.bind(this, focusedOptionIndex), 0);
  }

  focus() {
    this.isFocused = true;
    this._searchElement.focus();
  }

  blur() {
    this.isFocused = false;
    this._searchElement.blur();
  }

  expand() {
    if (isTouchCapable()) {
      // TODO: display native option list
    } else {
      this.togglePopup(true);
      this.focusOption(0);
    }
  }

  collapse() {
    this._listboxElement.scrollTop = 0;
    this.togglePopup(false);
    this.focusOption(null);
  }

  focusOption(index: number) {
    const optionElements = this._listboxElement.querySelectorAll('.combobox-option') as NodeListOf<HTMLElement>;
    const newOptionElement = optionElements[index];

    let scrollBottom: number;
    let elementBottom: number;

    this.focusedOptionIndex = index;

    if (newOptionElement && this._listboxElement.scrollHeight > this._listboxElement.clientHeight) {
      scrollBottom = this._listboxElement.clientHeight + this._listboxElement.scrollTop;
      elementBottom = newOptionElement.offsetTop + newOptionElement.offsetHeight;

      if (elementBottom > scrollBottom) {
        this._listboxElement.scrollTop = elementBottom - this._listboxElement.clientHeight;
      } else if (newOptionElement.offsetTop < this._listboxElement.scrollTop) {
        this._listboxElement.scrollTop = newOptionElement.offsetTop;
      }
    }
  }

  togglePopup(isExpanded: boolean) {
    this.isExpanded = isExpanded;
  }

  toggleOption(option: ComboboxOption) {
    const isSelected = this.checkSelectedState(option);

    if (this.isMultiple === false) {
      this.clearSelection();
    }

    if (isSelected) {
      this.deselectOption(option);
    } else {
      this.selectOption(option);
    }

    this.clearSearch()

    this.changeEvent.emit();
  }

  selectOption(option: ComboboxOption) {
    this.value = [
      ...this.value,
      option
    ];

    if (this.isOrdered) {
      this.sortOptions();
    }
  }

  deselectOption(option: ComboboxOption) {
    const value = [...this.value];
    const optionIndex = value.findIndex(selectedOption => selectedOption.value === option.value);

    this.value = [...value.slice(0, optionIndex), ...value.slice(optionIndex + 1)];
  }

  sortOptions() {
    this.value.sort((a, b) => a.text.localeCompare(b.text));
  }

  clearSelection() {
    this.value = [];
  }

  clearSearch() {
    this.searchText = '';
  }
}
