import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authLogout } from '../../../actions';
import { useEffect } from 'react';

const Logout = (props) => {
  const { authLogout } = props;

  useEffect(() => {
    // console.log('[AuthLogout] Success!!!');
    authLogout();
  }, [authLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogout: () => dispatch(authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
