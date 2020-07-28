import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {sortingItems} from '../../const.js';
import {PlacesSorting} from './places-sorting.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`PlacesSorting_ee`, () => {
  it(`PlacesSortingItem_on_click`, () => {
    const onSortingItemClick = jest.fn();
    const onSortingClick = jest.fn();
    const placesSorting = mount(
      <PlacesSorting
        sortingType={sortingItems[0]}
        isOpen={false}
        onSortingItemClick={onSortingItemClick}
        onSortingClick={onSortingClick}
      />
    );

    const placesSortingItem = placesSorting.find(`.places__option`);

    placesSortingItem.forEach((v) => {
      v.simulate(`click`, {});
    });

    expect(onSortingItemClick).toHaveBeenCalledTimes(sortingItems.length);
  });

  it(`PlacesSorting_on_click`, () => {
    const onSortingItemClick = jest.fn();
    const onSortingClick = jest.fn();
    const placesSorting = mount(
      <PlacesSorting
        sortingType={sortingItems[0]}
        isOpen={false}
        onSortingItemClick={onSortingItemClick}
        onSortingClick={onSortingClick}
      />
    );

    const placesSortingBtn = placesSorting.find(`.places__sorting-type`);

    placesSortingBtn.simulate(`click`, {});

    expect(onSortingClick).toHaveBeenCalledTimes(1);
  });
});
