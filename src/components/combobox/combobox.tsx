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
  styleUrl: 'combobox.scss',
  shadow: false
})
export class ComboBox {
  private _listboxElement: HTMLUListElement;
  private _searchElement: HTMLInputElement;
  private _searchBufferElement: HTMLElement;

  id = uniqueId('combobox-');

  @Element() el: HTMLElement;

  @Prop() label: string = null;

  @Prop() placeholder: string = 'Select value';

  @Prop({attribute: 'multiple'}) isMultiple: boolean = false;

  @Prop({attribute: 'disabled'}) isDisabled: boolean = false;

  @Prop({attribute: 'required'}) isRequired: boolean = false;

  @Prop({attribute: 'ordered'}) isOrdered: boolean = false;

  @Prop({attribute: 'clearable'}) isClearable: boolean = false;

  @Prop({attribute: 'options'}) defaultOptions = [];

  @State() options: ComboboxOption[] = [];

  @State() selectedOptions: ComboboxOption[] = [];

  @State() searchText: string = '';

  @State() isExpanded: boolean = false;

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
        this.onEnterKeyDown(event);
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
    const optionsData = Array.from(this.el.getElementsByTagName('option')).map(optionElement => ({
      value: String(optionElement.value),
      text: String(optionElement.text),
      selected: Boolean(optionElement.selected)
    }));

    this.defaultOptions = [
      ...this.defaultOptions,
      ...optionsData
    ];

    this.options = [
      ...this.options,
      ...this.defaultOptions,
    ];

    this.selectedOptions = [
      ...this.selectedOptions,
      ...this.defaultOptions.filter(option => option.selected === true)
    ];

    if (this.isOrdered) {
      this.sortOptions();
    }
  }

  render() {
    return (
      <div
        id={this.id}
        class='combobox'
        onFocus={this.onFocus.bind(this)}
        role='combobox'
        aria-haspopup='listbox'
        aria-owns={this.id + '-listbox'}
        aria-controls={this.id + '-listbox'}
        aria-expanded={String(this.isExpanded)}
        aria-disabled={String(this.isDisabled)}
        aria-required={String(this.isRequired)}
        tabIndex={0}
      >
        {this.label &&
          <label class='combobox-label' htmlFor={this.id}>
            {this.label}
          </label>
        }

        <div class='combobox-field' onClick={this.onFieldClick.bind(this)}>
          {!this.isMultiple && this.selectedOptions.length > 0 && this.searchText.length === 0 &&
            <span class='combobox-placeholder'>{this.selectedOptions[0].text}</span>
          }

          <div class='combobox-chips'>
            {this.isMultiple && this.selectedOptions.map(option => (
              <my-chip data={option} isDeletable={!this.isDisabled}>
                {option.text}
              </my-chip>
            ))}

            <input
              type='text'
              role='searchbox'
              placeholder={this.selectedOptions.length > 0 ? '' : this.placeholder}
              class='combobox-search'
              style={{width: (this._searchBufferElement && this.selectedOptions.length > 0) ? `calc(${this._searchBufferElement.offsetWidth}px + 2rem` : 'auto'}}
              ref={el => {
                if (el) {
                  this._searchElement = el as HTMLInputElement
                }
              }}
              value={this.searchText}
              tabIndex={-1}
              autoComplete='off'
              aria-autocomplete='list'
              aria-multiline='false'
              onInput={this.onSearchInput.bind(this)}
            />

            <div
              ref={el => this._searchBufferElement = el as HTMLElement}
              class='combobox-search-buffer'
            >
              {this.searchText}
            </div>
          </div>

          {this.isClearable && this.selectedOptions.length > 0 &&
            <button class='combobox-clear' onClick={this.onClearButtonClick.bind(this)}>
              <svg viewBox='0 0 24 24' width='16' height='16' stroke='currentColor' stroke-width='2' fill='none'
                   stroke-linecap='round' stroke-linejoin='round'>
                <line x1='18' y1='6' x2='6' y2='18'></line>
                <line x1='6' y1='6' x2='18' y2='18'></line>
              </svg>
            </button>
          }

          <button class='combobox-chevron'>
            <svg viewBox='0 0 24 24' width='20' height='20' stroke='currentColor'
                 stroke-width='2' fill='none'
                 stroke-linecap='round' stroke-linejoin='round'>
              <polyline points='6 9 12 15 18 9'></polyline>
            </svg>
          </button>
        </div>

        <ul
          id={this.id + '-listbox'}
          class='combobox-listbox'
          ref={el => this._listboxElement = el as HTMLUListElement}
          role='listbox'
          aria-multiselectable={String(this.isMultiple)}
          aria-activedescendant={
            this.focusedOptionIndex !== null
            && this.focusedOptionIndex < this.options.length
            && (this.id + '-option-' + this.options[this.focusedOptionIndex].value)
          }
        >
          {this.options.length > 0
            ? this.options.map((option, index) => (
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
                <svg class='combobox-option-check' viewBox='0 0 24 24' width='16' height='16' stroke='currentColor' stroke-width='2' fill='none'
                     stroke-linecap='round' stroke-linejoin='round'>
                  <polyline points='20 6 9 17 4 12'></polyline>
                </svg>
                {option.text}
              </li>
            ))
            : <li class='combobox-option'>No options available</li>
          }
        </ul>

        <select
          hidden={true}
          disabled={this.isDisabled}
          multiple={this.isMultiple}
          required={this.isRequired}
          aria-hidden='true'
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
    return this.selectedOptions.some(selectedOption => selectedOption.value === option.value);
  }

  getOptionIndex(option: ComboboxOption) {
    const options = this.defaultOptions;
    const index = options.findIndex(option1 => option1.value === option.value);

    return index;
  }

  onFieldClick() {
    this.focus();
    // this.isExpanded ? this.collapse() : this.expand();
  }

  onClearButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.clearSelection();
    this.clearSearch();
    this.clearFilter();
    this.collapse();
  }

  onSearchInput(event) {
    this.searchText = event.target.value || '';
    this.options = this.defaultOptions.filter(option => option.text.toLowerCase().includes(this.searchText.toLowerCase()));

    if (!this.isExpanded) {
      this.expand();
    }

    this.focusOption(0);
  }

  onFocus() {
    this.focus();
  }

  onOptionClick(option: ComboboxOption, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.toggleOption(option);
    this.focus();
    this.collapse();
  }

  onBackspaceKeyDown() {
    const lastOptionIndex = this.selectedOptions.length - 1;
    const lastOption = this.selectedOptions[lastOptionIndex];
    const isFilterDisabled = this.searchText.length === 0;

    if (lastOption && isFilterDisabled) {
      this.deselectOption(lastOption);
    }
  }

  onEnterKeyDown(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();

    const focusedOption = this.options[this.focusedOptionIndex];

    if (this.isExpanded) {
      if (focusedOption) {
        this.toggleOption(focusedOption);
      }

      this.focus();
      this.collapse();
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
    this.focus();
    this.collapse();
    this.clearSearch();
  }

  onArrowDownKeyDown(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();

    const expectedIndex = this.focusedOptionIndex + 1;
    const maxIndex = this.options.length;
    const minIndex = 0;
    const focusedOptionIndex = expectedIndex === maxIndex ? minIndex : expectedIndex;

    if (this.isExpanded) {
      setTimeout(this.focusOption.bind(this, focusedOptionIndex), 0);
    } else {
      this.expand();
    }
  }

  onArrowUpKeyDown(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();

    const expectedIndex = this.focusedOptionIndex - 1;
    const maxIndex = this.options.length - 1;
    const minIndex = 0;
    const focusedOptionIndex = expectedIndex < minIndex ? maxIndex : expectedIndex;

    if (this.isExpanded) {
      setTimeout(this.focusOption.bind(this, focusedOptionIndex), 0);
    } else {
      this.expand();
    }
  }

  focus() {
    this._searchElement.focus();
    this.expand();
  }

  blur() {
    this._searchElement.blur();
    this.collapse();
  }

  expand() {
    const selectedOptionCount = this.selectedOptions.length;
    const lastSelectedOption = selectedOptionCount > 0 ? this.selectedOptions[selectedOptionCount - 1] : null;
    const lastSelectedOptionIndex = lastSelectedOption ? this.getOptionIndex(lastSelectedOption) : 0;

    this.clearFilter();

    if (isTouchCapable()) {
      // TODO: display native option list
    } else {
      this.togglePopup(true);
      setTimeout(this.focusOption.bind(this, lastSelectedOptionIndex), 10);
    }
  }

  collapse() {
    this.togglePopup(false);
    this.focusOption(null);
  }

  focusOption(index: number) {
    const me = this;
    const optionElements = this._listboxElement.querySelectorAll('.combobox-option') as NodeListOf<HTMLElement>;
    const newOptionElement = optionElements[index];

    let scrollBottom: number;
    let elementBottom: number;

    this.focusedOptionIndex = index;

    if (newOptionElement && this._listboxElement.scrollHeight > this._listboxElement.clientHeight) {
      scrollBottom = this._listboxElement.clientHeight + this._listboxElement.scrollTop;
      elementBottom = newOptionElement.offsetTop + newOptionElement.offsetHeight;

      if (elementBottom > scrollBottom) {
        me._listboxElement.scrollTop = elementBottom - me._listboxElement.clientHeight;
      } else if (newOptionElement.offsetTop < me._listboxElement.scrollTop) {
        me._listboxElement.scrollTop = newOptionElement.offsetTop;
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

    this.clearSearch();

    if (isSelected) {
      this.deselectOption(option);
    } else {
      this.selectOption(option);
    }

    this.changeEvent.emit();
  }

  selectOption(option: ComboboxOption) {
    this.selectedOptions = [
      ...this.selectedOptions,
      option
    ];

    if (this.isOrdered) {
      this.sortOptions();
    }
  }

  deselectOption(option: ComboboxOption) {
    const selectedOptions = [...this.selectedOptions];
    const optionIndex = selectedOptions.findIndex(selectedOption => selectedOption.value === option.value);

    this.selectedOptions = [
      ...selectedOptions.slice(0, optionIndex),
      ...selectedOptions.slice(optionIndex + 1)
    ];
  }

  sortOptions() {
    this.selectedOptions.sort((a, b) => a.text.localeCompare(b.text));
  }

  clearSelection() {
    this.selectedOptions = [];
  }

  clearSearch() {
    this.searchText = '';
  }

  clearFilter() {
    this.options = [...this.defaultOptions];
  }
}
