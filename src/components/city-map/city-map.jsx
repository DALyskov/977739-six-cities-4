import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import leaflet from 'leaflet';

import {APPROVED_NAME, MapClassName} from '../../const.js';

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

  componentDidUpdate() {
    this._map.remove();
    this._getMap();
  }

  _getMap() {
    const {offersByCity} = this.props;
    const mapContainer = this._divRef.current;
    const zoom = offersByCity[0].city.location.zoom;

    const cityCoordinate = [
      offersByCity[0].city.location.latitude,
      offersByCity[0].city.location.longitude,
    ];

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40],
    });

    this._map = leaflet.map(mapContainer, {
      center: cityCoordinate,
      zoom,
      zoomControl: false,
      marker: false,
    });

    this._map.setView(cityCoordinate, zoom);

    leaflet
      .tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      )
      .addTo(this._map);

    offersByCity.forEach((place) => {
      leaflet
        .marker([place.location.latitude, place.location.longitude], {
          icon,
        })
        .addTo(this._map);
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
  offersByCity: propTypes.arrayOf(
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

  className: propTypes.oneOf(Object.values(MapClassName)).isRequired,
};
