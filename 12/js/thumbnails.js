const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhotosList = (photos) => {
  const photoListFragment = document.createDocumentFragment();

  photos.forEach(({id, url, likes, comments}) => {
    const photo = photoTemplate.cloneNode(true);
    photo.dataset.id = id;
    photo.querySelector('.picture__img').src = url;
    photo.querySelector('.picture__likes').textContent = likes;
    photo.querySelector('.picture__comments').textContent = comments.length;
    photoListFragment.appendChild(photo);
  });

  photosContainer.appendChild(photoListFragment);
};

export { renderPhotosList };
