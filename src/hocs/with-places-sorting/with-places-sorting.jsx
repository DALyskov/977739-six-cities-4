import React, {PureComponent} from 'react';

const withPlacesSorting = (Component) => {
  class WithPlacesSorting extends PureComponent {
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
      const {isOpen} = this.state;

      return (
        <Component
          {...this.props}
          isOpen={isOpen}
          onSortingClick={this._handleSortingClick}></Component>
      );
    }
  }

  WithPlacesSorting.propTypes = {};

  return WithPlacesSorting;
};

export default withPlacesSorting;
