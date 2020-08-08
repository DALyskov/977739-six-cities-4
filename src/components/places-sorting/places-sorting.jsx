import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator as AppActionCreator} from '../../reducer/state-application/state-application.js';

import {SORTING_ITEMS} from '../../const.js';

import {getSortingType} from '../../reducer/state-application/selectors.js';

const PlacesSorting = (props) => {
  const {sortingType, isOpen, onSortingItemClick, onSortingClick} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={onSortingClick}
        className="places__sorting-type"
        tabIndex="0">
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? `places__options--opened` : ``
        }`}>
        {SORTING_ITEMS.map((item) => (
          <li
            key={item}
            onClick={() => {
              onSortingItemClick(item);
              onSortingClick();
            }}
            className={`places__option ${
              item === sortingType ? `places__option--active` : ``
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
  sortingType: propTypes.oneOf(SORTING_ITEMS).isRequired,
  isOpen: propTypes.bool.isRequired,
  onSortingItemClick: propTypes.func.isRequired,
  onSortingClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sortingType: getSortingType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortingItemClick(sortingType) {
    dispatch(AppActionCreator.changesortingType(sortingType));
  },
});

export {PlacesSorting};
export default connect(mapStateToProps, mapDispatchToProps)(PlacesSorting);
