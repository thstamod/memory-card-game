import React from "react"

const Card = ({ data, handleClick, show, basis }) => {
  const { val, popen } = data
  let classesWrapper = "wrapper__card "
  let classesCard = "card "
  if (show) {
    classesWrapper += "flip"
    classesCard += "back"
  }

  const clickCard = () => {
    if (popen) return
    handleClick()
  }

  return (
    <div onClick={clickCard} className={classesWrapper}>
      <div className={classesCard}>{show ? val : "🍉"}</div>
    </div>
  )
}

export default Card