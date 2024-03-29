import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function useClickOutside(_ref) {
  var modalRef = _ref.modalRef,
    dispatch = _ref.dispatch,
    closeOnClickOutside = _ref.closeOnClickOutside;

  var handleClickOutside = function handleClickOutside(event) {
    var area = ReactDOM.findDOMNode(modalRef.current);
    if (area && !area.contains(event.target)) {
      if (closeOnClickOutside) dispatch({});
    }
  };

  useEffect(function() {
    document.addEventListener('mousedown', handleClickOutside);
    return function() {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
}
