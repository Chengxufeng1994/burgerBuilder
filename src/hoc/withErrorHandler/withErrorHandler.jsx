import React from 'react';
import Aux from '../aux/aux';
import Modal from '../../components/ui/modal/modal';
import { Component } from 'react';

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      console.log('Wiil Unmount', this.reqInterceptors, this.resInterceptors);
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    handleErrorConfirm = () => {
      this.setState({ error: null });
    };
    
    render() {
      const { error } = this.state;

      return (
        <Aux>
          <Modal show={error} handleModalClosed={this.handleErrorConfirm}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default WithErrorHandler;
