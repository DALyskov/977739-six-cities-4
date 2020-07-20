import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

import {sortingItems} from '../../const.js';

class PlacesSorting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this._onSortingClick = this._onSortingClick.bind(this);
  }

  _onSortingClick() {
    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
  }

  render() {
    const {sotringType, onSortingItemClick} = this.props;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          onClick={this._onSortingClick}
          className="places__sorting-type"
          tabIndex="0">
          {sotringType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={`places__options places__options--custom ${
            this.state.isOpen ? `places__options--opened` : ``
          }`}>
          {sortingItems.map((item) => (
            <li
              key={item}
              onClick={() => {
                onSortingItemClick(item);
                this._onSortingClick();
              }}
              className="places__option places__option--active"
              tabIndex="0">
              {item}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSortingItemClick(sotringType) {
    dispatch(ActionCreator.changeSotringType(sotringType));
  },
});

export {PlacesSorting};
export default connect(null, mapDispatchToProps)(PlacesSorting);
