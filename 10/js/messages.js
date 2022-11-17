import { getEscapeEvent } from './util.js';

const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const body = document.querySelector('body');

const removeMessage = (messageElement) => {
  document.querySelector(messageElement).remove();
};

const onDocumentClickRemoveSuccessMessage = (evt) => {
  if (!document.querySelector('.success__inner').contains(evt.target)) {
    removeMessage('.success');
    document.removeEventListener('click', onDocumentClickRemoveSuccessMessage);
  }
};

const onSuccessMessageEscKeydown = (evt) => {
  if (getEscapeEvent(evt)) {
    removeMessage('.success');
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }
};

const successMessageShow = () => {
  const successMessage = successMessageTemplate.cloneNode(true);

  const successButton = successMessage.querySelector('.success__button');

  successButton.addEventListener('click', () => {
    removeMessage('.success');
  });

  document.addEventListener('click', onDocumentClickRemoveSuccessMessage);

  document.addEventListener('keydown', onSuccessMessageEscKeydown);

  body.appendChild(successMessage);
};

const onDocumentClickRemoveErrorMessage = (evt) => {
  if (!document.querySelector('.success__inner').contains(evt.target)) {
    removeMessage('.success');
    document.removeEventListener('click', onDocumentClickRemoveErrorMessage);
  }
};

const onErrorMessageEscKeydown = (evt) => {
  if (getEscapeEvent(evt)) {
    removeMessage('.error');
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }
};

const errorMessageShow = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);

  const errorButton = errorMessage.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    removeMessage('.error');
  });

  document.addEventListener('click', onDocumentClickRemoveErrorMessage);

  document.addEventListener('keydown', onErrorMessageEscKeydown);

  body.appendChild(errorMessage);
};

export {successMessageShow, errorMessageShow};
