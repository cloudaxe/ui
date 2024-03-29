import React, { useState, useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';

export default function usePortal() {
  var props =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _useState = useState(null),
    container = _useState[0],
    setContainer = _useState[1];

  var id = props.id;

  useEffect(function() {
    if (!process.browser) return null;
    var divId = window.document.getElementById(id || '__next'); //id = '__next' for next js
    if (!divId) divId = document.body;
    if (!divId) return null;
    var container = window.document.createElement('div');
    divId.appendChild(container);
    setContainer(container);
    return function() {
      divId.removeChild(container);
    };
  }, []);

  return function Portal(props) {
    return container
      ? ReactDOM.createPortal(props.children, container)
      : React.createElement(Fragment, null, props.children);
  };
}
