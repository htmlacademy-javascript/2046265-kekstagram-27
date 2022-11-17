import './thumbnail.js';
import './form.js';
import {getData} from './api.js';
import {randomUserPictures} from './thumbnail.js';
import {initUploadForm, hideModal} from './form.js';


getData((pictures) => {
  randomUserPictures(pictures);
});

getData(randomUserPictures);
initUploadForm(hideModal);
