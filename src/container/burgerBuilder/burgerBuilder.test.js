import React from 'react';
// setup file
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './burgerBuilder';
import BurgerControls from '../../components/burger/burgerControls/burgerControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
  });

  it('should render <BurgerControls /> when receving ingredients', () => {
    wrapper.setProps({
      ingredients: {
        salad: 0,
      },
    });
    expect(wrapper.find(BurgerControls)).toHaveLength(1);
  });
});
