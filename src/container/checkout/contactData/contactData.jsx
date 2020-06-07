import React, { useState } from 'react';
import { connect } from 'react-redux';

import axios from '../../../api/axios';
import styled from 'styled-components';
import { Button } from '../../../components/ui/button/button';
import Spinner from '../../../components/ui/spinner/spinner';
import Input from '../../../components/ui/input/input';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import { purchaseBurger } from '../../../actions';

import { updateObject, checkValidity } from '../../../util/utility';

const StyledContactData = styled.div`
  text-align: center;
  width: 80%;
  margin: 20px auto;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;

  input {
    display: block;
  }

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const ContactData = (props) => {
  const {
    ingredients,
    totalPrice,
    purchaseBurger,
    token,
    userId,
    loading,
  } = props;
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      value: 'fastest',
      validation: {},
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const handleOrder = (event) => {
    event.preventDefault();
    const customer = {};

    Object.keys(orderForm).forEach((key) => {
      customer[key] = orderForm[key].value;
    });
    // this.setState({ loading: true });
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      customer: customer,
      userId: userId,
    };

    purchaseBurger(order, token);
    // axios
    //   .post('/order.json', order)
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({ loading: false });
    //     this.props.history.push('/');
    //   })
    //   .catch((error) => this.setState({ loading: false }));
  };

  const handleChange = (event, inputIdentifier) => {
    const { target } = event;
    const value = target.value;
    const updateOrderFormElement = updateObject(orderForm[inputIdentifier], {
      value: value,
      valid: checkValidity(value, orderForm[inputIdentifier].validation),
      touch: true,
    });
    const updateOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updateOrderFormElement,
    });
    // const updateOrderForm = { ...orderForm };
    // const updateOrderFormElement = { ...updateOrderForm[inputIdentifier] };
    // updateOrderFormElement.value = value;
    // updateOrderFormElement.valid = this.checkValidity(
    //   updateOrderFormElement.value,
    //   updateOrderFormElement.validation
    // );
    // updateOrderFormElement.touch = true;
    // updateOrderForm[inputIdentifier] = updateOrderFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updateOrderForm);
    setFormIsValid(formIsValid);
  };

  // checkValidity(value, rules) {
  //   let isValid = true;
  //   if (!rules) {
  //     return true;
  //   }

  //   if (rules.required) {
  //     isValid = value.trim() !== '' && isValid;
  //   }

  //   if (rules.minLength) {
  //     isValid = value.length >= rules.minLength && isValid;
  //   }

  //   if (rules.maxLength) {
  //     isValid = value.length <= rules.maxLength && isValid;
  //   }

  //   if (rules.isEmail) {
  //     const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  //     isValid = pattern.test(value) && isValid;
  //   }

  //   if (rules.isNumeric) {
  //     const pattern = /^\d+$/;
  //     isValid = pattern.test(value) && isValid;
  //   }

  //   return isValid;
  // }

  let formElementArray = [];

  for (let key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form>
      {formElementArray.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            label={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inValid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touch}
            changed={(event) => handleChange(event, formElement.id)}
          />
        );
      })}
      <Button success onClick={handleOrder} disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  return (
    <StyledContactData>
      <h4>Enter Your Contact Data</h4>
      {form}
    </StyledContactData>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseBurger: (orderData, token) =>
      dispatch(purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, axios));
