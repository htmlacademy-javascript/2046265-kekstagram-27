const ALERT_SHOW_TIME = 4000;

const getRandomInRange = (min, max) => {
  const minRounded = Math.ceil(min);
  const maxRounded = Math.floor(max);
  return (max <= min || min < 0 || max < 0 || typeof min !== 'number' || typeof max !== 'number')
    ? NaN
    : Math.floor(Math.random() * ((maxRounded - minRounded + 1)) + minRounded);
};

getRandomInRange();


const getEscapeEvent = (evt, action) => {
  if (evt.key === 'Escape') {
    action();
  }
};

const checkStringLength = (string, length) => string.length <= length;

checkStringLength('', 140);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getRandomArrayElement = (array) =>
  array[getRandomInRange(0, array.length - 1)];

export {getRandomInRange, getEscapeEvent, getRandomArrayElement, showAlert};

