const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const socialCaption = document.querySelector('.social__caption');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentSocial = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');
const showComments = document.querySelector('.comments-shown');
const commentsCount = document.querySelector('.comments-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

const MAX_NUMBER_OF_COMMENT = 5;

let visibleComments = [];
let displayedLength = 0;

const updateCommentState = () => {
  showComments.textContent = displayedLength;
  commentsCount.textContent = visibleComments.length;

  if (displayedLength === visibleComments.length) {
    socialCommentsLoader.classList.add('hidden');
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
};

const createComment = ({ avatar, name, message }) => {
  const socialComment = commentSocial.cloneNode(true);

  socialComment.querySelector('.social__picture').src = avatar;
  socialComment.querySelector('.social__picture').alt = name;
  socialComment.querySelector('.social__text').textContent = message;

  return socialComment;
};

const initComments = (comments) => {
  displayedLength = comments.length < MAX_NUMBER_OF_COMMENT ? comments.length
    : MAX_NUMBER_OF_COMMENT;

};

const renderComments = () => {
  const commentFragment = document.createDocumentFragment();

  ([...visibleComments].splice(0, displayedLength)).forEach((comment) => {
    commentFragment.appendChild(createComment(comment));
  });

  socialComments.innerHTML = '';
  socialComments.appendChild(commentFragment);
};

const renderPictureComments = ({comments}) => {
  visibleComments = comments;

  initComments(comments);
  renderComments();
  updateCommentState();
};


const showCommentsLoader = () => {
  const newState = displayedLength + MAX_NUMBER_OF_COMMENT;

  if (newState > visibleComments.length) {
    displayedLength = visibleComments.length;

    socialCommentsLoader.classList.add('hidden');
  } else {
    displayedLength = newState;
  }

  renderComments();
  updateCommentState();
};

socialCommentsLoader.addEventListener('click', showCommentsLoader);

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', keyDownHandler);
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function keyDownHandler(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closeBigPicture();
  }
}

const cancelButtonHandler = () => {
  closeBigPicture();
};

closeButton.addEventListener('click', cancelButtonHandler);

const renderPictureDialog = (picture) => {
  const { url, comments, likes, description } = picture;

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  renderPictureComments({comments});
};

export {closeBigPicture, openBigPicture, keyDownHandler, renderPictureDialog, updateCommentState, renderPictureComments};
