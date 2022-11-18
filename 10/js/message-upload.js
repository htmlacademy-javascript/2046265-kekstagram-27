const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();
const errorFragment = document.createDocumentFragment();

let keyDownErrorListener;
let keyDownSuccessListener;

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  errorFragment.appendChild(errorMessage);
  document.body.appendChild(errorFragment);

  const sectionError = document.querySelector('.error');

  sectionError.addEventListener(('click'), (evt) => {
    if (evt.target.closest('.error__button') || evt.target.closest('.error')) {
      sectionError.remove();
      document.removeEventListener('keydown', keyDownErrorListener);
    }
  });

  const keyDownEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      sectionError.remove();
    }
  };

  keyDownErrorListener = keyDownEscHandler;

  document.addEventListener('keydown', keyDownErrorListener);
};


const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  successFragment.appendChild(successMessage);
  document.body.appendChild(successFragment);

  const sectionSuccess = document.querySelector('.success');

  sectionSuccess.addEventListener(('click'), (evt) => {
    if (evt.target.closest('.success__button') || evt.target.closest('.success')) {
      sectionSuccess.remove();
      document.removeEventListener('keydown', keyDownSuccessListener);
    }
  });

  const KeyDownEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      sectionSuccess.remove();
    }
  };

  keyDownSuccessListener = KeyDownEscHandler;

  document.addEventListener('keydown', keyDownSuccessListener);
};

export {showErrorMessage, showSuccessMessage};
