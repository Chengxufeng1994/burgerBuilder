import React from 'react';
import Aux from '../aux/aux';
import Modal from '../../components/ui/modal/modal';
import HttpErrorHandler from '../../hooks/http-error-handler';

const WithErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, cleanError] = HttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} handleModalClosed={cleanError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default WithErrorHandler;