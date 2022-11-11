import {getEscapeEvent} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentList = document.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment').cloneNode(true);
const socialCommentCount = document.querySelector('.social__comment-count');
const body = document.body;
const commentsList = document.querySelector('.social__comments');
const commentElement = commentsList.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');

let commentsArrayData = [];
const COMMENTS_STEP = 5;
let commentsCounter = 5;

const getBigPictureComment = (comment) => {
  const commentItem = commentElement.cloneNode(true);
  commentItem.querySelector('.social__picture').src = comment.avatar;
  commentItem.querySelector('.social__picture').alt = comment.name;
  commentItem.querySelector('.social__text').textContent = comment.message;
  return commentItem;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  commentsArray.forEach((comment) => {
    const patternComment = getBigPictureComment(comment);
    fragment.appendChild(patternComment);
  });
  commentList.append(fragment);
};


const showBigPicture = ({url, likes, description, comments}) => {
  body.classList.add('modal-open');
  commentsList.innerHTML = '';
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  socialCommentCount.firstChild.textContent = `${COMMENTS_STEP} из `;
  commentsArrayData = comments.slice();
  if (commentsArrayData.length <= COMMENTS_STEP) {
    socialCommentCount.firstChild.textContent = `${comments.length} из `;
    createCommentsFragment(commentsArrayData);
    commentsLoader.classList.add('hidden');
  }
  if (commentsArrayData.length >= COMMENTS_STEP) {
    createCommentsFragment(commentsArrayData.slice(0, COMMENTS_STEP));
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
}

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
};

function onDocumentKeydown (evt) {
  getEscapeEvent(evt, closeBigPicture);
}

function onBigPictureCancelClick () {
  closeBigPicture();
}

export { showBigPicture };
