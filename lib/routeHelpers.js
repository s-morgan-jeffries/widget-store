'use strict';

var _ = require('lodash');

module.exports.register = function (Handlebars, opts, params) {

  var namedPage = function (pageName) {
    // Get the named routes from Assemble's data
    var namedRoutes = params.assemble.options.data.namedRoutes || {},
      namedPages = namedRoutes.pages || {};

    // Get the associated URL. If pageName isn't in the namedRoutes hash, return an empty string
    return namedPages[pageName] || '';
  };

  Handlebars.registerHelper('namedPage', namedPage);

  Handlebars.registerHelper('link', function (pageName, options) {
    // Get the named route. If pageName isn't in the namedRoutes hash, treat it as a literal URL
    var url = namedPage(pageName) || pageName,
      // String representing the href value
      hrefStr = ' href = "' + url + '"',
      // String representing the target value
      targetStr = '',
      // String to hold the whole opening tag
      openingTag,
      // And the closing tag
      closingTag = '</a>';

    if (options.hash && options.hash.newWindow) {
      targetStr = ' target=_blank';
    }
    openingTag = '<a' + hrefStr + targetStr + '>';
    return openingTag + options.fn(this) + closingTag;
  });
};