import { showModal, closeModal, addPopupCloseHandlers, removePopupCloseHandlers } from './popup.js';
import { uploadForm, clearPristineErrors } from './validation.js';
import { resetPhotoScale } from './scale.js';
import { resetPhotoEffect, resetPhotoEffectSlider } from './effects.js';

const uploadFileInput = uploadForm.querySelector('#upload-file');
const uploadPopup = uploadForm.querySelector('.img-upload__overlay');
const uploadClosePopupBtn = uploadForm.querySelector('#upload-cancel');


const closeUploadPopup = () => {
  closeModal(uploadPopup);
  removePopupCloseHandlers(uploadClosePopupBtn, closePopupClickHandler, closePopupKeydownHandler);

  uploadFileInput.value = '';
  uploadForm.reset();

  clearPristineErrors();
  resetPhotoScale();
  resetPhotoEffect();
  resetPhotoEffectSlider();
};

const showUploadPopup = () => {
  showModal(uploadPopup);
  addPopupCloseHandlers(uploadClosePopupBtn, closePopupClickHandler, closePopupKeydownHandler);
};

function closePopupClickHandler() {
  closeUploadPopup();
}

function closePopupKeydownHandler(evt) {
  if (evt.code === 'Escape' && document.activeElement.getAttribute('type') !== 'text' && document.activeElement.tagName !== 'TEXTAREA') {
    closeUploadPopup();
  }
}

uploadFileInput.addEventListener('change', () => {
  showUploadPopup();
});

export { uploadPopup, closeUploadPopup, closePopupKeydownHandler };
