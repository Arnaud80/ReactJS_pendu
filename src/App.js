import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import GuessCount from './GuessCount'
import PropTypes from 'prop-types'

import './App.css'
import './Clavier.css'

const WORDS = ['SALUT', 'ANGES', 'ALBUM', 'BONJOUR', 'HELLO  WORLD']
const LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' ']

const Word = ({ word }) => (
  <div className="word">
    <h2>{word}</h2>
  </div>
)

Word.propTypes = {
  word: PropTypes.string.isRequired
}

const Letter = ({ letter, status, onClick }) => (
    <div className={`letter ${status}`} onClick={() => onClick(letter)}>
        {letter}
    </div>
)

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    'enable',
    'disabled',
    'hidden'
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
}

class App extends Component {
    state = {
        letters: LETTERS,
        letters_tryed: [' '],
        word: this.generateWord(),
        finded_word: '',
        guesses: 0
    }

    generateWord() {
        return shuffle(WORDS)[0]
    }

    // Arrow fx for binding
    handleLetterClick = letter => {
        const { letters_tryed, guesses, word } = this.state
        
        letters_tryed.push(letter)
        var finded_word=word.replace(/\w/g, (letter) => (letters_tryed.includes(letter) ? letter : '_ '))
        
        this.setState({ letters_tryed: letters_tryed, finded_word: finded_word, guesses: guesses+1})
    }

    // Arrow fx for binding
    handleGuessClick = () => {
        this.setState({ word: this.generateWord(), guesses: 0, finded_word: '', letters_tryed: [' ']})
    }

    getLetterSatus(letter) {
        const { word, letters_tryed, finded_word } = this.state
        var result='enable'
        

        letters_tryed.forEach(element => {
            if(element===letter) {
                result='disabled'
            }
        });

        if(word===finded_word) {
            result='hidden'
        }

        return(result)
    }

    getGuessesStatus() {
        const { word, finded_word } = this.state
        var result =''
        
        if(word===finded_word) {
            result='visible'
        } else 
        {
            result='hidden'
        }

        return(result)
    }

    displayWord() {
        const { word, letters_tryed } = this.state

        return(word.replace(/\w/g, (letter) => (letters_tryed.includes(letter) ? letter : '_ ')))
    }

    render() {
        const { letters, guesses } = this.state
        return (
            <div className='pendu'>
                <Word 
                    word={this.displayWord()}
                />
                
                <div className='clavier'>
                {letters.map((letter, index) => (
                    <Letter
                        letter={letter}
                        key={index}
                        status={this.getLetterSatus(letter)}
                        onClick={this.handleLetterClick}
                    />
                ))}
                </div>
                
                <GuessCount
                    guesses={guesses}
                    status={this.getGuessesStatus()}
                    onClick={this.handleGuessClick}
                />
            </div>
        )
    }
}

export default App