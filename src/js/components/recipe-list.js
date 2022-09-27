import 'Src/js/components/recipe-item';

class RecipeList extends HTMLElement {
  set contents(contents) {
    this._contents = contents;
    this.render();
  }

  render() {
    this.classList.add('mt-2');
    if (this._contents) {
      this.classList.add('row', 'row-cols-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-3');
      this._contents.forEach((content) => {
        const recipeItem = document.createElement('recipe-item');
        recipeItem.content = content;
        this.appendChild(recipeItem);
      });
    } else {
      this.innerHTML = `
                <div class="text-center">
                    <span class="fs-3 text-muted">
                        Recipe Not Found
                        <i class="bi bi-emoji-dizzy"></i>
                    </span>
                </div>
            `;
    }
  }
}

customElements.define('recipe-list', RecipeList);
