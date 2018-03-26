import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';
import sinon from 'sinon';
import ChessPiece from './ChessPiece';

const boardCoordinates = [1, 1];
const knightPieceMock = ['knight', [1, 1]];

describe('ChessPiece', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChessPiece boardCoordinates={boardCoordinates} piece={knightPieceMock} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render the html to be null if the pieceCoordinates do not equal the boardCoordinates', () => {
    const wrapper = shallow(<ChessPiece boardCoordinates={[1, 2]} piece={knightPieceMock} />);
    expect(wrapper.html()).toBeFalsy();
  });

  it('should render the piece if the pieceCoordinates equal the boardCoordinates', () => {
    const wrapper = shallow(<ChessPiece boardCoordinates={boardCoordinates} piece={knightPieceMock} />);
    expect(wrapper.find('div')).toBeTruthy();
  });

  it('should use the first element string of the piece array for the aria-label', () => {
    const wrapper = shallow(<ChessPiece boardCoordinates={boardCoordinates} piece={knightPieceMock} />);
    expect(wrapper.find('div').props()['aria-label']).toEqual(knightPieceMock[0]);
  });

  it('should use the first character of the first element string of the piece array for the piece representation', () => {
    const wrapper = shallow(<ChessPiece boardCoordinates={boardCoordinates} piece={knightPieceMock} />);
    expect(wrapper.find('div').text()).toEqual(knightPieceMock[0][0]);
  });
})