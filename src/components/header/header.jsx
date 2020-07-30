import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {AuthorizationStatus, HeaderClassNames, PageType} from '../../const.js';

import {ActionCreator as AppActionCreator} from '../../reducer/state-application/state-application.js';
import {getActivePage} from '../../reducer/state-application/selectors.js';
import {
  getAuthorizationStatus,
  getUserEmail,
} from '../../reducer/user/selectors.js';

const Header = (props) => {
  const {
    authorizationStatus,
    userEmail,
    activePage,
    onLoginClick,
    onLogoClick,
  } = props;

  const isLoggedIn = authorizationStatus === AuthorizationStatus.AUTH;

  let isActiveLink = true;
  let className = HeaderClassNames.OTHER_PAGE;

  if (activePage === PageType.MAIN) {
    isActiveLink = false;
    className = HeaderClassNames.MAIN;
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {isActiveLink ? (
              <a
                className={className}
                href="main.html"
                onClick={(evt) => {
                  evt.preventDefault();
                  onLogoClick();
                }}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            ) : (
              <a className={className}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            )}
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a
                  className="header__nav-link header__nav-link--profile"
                  href="#"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onLoginClick();
                  }}>
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  {isLoggedIn ? (
                    <span className="header__user-name user__name">
                      {userEmail}
                    </span>
                  ) : (
                    <span className="header__login">Sign in</span>
                  )}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: propTypes.oneOf(Object.values(AuthorizationStatus))
    .isRequired,
  userEmail: propTypes.oneOfType([propTypes.string, propTypes.bool]).isRequired,
  activePage: propTypes.oneOf(Object.values(PageType)).isRequired,
  onLoginClick: propTypes.func.isRequired,
  onLogoClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userEmail: getUserEmail(state),
  activePage: getActivePage(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoginClick() {
    dispatch(AppActionCreator.changeActivePage(PageType.SING_IN));
  },
  onLogoClick() {
    dispatch(AppActionCreator.changeActivePage(PageType.MAIN));
  },
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
