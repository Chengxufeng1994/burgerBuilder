import React, { Component } from 'react';
import axios from '../../../api/axios';
import styled from 'styled-components';

import { Button } from '../../../components/ui/button/button';
import Spinner from '../../../components/ui/spinner/spinner';

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
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  handleOrder = (event) => {
    event.preventDefault();
    const { ingredients, price } = this.props;

    this.setState({ loading: true });
    const order = {
      ingredients: ingredients,
      price: price,
      customer: {
        name: 'Benny Cheng',
        address: {
          street: 'Testreet 1',
          zipcode: 236,
          country: 'Taipei',
        },
        email: 'Benny@gmail.com',
      },
      deliveryMethod: 'fastest',
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

  render() {
    const { loading } = this.state;
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Your Street" />
        <input type="text" name="postal" placeholder="Your PostalCode" />
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
