import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';
import sinon from 'sinon';
import BoardSquare from './BoardSquare';

const boardCoordinates = [1, 1];
const knightPieceMock = ['knight', [1, 1]];

describe('BoardSquare', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BoardSquare boardCoordinates={boardCoordinates} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should not render a ChessPiece if there is no piece', () => {
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} />);
    expect(wrapper.find('ChessPiece')).toHaveLength(0);
  });

  it('should render a ChessPiece if there is a piece', () => {
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} piece={knightPieceMock} />);
    expect(wrapper.find('ChessPiece')).toHaveLength(1);
  });

  it('should use the props.label for the aria-label on the label element', () => {
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} label={boardCoordinates.toString()} />);
    expect(wrapper.find('label').props()['aria-label']).toEqual(boardCoordinates.toString()); 
  });

  it('should disable the input if props.disabled is true', () => {
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} disabled={true} />);
    expect(wrapper.find('input').props().disabled).toBeTruthy();
  });

  it('should check the input if props.checked is true', () => {
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} checked={true} />);
    expect(wrapper.find('input').props().checked).toBeTruthy();
  });

  it('should use the class "BoardSquare--checked" if props.checked is true', () => {
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} checked={true} />);
    expect(wrapper.find('label').props().className.includes('BoardSquare--checked')).toBeTruthy();
  });

  it('should not use the class "BoardSquare--checked" if props.checked is true', () => {
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} checked={false} />);
    expect(wrapper.find('label').props().className.includes('BoardSquare--checked')).toBeFalsy();
  });

  it('should use the class "BoardSquare--invalid" props.invalid is true', () => {
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} invalid={true} />);
    expect(wrapper.find('label').props().className.includes('BoardSquare--invalid')).toBeTruthy();
    expect(wrapper.find('label').props().className.includes('BoardSquare--valid')).toBeFalsy();
  });

  it('should use the class "BoardSquare--valid" props.invalid is false', () => {
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} invalid={false} />);
    expect(wrapper.find('label').props().className.includes('BoardSquare--invalid')).toBeFalsy();
    expect(wrapper.find('label').props().className.includes('BoardSquare--valid')).toBeTruthy();
  });

  it('should call props.onChange for the onChange event', () => {
    const onChangeSpy = sinon.spy();
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} onChange={onChangeSpy} />);
    wrapper.find('input').simulate('change');
    expect(onChangeSpy.calledOnce).toBeTruthy();
    expect(onChangeSpy.calledWith([], boardCoordinates)).toBeTruthy();
  });

  it('should call props.onClick for the onClick event', () => {
    const onClickSpy = sinon.spy();
    const wrapper = shallow(<BoardSquare boardCoordinates={boardCoordinates} onClick={onClickSpy} />);
    wrapper.find('input').simulate('click');
    expect(onClickSpy.calledOnce).toBeTruthy();
    expect(onClickSpy.calledWith([])).toBeTruthy();
  });
});