const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();

const renderPhotosList = (photos) => {
  photos.forEach(({id, url, likes, comments}) => {
    const photo = photoTemplate.cloneNode(true);
    photo.dataset.id = id;
    photo.querySelector('.picture__img').src = url;
    photo.querySelector('.picture__likes').textContent = likes;
    photo.querySelector('.picture__comments').textContent = comments.length;
    photoFragment.appendChild(photo);
  });
  photosContainer.appendChild(photoFragment);
};

export { renderPhotosList };
