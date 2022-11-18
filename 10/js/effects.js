const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const imgUploadEffects = document.querySelector('.img-upload__effects');

let currentEffect;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower'
});

const hideSlider = () => {
  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const resetSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const resetEffect = () => {
  currentEffect = 'none';

  resetSlider();
};

const changeEffectImageHandler = (evt) => {
  imgUploadPreview.classList.remove(`effects__preview--${currentEffect}`);

  currentEffect = evt.target.value;

  imgUploadPreview.classList.add(`effects__preview--${currentEffect}`);

  hideSlider();

  switch (currentEffect) {
    case 'none':
    case'chrome':
    case 'sepia':
      resetSlider();
      break;

    case 'marvin':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;

    case 'phobos':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;

    case 'heat':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }
};

effectLevelSlider.noUiSlider.on('update', () => {
  effectValue.value = effectLevelSlider.noUiSlider.get();

  switch(currentEffect) {
    case 'none':
      imgUploadPreview.style.filter = 'none';
      break;

    case 'chrome':
      imgUploadPreview.style.filter = `grayscale(${effectValue.value})`;
      break;

    case'sepia':
      imgUploadPreview.style.filter = `sepia(${effectValue.value})`;
      break;

    case'marvin':
      imgUploadPreview.style.filter = `invert(${effectValue.value}%)`;
      break;

    case'phobos':
      imgUploadPreview.style.filter = `blur(${effectValue.value}px)`;
      break;

    case'heat':
      imgUploadPreview.style.filter = `brightness(${effectValue.value})`;
      break;
  }
});

imgUploadEffects.addEventListener('change', changeEffectImageHandler);

const resetSliderInit = () => {
  currentEffect = 'none';

  hideSlider();
};

export {resetSlider, resetEffect, resetSliderInit};
