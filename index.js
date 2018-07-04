var checkOrigin = function(origin) {
  var allowedURLs = [
    'https://consent-form-www.devc.cloud.ogury.io',
    'https://consent-form-www.staging.cloud.ogury.io',
  ]
  return allowedURLs.reduce(function(acc, currentURL) {
    return acc || origin === currentURL
  }, false)
}

var checkData = function(data) {
  return data.consent !== undefined
}

var onMessageReceived = function(event) {
  if (!checkOrigin(event.origin) || !checkData(event.data)) {
    return
  }
  var consentResult = JSON.parse(decodeURI(event.data.consent))
  console.log('JSON CONSENT', consentResult)
}

var loadIFrame = function() {
  var iframe = document.createElement('iframe')
  iframe.setAttribute('src', 'https://consent-form-www.devc.cloud.ogury.io')
  iframe.setAttribute('class', 'cmjs-form')
  return iframe
}

var setMessageHandler = function(iframe) {
  iframe.onload = function() {
    window.addEventListener('message', onMessageReceived)
  }
  iframe.onbeforeunload = function() {
    window.removeEventListener('message', onMessageReceived)
  }
}

var ask = function() {
  var formIFrame = loadIFrame()
  setMessageHandler(formIFrame)
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
