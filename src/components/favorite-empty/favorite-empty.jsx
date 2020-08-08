import React from 'react';
import {ErrReason} from '../../const';
import ErrMessage from '../err-message/err-message.jsx';

const FavoritesEmpty = (props) => {
  const {errReason} = props;
  return (
    <main className="page__main page__main--favorites page__main--favorites-empty">
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          {errReason === ErrReason.LOAD_FAVORITE_OFFERS && <ErrMessage />}
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">
              Save properties to narrow down search or plan yor future trips.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

FavoritesEmpty.propTypes = {};

export default FavoritesEmpty;
