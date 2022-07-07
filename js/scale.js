const picture = document.querySelector('.img-upload__preview');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');

// Поле значение масштаба
const scale = document.querySelector('.scale__control--value');
let scaleCurrent = 100;
scale.value = `${scaleCurrent}%`;

buttonSmaller.addEventListener('click', getSmaller);
buttonBigger.addEventListener('click', getBigger);


function getScale() {
  scale.value = `${scaleCurrent}%`;
  picture.style.transform = `scale(${(scaleCurrent/100).toFixed(2)})`;
}

function getSmaller(value) {
  value = scaleCurrent;
  if (value >= 50) {
    scaleCurrent = scaleCurrent - 25;
    getScale();
  }
}

function getBigger(value) {
  value = scaleCurrent;
  if (value <= 75) {
    scaleCurrent = scaleCurrent + 25;
    getScale();
  }
}


