import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {offers} from '../../mocks-test/offers.js';

import {ReviewsForm} from './review-form.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const newReviewMessage = `a`.repeat(100);

describe(`ReviewsForm_ee`, () => {
  it(`ReviewsForm_submitBtn_is_blocked`, () => {
    const onSubmit = jest.fn();
    const reviewsForm = mount(
      <ReviewsForm
        review={``}
        rating={``}
        isDisabled={true}
        onInputChange={() => {}}
        onSubmit={onSubmit}
        activPlaceCard={offers[0]}
        sendReview={() => {}}
      />
    );

    const submitBtn = reviewsForm.find(`.reviews__submit`);

    submitBtn.simulate(`click`, {});

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it(`ReviewsForm_on_rating_change`, () => {
    const onSubmit = jest.fn();
    const onInputChange = jest.fn();
    const reviewsForm = mount(
      <ReviewsForm
        review={``}
        rating={`1`}
        isDisabled={true}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        activPlaceCard={offers[0]}
        sendReview={() => {}}
      />
    );

    const submitBtn = reviewsForm.find(`.reviews__submit`);
    const ratingInput = reviewsForm.find(`.form__rating-input`).at(1);

    ratingInput.simulate(`change`, {});
    submitBtn.simulate(`click`, {});

    expect(onInputChange).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it(`ReviewsForm_on_message_change`, () => {
    const onSubmit = jest.fn();
    const onInputChange = jest.fn();
    const reviewsForm = mount(
      <ReviewsForm
        review={newReviewMessage}
        rating={``}
        isDisabled={true}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        activPlaceCard={offers[0]}
        sendReview={() => {}}
      />
    );

    const submitBtn = reviewsForm.find(`.reviews__submit`);
    const messageInput = reviewsForm.find(`.reviews__textarea`);

    messageInput.simulate(`change`, {});
    submitBtn.simulate(`click`, {});

    expect(onInputChange).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it(`ReviewsForm_on_submit`, () => {
    const onSubmit = jest.fn();
    const reviewsForm = mount(
      <ReviewsForm
        review={newReviewMessage}
        rating={`2`}
        isDisabled={true}
        onInputChange={() => {}}
        onSubmit={onSubmit}
        activPlaceCard={offers[0]}
        sendReview={() => {}}
      />
    );

    const submitBtn = reviewsForm.find(`.reviews__submit`);

    submitBtn.simulate(`click`, {});

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });
});
