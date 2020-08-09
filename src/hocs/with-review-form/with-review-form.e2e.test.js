import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withReviewsForm from './with-review-form.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withReviewsForm(MockComponent);

describe(`withReviewsForm_ee`, () => {
  it(`withReviewsForm_correct_init_state`, () => {
    const wrapper = shallow(<MockComponentWrapped />);

    expect(wrapper.props().review).toEqual(``);
    expect(wrapper.props().rating).toEqual(``);
    expect(wrapper.props().isDisabled).toEqual(false);
  });

  it(`withReviewsForm_correct_run_handleInputChange`, () => {
    const wrapper = shallow(<MockComponentWrapped />);
    const evt = {
      currentTarget: {
        name: `review`,
        value: `abcd`,
      },
    };
    wrapper.props().onInputChange(evt);
    expect(wrapper.props().review).toEqual(`abcd`);
  });

  it(`withReviewsForm_correct_run_handleSubmit`, () => {
    const wrapper = shallow(<MockComponentWrapped />);
    const sendReview = jest
      .fn()
      .mockImplementation(() => Promise.resolve(`value`));
    wrapper.props().onSubmit(1, sendReview);
    expect(wrapper.props().isDisabled).toEqual(true);
  });
});
