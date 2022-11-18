const ALERT_SHOW_TIME = 5000;

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

let activeDialog = null;

const isActiveDialog = () => !!activeDialog;

const onKeydownHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closeDialog(activeDialog);
  }
};

function closeDialog (element) {
  element.remove();
  activeDialog = null;

  document.removeEventListener('keydown', onKeydownHandler);
}

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);

  const sectionError = document.querySelector('.error');
  activeDialog = sectionError;

  sectionError.addEventListener(('click'), (evt) => {
    if (evt.target.getAttribute('data-dialog-close')) {
      closeDialog(sectionError);
    }
  });

  document.addEventListener('keydown', onKeydownHandler);
};

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  document.body.appendChild(successMessage);

  const sectionSuccess = document.querySelector('.success');
  activeDialog = sectionSuccess;

  sectionSuccess.addEventListener(('click'), (evt) => {
    if (evt.target.getAttribute('data-dialog-close')) {
      closeDialog(sectionSuccess);
    }
  });

  document.addEventListener('keydown', onKeydownHandler);
};

const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('error-message');
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {isActiveDialog, showErrorMessage, showSuccessMessage, showAlertMessage};
