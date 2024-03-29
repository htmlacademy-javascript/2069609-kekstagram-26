import {desctroySlider, renderSlider, showSlider} from './slider.js';

const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectValueInput = document.querySelector('.effect-level__value');

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

const originFilter = document.querySelector(`#${SliderConfigs.NONE.filterId}`);
//здесь не работает без setAttribute
effectValueInput.setAttribute('value', '1');

function onFilterClick(evt) {
  showSlider();
  const currentNameFilter = evt.target.value.toUpperCase();
  const currentFilter = SliderConfigs[currentNameFilter];
  renderSlider(evt, currentNameFilter, SliderConfigs);
  imgPreview.className = `effects__preview--${currentFilter.filterName}`;
}

function onOriginalFilterClick() {
  desctroySlider();
  imgPreview.className = '';
  imgPreview.style.filter = '';
  //здесь не работает без setAttribute
  effectValueInput.setAttribute('value', '1');
  originFilter.checked = true;
}

function onChangeFilter(evt) {
  if (evt.target.id !== SliderConfigs.NONE.filterId) {
    onFilterClick(evt);
  } else {
    onOriginalFilterClick();
  }
}

export{onOriginalFilterClick, onChangeFilter};
