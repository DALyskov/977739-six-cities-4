import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import {cities} from '../../mocks/mocks-test.js';
import {sotringItems} from '../../const.js';
import {PlacesSorting} from './places-sorting.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`PlacesSorting_ee`, () => {
  it(`PlacesSortingItem_on_click`, () => {
    const onSortingItemClick = jest.fn();
    const placesSorting = mount(
      <PlacesSorting
        sotringType={sotringItems[0]}
        onSortingItemClick={onSortingItemClick}
      />
    );

    const placesSortingItem = placesSorting.find(`.places__option`);

    placesSortingItem.forEach((v) => {
      v.simulate(`click`, {});
    });

    expect(onSortingItemClick).toHaveBeenCalledTimes(sotringItems.length);
  });
});
