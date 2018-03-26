import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ChessPiece from '../ChessPiece';

import './BoardSquare.css';

// Using radio input type for accessibility
export default function BoardSquare({ boardCoordinates, checked, disabled, invalid, label, onChange, onClick, piece }) {
  const className = classNames({
    'BoardSquare': true,
    'BoardSquare--checked': checked,
    'BoardSquare--invalid': invalid,
    'BoardSquare--valid': !invalid
  });

  return (
    <label
      aria-label={label}
      className={className}
    >
      <input
        checked={checked}
        className="BoardSquare__input"
        disabled={disabled}
        name="board-squares"
        onChange={onChange.bind(this, piece, boardCoordinates)}
        onClick={onClick.bind(this, piece)}
        type="radio"
      />
      {piece.length > 0 &&
        <ChessPiece
          boardCoordinates={boardCoordinates}
          piece={piece}
        />}
    </label>
  );
}

BoardSquare.defaultProps = {
  checked: false,
  disabled: false,
  invalid: false,
  onChange: () => {},
  onClick: () => {}
}

BoardSquare.propTypes = {
  boardCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  piece: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.number)]))
};
