const checkMaxLength = (value, maxLength) => value.length <= maxLength;

const checkArrValuesNotRepeat = (arr, isStringsArr = false) => {
  if (isStringsArr) {
    arr = arr.map((string) => string.toLowerCase());
  }
  const arrWithoutRepeats = new Set(arr);
  return arrWithoutRepeats.size === arr.length;
};

const clearInputs = (container) => {
  const inputsWithoutDefaultVal = container.querySelectorAll('input:not([value])');
  const allTextAreas = container.querySelectorAll('textarea');
  inputsWithoutDefaultVal.forEach((input) => (input.value = ''));
  allTextAreas.forEach((textArea) => (textArea.value = ''));
};

const showErrorAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '100%';
  alertContainer.style.top = '0';
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.fontSize = '22px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'Crimson';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

};

export { checkMaxLength, checkArrValuesNotRepeat, clearInputs, showErrorAlert };
