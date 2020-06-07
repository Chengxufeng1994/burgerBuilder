import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authLogout } from '../../../actions';

class Logout extends Component {
  componentDidMount() {
    const { authLogout } = this.props;
    authLogout();
    // console.log('[AuthLogout] Success!!!');
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authLogout: () => dispatch(authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
