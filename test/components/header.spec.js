/* eslint-disable no-unused-vars, no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import * as _ from 'lodash';

import Header from '../../client/components/Header';


describe('<Header />', () => {
  it('renders a header with id "header"', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.prop('id')).to.equal('header');
    expect(wrapper.type()).to.equal('header');
  });

  it('renders the app\'s name', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.contains('Aracari')).to.equal(true);
  });
});
