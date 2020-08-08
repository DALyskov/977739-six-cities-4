import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {SORTING_ITEMS} from '../../const.js';

import {
  getCities,
  getActiveCity,
} from '../../reducer/state-application/selectors.js';
import {ActionCreator as AppActionCreator} from '../../reducer/state-application/state-application.js';

class CitiesList extends PureComponent {
  render() {
    const {cities, activeCity, onCityClick} = this.props;

    return (
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city} className="locations__item">
              <a
                href="#"
                className={`locations__item-link tabs__item ${
                  city === activeCity ? `tabs__item--active` : ``
                }`}
                onClick={(evt) => {
                  evt.preventDefault();
                  onCityClick(city);
                }}>
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

CitiesList.propTypes = {
  cities: propTypes.arrayOf(propTypes.string).isRequired,

  activeCity: propTypes.oneOfType([propTypes.string, propTypes.bool]),

  onCityClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: getCities(state),
  activeCity: getActiveCity(state),
});
const mapDispatchToProps = (dispatch) => ({
  onCityClick(CityName) {
    dispatch(AppActionCreator.changeActiveCity(CityName));
    dispatch(AppActionCreator.changesortingType(SORTING_ITEMS[0]));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
