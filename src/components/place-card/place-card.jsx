import React from 'react';
import propTypes from 'prop-types';

import {APPROVED_NAME} from '../../const.js';

const PlaceCard = (props) => {
  const {placeData, onPlaceCardNameClick, onPlaceCardHover} = props;
  const {
    id,
    isPremium = false,
    images,
    price,
    isBookmark = false,
    rating,
    name,
    type,
  } = placeData;

  const image = images[0];

  let bookmarkClass = `place-card__bookmark-button button`;
  let bookmarkStatus = `To bookmarks`;

  if (isBookmark) {
    bookmarkClass += ` place-card__bookmark-button--active`;
    bookmarkStatus = `In bookmarks`;
  }

  const starsStyle = `${Math.round(rating) * 20}%`;

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={() => {
        onPlaceCardHover(placeData);
      }}>
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
        <h2
          className="place-card__name"
          onClick={(evt) => {
            evt.preventDefault();
            onPlaceCardNameClick(placeData);
          }}>
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
  placeData: propTypes.shape({
    id: propTypes.number.isRequired,
    isPremium: propTypes.bool,
    images: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
    price: propTypes.number.isRequired,
    isBookmark: propTypes.bool,
    rating: propTypes.number.isRequired,
    name: propTypes.oneOf(APPROVED_NAME).isRequired,
    type: propTypes.string.isRequired,
  }).isRequired,
  onPlaceCardNameClick: propTypes.func.isRequired,
  onPlaceCardHover: propTypes.func.isRequired,
};

export default PlaceCard;
