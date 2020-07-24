import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

import {sotringItems} from '../../const.js';

import PlacesSorting from '../../components/places-sorting/places-sorting.jsx';

const withPlacesSorting = (Component) => {
  class withPlacesSorting extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
      };

      this._handleSortingClick = this._handleSortingClick.bind(this);
    }

    _handleSortingClick() {
      this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    }

    render() {
      // const {sotringType, onSortingItemClick} = this.props;
      const {isOpen} = this.state;

      return (
        <Component
          {...this.props}
          // sotringType={sotringType}
          isOpen={isOpen}
          // onSortingItemClick={onSortingItemClick}
          onSortingClick={this._handleSortingClick}></Component>
      );
    }
  }
  return withPlacesSorting;
};

withPlacesSorting.propTypes = {
  sotringType: propTypes.oneOf(sotringItems).isRequired,
  onSortingItemClick: propTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   sotringType: state.sotringType,
// });

// const mapDispatchToProps = (dispatch) => ({
//   onSortingItemClick(sotringType) {
//     dispatch(ActionCreator.changeSotringType(sotringType));
//   },
// });

export default withPlacesSorting;
// export default connect(mapStateToProps, mapDispatchToProps)(withPlacesSorting);
