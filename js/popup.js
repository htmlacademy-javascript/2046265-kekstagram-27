const showModal = (modal) => {
  document.body.classList.add('modal-open');
  modal.classList.remove('hidden');
};

const closeModal = (modal) => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const addPopupCloseHandlers = (closeBtn, closeClickHandler, closeKeydownHandler) => {
  closeBtn.addEventListener('click', closeClickHandler);
  document.addEventListener('keydown', closeKeydownHandler);
};

const removePopupCloseHandlers = (closeBtn, closeClickHandler, closeKeydownHandler) => {
  closeBtn.removeEventListener('click', closeClickHandler);
  document.removeEventListener('keydown', closeKeydownHandler);
};

export { showModal, closeModal, addPopupCloseHandlers, removePopupCloseHandlers };
