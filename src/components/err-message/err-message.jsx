import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {getErrMessage} from '../../reducer/data/selectors.js';

const ErrMessage = (props) => {
  const {errMessage} = props;
  return (
    <div
      className="err-message"
      style={{margin: `10px auto`, color: `red`, textAlign: `center`}}>
      {errMessage}
    </div>
  );
};

ErrMessage.propTypes = {
  errMessage: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  errMessage: getErrMessage(state),
});

export {ErrMessage};
export default connect(mapStateToProps)(ErrMessage);
