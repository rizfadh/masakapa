class RecipeDetail extends HTMLElement {
  set content(content) {
    this._content = content;
    this.render();
  }

  set event(event) {
    this._event = event;
    this.render();
  }

  render() {
    const ingredients = () => {
      const list = document.createElement('div');
      list.classList.add('list');
      for (let i = 1; i <= 20; i += 1) {
        if (this._content[`strIngredient${i}`]) {
          if (this._content[`strMeasure${i}`] === ' ') this._content[`strMeasure${i}`] = 'To taste';
          const div = document.createElement('div');
          div.innerText = `${this._content[`strIngredient${i}`]} (${this._content[`strMeasure${i}`]})`;
          list.appendChild(div);
        }
      }
      return list.outerHTML;
    };

    const youtubeLink = () => {
      let link = '';
      if (this._content.strYoutube !== '') {
        link = `
                <a href="${this._content.strYoutube}" target="_blank" class="bg-danger text-white p-2 text-decoration-none rounded">
                    <i class="bi bi-youtube"></i>
                    Youtube
                </a>
                `;
      }
      return link;
    };

    this.innerHTML = `
            <div class="card bg-light border-0 shadow">
                <div class="row g-0">
                    <div class="col-12 col-md-4 position-relative">
                        <img src="${this._content.strMealThumb}" class="img-fluid rounded-start" alt="${this._content.strMeal}">
                        <div class="card-img-overlay">
                            <button class="bg-transparent fs-2 border-0">
                                <i class="bi bi-arrow-left-square-fill link-primary"></i>
                            </button>
                        </div>
                    </div>
                    <div class="pb-3 pb-md-0 col-12 col-md-8 align-self-center">
                        <div class="card-body text-center">
                            <h1 class="card-title text-primary">${this._content.strMeal}</h1>
                            <p class="card-text">${this._content.strCategory} From ${this._content.strArea}</p>
                            ${youtubeLink()}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-3 mt-2">
                <div class="col-12 col-md-5 col-lg-4">
                    <div class="bg-light h-100 p-3 rounded shadow">
                        <h3 class="bg-secondary text-dark text-center p-2 rounded">Ingredients</h3>
                        ${ingredients()}
                    </div>
                </div>
                <div class="col-12 col-md-7 col-lg-8">
                    <div class="bg-light h-100 p-3 rounded shadow">
                        <h3 class="bg-secondary text-dark text-center p-2 rounded">Instructions</h3>
                        <p class="text-justify">${this._content.strInstructions}</p>
                    </div>
                </div>
            </div
        `;
    this.querySelector('button').addEventListener('click', this._event);
  }
}

customElements.define('recipe-detail', RecipeDetail);
