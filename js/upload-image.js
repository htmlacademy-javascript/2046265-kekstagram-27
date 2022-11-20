import { uploadForm, clearPristineErrors } from './validation.js';
import { resetPhotoScale } from './scale.js';
import { resetEffects } from './effects.js';
import { showUploadPopup } from './form.js';
import { showErrorAlert } from './util.js';

const UPLOAD_FILES_TYPES = ['jpg', 'jpeg', 'png'];
const FILE_TYPE_ERROR_SHOW_TIME = 5000;

const uploadFileInput = document.querySelector('#upload-file');
const uploadImg = document.querySelector('.img-upload__preview img');


uploadImg.addEventListener('load', () => {
  showUploadPopup();
});

uploadFileInput.addEventListener('change', () => {
  const chosenFile = uploadFileInput.files[0];
  const fileName = chosenFile.name.toLowerCase();

  const matches = UPLOAD_FILES_TYPES.some((it) => fileName.endsWith(it));

  if (!matches) {
    showErrorAlert(`выберите файл с расширением ${UPLOAD_FILES_TYPES.join(', ')}`, FILE_TYPE_ERROR_SHOW_TIME);
    return;
  }

  uploadImg.src = URL.createObjectURL(chosenFile);
});

const resetChosenFile = () => {
  uploadFileInput.value = '';
};

const resetUploadFormValues = () => {
  uploadForm.reset();
};

const uploadReset = () => {
  resetChosenFile();
  resetUploadFormValues();
  clearPristineErrors();
  resetPhotoScale();
  resetEffects();
};

export { uploadFileInput, uploadReset };
