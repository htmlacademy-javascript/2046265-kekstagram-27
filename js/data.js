import {getData} from './api.js';
import {showAlertMessage} from './form.js';

const NUMBER_OF_PHOTOS = 25;

let dataList = [];

const initData = (cbSuccess) => {
  getData (
    (photos) => {
      dataList = photos.slice(0, NUMBER_OF_PHOTOS);
      if (cbSuccess) {cbSuccess(dataList);}
    },
    () => {
      showAlertMessage('Не удалось загрузить данные с сервера');
    });
};

export {dataList, initData};
