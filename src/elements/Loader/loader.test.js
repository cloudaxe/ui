import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Loader from './';

describe('<Loader /> Component', () => {
  it('renders without crashing', () => {
    shallow(<Loader />);
  });

  it('has a class name `cloudxui__loader`', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.hasClass('cloudxui__loader')).to.equal(true);
  });
});
