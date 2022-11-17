import { sendData } from './api.js';
import { errorMessageShow, successMessageShow } from './messages.js';

const imgUploadElement = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Отправить';
};

const initUploadForm = (onSuccess) => {
  imgUploadElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    sendData(
      () => {
        onSuccess();
        unblockSubmitButton();
        successMessageShow();
      },
      () => {
        unblockSubmitButton();
        errorMessageShow();
      },
      new FormData(evt.target),
    );
  });
};

initUploadForm();
