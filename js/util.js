const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function getRandomNumber (minRange, maxRange) {
  let randomNumber;
  if (minRange < 0 || minRange > maxRange) {
    randomNumber = null;
    throw new RangeError('!!Проверьте значения диапазона!!');
  }

  const min = Math.ceil(minRange);
  const max = Math.floor(maxRange);

  if (min > max) {
    randomNumber = null;
    throw new RangeError('!!Проверьте значения диапазона!!');
  }
  if (min === max) {
    randomNumber = min;
    return randomNumber;
  }

  randomNumber = Math.random() * (max - min + 1);
  return Math.floor(randomNumber) + min;
}

function isLengthValid (str, maxLength) {
  if (typeof str !== 'string') {
    throw new RangeError('!!Проверяемое значениме не является строкой!!');
  }
  return str.length <= maxLength;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

function haveSameElements(arrayOfElements) {
  return [...new Set(arrayOfElements)].length !== arrayOfElements.length;
}

export {getRandomNumber, isLengthValid, isEscapeKey, haveSameElements, showAlert};
