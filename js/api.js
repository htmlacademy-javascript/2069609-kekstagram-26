const getData = (onSuccess, onFail) => {

  function getDataError() {
    onFail('Ошибка загрузки данных');
  }

  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(getDataError);
};

const sendData = (onSuccess, onFail, body) => {

  function sendDataError() {
    onFail('Ошибка загрузки данных');
  }

  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        sendDataError();
      }
    })
    .catch(sendDataError);
};

export {getData, sendData};
