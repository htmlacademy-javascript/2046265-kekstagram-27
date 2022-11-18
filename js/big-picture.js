import { clearInputs } from './util.js';
import { showModal, closeModal, addPopupCloseHandlers, removePopupCloseHandlers } from './form.js';

const DEFAULT_COMMENTS_QUANTITY = 5;
const COMMENTS_UPLOAD_QUANTITY = 5;

const gallery = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const uploadedCommentsCollection = commentsList.children;
const uploadedCommentsCount = bigPicture.querySelector('.uploaded-comments-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');


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
    commentsList.appendChild(comment);

    if (!commentsArr[uploadedCommentsCollection.length]) {
      commentsLoaderButton.classList.add('hidden');
      uploadedCommentsCount.textContent = commentsArr.length;
      return;
    }

  }
  uploadedCommentsCount.textContent = uploadedCommentsCollection.length;
};

const generatePopupContent = (dataObj) => {
  bigPictureImg.src = dataObj.url;
  likesCount.textContent = dataObj.likes;
  commentsCount.textContent = dataObj.comments.length;
  socialCaption.textContent = dataObj.description;

  commentsLoaderButton.classList.remove('hidden');
  commentsList.innerHTML = '';
  uploadComments(dataObj.comments, DEFAULT_COMMENTS_QUANTITY);
};

const createPopupCloseHandlers = (commentsLoaderClickHandler) => {

  const closePhotoPopup = () => {
    closeModal(bigPicture);
    clearInputs(bigPicture);
    commentsLoaderButton.removeEventListener('click', commentsLoaderClickHandler);
    removePopupCloseHandlers(closeButton, closePopupClickHandler, closePopupKeydownHandler);
  };

  function closePopupClickHandler() {
    closePhotoPopup();
  }

  function closePopupKeydownHandler(evt) {
    if (evt.code === 'Escape' && document.activeElement.getAttribute('type') !== 'text' && document.activeElement.tagName !== 'TEXTAREA') {
      closePhotoPopup();
    }
  }

  addPopupCloseHandlers(closeButton, closePopupClickHandler, closePopupKeydownHandler);
};

const showPhotoPopup = (commentsLoaderClickHandler) => {
  showModal(bigPicture);
  commentsLoaderButton.addEventListener('click', commentsLoaderClickHandler);
  createPopupCloseHandlers(commentsLoaderClickHandler);
};

const addPhotoClickHandler = (photos) => {

  gallery.addEventListener('click', (evt) => {
    const photo = evt.target.closest('.picture');
    if (photo) {
      const dataObj = photos.find((elem) => elem.id === Number(photo.dataset.id));
      const commentsLoaderClickHandler = () => uploadComments(dataObj.comments, COMMENTS_UPLOAD_QUANTITY);
      generatePopupContent(dataObj);
      showPhotoPopup(commentsLoaderClickHandler);
    }
  });

};

export { addPhotoClickHandler };
