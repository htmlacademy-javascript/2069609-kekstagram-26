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
    formatValue: ''
  },
  {
    filterId: 'effect-chrome',
    filterName: 'chrome',
    filterEffect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    formatValue: ''
  },
  {
    filterId: 'effect-sepia',
    filterName: 'sepia',
    filterEffect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    formatValue: ''
  },
  {
    filterId: 'effect-marvin',
    filterName: 'marvin',
    filterEffect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    formatValue: '%'
  },
  {
    filterId: 'effect-phobos',
    filterName: 'phobos',
    filterEffect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    formatValue: 'px'
  },
  {
    filterId: 'effect-heat',
    filterName: 'marvin',
    filterEffect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    formatValue: ''
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
      start: filter.max,
      step: filter.step
    });
}

function onUpdateSlider(filter) {
  //ЗДЕСЬ ПРОИЗОШЛА КАКАЯ-ТО МАГИЯ. ПРОШУ ОБЪЯСНИТЬ, СДЕЛАЛА ИНТУИТИВНО!!!!!
  return function() {
    effectValueInput.value = sliderElement.noUiSlider.get();
    console.log(effectValueInput.value);
    imgPreview.style.filter = `${filter.filterEffect}(${effectValueInput.value}${filter.formatValue})`;
  };
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
  // Обработчик событий на изменеие уровня слайдера
  sliderElement.noUiSlider.on('update', onUpdateSlider(currentFilter));
}

function onOriginalFilterClick() {
  console.log('Клик по оригиналу');
  sliderElement.noUiSlider.destroy();
  //imgPreview.style.filter = '';
  imgPreview.className = 'img-upload__preview';
  imgPreview.style.filter = '';
  effectValueInput.value = '';
}

// Действия, при нажатии на один из фильтров
function onChangeFilter(evt) {
  if (evt.target.closest('.effects__list')) {
    if (evt.target.id !== 'effect-none') {
      onFilterClick(evt);
    } else {
      onOriginalFilterClick();
    }
  }
}
// Обработчик событий на изменение фильтра
effectsList.addEventListener('change', onChangeFilter);

