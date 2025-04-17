import React from 'react'
import { languages } from './utils/languages'
import { getFarewellText } from './utils/farewellmessage'
import { getRandomWord } from './utils/getRandomWord'
import Confetti from 'react-confetti'

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = React.useState([])
  const gameStatusElement = React.useRef(null)

  let wrongGuessCount = 
  guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount === languages.length - 1
  const isGameOver = isGameLost || isGameWon
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  function addGuessedLetter(guess) {
    if (!guessedLetters.includes(guess)) {
      setGuessedLetters(prevLetters => ([ 
        ...prevLetters, 
         guess]))
    }
  }
  
  const letterElements = currentWord.split('').map((letter, index) => {
    const isLetterGuessed = guessedLetters.includes(letter)
    const letterStyle = isLetterGuessed ? {color: 'white'} : {color:'rgb(186, 42, 42)'}
    let renderLetter = letter.toUpperCase()
    if (!isGameLost) {
      renderLetter = isLetterGuessed ? letter.toUpperCase() : ''
    }
    return (
      <span style={letterStyle} key={index}>
        {renderLetter}
      </span>
    )
  })

  const alphabet = "qwertyuiopasdfghjklzxcvbnm"
  const keyboardElements = alphabet.split('').map((letter) => {
      let keyboardStyle = {}
      if (guessedLetters.includes(letter)) {
        keyboardStyle = currentWord.includes(letter) ? {backgroundColor: 'rgba(16, 169, 91, 1)'} : {backgroundColor: 'rgba(236, 93, 73, 1)'}
      }
    return <button disabled={isGameOver} key={letter} style={keyboardStyle} onClick={() => addGuessedLetter(letter)}>{letter.toUpperCase()}</button>
    })

  const languageElements = languages.map((lang, index)=> {
    const styles = {
      backgroundColor: lang.backgroundColor, 
      color: lang.color}
    const className = wrongGuessCount >= index + 1 ? 'lang lost' : 'lang'
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

  function renderGameStatus() {
    let gameStatus
    if (isGameWon) {
      gameStatus = 
      <>
        <h2>You Win!</h2>
        <p>Well done! 🎉</p>
      </>
      gameStatusElement.current.className = 'game-status won'

    } else if (isGameLost) {
        gameStatus = 
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      gameStatusElement.current.className = 'game-status lost'

    } else if (wrongGuessCount > 0) {
      if (isLastGuessIncorrect) {
        const message = getFarewellText(languages[wrongGuessCount - 1].name)
        gameStatus = <h2>{message}</h2>
        gameStatusElement.current.className = 'game-status on'

      } else {
        gameStatusElement.current.className = 'game-status'  
      }
    }

    return gameStatus
  }

  function resetGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
    gameStatusElement.current.className = 'game-status'
  }
  return (
    <main>
      {isGameWon ? <Confetti recycle={false} numberOfPieces={1000} /> : undefined}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
        programming world safe from Assembly!</p>
        <div ref={gameStatusElement} className='game-status'>
          {renderGameStatus()}
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
      {isGameOver && <button onClick={resetGame} className="new-game">New Game</button>}
    </main>
  )
}