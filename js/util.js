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
  arrayOfElements.sort();
  for (let i = 0; i < arrayOfElements.length - 1; i++) {
    if (arrayOfElements[i] === arrayOfElements[i+1]) {
      return true;
    }
  }
  return false;
}

export {getRandomNumber, isLengthValid, isEscapeKey, haveSameElements};
