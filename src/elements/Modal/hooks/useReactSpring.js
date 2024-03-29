import React, { useRef } from 'react';
import { Spring } from 'react-spring/renderprops.cjs.js';
import useClickOutside from './useClickOutside';
import useWindowSize from './useWindowSize';
import useComponentSize from './useComponentSize';

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

export default function useReactSpring() {
  var props =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var dispatch = props.dispatch,
    closeOnClickOutside = props.closeOnClickOutside;

  var size = process.browser && useWindowSize();
  return function RSpring(props) {
    var modalRef = useRef();

    var compSize = useComponentSize(modalRef);

    useClickOutside({
      modalRef: modalRef,
      dispatch: dispatch,
      closeOnClickOutside: closeOnClickOutside,
    });
    var configs = props.configs,
      springState = props.springState,
      style = props.style;

    var defaultFrom = {
      transform: 'scale(0.3)',
    };
    var defaultTo = {
      transform: 'scale(1)',
    };
    var springConfig = _extends({}, configs, {
      className: 'modalHolder ' + configs.className,
      maxHeight: size.height - 60,
      maxWidth: size.width - 40,
      width: configs.width ? configs.width : configs.default.width,
      height: configs.height ? configs.height : configs.default.height,
      x: configs.default.x
        ? configs.default.x
        : configs.x
        ? configs.x
        : (configs.width ? configs.width : configs.default.width) <= size.width
        ? (size.width -
            (configs.width ? configs.width : configs.default.width)) /
          2
        : compSize.width <= size.width
        ? (size.width - compSize.width) / 2
        : 20,
      y: configs.default.y
        ? configs.default.y
        : configs.y
        ? configs.y
        : (configs.height ? configs.height : configs.default.height) <=
          size.height
        ? (size.height -
            (configs.height ? configs.height : configs.default.height)) /
          2
        : compSize.height <= size.height
        ? (size.height - compSize.height) / 2
        : 30,
      animationFrom: configs.animationFrom
        ? configs.animationFrom
        : defaultFrom,
      animationTo: configs.animationTo ? configs.animationTo : defaultTo,
      transition: configs.transition
        ? configs.transition
        : {
            mass: 1,
            tension: 130,
            friction: 26,
          },
    });

    var springStyle = {
      maxWidth: springConfig.maxWidth,
      maxHeight: springConfig.maxHeight,
      width: springConfig.width,
      height: springConfig.height,
      position: 'absolute',
      left: springConfig.x,
      top: springConfig.y,
    };

    return React.createElement(
      Spring,
      {
        from: _extends({}, springConfig.animationFrom),
        to: _extends({}, springConfig.animationTo),
        config: springConfig.transition,
      },
      function(springProps) {
        return React.createElement(
          'div',
          {
            ref: modalRef,
            className: springConfig.className,
            style: _extends({}, springStyle, style, springProps),
          },
          React.createElement(
            'div',
            { className: 'innerRndComponent' },
            props.children
          )
        );
      }
    );
  };
}
