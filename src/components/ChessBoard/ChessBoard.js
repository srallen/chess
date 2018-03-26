import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import BoardSquare from './components/BoardSquare';
import './ChessBoard.css';

class ChessBoard extends Component {
  determineWhichPiece(pieces, boardCoordinates) {
    let whichPiece = [];
    pieces.forEach((piece, index) => {
      const pieceCoordinates = piece[1];
      if (isEqual(pieceCoordinates, boardCoordinates)) {
        whichPiece = piece;
      }
    });

    return whichPiece;
  }

  render() {
    const { isMoveValid, onChange, onClick, pieces, selectedPiece } = this.props;
    const arrayOfEight = Array.from(Array(8));
    return (
      <div className="ChessBoard">
        {arrayOfEight.map((element, index) => {
          const yCoordinate = index + 1;
          return (
            <div key={yCoordinate} className="ChessBoard__row">
              {arrayOfEight.map((element, index) => {
                const xCoordinate = index + 1;
                const boardCoordinates = [xCoordinate, yCoordinate];
                const whichPiece = this.determineWhichPiece(pieces, boardCoordinates);
                const checked = isEqual(selectedPiece, whichPiece);
                const disabled = (whichPiece.length === 0 && selectedPiece === null) ||
                  (selectedPiece && !isMoveValid(boardCoordinates));
                
                return (
                  <BoardSquare
                    boardCoordinates={boardCoordinates}
                    checked={checked}
                    disabled={disabled}
                    invalid={(selectedPiece && !isMoveValid(boardCoordinates))}
                    key={boardCoordinates}
                    label={boardCoordinates.toString()}
                    onChange={onChange}
                    onClick={onClick}
                    piece={whichPiece}
                  />
                )
              })}
            </div>)}
        )}
      </div>
    );
  }
}

ChessBoard.propTypes = {
  isMoveValid: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  pieces: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.number)]))).isRequired,
  selectedPiece: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.number, PropTypes.number)]))
};

ChessBoard.defaultProps = {
  isMoveValid: () => {},
  onChange: () => {},
  onClick: () => {},
  pieces: [['bishop', [3, 1]], ['knight', [2, 1]]]
};

export default ChessBoard;

