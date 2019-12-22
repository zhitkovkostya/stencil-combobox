import {Component, Element, Event, Prop, State, EventEmitter, h, Listen} from '@stencil/core';
import {isTouchCapable} from '../../utils/utils';

@Component({
  tag: 'my-select',
  styleUrl: 'select.scss',
  shadow: true
})
export class Select {
  // private _controlElement?: HTMLElement;
  private _fieldElement?: HTMLElement;
  private _popupElement?: HTMLElement;
  // private _listElement?: HTMLElement;

  @Element() el: HTMLElement;

  @Prop() placeholder: string = 'Select value';

  @State() _isOpened: boolean = false;

  @State() _focusedItemIndex: number = 0;

  @Event() fieldChange: EventEmitter;

  @Listen('click', {target: 'window'})
  onOuterClick(event) {
    if (!this.el.contains(event.target)) {
      this.close();
    }
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent) {
    console.log(event.key);
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
    this.refreshItems();
  }


  render() {
    return (
      <div
        class='select'
        // ref={el => this._controlElement = el as HTMLElement}
        role='combobox'
      >
        <div
          class='select-field'
          ref={el => this._fieldElement = el as HTMLElement}
          onClick={this.onFieldClick.bind(this)}
          tabindex='0'
        >
        </div>
        <div class='select-popup' ref={el => this._popupElement = el as HTMLElement}>
          <ul
            class='select-list'
            // ref={el => this._listElement = el as HTMLElement}
            onClick={this.onListItemClick.bind(this)}
            role='listbox'
            aria-selectable='true'
          >
            <slot></slot>
          </ul>
        </div>
      </div>
    );
  }

  getItemElements() {
    return this.el.querySelectorAll('li');
  }

  onFieldClick() {
    this._isOpened ? this.close() : this.open();
  }

  onListItemClick(event) {
    let itemElement = event.target;

    while (itemElement && itemElement.tagName !== 'LI') {
      itemElement = itemElement.parentNode;
    }

    if (itemElement.hasAttribute('selected')) {
      this.deselectItem(itemElement);
    } else {
      this.selectItem(itemElement);
    }
  }

  onBackspaceKeyDown() {
    const selectedItemElements = this.el.querySelectorAll('li[selected]');

    if (selectedItemElements.length) {
      this.deselectItem(selectedItemElements[selectedItemElements.length - 1]);
    }
  }

  onEnterKeyDown() {
    const itemElements = this.getItemElements();
    let focusedItemElement: HTMLElement;

    if (this._isOpened) {
      focusedItemElement = itemElements[this._focusedItemIndex];
      this.selectItem(focusedItemElement);
    } else {
      this.open();
    }
  }

  onSpaceKeyDown() {
    if (!this._isOpened) {
      this.open();
    }
  }

  onEscapeKeyDown() {
    this.close();
  }

  onArrowDownKeyDown() {
    if (this._focusedItemIndex + 1 < this.getItemElements().length) {
      this._focusedItemIndex += 1;
    }

    this.refreshFocusedItem();
  }

  onArrowUpKeyDown() {
    if (this._focusedItemIndex - 1 >= 0) {
      this._focusedItemIndex = this._focusedItemIndex - 1;
    }

    this.refreshFocusedItem();
  }

  open() {
    if (isTouchCapable) {

    } else {
      this.togglePopup(true);
    }
  }

  close() {
    this.togglePopup(false);
  }

  togglePopup(isOpened: boolean) {
    const displayValue = isOpened ? 'initial' : 'none';
    this._isOpened = isOpened;
    this._popupElement.style.display = displayValue;
  }

  refreshField() {
    const selectedItemElements = this.el.querySelectorAll('li[selected]');

    this._fieldElement.innerHTML = '';

    if(!selectedItemElements.length) {
      this._fieldElement.appendChild(this.createPlaceholder());
      return;
    }

    for (let i = 0; i < selectedItemElements.length; i++) {
      this._fieldElement.appendChild(this.createTag(selectedItemElements[i]));
    }
  }

  refreshItems() {
    const itemElements = this.getItemElements();
    let itemElement: HTMLElement;
    let i = 0;

    for(i; i < itemElements.length; i++) {
      itemElement = itemElements[i];
      itemElement.setAttribute("role", "option");
      itemElement.setAttribute("aria-selected", String(itemElement.hasAttribute("selected")));
      itemElement.setAttribute("tabindex", '-1');
    }

    this._focusedItemIndex = 0;
  };

  refreshFocusedItem() {
    this.getItemElements()[this._focusedItemIndex].focus();
  }

  createPlaceholder() {
    const placeholderElement = document.createElement('div');

    placeholderElement.className = 'select-field-placeholder';
    placeholderElement.textContent = this.placeholder;

    return placeholderElement;
  }

  createTag(itemElement) {
    const tagElement = document.createElement('div');
    const contentElement = document.createElement('div');
    const removeButtonElement = document.createElement('div');

    tagElement.className = 'select-tag';

    contentElement.className = 'select-tag-text';
    contentElement.textContent = itemElement.textContent;

    removeButtonElement.className = 'select-tag-remove-button';
    removeButtonElement.addEventListener('click', this.removeTag.bind(this, itemElement));

    tagElement.appendChild(contentElement);
    tagElement.appendChild(removeButtonElement);

    return tagElement;
  }

  removeTag(itemElement: HTMLElement, event) {
    this.deselectItem(itemElement);

    event.stopPropagation();
  }

  selectItem(itemElement: HTMLElement) {
    this.toggleItem(itemElement, true);
  };

  deselectItem(itemElement) {
    this.toggleItem(itemElement, false);
  }

  toggleItem(itemElement: HTMLElement, isSelected: boolean) {
    if (isSelected) {
      itemElement.setAttribute('selected', 'selected');
    } else {
      itemElement.removeAttribute('selected');
    }

    itemElement.setAttribute('aria-selected', String(isSelected));

    this.fireFieldChangeEvent();
    this.refreshField();
    this.close();
    this._fieldElement.focus();
  }

  fireFieldChangeEvent() {
    this.fieldChange.emit();
  };
}
