import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import Spinner from '../../components/ui/spinner/spinner.jsx';
import { auth, setAuthRedirectPath } from '../../actions';
import { updateObject, checkValidity } from '../../util/utility';
import { useEffect } from 'react';

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

const initalState = {
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
};

const Auth = (props) => {
  const [controls, setControls] = useState(initalState);
  const [isSignup, setIsSignup] = useState(true);
  const {
    buildingBurger,
    authRedirectPath,
    setAuthRedirectPath,
    loading,
    error,
    isAuthenticated,
  } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      setAuthRedirectPath();
    }
  });

  const handleChange = (event, controlName) => {
    const target = event.target;
    const value = target.value;
    const updateControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: value,
        valid: checkValidity(value, controls[controlName].validation),
        touch: true,
      }),
    });

    setControls(updateControls);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { auth } = props;
    const method = isSignup ? 'signUp' : 'signInWithPassword';

    auth(controls.email.value, controls.password.value, method);
  };

  const toggleAuthMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

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
      <form onSubmit={(event) => handleSubmit(event)}>
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
                changed={(event) => handleChange(event, formElement.id)}
              />
            );
          })
        )}
        <Button success type="submit">
          {isSignup ? 'SIGNUP' : 'SIGNIN'}
        </Button>
      </form>
      {
        <Button danger onClick={() => toggleAuthMode()}>
          SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      }
    </Styled>
  );
};

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
