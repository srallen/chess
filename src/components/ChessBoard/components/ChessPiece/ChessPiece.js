import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import './ChessPiece.css';

export default function ChessPiece({ boardCoordinates, piece }) {
  const pieceCoordinates = piece[1];
  const pieceType = piece[0];
  const shouldShow = isEqual(pieceCoordinates, boardCoordinates);

  if (shouldShow) {
    return (
      <div aria-label={pieceType} className="ChessPiece">
        {pieceType[0]}
      </div>
    );
  }

  return null;
}

ChessPiece.propTypes = {
  boardCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  piece: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.number)])).isRequired
};
