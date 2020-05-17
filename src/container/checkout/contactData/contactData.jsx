import React, { Component } from 'react';
import axios from '../../../api/axios';
import styled from 'styled-components';

import { Button } from '../../../components/ui/button/button';
import Spinner from '../../../components/ui/spinner/spinner';
import Input from '../../../components/ui/input/input';

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

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          text: 'text',
          placeholder: 'Your Name',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          text: 'text',
          placeholder: 'Your Email',
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          text: 'text',
          placeholder: 'Street',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          text: 'text',
          placeholder: 'Country',
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          text: 'text',
          placeholder: 'ZIP CODE',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest',
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest',
            },
          ],
        },
        value: '',
      },
    },
    loading: false,
  };

  handleOrder = (event) => {
    event.preventDefault();
    const { ingredients, price } = this.props;
    const { orderForm } = this.state;
    const customer = {};

    Object.keys(orderForm).forEach((key) => {
      customer[key] = orderForm[key].value;
    });

    this.setState({ loading: true });
    const order = {
      ingredients: ingredients,
      price: price,
      customer: customer,
    };
    axios
      .post('/order.json', order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => this.setState({ loading: false }));
  };

  handleChange = (event, inputIdentifier) => {
    const target = event.target;
    const value = target.value;
    const { orderForm } = this.state;
    const updateOrderForm = { ...orderForm };
    const updateOrderFormElement = { ...updateOrderForm[inputIdentifier] };

    updateOrderFormElement.value = value;
    updateOrderForm[inputIdentifier] = updateOrderFormElement;
    this.setState({ orderForm: updateOrderForm });
  };

  render() {
    const { loading, orderForm } = this.state;

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
              changed={(event) => this.handleChange(event, formElement.id)}
            />
          );
        })}
        <Button success onClick={this.handleOrder}>
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
  }
}

export default ContactData;
