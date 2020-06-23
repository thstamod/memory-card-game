import React, { useState, useEffect, useRef } from "react"
import Card from "./Card"

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
const Board = ({ size }) => {
    const [state, setState] = useState({})
    const [initialOpen, setInitialOpen] = useState(true)
    const [open, setOpen] = useState(null)
    // I could use usestate as well. I have used useRef for education purposes
    let pair = useRef(0)
    let [tries, setTries] = useState(0)
    let [remaining, setRemaining] = useState(Math.pow(size, 2) / 2)

    const getRandomNumber = (max) => {
        return Math.floor(Math.random() * max)
    }

    useEffect(() => {
        const max = Math.pow(size, 2)
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
        setState(s)

        setTimeout(() => {
            setInitialOpen(false)
        }, 5000)
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
        console.log(initialOpen)
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
                        key === open || pair.current === key || value.popen || initialOpen
                            ? true
                            : false
                    }
                />
            )
            index++
            if (index % size === 0) {
                last.push(
                    <div className="flexRow" key={index}>
                        {cards}
                    </div>
                )
                cards = []
            }
        }
        return last
    }
    return (
        <>
            <div className="container">{getCards(state)}</div>
            <div>Tries: {tries}</div>
            {!remaining && <div>End Game</div>}
        </>
    )
}

export default Board