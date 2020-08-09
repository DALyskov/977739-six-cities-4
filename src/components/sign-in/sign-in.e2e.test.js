import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {AuthorizationStatus} from '../../const.js';
import {cities} from '../../mocks-test/cities.js';
import NameSpace from '../../reducer/name-space.js';

import history from '../../history.js';
import {SignIn} from './sign-in.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`SignIn_ee`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      errReason: false,
    },
    [NameSpace.STATE_APPLICATION]: {},
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userEmail: false,
    },
  });
  it(`SignIn_on_submit`, () => {
    const onSignInBtnClick = jest.fn();
    const preventSubmit = jest.fn();
    const signIn = mount(
      <Provider store={store}>
        <Router history={history}>
          <SignIn
            activeCity={cities[0]}
            errReason={false}
            onSignInBtnClick={onSignInBtnClick}
          />
        </Router>
      </Provider>
    );

    const form = signIn.find(`.login__form`);

    form.simulate(`submit`, {preventDefault: preventSubmit});

    expect(preventSubmit).toHaveBeenCalledTimes(1);
    expect(onSignInBtnClick).toHaveBeenCalledTimes(1);
  });
});
