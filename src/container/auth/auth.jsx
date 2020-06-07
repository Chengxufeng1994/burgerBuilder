import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import Spinner from '../../components/ui/spinner/spinner.jsx';
import { auth, setAuthRedirectPath } from '../../actions';
import { updateObject, checkValidity } from '../../util/utility';

const Styled = styled.div`
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

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touch: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touch: false,
      },
    },
    // formIsValid: false,
    isSignUp: true,
  };

  componentDidMount() {
    const {
      buildingBurger,
      authRedirectPath,
      setAuthRedirectPath,
    } = this.props;

    if (!buildingBurger && authRedirectPath !== '/') {
      setAuthRedirectPath();
    }
  }

  handleChange = (event, controlName) => {
    const target = event.target;
    const value = target.value;
    const { controls } = this.state;
    // const updateOrderForm = { ...controls };
    // const updateOrderFormElement = { ...updateOrderForm[controlName] };
    // updateOrderFormElement.value = value;
    // updateOrderFormElement.valid = this.checkValidity(
    //   updateOrderFormElement.value,
    //   updateOrderFormElement.validation
    // );
    // updateOrderFormElement.touch = true;
    // updateOrderForm[controlName] = updateOrderFormElement;
    // const updateControls = {
    //   ...controls,
    //   [controlName]: {
    //     ...controls[controlName],
    //     value: value,
    //     valid: this.checkValidity(value, controls[controlName].validation),
    //     touch: true,
    //   },
    // };
    const updateControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: value,
        valid: checkValidity(value, controls[controlName].validation),
        touch: true,
      }),
    });

    // let formIsValid = true;

    // for (let controlName in updateControls) {
    //   formIsValid = updateControls[controlName].valid && formIsValid;
    // }

    this.setState({ controls: updateControls });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { controls, isSignUp } = this.state;
    const { auth } = this.props;
    const method = isSignUp ? 'signUp' : 'signInWithPassword';

    auth(controls.email.value, controls.password.value, method);
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

  toggleAuthMode = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const { controls, isSignUp } = this.state;
    const { loading, error, isAuthenticated, authRedirectPath } = this.props;

    let formElementArray = [];

    for (let key in controls) {
      formElementArray.push({
        id: key,
        config: controls[key],
      });
    }

    return (
      <Styled>
        {error ? <p>{error.message}</p> : null}
        {isAuthenticated ? <Redirect to={authRedirectPath} /> : null}
        <form onSubmit={(event) => this.handleSubmit(event)}>
          {loading ? (
            <Spinner />
          ) : (
            formElementArray.map((formElement) => {
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
                  changed={(event) => this.handleChange(event, formElement.id)}
                />
              );
            })
          )}
          <Button success type="submit">
            {isSignUp ? 'SIGNUP' : 'SIGNIN'}
          </Button>
        </form>
        {
          <Button danger onClick={() => this.toggleAuthMode()}>
            SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
          </Button>
        }
      </Styled>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, method) => dispatch(auth(email, password, method)),
    setAuthRedirectPath: () => dispatch(setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
