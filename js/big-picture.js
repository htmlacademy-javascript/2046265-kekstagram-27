const bigPicture = document.querySelector('.big-picture');
const commentList = document.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment').cloneNode(true);
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const count = bigPicture.querySelector('.comments-count');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const createComment = ({avatar, name, message}) => {
  const commentElement = commentItem.cloneNode(true);
  const socialPicture = commentElement.querySelector('.social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });
  commentList.append(fragment);
};

const showBigPicture = ({url, likes, description, comments}) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
  count.textContent = comments.length;
  bigPictureCancel.addEventListener('click', () => {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  });

  renderComments(comments);
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
});

export {showBigPicture};
