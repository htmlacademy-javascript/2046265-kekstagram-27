const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

const renderPhotosList = (pictures) => {
  pictures.forEach(({id, url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(pictureFragment);
};

export { renderPhotosList };
