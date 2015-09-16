/**
 * Module dependencies.
 */
var debug = require('debug')('glint-block-markdown');
var merge = require('utils-merge');
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
  merge(this, options);
}


/**
 * API functions.
 */
MDBlock.prototype.api = MDBlock.api = 'block-provider';

MDBlock.prototype.load = function (content) {
  return marked(content);
};

