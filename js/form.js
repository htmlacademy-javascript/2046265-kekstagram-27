import { uploadReset } from './upload-image.js';

const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadClosePopupBtn = document.querySelector('#upload-cancel');


const showModal = (modal) => {
  document.body.classList.add('modal-open');
  modal.classList.remove('hidden');
};

const closeModal = (modal) => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const addPopupCloseHandlers = (closeButton, closeClickHandler, closeKeydownHandler) => {
  closeButton.addEventListener('click', closeClickHandler);
  document.addEventListener('keydown', closeKeydownHandler);
};

const removePopupCloseHandlers = (closeButton, closeClickHandler, closeKeydownHandler) => {
  closeButton.removeEventListener('click', closeClickHandler);
  document.removeEventListener('keydown', closeKeydownHandler);
};

const closeUploadPopup = () => {
  closeModal(uploadPopup);
  removePopupCloseHandlers(uploadClosePopupBtn, closePopupClickHandler, closePopupKeydownHandler);
  uploadReset();
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

export {showModal, closeModal, addPopupCloseHandlers, removePopupCloseHandlers, uploadPopup, closeUploadPopup, showUploadPopup, closePopupKeydownHandler };
