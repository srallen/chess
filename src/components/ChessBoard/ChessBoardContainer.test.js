import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ChessBoardContainer from './ChessBoardContainer';

const bishopPieceMock = [
  'bishop',
  [3, 1]
];

const knightPieceMock = [
  'knight',
  [2, 1]
];

describe('ChesBoardContainer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChessBoardContainer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders a ChessBoard component', () => {
    const wrapper = shallow(<ChessBoardContainer />);
    expect(wrapper.find('ChessBoard')).toHaveLength(1);
  });

  describe('#clearSelectedPiece', () => {
    let setStateSpy;
    beforeAll(() => {
      setStateSpy = sinon.spy(ChessBoardContainer.prototype, 'setState');
    });

    afterAll(() => {
      setStateSpy.restore();
    });

    it('sets selectedPiece state to null', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock });
      wrapper.instance().clearSelectedPiece();
      expect(setStateSpy.called).toBeTruthy();
      expect(setStateSpy.calledWith({ selectedPiece: null })).toBeTruthy();
    });
  });

  describe('#isThereAlreadyAPiece', () => {
    let isThereAlreadyAPieceSpy;
    beforeAll(() => {
      isThereAlreadyAPieceSpy = sinon.spy(ChessBoardContainer.prototype, 'isThereAlreadyAPiece');
    });
    afterEach(() => { isThereAlreadyAPieceSpy.resetHistory(); })
    afterAll(() => { isThereAlreadyAPieceSpy.restore(); });

    it('should return false if the piece from the event and state.selectedPiece are equal', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock });
      wrapper.instance().isThereAlreadyAPiece(bishopPieceMock, [3, 3]);
      expect(isThereAlreadyAPieceSpy.calledOnce).toBeTruthy();
      expect(isThereAlreadyAPieceSpy.returnValues[0]).toBeFalsy();
    });

    it('should return false if the coordinates of the piece from the event is not in the array of already used coordinates', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock });
      wrapper.instance().isThereAlreadyAPiece(knightPieceMock, [1, 1]);
      expect(isThereAlreadyAPieceSpy.calledOnce).toBeTruthy();
      expect(isThereAlreadyAPieceSpy.returnValues[0]).toBeFalsy();
    });

    it('should return true if the coordinates of the piece from the event equals one of the coordinates already used', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock });
      wrapper.instance().isThereAlreadyAPiece(['knight', [2, 1]], [2, 1]);
      expect(isThereAlreadyAPieceSpy.calledOnce).toBeTruthy();
      expect(isThereAlreadyAPieceSpy.returnValues[0]).toBeTruthy();
    });
  });

  describe('#validateKnightMove', () => {
    let validateKnightMoveSpy;
    beforeAll(() => {
      validateKnightMoveSpy = sinon.spy(ChessBoardContainer.prototype, 'validateKnightMove');
    });
    afterEach(() => { validateKnightMoveSpy.resetHistory(); });
    afterAll(() => { validateKnightMoveSpy.restore(); });

    it('should return false if the absolute values in the resulting coordinates array does not equal a 1 and a 2', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.instance().validateKnightMove([2, 1], [5, 3]);
      expect(validateKnightMoveSpy.calledOnce).toBeTruthy();
      expect(validateKnightMoveSpy.returnValues[0]).toBeFalsy();
    });

    it('should return true if the absolute values in the resulting coordinates array does equal a 1 and a 2', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.instance().validateKnightMove([2, 1], [3, 3]);
      expect(validateKnightMoveSpy.calledOnce).toBeTruthy();
      expect(validateKnightMoveSpy.returnValues[0]).toBeTruthy();
    });
  });

  describe('#validateBishopMove', () => {
    let validateBishopMoveSpy;
    beforeAll(() => {
      validateBishopMoveSpy = sinon.spy(ChessBoardContainer.prototype, 'validateBishopMove');
    });
    afterEach(() => { validateBishopMoveSpy.resetHistory(); });
    afterAll(() => { validateBishopMoveSpy.restore(); });

    it('should return false if the absolute values of the coordinates diff do not equal each other', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.instance().validateBishopMove([2, 2], [5, 3]);
      expect(validateBishopMoveSpy.calledOnce).toBeTruthy();
      expect(validateBishopMoveSpy.returnValues[0]).toBeFalsy();
    });

    it('should return true if the absolute values of the coordinates diff equal each other', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.instance().validateBishopMove([2, 2], [3, 3]);
      expect(validateBishopMoveSpy.calledOnce).toBeTruthy();
      expect(validateBishopMoveSpy.returnValues[0]).toBeTruthy();
    });
  });

  describe('#isMoveValid', () => {
    let isMoveValidSpy;
    let validateKnightMoveSpy;
    let validateBishopMoveSpy;
    beforeAll(() => {
      isMoveValidSpy = sinon.spy(ChessBoardContainer.prototype, 'isMoveValid');
      validateKnightMoveSpy = sinon.spy(ChessBoardContainer.prototype, 'validateKnightMove');
      validateBishopMoveSpy = sinon.spy(ChessBoardContainer.prototype, 'validateBishopMove');
    });
    afterEach(() => {
      isMoveValidSpy.resetHistory();
      validateKnightMoveSpy.resetHistory();
      validateBishopMoveSpy.resetHistory();
    });
    afterAll(() => {
      isMoveValidSpy.restore();
      validateKnightMoveSpy.restore();
      validateBishopMoveSpy.restore();
    });

    it('should return false if there is no selected piece', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.instance().isMoveValid([3,3]);
      expect(isMoveValidSpy.calledOnce).toBeTruthy();
      expect(validateKnightMoveSpy.calledOnce).toBeFalsy();
      expect(validateBishopMoveSpy.calledOnce).toBeFalsy();
      expect(isMoveValidSpy.returnValues[0]).toBeFalsy();
    });

    it('should call #validateBishopMove if the selected piece is a bishop', function() {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock })
      wrapper.instance().isMoveValid([3, 3]);
      expect(isMoveValidSpy.calledOnce).toBeTruthy();
      expect(validateKnightMoveSpy.calledOnce).toBeFalsy();
      expect(validateBishopMoveSpy.calledOnce).toBeTruthy();
      expect(validateBishopMoveSpy.calledWith(bishopPieceMock[1], [3, 3])).toBeTruthy();
    });

    it('should call #validateKnightMove if the selected piece is a knight', function () {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: knightPieceMock })
      wrapper.instance().isMoveValid([3, 3]);
      expect(isMoveValidSpy.calledOnce).toBeTruthy();
      expect(validateBishopMoveSpy.calledOnce).toBeFalsy();
      expect(validateKnightMoveSpy.calledOnce).toBeTruthy();
      expect(validateKnightMoveSpy.calledWith(knightPieceMock[1], [3, 3])).toBeTruthy();
    });

    it('should return the value of the piece validation method', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock })
      wrapper.instance().isMoveValid([3, 3]);
      expect(isMoveValidSpy.calledOnce).toBeTruthy();
      expect(validateBishopMoveSpy.calledOnce).toBeTruthy();
      expect(validateBishopMoveSpy.returnValues[0]).toEqual(isMoveValidSpy.returnValues[0]);
    });
  });

  describe('#onClick', () => {
    let onClickSpy;
    let clearSelectedPieceSpy;
    beforeAll(() => {
      onClickSpy = sinon.spy(ChessBoardContainer.prototype, 'onClick');
      clearSelectedPieceSpy = sinon.spy(ChessBoardContainer.prototype, 'clearSelectedPiece');
    });
    afterEach(() => {
      onClickSpy.resetHistory();
      clearSelectedPieceSpy.resetHistory();
    });
    afterAll(() => {
      onClickSpy.restore();
      clearSelectedPieceSpy.restore();
    });

    it('should not call #clearSelectedPiece if the state.selectedPiece does not equal the event piece', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock })
      wrapper.instance().onClick(knightPieceMock)
      expect(onClickSpy.calledOnce).toBeTruthy();
      expect(clearSelectedPieceSpy.calledOnce).toBeFalsy();
    });

    it('should call #clearSelectedPiece if the state.selectedPiece equals the event piece', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock })
      wrapper.instance().onClick(bishopPieceMock)
      expect(onClickSpy.calledOnce).toBeTruthy();
      expect(clearSelectedPieceSpy.calledOnce).toBeTruthy();
    });
  });

  describe('#onChange', () => {
    let setStateSpy;
    let onChangeSpy;
    let isMoveValidSpy;
    let isThereAlreadyAPieceSpy;
    let alertSpy;
    beforeAll(() => {
      setStateSpy = sinon.spy(ChessBoardContainer.prototype, 'setState');
      onChangeSpy = sinon.spy(ChessBoardContainer.prototype, 'onChange');
      isMoveValidSpy = sinon.spy(ChessBoardContainer.prototype, 'isMoveValid');
      isThereAlreadyAPieceSpy = sinon.spy(ChessBoardContainer.prototype, 'isThereAlreadyAPiece');
      alertSpy = sinon.spy(ChessBoardContainer.prototype, 'alert');
    });
    afterEach(() => {
      setStateSpy.resetHistory();
      onChangeSpy.resetHistory();
      isMoveValidSpy.resetHistory();
      isThereAlreadyAPieceSpy.resetHistory();
      alertSpy.resetHistory();
    });
    afterAll(() => {
      setStateSpy.restore();
      onChangeSpy.restore();
      isMoveValidSpy.restore();
      isThereAlreadyAPieceSpy.restore();
      alertSpy.restore();
    });

    it('should call setState if state.selectedPiece is null', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.instance().onChange(bishopPieceMock, [3,2]);
      expect(setStateSpy.calledOnce).toBeTruthy();
      expect(setStateSpy.calledWith({ selectedPiece: bishopPieceMock })).toBeTruthy();
    });

    it('should call #isThereAlreadyAPiece if state.selectedPiece is not null', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock });
      wrapper.instance().onChange([], [3, 2]);
      expect(isThereAlreadyAPieceSpy.calledOnce).toBeTruthy();
    });

    it('should call #alert if #isThereAlreadyAPiece returns true', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock, knight: [2, 2] });
      wrapper.instance().onChange([], [2, 2]);
      expect(isThereAlreadyAPieceSpy.returnValues[0]).toBeTruthy();
      expect(alertSpy.calledOnce).toBeTruthy();
    });

    it('should call #isMoveValid if state.selectedPiece is not null', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.setState({ selectedPiece: bishopPieceMock });
      wrapper.instance().onChange([], [3, 2]);
      expect(isMoveValidSpy.calledOnce).toBeTruthy();
    });

    it('should call setState if move is valid', () => {
      const wrapper = shallow(<ChessBoardContainer />);
      wrapper.instance().onChange(bishopPieceMock, [3, 1]);
      wrapper.instance().onChange([], [4, 2]);
      expect(isMoveValidSpy.returnValues[0]).toBeTruthy();
      expect(setStateSpy.called).toBeTruthy();
      expect(setStateSpy.calledWith({ bishop: [4, 2], selectedPiece: null })).toBeTruthy();
    });
  });
});
