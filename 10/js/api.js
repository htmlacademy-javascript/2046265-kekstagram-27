const DATA_INCOMING_SERVER = 'https://27.javascript.pages.academy/kekstagram/data';
const ERROR_MESSAGE_FORM = 'Не удалось отправить форму. Попробуйте ещё раз';
const DATA_SEND_SERVER = 'https://27.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => {
  fetch(DATA_INCOMING_SERVER)
    .then((response) => response.json())
    .then((photo) => {
      onSuccess(photo);
    })
    .catch(() => {
      onError();
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    DATA_SEND_SERVER,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError(ERROR_MESSAGE_FORM);
    }
  }).catch(() => {
    onError(ERROR_MESSAGE_FORM);
  });
};

export {getData, sendData};
