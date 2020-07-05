import React from 'react';

import Main from '../main/main.jsx';

const onPlaceCardNameClick = (evt) => {
  evt.preventDefault();
};

const App = (props) => {
  return (
    <Main
      // eslint-disable-next-line react/prop-types
      placeData={props.placeData}
      onPlaceCardNameClick={onPlaceCardNameClick}
    />
  );
};

export default App;
