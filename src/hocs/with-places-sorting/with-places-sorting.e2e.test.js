import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withPlacesSorting from './with-places-sorting.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withPlacesSorting(MockComponent);

describe(`WithPlacesSorting_ee`, () => {
  it(`WithPlacesSorting_menu_correct_run`, () => {
    const wrapper = shallow(<MockComponentWrapped />);

    expect(wrapper.props().isOpen).toEqual(false);

    wrapper.props().onSortingClick();
    expect(wrapper.props().isOpen).toEqual(true);

    wrapper.props().onSortingClick();
    expect(wrapper.props().isOpen).toEqual(false);
  });
});
