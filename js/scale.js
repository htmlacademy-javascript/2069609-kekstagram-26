const picture = document.querySelector('.img-upload__preview').querySelector('img');
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_VALUE = 25;
const VALUE_DEFAULT = 100;

const scale = document.querySelector('.scale__control--value');
let scaleCurrent = VALUE_DEFAULT;
//здесь не работает без setAttribute
scale.setAttribute('value', `${VALUE_DEFAULT}%`);

function updateScale(scaleValue) {
  //здесь не работает без setAttribute
  scale.setAttribute('value', `${scaleValue}%`);
  picture.style.transform = `scale(${(scaleValue/100).toFixed(2)})`;
}

function resetScale() {
  scaleCurrent = VALUE_DEFAULT;
  scale.setAttribute('value', `${VALUE_DEFAULT}%`);
  picture.style.transform = `scale(${(VALUE_DEFAULT/100).toFixed(2)})`;
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

export{resetScale, getBigger, getSmaller};
