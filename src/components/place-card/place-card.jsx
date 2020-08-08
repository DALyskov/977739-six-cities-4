import React from 'react';
import propTypes from 'prop-types';

import {PlacesClassNames, AppRoute} from '../../const.js';
import {getStyleStars} from '../../utils/common.js';
import {Link} from 'react-router-dom';

const ImgSize = {
  BIG: {
    WIDTH: 260,
    HEIGHT: 210,
  },
  SMALL: {
    WIDTH: 150,
    HEIGHT: 110,
  },
};

const BookmarkBtnType = {
  OUT_BOOKMARK: {
    CLASS: `place-card__bookmark-button button`,
    STATUS: `To bookmarks`,
  },
  IN_BOOKMARK: {
    CLASS: `place-card__bookmark-button button place-card__bookmark-button--active`,
    STATUS: `In bookmarks`,
  },
};

const PlaceCard = (props) => {
  const {
    placeData,
    className,
    onPlaceCardNameClick,
    onPlaceCardHover,
    onFavoriteBtnClick,
  } = props;
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
  const isFavorite = className === PlacesClassNames.FAVORITE[1];

  let bookmarkClass = BookmarkBtnType.OUT_BOOKMARK.CLASS;
  let bookmarkStatus = BookmarkBtnType.OUT_BOOKMARK.STATUS;
  let imgWidth = ImgSize.BIG.WIDTH;
  let imgHeght = ImgSize.BIG.HEIGHT;

  if (isBookmark) {
    bookmarkClass = BookmarkBtnType.IN_BOOKMARK.CLASS;
    bookmarkStatus = BookmarkBtnType.IN_BOOKMARK.STATUS;
  }
  if (isFavorite) {
    imgWidth = ImgSize.SMALL.WIDTH;
    imgHeght = ImgSize.SMALL.HEIGHT;
  }

  const starsStyle = getStyleStars(rating);

  const classNameImgWrapper = className.substring(0, className.indexOf(`__`));

  return (
    <article
      className={`${className} place-card`}
      onMouseEnter={() => {
        onPlaceCardHover(placeData.id);
      }}
      onMouseLeave={() => {
        onPlaceCardHover(false);
      }}>
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : (
        ``
      )}
      <div
        className={`${classNameImgWrapper}__image-wrapper place-card__image-wrapper`}>
        <a
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
          }}>
          <img
            className="place-card__image"
            src={image}
            width={imgWidth}
            height={imgHeght}
            alt="Place image"
          />
        </a>
      </div>
      <div
        className={`${
          isFavorite ? `favorites__card-info` : ``
        } place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={bookmarkClass}
            onClick={(evt) => {
              evt.preventDefault();
              onFavoriteBtnClick(id, isBookmark);
            }}
            type="button">
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
        <h2 className="place-card__name">
          <Link
            to={`${AppRoute.PROPERTY}/${id}`}
            data-id={id}
            onClick={() => {
              onPlaceCardNameClick(placeData);
            }}>
            {name}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  placeData: propTypes.shape({
    bedrooms: propTypes.number.isRequired,
    city: propTypes.shape({
      location: propTypes.shape({
        latitude: propTypes.number.isRequired,
        longitude: propTypes.number.isRequired,
        zoom: propTypes.number.isRequired,
      }).isRequired,
      name: propTypes.string.isRequired,
    }),
    description: propTypes.string.isRequired,
    features: propTypes.arrayOf(propTypes.string.isRequired),
    hostName: propTypes.string.isRequired,
    hostAvatar: propTypes.string.isRequired,
    isHostPro: propTypes.bool,
    hostId: propTypes.number.isRequired,
    id: propTypes.number.isRequired,
    images: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
    isBookmark: propTypes.bool,
    isPremium: propTypes.bool,
    location: propTypes.shape({
      latitude: propTypes.number.isRequired,
      longitude: propTypes.number.isRequired,
      zoom: propTypes.number.isRequired,
    }).isRequired,
    maxAdults: propTypes.number.isRequired,
    previewImg: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    rating: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
  }).isRequired,

  className: propTypes.oneOf(Object.values(PlacesClassNames).map((v) => v[1]))
    .isRequired,

  onPlaceCardNameClick: propTypes.func.isRequired,
  onPlaceCardHover: propTypes.func.isRequired,
  onFavoriteBtnClick: propTypes.func.isRequired,
};

export default PlaceCard;
