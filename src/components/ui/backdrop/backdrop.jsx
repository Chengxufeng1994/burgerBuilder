import React from 'react';
import styled from 'styled-components';

const StyledBackdrop = styled.div`
  height: 100%;
  width: 100%;
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Backdrop = (props) => {
  const { show, handleClosed } = props;

  return show ? (
    <StyledBackdrop onClick={handleClosed}></StyledBackdrop>
  ) : null;
};

export default Backdrop;
