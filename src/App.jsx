import React from 'react'
import { languages } from './languages'

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

export default function AssemblyEndgame() {
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
    </main>
  )
}