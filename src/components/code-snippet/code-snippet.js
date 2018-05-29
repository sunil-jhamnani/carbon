import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';

class CodeSnippet extends mixin(createComponent, initComponentBySearch, handles) {
  /**
   * CodeSnippet UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a CodeSnippet UI.
   */

  constructor(element, options) {
    super(element, options);

    this._initCodeSnippet();
    this.element.querySelector(this.options.classExpandBtn).addEventListener('click', evt => this._handleClick(evt));
  }

  _handleClick() {
    const expandBtn = this.element.querySelector(this.options.classExpandText);
    this.element.classList.toggle(this.options.classExpanded);

    if (this.element.classList.contains(this.options.classExpanded)) {
      expandBtn.textContent = expandBtn.getAttribute(this.options.attribShowLessText);
    } else {
      expandBtn.textContent = expandBtn.getAttribute(this.options.attribShowMoreText);
    }
  }

  _initCodeSnippet() {
    const expandBtn = this.element.querySelector(this.options.classExpandText);
    if (!expandBtn) {
      throw new TypeError('Cannot find the expand button.');
    }

    expandBtn.textContent = expandBtn.getAttribute(this.options.attribShowMoreText);

    if (this.element.offsetHeight < this.options.minHeight) {
      this.element.classList.add(this.options.classHideExpand);
      this.element.classList.add(this.options.classExpanded);
    }
  }

  /**
   * The map associating DOM element and code snippet UI instance.
   * @member CodeSnippet.components
   * @type {WeakMap}
   */
  static components = new WeakMap();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode CodeSnippet.create .create()},
   * or {@linkcode CodeSnippet.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode CodeSnippet.init .init()} works.
   * @member CodeSnippet.options
   * @type {Object}
   * @property {string} selectorInit The data attribute to find code snippet UIs.
   */
  static options = {
    selectorInit: '[data-code-snippet]',
    attribShowMoreText: 'data-show-more-text',
    attribShowLessText: 'data-show-less-text',
    minHeight: 288,
    classExpanded: 'bx--snippet--expand',
    classExpandBtn: '.bx--snippet-btn--expand',
    classExpandText: '.bx--snippet-btn--text',
    classHideExpand: 'bx--snippet-btn--expand--hide',
  };
}

export default CodeSnippet;