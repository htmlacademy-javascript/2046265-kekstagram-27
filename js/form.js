import { uploadReset } from './upload-image.js';

const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadClosePopupButton = document.querySelector('#upload-cancel');


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
  removePopupCloseHandlers(uploadClosePopupButton, closePopupClickHandler, closePopupKeydownHandler);
  uploadReset();
};

const showUploadPopup = () => {
  showModal(uploadPopup);
  addPopupCloseHandlers(uploadClosePopupButton, closePopupClickHandler, closePopupKeydownHandler);
};

function closePopupClickHandler() {
  closeUploadPopup();
}

function closePopupKeydownHandler(evt) {
  if (evt.code === 'Escape' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    closeUploadPopup();
  }
}

export {showModal, closeModal, addPopupCloseHandlers, removePopupCloseHandlers, closeUploadPopup, showUploadPopup, closePopupKeydownHandler };
