import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import leaflet from 'leaflet';

import {APPROVED_NAME, MapClassName} from '../../const.js';

class CityMap extends PureComponent {
  constructor(props) {
    super(props);

    this._divRef = React.createRef();
    this._mapContainer = null;
    this._map = null;
    this._markersLayerGroup = null;
  }

  componentDidMount() {
    this._mapContainer = this._divRef.current;
    this._setMap();
    this._setMapView();
    this._setMapMarkers();
  }

  componentWillUnmount() {
    this._mapContainer.remove();
  }

  componentDidUpdate() {
    this._setMapView();
    this._markersLayerGroup.clearLayers();
    this._setMapMarkers();
    this._changeMarkerIcon();
  }

  _setMap() {
    this._map = leaflet.map(this._mapContainer, {
      zoomControl: false,
      marker: false,
    });

    leaflet
      .tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      )
      .addTo(this._map);

    this._markersLayerGroup = leaflet.layerGroup().addTo(this._map);
  }

  _setMapView() {
    const zoom = this.props.offersByCity[0].city.location.zoom;
    const cityCoordinate = [
      this.props.offersByCity[0].city.location.latitude,
      this.props.offersByCity[0].city.location.longitude,
    ];
    this._map.setView(cityCoordinate, zoom);
  }

  _setMapMarkers() {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40],
    });
    this.props.offersByCity.forEach((place) => {
      const marker = leaflet.marker(
        [place.location.latitude, place.location.longitude],
        {
          icon,
        }
      );
      marker.id = place.id;
      marker.addTo(this._markersLayerGroup);
    });
  }

  _changeMarkerIcon() {
    const {hoverCityId} = this.props;
    this._markersLayerGroup.getLayers().forEach((marker) => {
      if (marker.id === hoverCityId) {
        const newIcon = leaflet.icon({
          iconUrl: `img/pin-active.svg`,
          iconSize: [30, 40],
        });
        marker.setIcon(newIcon);
      }
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

  hoverCityId: propTypes.oneOfType([propTypes.bool, propTypes.number])
    .isRequired,
};

const mapStateToProps = (state) => ({
  hoverCityId: state.hoverCityId,
});

export {CityMap};
export default connect(mapStateToProps)(CityMap);
