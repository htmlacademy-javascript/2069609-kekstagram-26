const picture = document.querySelector('.img-upload__preview');
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_VALUE = 25;
//Значение масштаба по умолчанию
const VALUE_DEFAULT = 100;
// Поле значение масштаба
const scale = document.querySelector('.scale__control--value');
let scaleCurrent = VALUE_DEFAULT;
scale.setAttribute('value', `${VALUE_DEFAULT}%`);

function updateScale(scaleValue) {
  scale.setAttribute('value', `${scaleValue}%`);
  picture.style.transform = `scale(${(scaleValue/100).toFixed(2)})`;
}

function getSmaller() {
  scaleCurrent = scaleCurrent - STEP_VALUE;
  if (scaleCurrent < MIN_VALUE) {
    scaleCurrent = MIN_VALUE;
  }
  updateScale(scaleCurrent);
}

function getBigger() {
  scaleCurrent = scaleCurrent + STEP_VALUE;
  if (scaleCurrent > MAX_VALUE) {
    scaleCurrent = MAX_VALUE;
  }
  updateScale(scaleCurrent);
}

export{updateScale, VALUE_DEFAULT, getBigger, getSmaller};

