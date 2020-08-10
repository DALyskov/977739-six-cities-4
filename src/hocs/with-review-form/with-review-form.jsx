import React, {PureComponent} from 'react';

const ERR_MESSAGE_TIMEOUT = 5000;

const withReviewsForm = (Component) => {
  class WithReviewsForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        review: ``,
        rating: ``,
        isDisabled: false,
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(evt) {
      const {name, value} = evt.currentTarget;
      this.setState({[name]: value});
    }

    handleSubmit(activPlaceId, sendReview) {
      const {review, rating} = this.state;

      const reviewId = activPlaceId;

      this.setState({isDisabled: true});

      sendReview(reviewId, {comment: review, rating})
        .then(() => {
          this.setState({review: ``, rating: ``, isDisabled: false});
        })
        .catch((err) => {
          const userReview = review;
          // const errStatus = err.hasOwnPropert(`response`)
          //   ? err.response.status
          //   : ``;
          // ${errStatus}
          const errStatus = err.response ? err.response.data.error : ``;
          const errMessage = `${errStatus} ${err.message}`;
          this.setState({review: errMessage});

          setTimeout(() => {
            this.setState({review: userReview, isDisabled: false});
          }, ERR_MESSAGE_TIMEOUT);
        });
    }

    render() {
      const {review, rating, isDisabled} = this.state;

      return (
        <Component
          {...this.props}
          review={review}
          rating={rating}
          isDisabled={isDisabled}
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}></Component>
      );
    }
  }

  WithReviewsForm.propTypes = {};

  return WithReviewsForm;
};

export default withReviewsForm;
