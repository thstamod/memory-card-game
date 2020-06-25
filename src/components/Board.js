import React, { useState, useEffect, useRef } from "react"
import Card from "./Card"
import letters from "../letters"
import { getLetter, findEmptyPosition } from "../utils"

const Board = ({ size, availableMoves }) => {
  const [state, setState] = useState({})
  const [initialOpen, setInitialOpen] = useState(true)
  const [open, setOpen] = useState(null)
  let p2 = useRef(null)
  const lettersSet = useRef(new Set())
  let [tries, setTries] = useState(0)
  let [remaining, setRemaining] = useState(Math.pow(size, 2) / 2)

  useEffect(() => {
    const max = Math.pow(size, 2)
    const tmpArr = new Array(max).fill(null)
    const s = {}
    for (let i = 0; i < max / 2; i++) {
      const letter = getLetter(letters, lettersSet)
      const q = findEmptyPosition(tmpArr, max)
      tmpArr[q] = letter
      s[q] = { val: letter, popen: false }
      const p = findEmptyPosition(tmpArr, max)
      tmpArr[p] = letter
      s[p] = { val: letter, popen: false }
    }
    setState(s)

    setTimeout(() => {
      setInitialOpen(false)
    }, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectCard = (selectedCard) => {
    if (initialOpen) return

    if (availableMoves !== 0 && availableMoves < tries + remaining) return

    if (open && p2.current) return

    if (!open) {
      setOpen(selectedCard)
      return
    }
    if (open && !p2.current) {
      p2.current = selectedCard
      setTries(++tries)
    }
    if (state[open]?.val !== state[p2.current].val) {
      setTimeout(() => {
        p2.current = null
        setOpen(null)
      }, 2000)

      return
    }
    if (state[open]?.val === state[p2.current].val) {
      setState({
        ...state,
        [open]: { ...state[open], popen: true },
        [p2.current]: { ...state[p2.current], popen: true },
      })
      setOpen(null)
      p2.current = null
      setRemaining(--remaining)
    }
  }

  const getCards = (_cards) => {
    const last = []
    let cards = []
    let index = 0
    for (let [key, value] of Object.entries(_cards)) {
      cards.push(
        <Card
          handleClick={() => selectCard(key)}
          key={key}
          data={value}
          show={
            open === key || p2.current === key || value.popen || initialOpen
              ? true
              : false
          }
        />
      )
      index++
      if (size < 8 && index % size === 0) {
        last.push(
          <div className="flexRow" key={index}>
            {cards}
          </div>
        )
        cards = []
      }
    }
    return size < 8 ? last : cards
  }
  const container = "container " + (size < 8 ? "container--strict" : "")
  return (
    <>
      <div className={container}>{getCards(state)}</div>
      <div className="results">
        <span>You have tried {tries} times</span>
        {!remaining && <span className="win">Congratulations!! You Win!!</span>}
        <span className="lost">
          {availableMoves !== 0 && availableMoves < tries + remaining && (
            <div>Game Over...</div>
          )}
        </span>
      </div>
    </>
  )
}

export default Board
