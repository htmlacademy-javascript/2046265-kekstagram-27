import { closePopupKeydownHandler, addPopupCloseHandlers, removePopupCloseHandlers} from './form.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageCloseBtn = successMessageTemplate.querySelector('.success__button');
const errorMessageCloseBtn = errorMessageTemplate.querySelector('.error__button');


const createMessageCloseHandlers = (message, closeBtn) => {

  const closeMessage = () => {
    message.remove();
    removePopupCloseHandlers(closeBtn, messageCloseClickHandler, messageCloseKeydownHandler);
    document.removeEventListener('click', fromOutsideMessageClickHandler);

    if (message === errorMessageTemplate) {
      document.addEventListener('keydown', closePopupKeydownHandler);
    }

  };

  function messageCloseKeydownHandler(evt) {
    if (evt.code === 'Escape') {
      closeMessage();
    }
  }

  function messageCloseClickHandler() {
    closeMessage();
  }

  function fromOutsideMessageClickHandler(evt) {
    if (evt.target.contains(message)) {
      closeMessage();
    }
  }

  addPopupCloseHandlers(closeBtn, messageCloseClickHandler, messageCloseKeydownHandler);
  document.addEventListener('click', fromOutsideMessageClickHandler);
};

const showUploadMessage = (message, messageCloseBtn) => {
  document.body.append(message);
  document.removeEventListener('keydown', closePopupKeydownHandler);
  createMessageCloseHandlers(message, messageCloseBtn);
};

export { successMessageTemplate, errorMessageTemplate, successMessageCloseBtn, errorMessageCloseBtn, showUploadMessage };
