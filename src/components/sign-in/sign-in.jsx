import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {HeaderClassNames, ErrReason} from '../../const.js';

import Header from '../header/header.jsx';
import ErrMessage from '../err-message/err-message.jsx';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {getErrReason} from '../../reducer/data/selectors.js';
import {getActiveCity} from '../../reducer/state-application/selectors.js';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._loginRef = React.createRef();
    this._passwordRef = React.createRef();
    // this._login = ``;

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    const {onSignInBtnClick} = this.props;
    evt.preventDefault();
    onSignInBtnClick({
      login: this._loginRef.current.value,
      password: this._passwordRef.current.value,
    });
    // .catch((err) => {
    //   const userLogin = this._loginRef.current.value;
    //   const errMessage = `${err.response.status}. ${err.message}`;
    //   // this.setState({review: errMessage});
    //   this._login = errMessage;

    //   // setTimeout(() => {
    //   //   this.setState({review: userReview, isDisabled: false});
    //   // }, ERR_MESSAGE_TIMEOUT);

    //   throw err;
    // });
  }

  render() {
    const {activeCity, errReason} = this.props;

    return (
      <div className="page page--gray page--login">
        <Header className={HeaderClassNames.OTHER_PAGE} />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form
                className="login__form form"
                action="#"
                method="post"
                onSubmit={this._handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    ref={this._loginRef}
                    // value={this._login}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    ref={this._passwordRef}
                  />
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit">
                  Sign in
                </button>
                {errReason === ErrReason.LOGIN && <ErrMessage />}
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{activeCity}</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

SignIn.propTypes = {
  activeCity: propTypes.oneOfType([propTypes.string, propTypes.bool]),
  onSignInBtnClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  authorizationStatus: getAuthorizationStatus(state),
  errReason: getErrReason(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSignInBtnClick(authData) {
    return dispatch(UserOperation.login(authData));
  },
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
