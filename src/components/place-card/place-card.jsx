import React from 'react';
import propTypes from 'prop-types';

import {APPROVED_NAME} from '../../const.js';

const PlaceCard = (props) => {
  const {place: placeData, onPlaceCardNameClick, onPlaceCardHover} = props;
  const {
    id,
    isPremium = false,
    image,
    price,
    isBookmark = false,
    starsValue,
    name,
    type,
  } = placeData;

  let bookmarkClass = `place-card__bookmark-button button`;
  let bookmarkStatus = `To bookmarks`;

  if (isBookmark) {
    bookmarkClass += ` place-card__bookmark-button--active`;
    bookmarkStatus = `In bookmarks`;
  }

  const starsStyle = `${Math.round(starsValue) * 20}%`;

  const onMouseEnter = () => {
    onPlaceCardHover(placeData);
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={onMouseEnter}>
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : (
        ``
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={image}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkClass} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{bookmarkStatus}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: starsStyle}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={onPlaceCardNameClick}>
          <a href="#" data-id={id}>
            {name}
          </a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: propTypes.shape({
    id: propTypes.number.isRequired,
    isPremium: propTypes.bool,
    image: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    isBookmark: propTypes.bool,
    starsValue: propTypes.number.isRequired,
    name: propTypes.oneOf(APPROVED_NAME).isRequired,
    type: propTypes.string.isRequired,
  }).isRequired,
  onPlaceCardNameClick: propTypes.func.isRequired,
  onPlaceCardHover: propTypes.func.isRequired,
};

export default PlaceCard;
