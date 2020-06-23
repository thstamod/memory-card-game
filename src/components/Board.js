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
const Board = ({ size, availableMoves }) => {
    const [state, setState] = useState({})
    const [initialOpen, setInitialOpen] = useState(true)
    const [open, setOpen] = useState(null)
    // I could use usestate as well. I have used useRef for education purposes
    //let p1 = useRef(null)
    let p2 = useRef(null)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const findEmptyPosition = (tmpArr, max) => {
        let rn = getRandomNumber(max)
        if (tmpArr[rn] !== null) {
            rn = findEmptyPosition(tmpArr, max)
        }
        return rn
    }

    const selectCard = (selectedCard) => {
        if (availableMoves <= tries) {
            return
        }
        if (open && p2.current) {
            return
        }
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
            <div className="results">
                <span>You have tried {tries} times</span>
                {!remaining && <span className="win">Congratulations!! You Win!!</span>}
                <span className="lost">
                    {!!remaining && availableMoves <= tries && <div>Game Over...</div>}
                </span>
            </div>
        </>
    )
}

export default Board