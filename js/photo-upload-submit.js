import { sendData } from './api.js';
import { successMessageTemplate, errorMessageTemplate, successMessageCloseBtn, errorMessageCloseBtn, showUploadMessage } from './messages.js';
import { closeUploadPopup } from './photo-upload-popup.js';
import { uploadForm, pristine } from './validation.js';

const uploadSubmitBtn = document.querySelector('.img-upload__submit');


const blockSubmitButton = () => {
  uploadSubmitBtn.disabled = true;
  uploadSubmitBtn.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  uploadSubmitBtn.disabled = false;
  uploadSubmitBtn.textContent = 'Опубликовать';
};

const onSuccess = () => {
  closeUploadPopup();
  showUploadMessage(successMessageTemplate, successMessageCloseBtn);
  unblockSubmitButton();
};

const onFail = () => {
  showUploadMessage(errorMessageTemplate, errorMessageCloseBtn);
  unblockSubmitButton();
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(onSuccess, onFail, new FormData(evt.target));
  }

});
