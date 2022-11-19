import { renderPhotosList } from './thumbnails.js';
import { getRandomArrValues, debounce } from './util.js';

const ALERT_SHOW_TIME = 500;
const RANDOM_FILTER_PHOTOS_QUANTITY = 10;

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');


const clearPhotoList = () => {
  document.querySelectorAll('.picture').forEach((photo) => photo.remove());
};

const setActiveButton = (button) => {
  const activedButton = document.querySelector('.img-filters__button--active');
  activedButton.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const filterByRandom = (photos) => renderPhotosList(getRandomArrValues(photos, RANDOM_FILTER_PHOTOS_QUANTITY));

const filterByComments = (photos) => renderPhotosList(photos.slice().sort((a, b) => b.comments.length - a.comments.length));

const filterPhotoList = debounce((photos, filterId) => {
  clearPhotoList();
  switch (filterId) {
    case 'filter-random':
      filterByRandom(photos);
      break;
    case 'filter-discussed':
      filterByComments(photos);
      break;
    default:
      renderPhotosList(photos);
  }
}, ALERT_SHOW_TIME);

const addPhotoFilters = (photos) => {
  imgFilters.classList.remove('img-filters--inactive');

  imgFiltersForm.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      setActiveButton(evt.target);
      filterPhotoList(photos, evt.target.id);
    }
  });

};

export { addPhotoFilters };
