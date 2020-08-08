import React from 'react';
import {connect} from 'react-redux';
import {getErrMessage} from '../../reducer/data/selectors.js';

const ErrMessage = (props) => {
  const {errMessage} = props;
  console.log(errMessage);
  return (
    <div
      className="err-message"
      style={{margin: `10px auto`, color: `red`, textAlign: `center`}}>
      {errMessage}
    </div>
  );
};

// ErrMessage.propTypes = {};

const mapStateToProps = (state) => ({
  errMessage: getErrMessage(state),
});

export {ErrMessage};
export default connect(mapStateToProps)(ErrMessage);
