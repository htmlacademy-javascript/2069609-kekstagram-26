const sliderElement = document.querySelector('.effect-level__slider');
const sliderField = document.querySelector('.img-upload__effect-level');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectValueInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const originFilterName = 'NONE';

function getParamSlider(filter) {
  return (
    {
      range: {
        min: filter.min,
        max: filter.max,
      },
      start: filter.start,
      step: filter.step
    });
}

function onUpdateSlider(filter) {
  return function() {
    effectValueInput.setAttribute('value', `${sliderElement.noUiSlider.get()}`);
    imgPreview.style.filter = `${filter.filterEffect}(${effectValueInput.value}${filter.formatValue})`;
  };
}

function desctroySlider() {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
    sliderField.classList.add('hidden');
  }
}

function updateOptionsSlider(evt, filtersList) {
  const currentNameFilter = evt.target.value.toUpperCase();
  const currentFilter = filtersList[currentNameFilter];
  sliderElement.noUiSlider.updateOptions(getParamSlider(currentFilter));
}

function renderSlider(evt, currentNameFilter, filtersList) {
  const currentFilter = filtersList[currentNameFilter];
  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, getParamSlider(currentFilter));
  } else {
    if (currentNameFilter !== originFilterName) {
      const onEffectClick = updateOptionsSlider(evt, filtersList);
      effectsList.addEventListener('click', onEffectClick);
    }
  }
  sliderElement.noUiSlider.on('update', onUpdateSlider(currentFilter));
}

export{getParamSlider, onUpdateSlider, desctroySlider, updateOptionsSlider, renderSlider};
