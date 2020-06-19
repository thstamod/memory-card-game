import React from "react"

const Card = ({ data, handleClick, show, basis }) => {
  const { val, popen } = data

  return (
    <div onClick={handleClick} style={{ flexBasis: `${basis}%` }}>
      <div className="wrapper__card">
        <div className="card">{show || popen ? val : "🍉"}</div>
      </div>
    </div>
  )
}

export default Card
