const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_STEP = 25;

const uploadImg = document.querySelector('.img-upload__preview img');
const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');


const resetPhotoScale = () => {
  scaleControl.value = '100%';
  uploadImg.style = '';
};

const getPhotoScale = () => parseInt(scaleControl.value, 10);

const setPhotoScale = (scale) => {
  uploadImg.style.transform = `scale(${scale / 100})`;
  scaleControl.value = `${scale}%`;
};

const smallerScaleBtnClickHandler = () => {
  if (getPhotoScale() > MIN_SCALE_VALUE) {
    const newScale = getPhotoScale() - SCALE_STEP;
    setPhotoScale(newScale);
  }
};

const biggerScaleBtnClickHandler = () => {
  if (getPhotoScale() < MAX_SCALE_VALUE) {
    const newScale = getPhotoScale() + SCALE_STEP;
    setPhotoScale(newScale);
  }
};

smallerScaleButton.addEventListener('click', smallerScaleBtnClickHandler);
biggerScaleButton.addEventListener('click', biggerScaleBtnClickHandler);

export { uploadImg, resetPhotoScale };
