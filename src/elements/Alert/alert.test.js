import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Alert from './';

describe('<Alert /> Component', () => {
  it('renders without crashing', () => {
    shallow(<Alert />);
  });

  it('has a class name `cloudxui__alert`', () => {
    const wrapper = shallow(<Alert />);
    expect(wrapper.hasClass('cloudxui__alert')).to.equal(true);
  });
});
