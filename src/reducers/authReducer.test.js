import React from 'react';
// setup file
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Reducer from './authReducer';
import * as actionTypes from '../actions/types';

configure({ adapter: new Adapter() });

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(Reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });

  it('store the token upon login', () => {
    expect(
      Reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'some-token',
          userId: 'some-userId',
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some-userId',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
