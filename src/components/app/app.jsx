import React from 'react';

import Main from '../main/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  return <Main placeData={props.placeData} />;
};

export default App;
