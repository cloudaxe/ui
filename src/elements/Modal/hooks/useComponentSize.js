import React, { useCallback, useState, useLayoutEffect } from 'react';

var getSize = function getSize(el) {
  if (!el) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
};

var useComponentSize = function useComponentSize(ref) {
  var _useState = useState(getSize(ref ? ref.current : {})),
    ComponentSize = _useState[0],
    setComponentSize = _useState[1];

  var handleResize = useCallback(
    function handleResize() {
      if (ref.current) {
        setComponentSize(getSize(ref.current));
      }
    },
    [ref]
  );

  useLayoutEffect(
    function() {
      if (!ref.current) {
        return;
      }

      handleResize();

      if (typeof ResizeObserver === 'function') {
        var resizeObserver = new ResizeObserver(function() {
          return handleResize();
        });
        resizeObserver.observe(ref.current);

        return function() {
          resizeObserver.disconnect(ref.current);
          resizeObserver = null;
        };
      } else {
        window.addEventListener('resize', handleResize);

        return function() {
          window.removeEventListener('resize', handleResize);
        };
      }
    },
    [ref.current]
  );

  return ComponentSize;
};

export default useComponentSize;
