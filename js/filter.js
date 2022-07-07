const sliderElement = document.querySelector('.effect-level__slider');
const picture = document.querySelector('.img-upload__preview');
const effectValue = document.querySelector('.effect-level__value');
const originFilter = document.querySelector('#effect-none');

const photoFilters = [
  {
    filterId: 'effect-none',
    filterName: 'original',
    filterEffect: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  {
    filterId: 'effect-chrome',
    filterName: 'chrome',
    filterEffect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  {
    filterId: 'effect-sepia',
    filterName: 'sepia',
    filterEffect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1

  },
  {
    filterId: 'effect-marvin',
    filterName: 'marvin',
    filterEffect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  {
    filterId: 'effect-phobos',
    filterName: 'phobos',
    filterEffect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },
  {
    filterId: 'effect-heat',
    filterName: 'marvin',
    filterEffect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3
  }
];

// Функция, возвращающая объект со значениями min, max ... для создания слайдера
function getParamSlider(objectPhotoFilter) {
  const paramFilter = {
    range: {
      min: Number(objectPhotoFilter.min),
      max: Number(objectPhotoFilter.max),
    },
    start: objectPhotoFilter.start,
    step: objectPhotoFilter.step,
    connect: 'lower'
  };
  return paramFilter;
}

function getValueEffect(filterObject) {
  effectValue.value = sliderElement.noUiSlider.get();
  // eslint-disable-next-line no-console
  console.log(effectValue.value);
  picture.style.filter = `${filterObject.filterEffect}(${effectValue.value})`;
}


function onFilterChange(event) {
  const filterElement = event.target.closest('.effects__list');
  if (filterElement) {
    const idFilter = event.target.id;
    const filterObject = photoFilters.find((photoFilter) => photoFilter.filterId === idFilter);
    if (event.target && idFilter !== 'null') {
      // eslint-disable-next-line no-console
      console.log('щёлк');
      noUiSlider.create(sliderElement, getParamSlider(filterObject));
      picture.classList.add(`effects__preview--${filterObject.filterName}`);
      sliderElement.noUiSlider.on('update', getValueEffect(filterObject));
    }
  }
}
const filterList = document.querySelector('.effects__list');
filterList.addEventListener('change', onFilterChange);

originFilter.addEventListener('click', (evt) => {
  if (evt.target.checked) {
    sliderElement.noUiSlider.destroy();
  }
});


