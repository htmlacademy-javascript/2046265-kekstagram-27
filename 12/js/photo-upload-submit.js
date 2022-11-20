import { sendData } from './api.js';
import { successMessageTemplate, errorMessageTemplate, successMessageCloseButton, errorMessageCloseButton, showUploadMessage } from './messages.js';
import { closeUploadPopup } from './form.js';
import { uploadForm, pristine } from './validation.js';

const uploadSubmit = document.querySelector('.img-upload__submit');


const blockSubmitButton = () => {
  uploadSubmit.disabled = true;
  uploadSubmit.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  uploadSubmit.disabled = false;
  uploadSubmit.textContent = 'Опубликовать';
};

const onSuccess = () => {
  closeUploadPopup();
  showUploadMessage(successMessageTemplate, successMessageCloseButton);
  unblockSubmitButton();
};

const onFail = () => {
  showUploadMessage(errorMessageTemplate, errorMessageCloseButton);
  unblockSubmitButton();
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(onSuccess, onFail, new FormData(evt.target));
  }

});
