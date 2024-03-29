import React, { useRef } from 'react';
import { Rnd } from 'react-rnd';
import useClickOutside from './useClickOutside';
import useWindowSize from './useWindowSize';

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

export default function useRnd() {
  var props =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var dispatch = props.dispatch,
    closeOnClickOutside = props.closeOnClickOutside;

  var size = process.browser && useWindowSize();
  return function RND(props) {
    var modalRef = useRef();
    useClickOutside({
      modalRef: modalRef,
      dispatch: dispatch,
      closeOnClickOutside: closeOnClickOutside,
    });
    var config = props.config;

    var rndConfig = _extends({}, config, {
      className: 'modalHolder ' + config.className,
      maxWidth: size.width - 40,
      maxHeight: size.height - 60,
      default: {
        width: config.default.width,
        height: config.default.height,
        x: config.default.x
          ? config.default.x
          : config.default.width <= size.width
          ? (size.width - config.default.width) / 2
          : 20,
        y: config.default.y
          ? config.default.y
          : config.default.height <= size.height
          ? (size.height - config.default.height) / 2
          : 30,
      },
    });

    return React.createElement(
      Rnd,
      _extends({}, rndConfig, { ref: modalRef }),
      React.createElement(
        'div',
        { className: 'innerRndComponent' },
        props.children
      )
    );
  };
}
