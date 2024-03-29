import React, { useReducer, Fragment } from 'react';

import usePortal from './hooks/usePortal';
import useRnd from './hooks/useRnd';
import useReactSpring from './hooks/useReactSpring';
import { CloseIcon } from './closeSvg';

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

var openModal = void 0,
  closeModal = void 0;

var initialData = {
  show: false,
  springState: false,
  component: null,
  closeOnClickOutside: true,
  closeComponent: null,
  componentProps: {},
  overlayClassName: '',
  withRnd: false,
  springStyle: '',
  config: {
    default: {
      width: 500,
      height: 300,
    },
    className: '',
    minWidth: 300,
    minHeight: 'auto',
    lockAspectRatio: true,
    disableDragging: true,
    bounds: '.modalParentWrapper',
    enableResizing: {
      bottom: false,
      bottomLeft: false,
      bottomRight: false,
      left: false,
      right: false,
      top: false,
      topLeft: false,
      topRight: false,
    },
  },
};

function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

var ModalReducer = function ModalReducer(state) {
  var action =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return _extends({}, state, {
    show: action.show !== undefined ? action.show : !state.show,
    springState:
      action.springState !== undefined
        ? action.springState
        : !state.springState,
    withRnd: action.withRnd !== undefined ? action.withRnd : state.withRnd,
    springStyle:
      action.springStyle !== undefined ? action.springStyle : state.springStyle,
    overlayClassName:
      action.overlayClassName !== undefined
        ? action.overlayClassName
        : state.overlayClassName,
    component: action.component !== undefined ? action.component : null,
    componentProps:
      action.componentProps !== undefined ? action.componentProps : {},
    closeComponent:
      action.closeComponent !== undefined ? action.closeComponent : null,
    closeOnClickOutside:
      action.closeOnClickOutside !== undefined
        ? action.closeOnClickOutside
        : state.closeOnClickOutside,
    config:
      action.config !== undefined
        ? _extends({}, state.config, action.config)
        : state.config,
  });
};

export function Modal(_ref) {
  var children = _ref.children;

  var Portal = usePortal();

  var _useReducer = useReducer(ModalReducer, initialData),
    state = _useReducer[0],
    dispatch = _useReducer[1];

  openModal = dispatch;
  closeModal = dispatch;

  var show = state.show,
    component = state.component,
    closeComponent = state.closeComponent,
    overlayClassName = state.overlayClassName,
    withRnd = state.withRnd,
    springStyle = state.springStyle,
    springState = state.springState;

  var Rnd = useRnd({
    dispatch: dispatch,
    closeOnClickOutside: state.closeOnClickOutside,
  });

  var ReactSpring = useReactSpring({
    dispatch: dispatch,
    closeOnClickOutside: state.closeOnClickOutside,
  });
  var ModalComponent = component;
  var defaultCloseComponent = function defaultCloseComponent() {
    return React.createElement(
      'button',
      {
        className: 'modalCloseBtn',
        onClick: function onClick() {
          return dispatch({});
        },
      },
      React.createElement(CloseIcon, null)
    );
  };
  var Close = closeComponent ? closeComponent : defaultCloseComponent;

  return React.createElement(
    Fragment,
    null,
    show &&
      React.createElement(
        Fragment,
        null,
        !canUseDOM
          ? React.createElement(
              Portal,
              null,
              React.createElement('div', {
                className: 'modalOverlay ' + overlayClassName,
              }),
              React.createElement(Close, null),
              React.createElement(
                'div',
                { className: 'modalParrentWrapper' },
                React.createElement(
                  Rnd,
                  { config: state.config },
                  React.createElement(ModalComponent, state.componentProps)
                )
              )
            )
          : withRnd
          ? React.createElement(
              Fragment,
              null,
              React.createElement('div', {
                className: 'modalOverlay ' + overlayClassName,
              }),
              React.createElement(Close, null),
              React.createElement(
                'div',
                { className: 'modalParentWrapper' },
                React.createElement(
                  Rnd,
                  { config: state.config },
                  React.createElement(ModalComponent, state.componentProps)
                )
              )
            )
          : React.createElement(
              Fragment,
              null,
              React.createElement('div', {
                className: 'modalOverlay ' + overlayClassName,
              }),
              React.createElement(Close, null),
              React.createElement(
                'div',
                { className: 'modalParentWrapper' },
                React.createElement(
                  ReactSpring,
                  {
                    configs: state.config,
                    springState: springState,
                    style: springStyle,
                  },
                  React.createElement(ModalComponent, state.componentProps)
                )
              )
            )
      ),
    children
  );
}

export { openModal, closeModal };
