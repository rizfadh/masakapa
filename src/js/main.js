import 'Src/scss/style.scss';
import * as bootstrap from 'bootstrap';
import 'Src/js/components/category-list';
import 'Src/js/components/recipe-list';
import 'Src/js/components/recipe-detail';

const baseURL = 'https://www.themealdb.com/api/json/v1/1';
const webData = {
  categories: null,
  recipeByCategory: null,
  recipeSearch: null,
  recipeDetail: null,
};
const RENDER_ELEMENT = 'render-element';

const backToPrevious = (dataToNull) => {
  webData[dataToNull] = null;
  document.dispatchEvent(new Event(RENDER_ELEMENT));
};

const makeCategory = (category) => {
  const title = document.createElement('h2');
  title.classList.add('text-center', 'mb-0');
  title.innerText = 'Choose Category';
  const categoryList = document.createElement('category-list');
  categoryList.contents = category;
  return [title, categoryList];
};

const makeRecipeByCategory = (recipes) => {
  const header = document.createElement('div');
  header.classList.add('d-flex', 'justify-content-center');
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('bg-transparent', 'border-0', 'fs-2');
  button.innerHTML = '<i class="bi bi-arrow-left-square-fill link-primary"></i>';
  button.addEventListener('click', () => {
    const searchRecipeForm = document.querySelector('#searchRecipe');
    searchRecipeForm.value = '';
    backToPrevious('recipeByCategory');
  });
  const title = document.createElement('h2');
  title.classList.add('flex-grow-1', 'text-center', 'mb-0');
  title.innerText = 'Choose Recipe';
  header.append(button, title);
  const recipeList = document.createElement('recipe-list');
  recipeList.contents = recipes;
  return [header, recipeList];
};

const makeRecipeBySearch = (recipes) => {
  const title = document.createElement('h2');
  title.classList.add('text-center', 'mb-0');
  title.innerText = 'Choose Recipe';
  const recipeList = document.createElement('recipe-list');
  recipeList.contents = recipes;
  return [title, recipeList];
};

const makeRecipeDetail = (recipe) => {
  const recipeDetail = document.createElement('recipe-detail');
  recipeDetail.content = recipe;
  recipeDetail.event = () => {
    backToPrevious('recipeDetail');
  };
  return recipeDetail;
};

const makeModal = (title, message) => {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('id', 'myModal');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'myModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
          <h5 class="modal-title" id="myModalLabel">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <p>${message}</p>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-primary text-light" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
  `;
  modal.addEventListener('hidden.bs.modal', () => {
    modal.remove();
  });
  document.body.appendChild(modal);
  const bootstrapModal = new bootstrap.Modal('#myModal');
  bootstrapModal.show();
};

const getRecipeByCategory = (category) => {
  fetch(`${baseURL}/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((data) => {
      webData.recipeByCategory = data.meals;
      document.dispatchEvent(new Event(RENDER_ELEMENT));
      document.querySelector('#explore-article').scrollIntoView();
    })
    .catch((error) => makeModal('ERROR', error));
};

const getRecipeDetail = (id) => {
  fetch(`${baseURL}/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      const [recipe] = data.meals;
      webData.recipeDetail = recipe;
      document.dispatchEvent(new Event(RENDER_ELEMENT));
      document.querySelector('#explore-article').scrollIntoView();
    })
    .catch((error) => makeModal('ERROR', error));
};

const itemAddEvent = () => {
  const categoryItem = document.querySelectorAll('category-item');
  const recipeItem = document.querySelectorAll('recipe-item');
  if (categoryItem) {
    categoryItem.forEach((e) => {
      e.event = () => getRecipeByCategory(e.getAttribute('id'));
    });
  }
  if (recipeItem) {
    recipeItem.forEach((e) => {
      e.event = () => getRecipeDetail(e.getAttribute('id'));
    });
  }
};

document.addEventListener(RENDER_ELEMENT, () => {
  const content = document.querySelector('.content');
  const searchRecipeForm = document.querySelector('#searchRecipe');
  content.innerHTML = '';
  let element = null;

  if (webData.recipeDetail) element = makeRecipeDetail(webData.recipeDetail);
  else if (searchRecipeForm.value !== '') element = makeRecipeBySearch(webData.recipeSearch);
  else if (webData.recipeByCategory) element = makeRecipeByCategory(webData.recipeByCategory);
  else if (webData.categories) element = makeCategory(webData.categories);

  if (Array.isArray(element)) content.append(...element);
  else content.appendChild(element);
  itemAddEvent();
});

const getCategory = () => {
  fetch(`${baseURL}/categories.php`)
    .then((response) => response.json())
    .then((data) => {
      webData.categories = data.categories;
      document.dispatchEvent(new Event(RENDER_ELEMENT));
    })
    .catch((error) => makeModal('ERROR', error));
};

const searchRecipe = (value) => {
  if (value) {
    fetch(`${baseURL}/search.php?s=${value}`)
      .then((response) => response.json())
      .then((data) => {
        webData.recipeSearch = data.meals;
        document.dispatchEvent(new Event(RENDER_ELEMENT));
      })
      .catch((error) => makeModal('ERROR', error));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  getCategory();
  const searchRecipeForm = document.querySelector('#searchRecipe');
  searchRecipeForm.addEventListener('input', () => {
    if (searchRecipeForm.value === '') webData.recipeSearch = null;
    else {
      webData.recipeByCategory = null;
      webData.recipeDetail = null;
    }
    document.dispatchEvent(new Event(RENDER_ELEMENT));
    searchRecipe(searchRecipeForm.value);
  });
  const homeButton = document.querySelector('#homeButton');
  homeButton.addEventListener('click', () => {
    searchRecipeForm.value = '';
    webData.recipeByCategory = null;
    webData.recipeSearch = null;
    webData.recipeDetail = null;
    document.dispatchEvent(new Event(RENDER_ELEMENT));
  });
  const searchRecipeFocus = document.querySelector('#searchRecipeFocus');
  searchRecipeFocus.addEventListener('click', () => {
    searchRecipeForm.focus();
  });
});
