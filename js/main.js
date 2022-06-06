function getRandomNumber (a, b) {
  let randomNumber;
  if (a < 0 || a > b) {
    randomNumber = null;
    throw '!!Проверьте значения диапазона!!';
  }

  const min = Math.ceil(a);
  const max = Math.floor(b);

  if (min > max) {
    randomNumber = null;
    throw '!!Проверьте значения диапазона!!';
  }
  if (min === max) {
    randomNumber = min;
    return randomNumber;
  }

  randomNumber = Math.random() * (max - min + 1);
  return Math.floor(randomNumber) + min;
}

getRandomNumber(0.5,0.6);


function isLengthValid (str, maxLength) {
  if (typeof str !== 'string') {
    throw '!!Проверяемое значениме не является строкой!!';
  }
  return (str.length <= maxLength);
}

isLengthValid('Привет',3);
