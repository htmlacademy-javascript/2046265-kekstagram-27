const MAX_HASHTAG = 5;
const MAX_LENGTH_COMMENT = 140;
const HASHTAG_RULE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const commentsField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');
const imgUploadForm = document.querySelector('.img-upload__form');

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

export {commentsField, hashtagField, isMaxLength, pristine, resetFormValidation};
