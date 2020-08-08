import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {
  AuthorizationStatus,
  HeaderClassNames,
  // PageType,
  AppRoute,
  ErrReason,
} from '../../const.js';

import ErrMessage from '../err-message/err-message.jsx';
// import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getErrReason} from '../../reducer/data/selectors.js';
import {getActivePage} from '../../reducer/state-application/selectors.js';
import {
  getAuthorizationStatus,
  getUserEmail,
} from '../../reducer/user/selectors.js';

const Header = (props) => {
  const {
    authorizationStatus,
    userEmail,
    // activePage,
    className,
    // onLoginClick,
    // onLogoClick,
    // onMailClick,
    errReason,
  } = props;

  const isLoggedIn = authorizationStatus === AuthorizationStatus.AUTH;
  const isActiveLink = className === HeaderClassNames.MAIN;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {isActiveLink ? (
              <a
                className={className}

                // onClick={(evt) => {
                //   evt.preventDefault();
                //   onLogoClick();
                // }}
              >
                <img
                  className="header__logo"
                  src="/img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            ) : (
              <Link className={className} to={AppRoute.MAIN}>
                <img
                  className="header__logo"
                  src="/img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            )}
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={isLoggedIn ? AppRoute.FAVORITES : AppRoute.SING_IN}
                  // onClick={
                  //   isLoggedIn
                  //     ? () => {
                  //         onMailClick();
                  //       }
                  //     : () => {}
                  // }
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  {isLoggedIn ? (
                    <span className="header__user-name user__name">
                      {userEmail}
                    </span>
                  ) : (
                    <span className="header__login">Sign in</span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {errReason === ErrReason.SEND_FAVORITE_OFFER && <ErrMessage />}
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: propTypes.oneOf(Object.values(AuthorizationStatus))
    .isRequired,
  userEmail: propTypes.oneOfType([propTypes.string, propTypes.bool]).isRequired,
  // activePage: propTypes.oneOf(Object.values(PageType)).isRequired,
  // onLoginClick: propTypes.func.isRequired,
  // onLogoClick: propTypes.func.isRequired,
  className: propTypes.oneOf(Object.values(HeaderClassNames)).isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userEmail: getUserEmail(state),
  activePage: getActivePage(state),
  errReason: getErrReason(state),
});

const mapDispatchToProps = (dispatch) => ({
  // onLoginClick() {
  //   dispatch(AppActionCreator.changeActivePage(PageType.SING_IN));
  // },
  // onLogoClick() {
  //   dispatch(AppActionCreator.changeActivePage(PageType.MAIN));
  // },
  // onMailClick() {
  //   dispatch(DataOperation.loadFavoriteOffers());
  // },
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
