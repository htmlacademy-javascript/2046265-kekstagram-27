import './thumbnail.js';
import './form.js';
import {getData} from './api.js';
import {randomUserPictures} from './thumbnail.js';

getData((pictures) => {
  randomUserPictures(pictures);
});

getData(randomUserPictures);
