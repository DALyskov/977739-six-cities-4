import React, {PureComponent} from 'react';
import propTypes from 'prop-types';

import Header from '../header/header.jsx';
import {HeaderClassNames} from '../../const.js';

export default class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._loginRef = React.createRef();
    this._passwordRef = React.createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    const {onSignInBtnClick} = this.props;
    evt.preventDefault();
    onSignInBtnClick({
      login: this._loginRef.current.value,
      password: this._passwordRef.current.value,
    });
  }

  render() {
    const {activeCity} = this.props;

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
                    required=""
                    ref={this._loginRef}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required=""
                    ref={this._passwordRef}
                  />
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit">
                  Sign in
                </button>
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
