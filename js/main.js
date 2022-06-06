function getRandomNumber (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomNumber;

  if (min < 0 || min > max) {
    randomNumber = null;
    return randomNumber;
  }
  else if (min === max) {
    randomNumber = min;
    return randomNumber;
  }
  randomNumber = Math.random() * (max - min + 1);
  return Math.floor(randomNumber) + min;
}

getRandomNumber(0.5,0.6);

function isLengthValid (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
}

isLengthValid('Привет', 3);
