import letters from "./letters";

const getLetter = (letters, set) => {
  const S = 26;
  const setSize = set.current.size;
  if (setSize < 26) {
    set.current.add(letters[setSize]);
    return letters[setSize];
  }
  const major = parseInt(setSize / S);
  let l = letters[major - 1];
  const minor = setSize - S * major;
  l += letters[minor];
  set.current.add(l);
  return l;
};

const findEmptyPosition = (tmpArr, max) => {
  let rn = getRandomNumber(max);
  if (tmpArr[rn] !== null) {
    rn = findEmptyPosition(tmpArr, max);
  }
  return rn;
};

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const setRandomPositions = (size, lettersSet) => {
  const max = Math.pow(size, 2);
  const tmpArr = new Array(max).fill(null);
  const s = {};
  for (let i = 0; i < max / 2; i++) {
    const letter = getLetter(letters, lettersSet);
    const q = findEmptyPosition(tmpArr, max);
    tmpArr[q] = letter;
    s[q] = { val: letter, popen: false };
    const p = findEmptyPosition(tmpArr, max);
    tmpArr[p] = letter;
    s[p] = { val: letter, popen: false };
  }
  return s;
};

export default setRandomPositions;
