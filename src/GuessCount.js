import React from 'react'
import PropTypes from 'prop-types'

import './GuessCount.css';

const GuessCount = ({ guesses, status, onClick }) => <div className={`guesses ${status}`} onClick={() => onClick()}>Gagné en {guesses} coups</div>

GuessCount.propTypes = {
  guesses: PropTypes.number.isRequired,
  status: PropTypes.oneOf([
    'visible',
    'hidden'
  ]).isRequired,
}

export default GuessCount
