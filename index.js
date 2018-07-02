var ask = function() {
  var formIFrame = document.createElement('iframe')
  formIFrame.setAttribute(
    'src',
    'https://consent-form-www.devc.cloud.ogury.io/'
  )
  formIFrame.setAttribute('class', 'cmjs-form')
  document.body.appendChild(formIFrame)
}
;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.cmjs = factory()
  }
})(typeof self !== 'undefined' ? self : this, function() {
  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {
    ask,
  }
})
