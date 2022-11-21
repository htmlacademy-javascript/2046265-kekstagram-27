import { checkMaxLength, checkArrValuesNotRepeat } from './util.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]/i;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_QUANTITY = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const uploadHashtag = uploadForm.querySelector('.text__hashtags');
const uploadDescription = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error-text',
});

const clearPristineErrors = () => {
  const pristineErrorsTexts = uploadForm.querySelectorAll('.error-text');
  pristineErrorsTexts.forEach((errorText) => {errorText.style.display = 'none';});
};

const validateHashtagSymbols = () => {
  if (uploadHashtag.value !== '') {
    return uploadHashtag.value.split(' ').every((hashtag) => HASHTAG_REGEX.test(hashtag));
  }
  return true;
};

const validateHashtagMaxLength = () => uploadHashtag.value.split(' ').every((hashtag) => checkMaxLength(hashtag, MAX_HASHTAG_LENGTH));
const validateHashtagsQuantity = () => checkMaxLength(uploadHashtag.value.split(' '), MAX_HASHTAG_QUANTITY);
const validateHashtagValuesRepeat = () => checkArrValuesNotRepeat(uploadHashtag.value.split(' '), true);

pristine.addValidator(uploadHashtag, validateHashtagSymbols, 'Хэштег должен начинаться с # и состоять из букв и чисел');
pristine.addValidator(uploadHashtag, validateHashtagMaxLength, `Длина хэштега меньше ${MAX_HASHTAG_LENGTH} символов`);
pristine.addValidator(uploadHashtag, validateHashtagsQuantity, `Максимум ${MAX_HASHTAG_QUANTITY} хэштегов`);
pristine.addValidator(uploadHashtag, validateHashtagValuesRepeat, 'Хэштеги не могут повторяться');

const validateDescriptionMaxLength = () => checkMaxLength(uploadDescription.value, MAX_DESCRIPTION_LENGTH);

pristine.addValidator(uploadDescription, validateDescriptionMaxLength, `Максимальное длина ${MAX_DESCRIPTION_LENGTH} символов`);

export { uploadForm, pristine, clearPristineErrors };
