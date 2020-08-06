import React, {PureComponent} from 'react';
// import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {HeaderClassNames} from '../../const.js';

import Header from '../header/header.jsx';
import FavoriteItem from '../favorite-item/favorite-item.jsx';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getFavoriteCities} from '../../reducer/state-application/selectors.js';

// const PlacesSortingWrapped = withPlacesSorting(PlacesSorting);

class Favorite extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const {} = this.props;
    this.props.loadAdditionalData();
  }

  render() {
    // const Favorite = (props) => {
    const {favoriteCities} = this.props;
    // const isOffers = offersByCity.length > 0;
    // const placesCount = offersByCity.length;
    // console.log(favoriteCities);

    return (
      <div className="page">
        <Header className={HeaderClassNames.OTHER_PAGE} />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favoriteCities.map((favoriteCity) => (
                  // <div>{favoriteCity}</div>
                  <FavoriteItem
                    key={favoriteCity}
                    favoriteCity={favoriteCity}
                  />
                ))}
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"></img>
          </a>
        </footer>
      </div>
    );
  }
}

// Main.propTypes = {
//   offersByCity: propTypes.arrayOf(
//     propTypes.shape({
//       id: propTypes.number.isRequired,
//       isPremium: propTypes.bool,
//       images: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
//       price: propTypes.number.isRequired,
//       isBookmark: propTypes.bool,
//       rating: propTypes.number.isRequired,
//       name: propTypes.string.isRequired,
//       type: propTypes.string.isRequired,
//       city: propTypes.shape({
//         location: propTypes.shape({
//           latitude: propTypes.number.isRequired,
//           longitude: propTypes.number.isRequired,
//           zoom: propTypes.number.isRequired,
//         }),
//         name: propTypes.string.isRequired,
//       }),
//       location: propTypes.shape({
//         latitude: propTypes.number.isRequired,
//         longitude: propTypes.number.isRequired,
//         zoom: propTypes.number.isRequired,
//       }),
//     })
//   ).isRequired,

//   activeCity: propTypes.oneOfType([propTypes.string, propTypes.bool]),
// };

// export default Favorite;

const mapStateToProps = (state) => ({
  favoriteCities: getFavoriteCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadAdditionalData() {
    dispatch(DataOperation.loadFavoriteOffers());
  },
});

export {Favorite};
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
