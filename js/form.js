import {setDefaultValue} from './scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './messages.js';


const ALERT_SHOW_TIME = 5000;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAX_HASHTAG = 5;
const MAX_LENGTH_COMMENT = 140;
const HASHTAG_RULE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const imgPreview = document.querySelector('.img-upload__preview img');
const fileChooser = document.querySelector('.img-upload__input');
const commentsField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');


const isMaxLength = (string, maxLength) => string.length <= maxLength;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error__inner'
});

const createHashtagArray = (value) => value.split(' ');

const isValidHashtag = (value) => {
  if (!value) {
    return true;
  }

  const hashtag = createHashtagArray(value);

  return hashtag.every((test) => HASHTAG_RULE.test(test));
};

const isHashTagsLengthValid = (value) => {
  const hashtag = createHashtagArray(value);

  return hashtag.length <= MAX_HASHTAG;
};

const isUniqeHashtag = (value) => {
  const tag = createHashtagArray(value);
  const uniqTag = new Set(tag);

  return uniqTag.size === tag.length;
};

const isCommentLengthValid = (value) => isMaxLength(value, MAX_LENGTH_COMMENT);

pristine.addValidator(hashtagField, isValidHashtag,'Хештег должен начинаться с "#", содержать буквы, числа (не более 20 символов, включая #)');
pristine.addValidator(hashtagField, isHashTagsLengthValid,`нельзя указать больше ${MAX_HASHTAG} хэш-тегов`);
pristine.addValidator(hashtagField, isUniqeHashtag,'один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(commentsField, isCommentLengthValid, `Не более ${MAX_LENGTH_COMMENT} символов`);

const resetFormValidation = () => {
  pristine.reset();
};

const uploadFiles = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

const showUploadPopup = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', keyDownHandler);

  setDefaultValue();
  uploadFiles();
};

const closeUploadPopup = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', keyDownHandler);
  imgUploadForm.reset();
  resetEffects();
  resetFormValidation();
};

uploadFile.addEventListener('change', showUploadPopup);

uploadCancel.addEventListener('click', closeUploadPopup);

function keyDownHandler (evt) {
  const focusHashTag = document.activeElement === hashtagField;
  const focusComment = document.activeElement === commentsField;

  if (evt.key === 'Escape' && !focusHashTag && !focusComment) {
    evt.preventDefault();
    closeUploadPopup();
  }
}

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onSuccess = () => {
  enableSubmitButton();
  showSuccessMessage();
  closeUploadPopup();
};

const onError = () => {
  showErrorMessage();
  enableSubmitButton();
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isFormValid = pristine.validate();

  if (isFormValid) {
    disableSubmitButton();
    sendData(
      onSuccess,
      onError,
      new FormData(evt.target)
    );
  }
});

const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error-message');
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {closeUploadPopup, showAlertMessage};
