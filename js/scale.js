const picture = document.querySelector('.img-upload__preview');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_VALUE = 25;
//Значение масштаба по умолчанию
const VALUE_DEFAULT = 100;
// Поле значение масштаба
const scale = document.querySelector('.scale__control--value');
let scaleCurrent = VALUE_DEFAULT;
scale.setAttribute('value', `${VALUE_DEFAULT}%`);

function updateScale() {
  scale.setAttribute('value', `${scaleCurrent}%`);
  picture.style.transform = `scale(${(scaleCurrent/100).toFixed(2)})`;
}

function getSmaller() {
  scaleCurrent = scaleCurrent - STEP_VALUE;
  if (scaleCurrent < MIN_VALUE) {
    scaleCurrent = MIN_VALUE;
  }
  updateScale();
}

function getBigger() {
  scaleCurrent = scaleCurrent + STEP_VALUE;
  if (scaleCurrent > MAX_VALUE) {
    scaleCurrent = MAX_VALUE;
  }
  updateScale();
}

buttonSmaller.addEventListener('click', getSmaller);
buttonBigger.addEventListener('click', getBigger);
