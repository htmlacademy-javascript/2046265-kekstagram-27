const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgPreview = document.querySelector('.img-upload__preview img');
const fileChooser = document.querySelector('.img-upload__input');

const uploadFiles = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

export {uploadFiles};
