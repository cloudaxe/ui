import React from 'react';
var events = new Set();
var onResize = function onResize() {
  return events.forEach(function(fn) {
    return fn();
  });
};

var useWindowSize = function useWindowSize() {
  var options =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$throttleMs = options.throttleMs,
    throttleMs = _options$throttleMs === undefined ? 100 : _options$throttleMs;

  var _React$useState = React.useState({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
    size = _React$useState[0],
    setSize = _React$useState[1];

  var handle = throttle(function() {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, throttleMs);

  React.useEffect(function() {
    if (events.size === 0) {
      window.addEventListener('resize', onResize, true);
    }

    events.add(handle);

    return function() {
      events.delete(handle);

      if (events.size === 0) {
        window.removeEventListener('resize', onResize, true);
      }
    };
  }, []);

  return size;
};

export function throttle(func) {
  var threshhold =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var scope = arguments[2];

  var last = void 0,
    deferTimer = void 0;
  return function() {
    var context = scope || this;

    var now = Date.now(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        func.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      func.apply(context, args);
    }
  };
}
export default useWindowSize;
