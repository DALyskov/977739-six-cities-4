import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {ErrReason} from '../../const.js';

import FavoritesEmpty from './favorite-empty.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`FavoritesEmpty_snapchots`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      errMessage: `abcd`,
    },
    [NameSpace.STATE_APPLICATION]: {},
    [NameSpace.USER]: {},
  });
  it(`FavoritesEmpty_without_err`, () => {
    const tree = renderer.create(<FavoritesEmpty errReason={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it(`FavoritesEmpty_with_err`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <FavoritesEmpty errReason={ErrReason.LOAD_FAVORITE_OFFERS} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
