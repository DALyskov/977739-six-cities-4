import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {getReviews} from '../../reducer/data/selectors.js';
import ReviewsItem from '../reviews-item/reviews-item.jsx';
import ReviewsForm from '../review-form/review-form.jsx';
import withReviewsForm from '../../hocs/with-review-form/with-review-form.jsx';
import ErrMessage from '../err-message/err-message.jsx';
import {getErrReason} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {AuthorizationStatus, ErrReason} from '../../const.js';

const ReviewsFormWrapped = withReviewsForm(ReviewsForm);

const MAX_REVIEW = 10;

const getSortedReviews = (reviews) => {
  const newReviews = reviews.slice();
  return newReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const ReviewsList = (props) => {
  const {reviews = [], errReason, authorizationStatus} = props;
  const sortedReviews = getSortedReviews(reviews).slice(0, MAX_REVIEW);
  const isLoggedIn = authorizationStatus === AuthorizationStatus.AUTH;
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {errReason === ErrReason.LOAD_REVIEWS && <ErrMessage />}
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <ReviewsItem key={review.id} reviewData={review} />
        ))}
      </ul>
      {isLoggedIn && <ReviewsFormWrapped />}
    </section>
  );
};

ReviewsList.propTypes = {
  reviews: propTypes.arrayOf(
    propTypes.shape({
      comment: propTypes.string.isRequired,
      date: propTypes.string.isRequired,
      id: propTypes.number.isRequired,
      rating: propTypes.number.isRequired,
      userAvatar: propTypes.string.isRequired,
      userId: propTypes.number.isRequired,
      isUserPro: propTypes.bool.isRequired,
      userName: propTypes.string.isRequired,
    })
  ),

  errReason: propTypes.oneOfType([
    propTypes.bool,
    propTypes.oneOf(Object.values(ErrReason)),
  ]),

  authorizationStatus: propTypes.oneOf(Object.values(AuthorizationStatus))
    .isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  authorizationStatus: getAuthorizationStatus(state),
  errReason: getErrReason(state),
});

export {ReviewsList};
export default connect(mapStateToProps)(ReviewsList);
