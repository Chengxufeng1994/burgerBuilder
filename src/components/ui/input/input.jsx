import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: bold;
  }

  input,
  textarea,
  select {
    background-color: white;
    box-sizing: border-box;
    border: 1px solid #ccc;
    font: inherit;
    padding: 6px 10px;
    outline: none;
    width: 100%;
  }

  input:focus,
  textarea:focus,
  select:focus {
    background-color: #ccc;
    outline: none;
  }
`;

const Input = (props) => {
  const { label, elementType, elementConfig, value, changed } = props;

  let inputElement = null;

  switch (elementType) {
    case 'input':
      inputElement = (
        <input {...elementConfig} value={value} onChange={changed} />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea {...elementConfig} value={value} onChange={changed} />
      );
      break;
    case 'select':
      inputElement = (
        <select value={value} onChange={changed}>
          {elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input {...elementConfig} value={value} onChange={changed} />
      );
  }

  return (
    <StyledInput>
      <label>{label}</label>
      {inputElement}
    </StyledInput>
  );
};

export default Input;
