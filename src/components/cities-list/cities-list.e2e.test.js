import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {cities} from '../../mocks/mocks-test.js';

import {CitiesList} from './cities-list.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`CitiesListElm_ee`, () => {
  it(`CitiesListElm_on_click`, () => {
    const onCityClick = jest.fn();
    const preventLinck = jest.fn();
    const citiesList = mount(
      <CitiesList
        cities={cities}
        activeCity={cities[0]}
        onCityClick={onCityClick}
      />
    );

    const citiesListElms = citiesList.find(`.locations__item-link`);

    citiesListElms.forEach((cityLinck) =>
      cityLinck.simulate(`click`, {
        preventDefault: preventLinck,
      })
    );

    expect(preventLinck).toHaveBeenCalledTimes(2);
    expect(onCityClick).toHaveBeenCalledTimes(2);
  });
});
