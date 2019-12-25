import {Component, Element, Event, Prop, State, EventEmitter, h, Listen} from '@stencil/core';
import uniqueId from 'lodash.uniqueid';
import {isTouchCapable} from '../../utils/utils';
import ComboboxOption from './combobox-option';

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

  @Prop() placeholder?: string = 'Select value';

  @Prop() disabled?: boolean = false;

  @Prop({mutable: true}) options?: Array<ComboboxOption> = [];

  @State() _isExpanded: boolean = false;

  @State() _focusedItemIndex: number = -1;

  @Event({eventName: 'my-change'}) changeEvent: EventEmitter;

  @Listen('click', {target: 'window'})
  onOuterClick(event) {
    if (!this.el.contains(event.target)) {
      this.collapse(false);
    }
  }

  @Listen('blur')
  onBlur() {
    this.collapse(false);
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

  componentDidLoad() {
    this.refreshField();
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
        </div>
        <div
          class='combobox-dropdown'
          ref={el => this._dropdownElement = el as HTMLElement}
        >
          <ul
            class='combobox-listbox'
            ref={el => this._listboxElement = el as HTMLUListElement}
            onClick={this.onListItemClick.bind(this)}
            role='listbox'
          >
            {this.options.map((option) => (
              <li
                class='combobox-option'
                role='option'
                aria-selected={String(option.selected)}
                aria-activedescendant='false'
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  getItemElements() {
    return this._dropdownElement.querySelectorAll('li');
  }

  getItemSelectedState(itemElement: HTMLElement) {
    return itemElement.getAttribute('aria-selected') === 'true';
  }

  onFieldClick() {
    this._isExpanded ? this.collapse() : this.expand();
  }

  onListItemClick(event) {
    event.stopPropagation();

    const itemElement = event.target;

    this.toggleItem(itemElement);
  }

  onBackspaceKeyDown() {
    const selectedItemElements = this.el.querySelectorAll('li[aria-selected]');

    if (selectedItemElements.length) {
      this.toggleItem(selectedItemElements[selectedItemElements.length - 1]);
    }
  }

  onEnterKeyDown() {
    const itemElements = this.getItemElements();
    const focusedItemElement = itemElements[this._focusedItemIndex];

    if (this._isExpanded) {
      if (focusedItemElement) {
        this.toggleItem(focusedItemElement);
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

  onEscapeKeyDown() {
    this.collapse();
  }

  onArrowDownKeyDown() {
    if (this._focusedItemIndex + 1 < this.getItemElements().length) {
      this.focusItem(this._focusedItemIndex + 1);
    }
  }

  onArrowUpKeyDown() {
    if (this._focusedItemIndex - 1 >= 0) {
      this.focusItem(this._focusedItemIndex - 1);
    }
  }

  expand() {
    if (isTouchCapable()) {

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

  focusItem(index) {
    const itemElements = this.getItemElements();
    const currentItemElement = itemElements[this._focusedItemIndex];
    const newItemElement = itemElements[index];

    let scrollBottom: number;
    let elementBottom: number;

    this._focusedItemIndex = index;

    if (currentItemElement) {
      currentItemElement.setAttribute('aria-activedescendant', 'false');
    }

    if (newItemElement) {
      newItemElement.setAttribute('aria-activedescendant', 'true');

      if (this._listboxElement.scrollHeight > this._listboxElement.clientHeight) {
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
  }

  togglePopup(isExpanded: boolean) {
    this._isExpanded = isExpanded;
  }

  refreshField() {
    const selectedItemElements = this._listboxElement.querySelectorAll('li[aria-selected="true"]');

    this._fieldElement.innerHTML = '';

    if(!selectedItemElements.length) {
      this._fieldElement.appendChild(this.createPlaceholder());
      return;
    }

    for (let i = 0; i < selectedItemElements.length; i++) {
      this._fieldElement.appendChild(this.createTag(selectedItemElements[i]));
    }
  }

  createPlaceholder() {
    const placeholderElement = document.createElement('div');

    placeholderElement.className = 'combobox-field-placeholder';
    placeholderElement.textContent = this.placeholder;

    return placeholderElement;
  }

  createTag(itemElement) {
    const tagElement = document.createElement('div');
    const contentElement = document.createElement('div');
    const removeButtonElement = document.createElement('div');

    tagElement.className = 'combobox-tag';

    contentElement.className = 'combobox-tag-text';
    contentElement.textContent = itemElement.textContent;

    removeButtonElement.className = 'combobox-tag-remove-button';
    removeButtonElement.addEventListener('click', this.removeTag.bind(this, itemElement));

    tagElement.appendChild(contentElement);
    tagElement.appendChild(removeButtonElement);

    return tagElement;
  }

  removeTag(itemElement, event) {
    this.toggleItem(itemElement);

    event.stopPropagation();
  }

  toggleItem(itemElement) {
    const isSelected = this.getItemSelectedState(itemElement);

    itemElement.setAttribute('aria-selected', String(!isSelected));

    this.fireChangeEvent();
    this.refreshField();
    this.collapse();
  }

  fireChangeEvent() {
    this.changeEvent.emit();
  };
}
