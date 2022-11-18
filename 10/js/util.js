const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getRandomUniqeElement = (arr) => [...arr].sort(() => Math.random() - 0.5);

export {debounce, getRandomUniqeElement};
