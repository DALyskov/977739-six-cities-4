import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {PageType, AuthorizationStatus} from '../../const.js';

import {Header} from './header.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Header_ee`, () => {
  it(`Header_onLogoClick`, () => {
    const onLogoClick = jest.fn();
    const preventLink = jest.fn();
    const header = mount(
      <Header
        authorizationStatus={AuthorizationStatus.AUTH}
        userEmail={`A@mail.com`}
        activePage={PageType.PROPERTY}
        onLoginClick={() => {}}
        onLogoClick={onLogoClick}
      />
    );

    const link = header.find(`.header__logo-link`);

    link.simulate(`click`, {preventDefault: preventLink});

    expect(preventLink).toHaveBeenCalledTimes(1);
    expect(onLogoClick).toHaveBeenCalledTimes(1);
  });

  it(`Header_onLoginClick`, () => {
    const onLoginClick = jest.fn();
    const preventLink = jest.fn();
    const header = mount(
      <Header
        authorizationStatus={AuthorizationStatus.AUTH}
        userEmail={`A@mail.com`}
        activePage={PageType.PROPERTY}
        onLoginClick={onLoginClick}
        onLogoClick={() => {}}
      />
    );

    const link = header.find(`.header__nav-link`);

    link.simulate(`click`, {preventDefault: preventLink});

    expect(preventLink).toHaveBeenCalledTimes(1);
    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });
});
