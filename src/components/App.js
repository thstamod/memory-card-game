import React, { useState, useEffect, useRef } from "react"
import Card from "./Card"
import "../main.css"

const settings = {
  size: 4,
}
const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

//TODO: go with object
const App = () => {
  const [state, setState] = useState({})
  const [open, setOpen] = useState(null)
  // I could use usestate as well. I have used useRef for education purposes
  let pair = useRef(0)
  let [tries, setTries] = useState(0)
  let [remaining, setRemaining] = useState(Math.pow(settings.size, 2) / 2)

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max)
  }

  useEffect(() => {
    const max = Math.pow(settings.size, 2)
    const tmpArr = new Array(max).fill(null)
    const s = {}
    for (let i = 0; i < max / 2; i++) {
      const letter = getLetter(letters, 26)
      const q = findEmptyPosition(tmpArr, max)
      tmpArr[q] = letter
      s[q] = { val: letter, popen: false }
      const p = findEmptyPosition(tmpArr, max)
      tmpArr[p] = letter
      s[p] = { val: letter, popen: false }
    }
    console.log("s", s)
    setState(s)
  }, [])

  const findEmptyPosition = (tmpArr, max) => {
    let rn = getRandomNumber(max)
    if (tmpArr[rn] !== null) {
      rn = findEmptyPosition(tmpArr, max)
    }
    return rn
  }

  const selectCard = (selectedCard) => {
    // debugger
    if (open && pair.current) {
      return
    }
    if (!open) {
      setOpen(selectedCard)
      return
    }
    if (open && !pair.current) {
      pair.current = selectedCard
      setTries(++tries)
    }
    if (state[open]?.val !== state[selectedCard].val) {
      setTimeout(() => {
        pair.current = null
        setOpen(null)
      }, 2000)

      return
    }
    if (state[open]?.val === state[selectedCard].val) {
      setState({
        ...state,
        [open]: { ...state[open], popen: true },
        [selectedCard]: { ...state[selectedCard], popen: true },
      })
      setOpen(null)
      pair.current = null
      setRemaining(--remaining)
    }
  }

  const getLetter = (letters, max) => {
    const rn = getRandomNumber(max)
    let l = null
    if (letters[rn]) {
      l = letters[rn]
      letters[rn] = null
    } else {
      l = getLetter(letters, max)
    }
    return l
  }

  const getCards = (_cards) => {
    const cards = []
    for (let [key, value] of Object.entries(_cards)) {
      cards.push(
        <Card
          handleClick={() => selectCard(key)}
          key={key}
          data={value}
          show={key === open || pair.current === key ? true : false}
          basis={100 / settings.size}
        />
      )
    }
    return cards
  }
  return (
    <>
      <h2>Memory card game</h2>
      <div className="container">{getCards(state)}</div>
      <div>Tries: {tries}</div>
      {!remaining && <div>End Game</div>}
    </>
  )
}

export default App
