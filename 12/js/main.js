import { getData } from './api.js';
import { renderPhotosList } from './thumbnails.js';
import { addPhotoFilters } from './filter.js';
import { addPhotoClickHandler } from './big-picture.js';
import { showErrorAlert } from './util.js';
import './form.js';
import './photo-upload-submit.js';
import './upload-image.js';

getData(
  (photos) => {
    renderPhotosList(photos);
    addPhotoFilters(photos);
    addPhotoClickHandler(photos);
  },
  () => {
    showErrorAlert('Не удалось загрузить изображения. Попробуйте перезагрузить страницу');
  }
);
