import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {sotringItems} from '../../const.js';
import {
  offers,
  incompletePlace,
  cities as mockCities,
} from '../../mocks/mocks-test.js';

import Main from './main.jsx';

const mockStore = configureStore([]);
const incompleteOffers = [incompletePlace];

describe(`Main_snapchots`, () => {
  const store = mockStore({
    cities: mockCities,
    activeCity: mockCities[0],
    sotringType: sotringItems[0],
    hoverCityId: false,
  });
  it(`with_data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Main offersByCity={offers} activeCity={offers[0].city.name} />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          },
        }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it(`without_data`, () => {
  //   const tree = renderer
  //     .create(
  //       <Provider store={store}>
  //         <Main offersByCity={[]} activeCity={offers[0].city.name} />
  //       </Provider>,
  //       {
  //         createNodeMock: () => {
  //           return document.createElement(`div`);
  //         },
  //       }
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it(`incomplete_data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Main
            offersByCity={incompleteOffers}
            activeCity={offers[0].city.name}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          },
        }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
