const sliderElement = document.querySelector('.effect-level__slider');
const imgPreview = document.querySelector('.img-upload__preview');
//через стили это поле невидимое
const effectValueInput = document.querySelector('.effect-level__value');

//Описываем фильтры
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
    start: 0.5
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
    start: 0
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
    start: 0
  }
];

//Контейнер, в котором сидят все фильтры
const effectsList = document.querySelector('.effects__list');

function getParamSlider(filter) {
  return (
    {
      range: {
        min: filter.min,
        max: filter.max,
      },
      start: filter.start,
    });
}


function onFilterClick(evt) {
  console.log('Клик по фильтру');
  const currentIdFilter = evt.target.id;
  console.log(currentIdFilter);
  // По id находим на какой фильтр мы кликнули
  const currentFilter = photoFilters.find((photoFilter) => photoFilter.filterId === currentIdFilter);
  console.log(currentFilter);
  noUiSlider.create(sliderElement, getParamSlider(currentFilter));
  // Добавляем класс фотографии
  imgPreview.classList.add(`effects__preview--${currentFilter.filterName}`);
  // Обработчик событий на изменеие положения слайдера
  sliderElement.noUiSlider.on('update', onUpdateSlider);
}

function onOriginalFilterClick() {
  console.log('Клик по оригиналу');
  sliderElement.noUiSlider.destroy();
}

// Действия, при нажатии на один из фильтров
function getChange(evt) {
  if (evt.target.closest('.effects__list')) {
    if (evt.target.id !== 'effect-none') {
      onFilterClick(evt);
    } else {
      onOriginalFilterClick();
    }
  }
}
// Обработчик событий на изменение фильтра
effectsList.addEventListener('change', getChange);

function onUpdateSlider() {
  effectValueInput.value = sliderElement.noUiSlider.get();
  console.log(effectValueInput.value);
}