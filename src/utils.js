export const getLetter = (letters, set) => {
  const S = 26
  const setSize = set.current.size
  if (setSize < 26) {
    set.current.add(letters[setSize])
    return letters[setSize]
  }
  const major = parseInt(setSize / S)
  let l = letters[major - 1]
  const minor = setSize - S * major
  l += letters[minor]
  set.current.add(l)
  return l
}

export const findEmptyPosition = (tmpArr, max) => {
  let rn = getRandomNumber(max)
  if (tmpArr[rn] !== null) {
    rn = findEmptyPosition(tmpArr, max)
  }
  return rn
}

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max)
}
