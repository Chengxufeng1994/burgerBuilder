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
    background-color: ${(props) => (props.inValid ? '#fda49a' : 'white')};
    box-sizing: border-box;
    border: ${(props) => (props.inValid ? '1px solid red' : '1px solid #ccc')};
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

  .error {
    color: red;
    margin: 5px 0;
  }
`;

const Input = React.memo((props) => {
  const {
    label,
    elementType,
    elementConfig,
    value,
    changed,
    inValid,
    shouldValidate,
    touched,
  } = props;

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

  let validationError = null;
  if (inValid && touched) {
    validationError = (
      <p className="error">Please enter a valid {elementType}!</p>
    );
  }

  return (
    <StyledInput inValid={inValid && shouldValidate && touched}>
      <label>{label}</label>
      {inputElement}
      {validationError}
    </StyledInput>
  );
});

export default Input;
