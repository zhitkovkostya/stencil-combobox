import {Component, Element, Event, Prop, State, EventEmitter, h, Listen} from '@stencil/core';

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

  @Event() fieldChange: EventEmitter;

  @Listen('click', {target: 'window'})
  handleOuterClick(event) {
    if (!this.el.contains(event.target)) {
      this.close();
    }
  }

  componentDidLoad() {
    this.refreshField();
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
  };

  open() {
    this.togglePopup(true);
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
  }

  fireFieldChangeEvent() {
    this.fieldChange.emit();
  };
}
