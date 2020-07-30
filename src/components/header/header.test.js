import React from 'react';
import renderer from 'react-test-renderer';

import {AuthorizationStatus, PageType} from '../../const.js';

import {Header} from './header.jsx';

describe(`Header_snapchots`, () => {
  it(`is_logged_in_for_main`, () => {
    const tree = renderer
      .create(
        <Header
          authorizationStatus={AuthorizationStatus.AUTH}
          userEmail={`A@mail.com`}
          activePage={PageType.MAIN}
          onLoginClick={() => {}}
          onLogoClick={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`is_not_logged_in_for_main`, () => {
    const tree = renderer
      .create(
        <Header
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          userEmail={false}
          activePage={PageType.MAIN}
          onLoginClick={() => {}}
          onLogoClick={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`is_logged_in_for_other_page`, () => {
    const tree = renderer
      .create(
        <Header
          authorizationStatus={AuthorizationStatus.AUTH}
          userEmail={`A@mail.com`}
          activePage={PageType.PROPERTY}
          onLoginClick={() => {}}
          onLogoClick={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`is_not_logged_in_for_other_page`, () => {
    const tree = renderer
      .create(
        <Header
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          userEmail={false}
          activePage={PageType.PROPERTY}
          onLoginClick={() => {}}
          onLogoClick={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
