import { getData } from './api.js';
import { renderPhotosList } from './thumbnails.js';
import { addPhotoClickHandler } from './big-picture.js';
import { showErrorAlert } from './util.js';
import './photo-upload-popup.js';
import './photo-upload-submit.js';

getData(
  (photos) => {
    renderPhotosList(photos);
    addPhotoClickHandler(photos);
  },
  () => {
    showErrorAlert('Не удалось загрузить изображения. Попробуйте перезагрузить страницу');
  }
);
