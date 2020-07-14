import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {offers as offersData} from '../../mocks/mocks-test.js';

import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const offers = offersData;

describe(`Main_ee`, () => {
  it(`Should placeCardName be pressed`, () => {
    // const onPlaceCardNameClick = jest.fn();
    // const preventDefault = jest.fn();
    const main = mount(
      <Main offers={offers} onPlaceCardNameClick={() => {}} />
    );

    expect(main);
  });
});
