import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getActivPlaceId} from '../../reducer/state-application/selectors.js';

const RATING_NAMES = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

const Review = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 300,
};

const ReviewsForm = (props) => {
  const {
    review,
    rating,
    isDisabled,
    activPlaceId,
    onInputChange,
    onSubmit,
    sendReview,
  } = props;

  const isSubmitDisabled = !(
    rating &&
    review.length >= Review.MIN_LENGTH &&
    review.length <= Review.MAX_LENGTH
  );

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        onSubmit(activPlaceId, sendReview);
      }}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_NAMES.map((name, i) => {
          const ratingValue = RATING_NAMES.length - i;
          return (
            <React.Fragment key={name}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={ratingValue}
                id={`${ratingValue}-stars`}
                type="radio"
                checked={rating === String(ratingValue)}
                disabled={isDisabled}
                onChange={onInputChange}
              />
              <label
                htmlFor={`${ratingValue}-stars`}
                className="reviews__rating-label form__rating-label"
                title={name}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        disabled={isDisabled}
        onChange={onInputChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewsForm.propTypes = {
  review: propTypes.string.isRequired,
  rating: propTypes.string.isRequired,
  isDisabled: propTypes.bool.isRequired,
  activPlaceId: propTypes.string.isRequired,
  onInputChange: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  sendReview: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activPlaceId: getActivPlaceId(state),
});
const mapDispatchToProps = (dispatch) => ({
  sendReview(reviewId, reviewData) {
    return dispatch(DataOperation.sendReview(reviewId, reviewData));
  },
});

export {ReviewsForm};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsForm);
