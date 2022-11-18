import { clearInputs } from './util.js';
import { showModal, closeModal, addPopupCloseHandlers, removePopupCloseHandlers } from './popup.js';

const DEFAULT_COMMENTS_QUANTITY = 5;
const COMMENTS_TO_UPLOAD_QUANTITY = 5;

const gallery = document.querySelector('.pictures');
const popup = document.querySelector('.big-picture');
const popupImg = popup.querySelector('.big-picture__img').querySelector('img');
const popupLikesCount = popup.querySelector('.likes-count');
const popupCommentsCount = popup.querySelector('.comments-count');
const popupDescription = popup.querySelector('.social__caption');
const popupCloseButton = popup.querySelector('.big-picture__cancel');

const popupCommentsList = popup.querySelector('.social__comments');
const commentTemplate = popupCommentsList.querySelector('.social__comment');
const uploadedCommentsCollection = popupCommentsList.children;
const popupUploadedCommentsCount = popup.querySelector('.uploaded-comments-count');
const popupCommentsLoaderBtn = popup.querySelector('.comments-loader');


const createCommentElement = (commentObj) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = commentObj.avatar;
  comment.querySelector('.social__picture').alt = commentObj.name;
  comment.querySelector('.social__text').textContent = commentObj.message;
  return comment;
};

const uploadComments = (commentsArr, commentsQuantity) => {
  for (let i = 1; i <= commentsQuantity; i++) {
    const comment = createCommentElement(commentsArr[uploadedCommentsCollection.length]);
    popupCommentsList.appendChild(comment);

    if (!commentsArr[uploadedCommentsCollection.length]) {
      popupCommentsLoaderBtn.classList.add('hidden');
      popupUploadedCommentsCount.textContent = commentsArr.length;
      return;
    }

  }
  popupUploadedCommentsCount.textContent = uploadedCommentsCollection.length;
};

const generatePopupContent = (dataObj) => {
  popupImg.src = dataObj.url;
  popupLikesCount.textContent = dataObj.likes;
  popupCommentsCount.textContent = dataObj.comments.length;
  popupDescription.textContent = dataObj.description;

  popupCommentsLoaderBtn.classList.remove('hidden');
  popupCommentsList.innerHTML = '';
  uploadComments(dataObj.comments, DEFAULT_COMMENTS_QUANTITY);
};

const createPopupCloseHandlers = (commentsLoaderClickHandler) => {

  const closePhotoPopup = () => {
    closeModal(popup);
    clearInputs(popup);
    popupCommentsLoaderBtn.removeEventListener('click', commentsLoaderClickHandler);
    removePopupCloseHandlers(popupCloseButton, closePopupClickHandler, closePopupKeydownHandler);
  };

  function closePopupClickHandler() {
    closePhotoPopup();
  }

  function closePopupKeydownHandler(evt) {
    if (evt.code === 'Escape' && document.activeElement.getAttribute('type') !== 'text' && document.activeElement.tagName !== 'TEXTAREA') {
      closePhotoPopup();
    }
  }

  addPopupCloseHandlers(popupCloseButton, closePopupClickHandler, closePopupKeydownHandler);
};

const showPhotoPopup = (commentsLoaderClickHandler) => {
  showModal(popup);
  popupCommentsLoaderBtn.addEventListener('click', commentsLoaderClickHandler);
  createPopupCloseHandlers(commentsLoaderClickHandler);
};

const addPhotoClickHandler = (photos) => {

  gallery.addEventListener('click', (evt) => {
    const photo = evt.target.closest('.picture');
    if (photo) {
      const dataObj = photos.find((elem) => elem.id === Number(photo.dataset.id));
      const commentsLoaderClickHandler = () => uploadComments(dataObj.comments, COMMENTS_TO_UPLOAD_QUANTITY);
      generatePopupContent(dataObj);
      showPhotoPopup(commentsLoaderClickHandler);
    }
  });

};

export { addPhotoClickHandler };
