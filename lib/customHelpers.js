'use strict';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('withProp', function (obj, propName, options) {
    return options.fn(obj[propName]);
  });

  Handlebars.registerHelper('firstWithPropVal', function (ar, prop, val, options) {
    var i,
      len,
      data = Handlebars.createFrame(options.data || {});
    for (i = 0, len = ar.length; i < len; i++) {
      if (ar[i] && ar[i][prop] === val) {
        data.index = i;
        data.prev = ar[i-1];
        data.next = ar[i+1];
        return options.fn(ar[i], {data: data});
      }
    }
  });

  Handlebars.registerHelper('ifMod', function (num, mod, rem, options) {
    if (num % mod === rem) {
      return options.fn(this);
    }
  });


  Handlebars.registerHelper('render', function (str) {
    var fn = Handlebars.compile(str);
    return fn(this);
//    var fn,
//      template = Handlebars.partials[name];
//
//    if (typeof template !== 'Function') {
//      // not compiled, so we can compile it safely
//      fn = Handlebars.compile(template);
//    } else {
//
//      // already compiled, just reuse it
//      fn = template;
//    }
//
//    var output = fn(context).replace(/^\s+/, '');
//
//    return new Handlebars.SafeString(output);
  });
};