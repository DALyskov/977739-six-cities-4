import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

class CitiesList extends PureComponent {
  render() {
    const {cities, activeCity, onCityClick} = this.props;

    return (
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${
                  city === activeCity ? `tabs__item--active` : ``
                }`}
                onClick={(evt) => {
                  evt.preventDefault();
                  onCityClick(city);
                }}
                href="#">
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
  cities: state.cities,
  activeCity: state.activeCity,
});
const mapDispatchToProps = (dispatch) => ({
  onCityClick(CityName) {
    dispatch(ActionCreator.changeActiveCity(CityName));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
