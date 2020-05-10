import React from 'react';
import styled from 'styled-components';

const Control = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;

  button {
    display: block;
    font: inherit;
    padding: 5px;
    margin: 0 5px;
    width: 80px;
    border: 1px solid #aa6817;
    cursor: pointer;
    outline: none;
  }

  button:disabled {
    background-color: #ac9980;
    border: 1px solid #7e7365;
    color: #ccc;
    cursor: default;
  }

  .label {
    padding: 10px;
    font-weight: bold;
    width: 80px;
  }

  .less {
    background-color: #d39952;
    color: white;
  }

  .less:hover,
  .less:active {
    background-color: #daa972;
    color: white;
  }

  .more {
    background-color: #8f5e1e;
    color: white;
  }

  .more:hover,
  .more:active {
    background-color: #99703f;
    color: white;
  }
`;

const BurgerControl = (props) => {
  const {
    label,
    type,
    disabledInfo,
    handleAddIngredient,
    handleRemoveIngredient,
  } = props;

  return (
    <Control>
      <div className="label">{label}</div>
      <button
        className="less"
        onClick={() => handleRemoveIngredient(type)}
        disabled={disabledInfo}
      >
        Less
      </button>
      <button className="more" onClick={() => handleAddIngredient(type)}>
        More
      </button>
    </Control>
  );
};

export default BurgerControl;
