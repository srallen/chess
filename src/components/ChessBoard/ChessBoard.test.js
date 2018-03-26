import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ChessBoard from './ChessBoard';

describe('ChessBoard', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChessBoard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render 64 BoardSquare components', () => {
    const wrapper = shallow(<ChessBoard />);
    expect(wrapper.find('BoardSquare')).toHaveLength(64);
  });
});