let rootNode = document.documentElement;

const buildCustomProp = (propName) => {
  return `--${propName}`;
}

const getComputedProp = (propName) => {
  return 0.001;
}

const getCustomProp = (propName) => {
  return rootNode.style.getPropertyValue(propName);
}

const setCustomProp = (propName, propValue) => {
  rootNode.style.setProperty(propName, propValue);
}

const changeHandler = (event) => {
  event.preventDefault();
  let elemDataset = event.target.dataset;

  if (elemDataset.propName) {
    let propName = buildCustomProp(elemDataset.propName);
    let propValue = (getCustomProp(propName)) ? '' : elemDataset.propValue;
    setCustomProp(propName, propValue);
  }

  if (elemDataset.propOverride) {
    let propName = buildCustomProp(elemDataset.propOverride);
    let propValue = elemDataset.propValue;
    setCustomProp(propName, propValue);
    /* Find a cleaner way to keep the element in the viewport as the zoom levels change */
    setTimeout(function(){
      document.querySelector(document.querySelector('#jump_to').value).scrollIntoView({
        block: 'center'
      });
    }, 1050)

  }
  if (event.target.id == 'jump_to') {
    document.querySelector(event.target.value).scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
  if (elemDataset.toggleClass) {
    rootNode.classList.toggle(elemDataset.toggleClass);
  }
}

const ready = () => {
  let formTemplate = document.querySelector('#template_form_controls').content.cloneNode(true);
  document.body.appendChild(formTemplate);
  document.addEventListener('change', changeHandler);
}

window.addEventListener('DOMContentLoaded', ready);

