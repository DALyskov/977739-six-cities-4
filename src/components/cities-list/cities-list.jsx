import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreater} from '../../reducer.js';

// import {APPROVED_NAME, PlacesClassNames} from '../../const.js';

// import PlaceCard from '../place-card/place-card.jsx';

class CitiesList extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activCity: 0,
  //   };
  // }
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

// PlaceList.propTypes = {
//   offers: propTypes.arrayOf(
//     propTypes.shape({
//       id: propTypes.number.isRequired,
//       isPremium: propTypes.bool,
//       images: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
//       price: propTypes.number.isRequired,
//       isBookmark: propTypes.bool,
//       rating: propTypes.number.isRequired,
//       name: propTypes.oneOf(APPROVED_NAME).isRequired,
//       type: propTypes.string.isRequired,
//     })
//   ).isRequired,

//   className: propTypes.oneOf(Object.values(PlacesClassNames)).isRequired,

//   onPlaceCardNameClick: propTypes.func.isRequired,
// };

const mapStateToProps = (state) => ({
  cities: state.cities,
  activeCity: state.activeCity,
});
const mapDispatchToProps = (dispatch) => ({
  onCityClick(CityName) {
    dispatch(ActionCreater.changeActiveCity(CityName));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
