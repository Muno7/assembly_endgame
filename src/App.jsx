import React from 'react'
import { languages } from './languages'

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState('elephant')
  const [guessedLetters, setGuessedLetters] = React.useState([])

  let wrongGuessCount = 
  guessedLetters.filter(letter => !currentWord.includes(letter)).length

  function addGuessedLetter(guess) {
    if (!guessedLetters.includes(guess)) {
      setGuessedLetters(prevLetters => ([ 
        ...prevLetters, 
         guess]))
    }
  }
  
  const letterElements = currentWord.split('').map((letter, index) => <span key={index}>{guessedLetters.includes(letter) ? letter.toUpperCase() : ''}</span>)

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const keyboardElements = alphabet.split('').map((letter) => {
      let keyboardStyle = {}
      if (guessedLetters.includes(letter)) {
        keyboardStyle = currentWord.includes(letter) ? {backgroundColor: 'rgba(16, 169, 91, 1)'} : {backgroundColor: 'rgba(236, 93, 73, 1)'}
      }
    return <button key={letter} style={keyboardStyle} onClick={() => addGuessedLetter(letter)}>{letter.toUpperCase()}</button>
    })

  const languageElements = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor, 
      color: lang.color}
    const className = wrongGuessCount > 0 ? 'lang lost' : 'lang'
    wrongGuessCount -= 1
    return (
      <p 
        className={className}
        key={lang.name}
        style={styles}
      >
        {lang.name}
      </p>
    )
  })

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
        programming world safe from Assembly!</p>
        <div className='game-status'>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
          </div>
      </header>
      <section className='languages-container'>
        {languageElements}
      </section>
      <section className='word-container'>
        {letterElements}
      </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>
      <button className="new-game">New Game</button>
    </main>
  )
}