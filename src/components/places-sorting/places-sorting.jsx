import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

import {sotringItems} from '../../const.js';

const PlacesSorting = (props) => {
  const {sotringType, isOpen, onSortingItemClick, onSortingClick} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={onSortingClick}
        className="places__sorting-type"
        tabIndex="0">
        {sotringType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? `places__options--opened` : ``
        }`}>
        {sotringItems.map((item) => (
          <li
            key={item}
            onClick={() => {
              onSortingItemClick(item);
              onSortingClick();
            }}
            className={`places__option ${
              item === sotringType ? `places__option--active` : ``
            }`}
            tabIndex="0">
            {item}
          </li>
        ))}
      </ul>
    </form>
  );
};

PlacesSorting.propTypes = {
  sotringType: propTypes.oneOf(sotringItems).isRequired,
  onSortingItemClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sotringType: state.sotringType,
});

const mapDispatchToProps = (dispatch) => ({
  onSortingItemClick(sotringType) {
    dispatch(ActionCreator.changeSotringType(sotringType));
  },
});

export {PlacesSorting};
export default connect(mapStateToProps, mapDispatchToProps)(PlacesSorting);
