// Function to fetch ingredients
async function fetchIngredients() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    console.log(data)

    return data.meals;
}

// Function to fetch recipes by ingredient
async function fetchRecipesByIngredient(ingredient) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
}

// Function to display ingredients
async function displayIngredients() {
    const ingredients = await fetchIngredients();
    const ingredientsDiv = document.getElementById('ingredients');
    ingredientsDiv.innerHTML = ''; // Clear existing content

    // Generate HTML content for ingredients
    const ingredientsHTML = ingredients.map(ingredient => `
               <div class="area col-md-3 m-0 rounded-4 main mb-4" onclick="showRecipes('${ingredient.strIngredient}')">
                    <div class=" h-100">
<i class="fa-solid fa-drumstick-bite fa-4x"></i>
  <h3 >${ingredient.strIngredient}</h3>
                        <p>${ingredient.strDescription?.split(" ").slice(0,20).join(" ")}</p>

                    </div>            </div>   
    `).join('');
    ingredientsDiv.innerHTML = ingredientsHTML;
}

// Function to navigate to the ingredient page
function showRecipes(ingredient) {
    window.location.href = `ingredients-recipes.html?ingredient=${encodeURIComponent(ingredient)}`;
}

// Function to get URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        ingredient: params.get('ingredient')
    };
}

// Function to display recipes by ingredient
async function displayRecipesByIngredient() {
    const { ingredient } = getQueryParams();
    const recipes = await fetchRecipesByIngredient(ingredient);
    const recipesDiv = document.getElementById('recipes');
    const title = document.getElementById('title-in');

    // Update the title
    title.textContent = `Recipes with ${ingredient}`;
    recipesDiv.innerHTML = ''; // Clear existing content

    // Generate HTML content for recipes
    const recipesHTML = recipes.map(recipe => `
                                   <a href="details.html?id=${recipe.idMeal}"

                <div class="col-md-3 m-0 rounded-4 main mb-4">
                    <div class=" h-100">
                        <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
<div class="show-name">
  <h4 >${recipe.strMeal}</h4>


</div>
                    </div>
                </div>
                  </a>
    `).join('');
    recipesDiv.innerHTML = recipesHTML;
}

// Determine which page is being viewed and call the appropriate function
if (document.getElementById('ingredients')) {
    displayIngredients();
} else if (document.getElementById('recipes')) {
    displayRecipesByIngredient();
}
