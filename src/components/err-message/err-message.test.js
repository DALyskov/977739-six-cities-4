import React from 'react';
import renderer from 'react-test-renderer';

import {ErrMessage} from './err-message.jsx';

describe(`ErrMessage_snapchots`, () => {
  it(`ErrMessage_with_data`, () => {
    const tree = renderer.create(<ErrMessage errMessage={`abcd`} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
