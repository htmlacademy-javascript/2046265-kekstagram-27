import {getEscapeEvent} from './util.js';

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = document.querySelector('.big-picture__img');
const socialCommentCountNode = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const commentsListNode = document.querySelector('.social__comments');
const commentElementNode = commentsListNode.querySelector('.social__comment');
const commentsLoaderNode = document.querySelector('.comments-loader');
const bigPictureCloseNode = bigPictureNode.querySelector('.big-picture__cancel');
let commentsArrayData = [];
const MAX_COMMENT = 5;
let commentsCounter = 5;

const getBigPictureComment = (comment) => {
  const commentItemNode = commentElementNode.cloneNode(true);
  commentItemNode.querySelector('.social__picture').src = comment.avatar;
  commentItemNode.querySelector('.social__picture').alt = comment.name;
  commentItemNode.querySelector('.social__text').textContent = comment.message;
  return commentItemNode;
};

const createCommentsFragment = (commentsArray) => {
  const fragment = document.createDocumentFragment();
  commentsArray.forEach((comment) => {
    const patternComment = getBigPictureComment(comment);
    fragment.appendChild(patternComment);
  });
  commentsListNode.appendChild(fragment);
};

const showBigPicture = (bigPhoto) => {
  body.classList.add('modal-open');
  commentsListNode.innerHTML = '';
  bigPictureImgNode.querySelector('img').src = bigPhoto.url;
  bigPictureNode.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPictureNode.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPictureNode.querySelector('.social__caption').textContent = bigPhoto.description;
  bigPictureNode.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPictureCloseNode.addEventListener('click', onBigPictureCloseClick);
  socialCommentCountNode.firstChild.textContent = `${MAX_COMMENT} из `;
  commentsArrayData = bigPhoto.comments.slice();
  if (commentsArrayData.length <= MAX_COMMENT) {
    socialCommentCountNode.firstChild.textContent = `${bigPhoto.comments.length} из `;
    createCommentsFragment(commentsArrayData);
    commentsLoaderNode.classList.add('hidden');
  }
  if (commentsArrayData.length >= MAX_COMMENT) {
    createCommentsFragment(commentsArrayData.slice(0, MAX_COMMENT));
    commentsLoaderNode.classList.remove('hidden');
    commentsLoaderNode.addEventListener('click', onCommentsLoaderClick);
  }
};

const getCurentCommentCount = (comments) => comments ? comments.children.length : 0;

function onCommentsLoaderClick () {
  createCommentsFragment(commentsArrayData.slice(commentsCounter, commentsCounter += MAX_COMMENT));
  if (commentsCounter >= commentsArrayData.length) {
    commentsLoaderNode.classList.add('hidden');
    commentsLoaderNode.removeEventListener('click', onCommentsLoaderClick);
    commentsCounter = MAX_COMMENT;
  }
  socialCommentCountNode.firstChild.textContent = `${getCurentCommentCount(commentsListNode)} из `;
  if (commentsArrayData.length === 0) {
    commentsLoaderNode.classList.add('hidden');
    commentsLoaderNode.removeEventListener('click', onCommentsLoaderClick);
  }
}

const closeBigPicture = () => {
  bigPictureNode.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscPress);
  bigPictureCloseNode.removeEventListener('click', onBigPictureCloseClick);
};

function onBigPictureEscPress (evt) {
  getEscapeEvent(evt, closeBigPicture);
}

function onBigPictureCloseClick () {
  closeBigPicture();
}

export {showBigPicture};
