const picture = document.querySelector('.img-upload__preview');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const minValueScale = 25;
const maxValueScale = 100;
const stepValueScale = 25;
//Значение масштаба по умолчанию
const valueDefault = 100;
// Поле значение масштаба
const scale = document.querySelector('.scale__control--value');
let scaleCurrent = valueDefault;
scale.setAttribute('value', `${valueDefault}%`);

function updateScale() {
  scale.setAttribute('value', `${scaleCurrent}%`);
  picture.style.transform = `scale(${(scaleCurrent/100).toFixed(2)})`;
}

function getSmaller() {
  scaleCurrent = scaleCurrent - stepValueScale;
  if (scaleCurrent < minValueScale) {
    scaleCurrent = minValueScale;
  }
  updateScale();
}

function getBigger() {
  scaleCurrent = scaleCurrent + stepValueScale;
  if (scaleCurrent > maxValueScale) {
    scaleCurrent = maxValueScale;
  }
  updateScale();
}

buttonSmaller.addEventListener('click', getSmaller);
buttonBigger.addEventListener('click', getBigger);
