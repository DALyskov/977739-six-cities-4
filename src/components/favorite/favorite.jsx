import React, {PureComponent} from 'react';
// import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {HeaderClassNames, AppRoute} from '../../const.js';

import Header from '../header/header.jsx';
import FavoriteItem from '../favorite-item/favorite-item.jsx';
import FavoritesEmpty from '../favorite-empty/favorite-empty.jsx';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getErrReason} from '../../reducer/data/selectors.js';
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
    const {favoriteCities, errReason} = this.props;
    // const isOffers = offersByCity.length > 0;
    // const placesCount = offersByCity.length;
    // console.log(favoriteCities);
    console.log(favoriteCities);
    const isSavedOffer = favoriteCities.length > 0;

    return (
      <div className="page">
        <Header className={HeaderClassNames.OTHER_PAGE} />
        {isSavedOffer ? (
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {favoriteCities.map((favoriteCity) => (
                    <FavoriteItem
                      key={favoriteCity}
                      favoriteCity={favoriteCity}
                    />
                  ))}
                </ul>
              </section>
            </div>
          </main>
        ) : (
          <FavoritesEmpty errReason={errReason} />
        )}

        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.MAIN}>
            <img
              className="footer__logo"
              src="/img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"></img>
          </Link>
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
  errReason: getErrReason(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadAdditionalData() {
    dispatch(DataOperation.loadFavoriteOffers());
  },
});

export {Favorite};
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
