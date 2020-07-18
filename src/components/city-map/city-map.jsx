import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import leaflet from 'leaflet';

import {APPROVED_NAME, Coordinate, MapClassName} from '../../const.js';

export default class CityMap extends PureComponent {
  constructor(props) {
    super(props);

    this._divRef = React.createRef();
  }

  componentDidMount() {
    this._getMap();
  }

  componentWillUnmount() {
    const mapContainer = this._divRef.current;
    mapContainer.remove();
  }

  _getMap() {
    const {offers: offersAll, activeCity} = this.props;

    // const offers = offersAll.filter((place) => place.city.name === city);
    const offers = offersAll;

    const mapContainer = this._divRef.current;

    let cityCoordinate = [
      Coordinate[activeCity.toUpperCase()][0],
      Coordinate[activeCity.toUpperCase()][1],
    ];

    let zoom = 10;

    if (offers.length > 0) {
      cityCoordinate = [
        offers[0].city.location.latitude,
        offers[0].city.location.longitude,
      ];
      zoom = offers[0].city.location.zoom;
    }

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40],
    });

    const map = leaflet.map(mapContainer, {
      center: cityCoordinate,
      zoom,
      zoomControl: false,
      marker: false,
    });

    map.setView(cityCoordinate, zoom);

    leaflet
      .tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      )
      .addTo(map);

    offers.forEach((place) => {
      leaflet
        .marker([place.location.latitude, place.location.longitude], {
          icon,
        })
        .addTo(map);
    });
  }

  render() {
    const {className} = this.props;
    return (
      <section className={`${className} map`} ref={this._divRef}></section>
    );
  }
}

CityMap.propTypes = {
  offers: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      isPremium: propTypes.bool,
      images: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
      price: propTypes.number.isRequired,
      isBookmark: propTypes.bool,
      rating: propTypes.number.isRequired,
      name: propTypes.oneOf(APPROVED_NAME).isRequired,
      type: propTypes.string.isRequired,
      city: propTypes.shape({
        location: propTypes.shape({
          latitude: propTypes.number.isRequired,
          longitude: propTypes.number.isRequired,
          zoom: propTypes.number.isRequired,
        }),
        name: propTypes.string.isRequired,
      }),
      location: propTypes.shape({
        latitude: propTypes.number.isRequired,
        longitude: propTypes.number.isRequired,
        zoom: propTypes.number.isRequired,
      }),
    })
  ).isRequired,

  activeCity: propTypes.string.isRequired,

  className: propTypes.oneOf(Object.values(MapClassName)).isRequired,
};
