import React from 'react';
import propTypes from 'prop-types';

import {MapClassName, PlacesClassNames, HeaderClassNames} from '../../const.js';

import Header from '../header/header.jsx';
import FavoriteItem from '../favorite-item/favorite-item.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import PlacesSorting from '../places-sorting/places-sorting.jsx';
import withPlacesSorting from '../../hocs/with-places-sorting/with-places-sorting.jsx';
import PlaceList from '../places-list/places-list.jsx';
import CityMap from '../city-map/city-map.jsx';
import NoPlaces from '../no-places/no-places.jsx';

// const PlacesSortingWrapped = withPlacesSorting(PlacesSorting);

const Favorite = (props) => {
  const {favoriteCities} = props;
  // const isOffers = offersByCity.length > 0;
  // const placesCount = offersByCity.length;

  return (
    <div className="page">
      <Header className={HeaderClassNames.OTHER_PAGE} />
      {/* <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"></img>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header> */}

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {/* {favoriteCities.map((favoriteCity) => (
                <FavoriteItem key={favoriteCity} favoriteCity={favoriteCity} />
              ))} */}
              {/* <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <article className="favorites__card place-card">
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img
                          className="place-card__image"
                          src="img/apartment-small-03.jpg"
                          width="150"
                          height="110"
                          alt="Place image"></img>
                      </a>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;180</b>
                          <span className="place-card__price-text">
                            &#47;&nbsp;night
                          </span>
                        </div>
                        <button
                          className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button">
                          <svg
                            className="place-card__bookmark-icon"
                            width="18"
                            height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style="width: 100%"></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Nice, cozy, warm big bed apartment</a>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>

                  <article className="favorites__card place-card">
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img
                          className="place-card__image"
                          src="img/room-small.jpg"
                          width="150"
                          height="110"
                          alt="Place image"></img>
                      </a>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;80</b>
                          <span className="place-card__price-text">
                            &#47;&nbsp;night
                          </span>
                        </div>
                        <button
                          className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button">
                          <svg
                            className="place-card__bookmark-icon"
                            width="18"
                            height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style="width: 80%"></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Wood and stone place</a>
                      </h2>
                      <p className="place-card__type">Private room</p>
                    </div>
                  </article>
                </div>
              </li> */}

              {/* <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <article className="favorites__card place-card">
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img
                          className="place-card__image"
                          src="img/apartment-small-04.jpg"
                          width="150"
                          height="110"
                          alt="Place image"></img>
                      </a>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;180</b>
                          <span className="place-card__price-text">
                            &#47;&nbsp;night
                          </span>
                        </div>
                        <button
                          className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button">
                          <svg
                            className="place-card__bookmark-icon"
                            width="18"
                            height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style="width: 100%"></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">White castle</a>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>
                </div>
              </li>
             */}
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

    // <div className="page page--gray page--main">
    //   <Header className={HeaderClassNames.MAIN} />
    //   <main
    //     className={`page__main page__main--index ${
    //       isOffers ? `` : `page__main--index-empty`
    //     }`}>
    //     <h1 className="visually-hidden">Cities</h1>
    //     <div className="tabs">
    //       <CitiesList />
    //     </div>
    //     {isOffers ? (
    //       <div className="cities">
    //         <div className="cities__places-container container">
    //           <section className="cities__places places">
    //             <h2 className="visually-hidden">Places</h2>
    //             <b className="places__found">
    //               {placesCount} places to stay in {activeCity}
    //             </b>
    //             <PlacesSortingWrapped />
    //             <PlaceList
    //               offersByCity={offersByCity}
    //               className={PlacesClassNames.MAIN}
    //             />
    //           </section>
    //           <div className="cities__right-section">
    //             <CityMap
    //               offersByCity={offersByCity}
    //               className={MapClassName.MAIN}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <NoPlaces />
    //     )}
    //   </main>
    // </div>
  );
};

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

export default Favorite;
