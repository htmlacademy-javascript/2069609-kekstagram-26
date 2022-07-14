import {desctroySlider, renderSlider} from './slider.js';

const imgPreview = document.querySelector('.img-upload__preview');
//через стили это поле невидимое
const effectValueInput = document.querySelector('.effect-level__value');

//Описываем фильтры
const SliderConfigs = {
  NONE: {
    filterId: 'effect-none',
    filterName: '',
    filterEffect: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    formatValue: ''
  },
  CHROME: {
    filterId: 'effect-chrome',
    filterName: 'chrome',
    filterEffect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    formatValue: ''
  },
  SEPIA: {
    filterId: 'effect-sepia',
    filterName: 'sepia',
    filterEffect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    formatValue: ''
  },
  MARVIN: {
    filterId: 'effect-marvin',
    filterName: 'marvin',
    filterEffect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    formatValue: '%'
  },
  PHOBOS: {
    filterId: 'effect-phobos',
    filterName: 'phobos',
    filterEffect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    formatValue: 'px'
  },
  HEAT: {
    filterId: 'effect-heat',
    filterName: 'heat',
    filterEffect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    formatValue: ''
  }
};

effectValueInput.setAttribute('value', '1');

function onFilterClick(evt) {
  const currentNameFilter = evt.target.value.toUpperCase();
  const currentFilter = SliderConfigs[currentNameFilter];
  renderSlider(evt, currentNameFilter, SliderConfigs);
  imgPreview.className = `img-upload__preview effects__preview--${currentFilter.filterName}`;
}

function onOriginalFilterClick() {
  desctroySlider();
  const uploadForm = document.querySelector('.img-upload__form');
  uploadForm.reset();
  imgPreview.className = 'img-upload__preview';
  imgPreview.style.filter = '';
  effectValueInput.setAttribute('value', '1');
}

// Действия, при нажатии на один из фильтров
function onChangeFilter(evt) {
  if (evt.target.id !== 'effect-none') {
    onFilterClick(evt);
  } else {
    onOriginalFilterClick();
  }
}

export{onOriginalFilterClick, onChangeFilter};
