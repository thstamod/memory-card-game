import React, { useState } from "react"

const SettingsForm = ({ retrieve }) => {
  const [size, setSize] = useState({ dirty: false, value: "" })
  const [availableMoves, setAvailableMoves] = useState({
    dirty: false,
    value: "",
  })
  const validateSize = () => {
    if (size.value === "") {
      return "cant be empty"
    }
    if (size.value === 0) {
      return "please insert a number bigger than zero"
    }
    if (size.value < 2) {
      return (
        <>
          It's too small. We suggest <Suggestion size={4} /> or
        </>
      )
    }
    if (size.value % 2) {
      return (
        <>
          the number should be odd Do you mean{" "}
          <Suggestion num={size.value - 1} /> or{" "}
          <Suggestion num={+size.value + 1} />
        </>
      )
    }
    return null
  }

  const validateAvailableMoves = () => {
    //  debugger
    if (availableMoves.value === "") {
      return "please insert a number. Insert 0 for infinitive tries"
    }
    if (availableMoves.value < size.value) {
      return `please insert a number bigger than ${size.value}`
    }
    return null
  }

  const Suggestion = ({ num }) => {
    return (
      <span
        className="suggestion"
        onClick={() => setSize({ ...size, value: num })}
      >
        {num}
      </span>
    )
  }

  const handleClick = () => {
    if (!validateSize() && !validateAvailableMoves()) {
      retrieve(size.value, availableMoves.value)
    } else {
      setSize({ ...size, dirty: true })
      setAvailableMoves({ ...availableMoves, dirty: true })
    }
  }

  return (
    <div className="settingsForm">
      <input
        className="settingsForm__item input"
        onChange={(e) =>
          setSize({ ...size, value: e.target.value, dirty: true })
        }
        type="number"
        placeholder="size"
        value={size.value}
      />
      <span className="errors">{size?.dirty && validateSize()}</span>
      <input
        className="settingsForm__item input"
        onChange={(e) =>
          setAvailableMoves({
            ...availableMoves,
            value: e.target.value,
            dirty: true,
          })
        }
        type="number"
        placeholder="available moves"
      />
      <span className="errors">
        {availableMoves?.dirty && validateAvailableMoves()}
      </span>
      <button
        className="settingsForm__item"
        onClick={() => handleClick()}
        disabled={validateSize() && validateAvailableMoves() ? "disabled" : ""}
      >
        Save
      </button>
    </div>
  )
}
export default SettingsForm