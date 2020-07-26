import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {sotringItems} from '../../const.js';

// import {ActionCreator} from '../../reducer/reducer.js';
import {ActionCreator} from '../../reducer/data/data.js';
import {getCities, getActiveCity} from '../../reducer/data/selectors.js';
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
  cities: getCities(state),
  activeCity: getActiveCity(state),
});
const mapDispatchToProps = (dispatch) => ({
  onCityClick(CityName) {
    dispatch(ActionCreator.changeActiveCity(CityName));
    dispatch(AppActionCreator.changeSotringType(sotringItems[0]));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
