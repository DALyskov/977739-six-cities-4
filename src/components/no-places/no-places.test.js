import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {ErrReason} from '../../const.js';

import NoPlaces from './no-places.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`NoPlaces_snapchots`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      errMessage: `Error`,
    },
    [NameSpace.STATE_APPLICATION]: {},
    [NameSpace.USER]: {},
  });
  it(`NoPlaces_with_Err`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NoPlaces errReason={ErrReason.LOAD_OFFERS} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it(`NoPlaces_without_Err`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <NoPlaces errReason={false} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
