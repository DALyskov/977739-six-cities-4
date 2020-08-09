import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {AuthorizationStatus, HeaderClassNames, ErrReason} from '../../const.js';
import NameSpace from '../../reducer/name-space.js';

import history from '../../history.js';
import {Header} from './header.jsx';

const mockStore = configureStore([]);

describe(`Header_snapchots`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      errMessage: `abcd`,
    },
    [NameSpace.STATE_APPLICATION]: {},
    [NameSpace.USER]: {},
  });
  it(`is_logged_in_for_main`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <Header
            authorizationStatus={AuthorizationStatus.AUTH}
            userEmail={`A@mail.com`}
            className={HeaderClassNames.MAIN}
            errReason={false}
          />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`is_not_logged_in_for_main`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <Header
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            userEmail={false}
            className={HeaderClassNames.MAIN}
            errReason={false}
          />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`is_logged_in_for_other_page`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <Header
            authorizationStatus={AuthorizationStatus.AUTH}
            userEmail={`A@mail.com`}
            className={HeaderClassNames.OTHER_PAGE}
            errReason={false}
          />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`is_not_logged_in_for_other_page`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <Header
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              userEmail={false}
              className={HeaderClassNames.OTHER_PAGE}
              errReason={ErrReason.SEND_FAVORITE_OFFER}
            />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
