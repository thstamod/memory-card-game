import React, { useState } from "react"
import Board from "./Board"
import SettingsForm from "./SettingsForm"
import "../main.css"

const App = () => {
  const [settings, setSettings] = useState(null)

  const getSettings = (size, availMoves) => {
    if (size) {
      setSettings({ size, availableMoves: availMoves })
    }
  }

  return (
    <>
      <h2>Memory card game</h2>
      {!settings && <SettingsForm retrieve={getSettings} />}
      {settings && (
        <Board size={settings.size} availableMoves={settings.availMoves} />
      )}
    </>
  )
}

export default App 