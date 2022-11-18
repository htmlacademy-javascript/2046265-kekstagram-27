const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgScaleContainer = document.querySelector('.img-upload__scale');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

let scale;

const scalePreview = (measure) => {
  scaleControlValue.value = `${measure}%`;
  imgUploadPreview.style.transform = `scale(${measure / 100})`;
};

const setDefaultValue = () => {
  scale = SCALE_MAX;
  scalePreview(scale);
};

const zoomIn = () => {
  if (scale < SCALE_MAX) {
    scale += SCALE_STEP;
  }
  scalePreview(scale);
};

const zoomDown = () => {
  if (scale > SCALE_MIN) {
    scale -= SCALE_STEP;
  }
  scalePreview(scale);
};

imgScaleContainer.addEventListener('click', (evt) => {
  switch (evt.target) {
    case scaleControlSmaller:
      zoomDown();
      break;
    case scaleControlBigger:
      zoomIn();
      break;
  }
});

export {setDefaultValue};
