import React from 'react';
import propTypes from 'prop-types';

import {getStyleStars} from '../../utils/common.js';
import {
  formatCommentDateShort,
  formatCommentDateFull,
} from '../../utils/date.js';

const ReviewsItem = (props) => {
  const {reviewData} = props;
  const {comment, date, rating, userAvatar, userName} = reviewData;

  const starsStyle = getStyleStars(rating);

  const shortDate = formatCommentDateShort(date);
  const fullDate = formatCommentDateFull(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={userAvatar}
            width="54"
            height="54"
            alt="Reviews avatar"></img>
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: starsStyle}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={fullDate}>
          {shortDate}
        </time>
      </div>
    </li>
  );
};

ReviewsItem.propTypes = {
  reviewData: propTypes.shape({
    comment: propTypes.string.isRequired,
    date: propTypes.object.isRequired,
    id: propTypes.number.isRequired,
    rating: propTypes.number.isRequired,
    userAvatar: propTypes.string.isRequired,
    userName: propTypes.string.isRequired,
  }).isRequired,
};

export default ReviewsItem;
