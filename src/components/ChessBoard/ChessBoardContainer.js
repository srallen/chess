import React, { Component } from 'react';
import isEqual from 'lodash.isequal';

import ChessBoard from './ChessBoard.js';

const PIECE_TYPES = {
  bishop: 'bishop',
  knight: 'knight'
};

class ChessBoardContainer extends Component {
  constructor() {
    super();

    this.state = {
      bishop: [3, 1],
      knight: [2, 1],
      selectedPiece: null
    }
  }

  alert(message) {
    window.alert(message);
  }

  clearSelectedPiece() {
    this.setState({ selectedPiece: null });
  }

  isThereAlreadyAPiece(piece, boardCoordinates) {
    const currentlyUsedCoordinates = [Object.values(this.state.bishop), Object.values(this.state.knight)];
    if (!isEqual(piece, this.state.selectedPiece)) {
      return currentlyUsedCoordinates.some((usedCoordinates) => {
        return isEqual(usedCoordinates, boardCoordinates);
      });
    }

    return false;
  }

  validateKnightMove(selectedPieceCoordinates, boardCoordinates) {
    const xCoordinateDiff = Math.abs(selectedPieceCoordinates[0] - boardCoordinates[0]);
    const yCoordinateDiff = Math.abs(selectedPieceCoordinates[1] - boardCoordinates[1]);
    const resultCoordinates = [xCoordinateDiff, yCoordinateDiff];

    return resultCoordinates.includes(1) && resultCoordinates.includes(2);
  }

  validateBishopMove(selectedPieceCoordinates, boardCoordinates) {
    const xCoordinateDiff = Math.abs(selectedPieceCoordinates[0] - boardCoordinates[0]);
    const yCoordinateDiff = Math.abs(selectedPieceCoordinates[1] - boardCoordinates[1]);

    return xCoordinateDiff === yCoordinateDiff;
  }

  isMoveValid(boardCoordinates) {
    let isValid = false;
    if (this.state.selectedPiece) {
      const selectedPieceType = this.state.selectedPiece[0];
      const selectedPieceCoordinates = this.state.selectedPiece[1]
      if (selectedPieceType === PIECE_TYPES.knight) {
        isValid = this.validateKnightMove(selectedPieceCoordinates, boardCoordinates);
      }

      if (selectedPieceType === PIECE_TYPES.bishop) {
        isValid = this.validateBishopMove(selectedPieceCoordinates, boardCoordinates);
      }
    }

    return isValid;
  }


  onClick(piece, event) {
    if (isEqual(piece, this.state.selectedPiece)) {
      this.clearSelectedPiece();
    }
  }

  onChange(piece, boardCoordinates, event) {
    if (this.state.selectedPiece !== null) {
      if (this.isThereAlreadyAPiece(piece, boardCoordinates)) return this.alert('This square already contains a piece!');

      if (this.isMoveValid(boardCoordinates)) {
        this.setState({
          [this.state.selectedPiece[0]]: boardCoordinates,
          selectedPiece: null
        });
      }
    }

    if (this.state.selectedPiece === null) {
      this.setState({ selectedPiece: piece });
    }
  }

  render() {
    return (
      <ChessBoard
        isMoveValid={this.isMoveValid.bind(this)}
        onChange={this.onChange.bind(this)}
        onClick={this.onClick.bind(this)}
        pieces={Object.entries({ bishop: this.state.bishop, knight: this.state.knight })}
        selectedPiece={this.state.selectedPiece}
      />
    );
  }
}

export default ChessBoardContainer;