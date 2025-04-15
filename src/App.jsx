import React from 'react'
import { languages } from './languages'

export default function AssemblyEndgame() {
  
  const [currentWord, setCurrentWord] = React.useState('elephant')

  const letterElements = currentWord.split('').map((letter, index) => <span key={index}>{letter.toUpperCase()}</span>)

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const keyboardElements = alphabet.split('').map(letter => <button key={letter}>{letter.toUpperCase()}</button>)

  const languageElements = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor, 
      color: lang.color}
    return (
      <p 
        className='lang'
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