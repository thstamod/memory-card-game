import React from "react"

const Card = ({ data, handleClick, show, basis }) => {
  const { val, popen } = data
  let classesWrapper = "wrapper__card "
  if (show) {
    classesWrapper += "flip"
  }

  const clickCard = () => {
    if (popen) return
    handleClick()
  }

  return (
    <div onClick={clickCard} className={classesWrapper}>
      <div className="front">
        <div>{val}</div>
      </div>
      <div className="back"></div>
    </div>
  )
}

export default Card
