import {debounce, getRandomUniqeElement} from './util.js';
import {renderPhotos} from './thumbnails.js';
import {dataList} from './data.js';

const QUANTITY_PICTURE_RANDOM = 10;

const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDescussed = document.querySelector('#filter-discussed');
const imageFilters = document.querySelector('.img-filters');

let activeFilter = filterDefault;

const displayFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const filterByDefault = (pictures) => pictures;

const filterByRandom = (pictures) => {
  const pictureArrayCopy = [...pictures];

  return getRandomUniqeElement(pictureArrayCopy).slice(0, QUANTITY_PICTURE_RANDOM);
};

const filterByDiscuss = (pictures) => [...pictures].sort(
  (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length
);

imageFilters.addEventListener('click', debounce ((evt) => {
  activeFilter.classList.remove('img-filters__button--active');

  const filter = evt.target.id;
  activeFilter = evt.target;

  switch (filter) {
    case 'filter-default':
      filterDefault.classList.add('img-filters__button--active');
      renderPhotos(filterByDefault([...dataList]));
      break;
    case 'filter-random':
      filterRandom.classList.add('img-filters__button--active');
      renderPhotos(filterByRandom([...dataList]));
      break;
    case 'filter-discussed':
      filterDescussed.classList.add('img-filters__button--active');
      renderPhotos(filterByDiscuss([...dataList]));
      break;
  }
}));

export {displayFilters};
