import { getData } from './api.js';
import { displayFilters } from './filters.js';
import { renderPhotos } from './thumbnails.js';
import { showAlertMessage } from './messages.js';

let dataLists = [];

const updateDataList = (photos) => {dataLists = photos;};
const getDataList = () => dataLists;

const onError = () => showAlertMessage('Не удалось загрузить данные с сервера');

const onSuccess = (photos) => {
  updateDataList(photos);
  renderPhotos(dataLists);
  displayFilters();
};

getData(onSuccess, onError);

export {updateDataList, getDataList};
