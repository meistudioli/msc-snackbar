import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';

const defaults = {
  duration: 99999, /* seconds */
  actioncontent: 'Action'
};

const booleanAttrs = []; // booleanAttrs default should be false
const objectAttrs = [];
const custumEvents = {
  action: 'msc-snackbar-action-click',
  dismiss: 'msc-snackbar-dismiss'
};

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

:host {
  position: relative;
  display: block;
}

:host([data-direction=stack]) {
  .snackbar {
    --flex-direction: column;
    --functions-align-self: flex-end;
  }
}

:host([data-hide-action-button]) {
  .snackbar {
    --button-action-display: none;
  } 
}

:host([data-hide-dismiss-button]) {
  .snackbar {
    --button-dismiss-display: none;
    --padding-inline-end: .75em;
  }
}

:host([data-hide-action-button][data-hide-dismiss-button]) {
  .snackbar {
    --functions-display: none;
  }
}

.main {
  --action-button-color: var(--msc-snackbar-action-button-color, rgba(208 188 255));

  --min-inline-size: 344px;
  --max-inline-size: 672px;

  --button-action-display: block;
  --button-dismiss-display: grid;

  --flex-direction: row;
  --functions-align-self: auto;
  --functions-display: flex;
}

.snackbar {
  --background-color: rgba(50 47 53);

  --margin-inline-start: max(1em, var(--safe-area-left));
  --margin-block-end: max(1em, var(--safe-area-bottom));
  --margin: 0 0 var(--margin-block-end) var(--margin-inline-start);
  --inset: auto auto 0 0;

  --padding-inline-start: 1em;
  --padding-inline-end: .5em;
  --padding-block: .875em;

  --gap: .75em;

  --button-background-tapped: rgba(255 255 255/.08);
  --button-background-normal: transparent;
  --button-background-active: rgba(255 255 255/.08);
  --button-background: var(--button-background-normal);
  --button-active-scale: .85;

  @media screen and (width <= 767px) {
    --inset: auto 0 0;
    --margin: 0 auto var(--margin-block-end) auto;
  }

  position: fixed;
  inline-size: 100%;
  inset: var(--inset);
  background: transparent;
  border: 0 none;
  z-index: 2147483647;

  /* popover */
  &:popover-open {
    transition-timing-function: cubic-bezier(0,.86,.18,1);
    transition-duration: 300ms;
    transform: translateY(0) scaleY(1);
    opacity: 1;

    @starting-style {
      transform: translateY(-20px) scaleY(0);
      opacity: 0;
    }
  }

  transform: translateY(-30px) scaleY(1);
  transform-origin: 100% 100%;
  opacity: 0;
  
  transition:
    transform 200ms ease-out,
    opacity 200ms,
    display 200ms;
  transition-behavior: allow-discrete;

  .snackbar__main {
    inline-size: fit-content;
    min-inline-size: min(var(--min-inline-size), var(--max-inline-size));
    max-inline-size: min(
      max(var(--min-inline-size), var(--max-inline-size)),
      calc(100% - var(--margin-inline-start) * 2)
    );
    min-block-size: 3em;

    padding-inline: var(--padding-inline-start) var(--padding-inline-end);
    padding-block: var(--padding-block);
    margin: var(--margin);
    box-sizing: border-box;

    border-radius: .25em;
    background-color: var(--background-color);
    box-shadow:
      0 3px 5px -1px rgba(0 0 0/.2),
      0 6px 10px 0 rgba(0 0 0/.14),
      0 1px 18px 0 rgba(0 0 0/.12);
    
    display: flex;
    flex-direction: var(--flex-direction);
    gap: var(--gap);
    align-items: center;
  }

  .snackbar__main__label {
    flex-grow: 1;
    min-inline-size: 0;

    font-size: .875em;
    line-height: 1.4285;
    color: rgba(229 229 229);

    word-break: break-word;
    hyphens: auto;
    text-wrap: pretty;
    text-autospace: normal;
  }

  .snackbar__main__functions {
    flex-shrink: 0;
    align-self: var(--functions-align-self);

    display: var(--functions-display);
    gap: var(--gap);
    align-items: center;

    button {
      flex-shrink: 0;
      font-size: 0;
      appearance: none;
      box-shadow: unset;
      border: unset;
      background: transparent;
      -webkit-user-select: none;
      user-select: none;
      pointer-events: auto;
      margin: 0;
      padding: 0;
      outline: 0 none;

      background: var(--button-background);
      transition: background 60ms linear;
      will-change: background;

      &:focus-visible {
        --button-background: var(--button-background-active);
      }

      &:active {
        --button-background: var(--button-background-tapped);
        scale: var(--button-active-scale);
      }

      @media (hover: hover) {
        &:hover {
          --button-background: var(--button-background-active);
        }
      }
    }

    .snackbar__main__functions__action {
      font-size: .875em;
      font-weight: 500;
      color: var(--action-button-color);
      padding: .5em 1em;
      display: var(--button-action-display);
      border-radius: 2em;
    }

    .snackbar__main__functions__dismiss {
      --button-size: 28;
      --button-size-with-unit: calc(var(--button-size) * 1px);
      --button-icon-scale-rate: .75;

      --button-icon: rgba(228 228 228);
      --button-icon-scale-basis: calc((var(--button-size) * var(--button-icon-scale-rate)) / 24);
      --button-active-scale: .85;

      inline-size: var(--button-size-with-unit);
      aspect-ratio: 1/1;
      border-radius: var(--button-size-with-unit);
      
      display: var(--button-dismiss-display);
      place-content: center;

      &::before {
        content: '';
        inline-size: 24px;
        aspect-ratio: 1/1;
        background: var(--button-icon);
        clip-path: path('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z');
        display: block;
        scale: var(--button-icon-scale-basis);
      }
    }
  }
}
</style>

<div class="main" ontouchstart="" tabindex="0">
  <div class="snackbar" popover="hint">
    <div class="snackbar__main">
      <p class="snackbar__main__label line-clampin"></p>

      <div class="snackbar__main__functions">
        <button
          type="button"
          class="snackbar__main__functions__action"
          data-act="action"
        >
          Action
        </button>
        <button
          type="button"
          class="snackbar__main__functions__dismiss"
          data-act="dismiss"
        >
          dismiss
        </button>
      </div>
    </div>
  </div>
</div>
`;

// Houdini Props and Vals
if (CSS?.registerProperty) {
  try {
    CSS.registerProperty({
      name: '--msc-snackbar-action-button-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(208 188 255)'
    });
  } catch(err) {
    console.warn(`msc-snackbar: ${err.message}`);
  }
}

export class MscSnackbar extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
      tid: ''
    };

    // nodes
    this.#nodes = {
      main: this.shadowRoot.querySelector('.main'),
      snackbar: this.shadowRoot.querySelector('.snackbar'),
      snackbarMain: this.shadowRoot.querySelector('.snackbar__main'),
      label: this.shadowRoot.querySelector('.snackbar__main__label'),
      btnAction: this.shadowRoot.querySelector('.snackbar__main__functions__action')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new MscSnackbar(config)
    };

    // evts
    this._onClick = this._onClick.bind(this);
    this._onToggle = this._onToggle.bind(this);
    this._onMouseAction = this._onMouseAction.bind(this);
  }

  async connectedCallback() {
   const { config, error } = await _wcl.getWCConfig(this);
   const { snackbar, snackbarMain } = this.#nodes;

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));

    // evts
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;
    snackbar.addEventListener('toggle', this._onToggle, { signal });
    snackbar.addEventListener('click', this._onClick, { signal });

    if (!_wcl.isEventSupport('touchstart')) {
      ['mouseenter', 'mousemove', 'mouseleave'].forEach(
        (event) => snackbarMain.addEventListener(event, this._onMouseAction, { signal })
      );
    }
  }

  disconnectedCallback() {
    if (this.#data?.controller) {
      this.#data.controller.abort();
    }
  }

  #format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      if (booleanAttrs.includes(attrName)) {
        this.#config[attrName] = false;
      } else {
        this.#config[attrName] = defaults[attrName];
      }
    } else {
      switch (attrName) {
        case 'duration': {
          const num = +newValue;
          this.#config[attrName] = (isNaN(num) || num <= 0) ? defaults.duration : num;
          break;
        }

        case 'actioncontent': {
          const content = newValue.trim();
          this.#config[attrName] = content || defaults.actioncontent;
          break;
        }
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!MscSnackbar.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'duration':
        if (this.open) {
          this.#setCurtaincall();
        }
        break;

      case 'actioncontent': {
        this.#nodes.btnAction.textContent = this.actioncontent;
        break;
      }
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // MscSnackbar.observedAttributes
  }

  static get supportedEvents() {
    return Object.keys(custumEvents).map(
      (key) => {
        return custumEvents[key];
      }
    );
  }

  #upgradeProperty(prop) {
    let value;

    if (MscSnackbar.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set duration(value) {
    if (value) {
      this.setAttribute('duration', value);
    } else {
      this.removeAttribute('duration');
    }
  }

  get duration() {
    return this.#config.duration;
  }

  set actioncontent(value) {
    if (value) {
      this.setAttribute('actioncontent', value);
    } else {
      this.removeAttribute('actioncontent');
    }
  }

  get actioncontent() {
    return this.#config.actioncontent;
  }

  get open() {
    return !!this.#nodes.main.querySelector('*:popover-open');
  }

  #fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  #setCurtaincall() {
    clearTimeout(this.#data.tid);

    this.#data.tid = setTimeout(
      () => {
        this.hide();
      }
    , this.duration * 1000);
  }

  _onClick(evt) {
    const button = evt.target.closest('button');

    if (!button) {
      return;
    }

    this.hide();

    if (button.dataset.act === 'action') {
      this.#fireEvent(custumEvents.action);
    }
  }

  _onToggle(evt) {
    const { newState } = evt;

    clearTimeout(this.#data.tid);

    if (newState === 'closed') {
      this.#fireEvent(custumEvents.dismiss);
    } else {
      this.#setCurtaincall();
    }
  }

  _onMouseAction(evt) {
    const { type } = evt;

    switch (type) {
      case 'mousemove':
      case 'mouseenter': {
        clearTimeout(this.#data.tid);
        break;
      }

      case 'mouseleave':
        this.#setCurtaincall();
        break;
    }
  }

  show(content = '') {
    const { snackbar, label } = this.#nodes;

    label.textContent = content.trim();
    snackbar.togglePopover(true);
  }

  hide() {
    this.#nodes.snackbar.togglePopover(false);
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('MscSnackbar');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('MscSnackbar'), MscSnackbar);
}