import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {AuthorizationStatus} from '../../const.js';
import NameSpace from '../../reducer/name-space.js';
import {reviews} from '../../mocks-test/reviews.js';

import {ReviewsList} from './reviews-list.jsx';

const mockStore = configureStore([]);

describe(`ReviewsList_snapchots`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {},
    [NameSpace.STATE_APPLICATION]: {
      activPlaceId: `1`,
    },
    [NameSpace.USER]: {},
  });

  it(`ReviewsList_with_data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ReviewsList
            reviews={reviews}
            authorizationStatus={AuthorizationStatus.AUTH}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`ReviewsList_without_data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ReviewsList
            reviews={[]}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
