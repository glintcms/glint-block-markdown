/**
 * Module dependencies.
 */
var debug = require('debug')('glint:markdown');
var merge = require('utils-merge');
var innerText = require('inner-text-shim');
var brify = require('brify');
var marked = require('marked');

/**
 * Expose MDBlock element.
 */
exports = module.exports = MDBlock;

/**
 * Initialize a new `MDBlock` element.
 * @param {[type]} options [description]
 */

function MDBlock(options) {
  if (!(this instanceof MDBlock)) return new MDBlock(options);
  if (options && typeof options == 'object') marked.setOptions(options);
  merge(this, options);
}

/**
 * API functions.
 */
MDBlock.prototype.api = MDBlock.api = 'block-provider';

MDBlock.prototype.load = function (content) {
  this.el.removeAttribute('contenteditable');
  this.el.style.whiteSpace = '';
  if (!content) return;
  this.content = content;
  this.render();

  return this.content;
};

MDBlock.prototype.edit = function () {
  this.el.setAttribute('contenteditable', true);
  this.el.style.whiteSpace = 'pre-wrap';

  if (this.el.innerText) {
    this.el.innerText = this.content;
  } else {
    this.el.innerHTML = brify(this.content);
  }

  return this.content;
};

MDBlock.prototype.save = function () {
  this.content = this.getContent();
  this.el.removeAttribute('contenteditable');
  this.render();
  this.el.style.whiteSpace = '';
  return this.content;
};

/**
 * Base functions.
 */

MDBlock.prototype.getContent = function () {
  return innerText(this.el);
};

MDBlock.prototype.render = function () {
  this.el.innerHTML = marked(this.content);
};
