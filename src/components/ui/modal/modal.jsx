import React from 'react';
import styled from 'styled-components';

import Aux from '../../../hoc/aux';
import Backdrop from '../backdrop/backdrop';

const StyledModal = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;

  @media (min-width: 600px) {
    width: 500px;
    left: calc(50% - 250px);
  }
`;

const Modal = (props) => {
  const { show, handleModalClosed } = props;

  return (
    <Aux>
      <Backdrop show={show} handleModalClosed={handleModalClosed} />
      <StyledModal
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {props.children}
      </StyledModal>
    </Aux>
  );
};

export default Modal;
