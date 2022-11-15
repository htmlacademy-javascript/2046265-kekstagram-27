const URL = https://27.javascript.pages.academy/kekstagram;

function getData (callback) {
  fetch(`${URL}/data`)
  .then((res) => res.json())
  .catch(() => {

  });
}
