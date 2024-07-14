// Function to fetch areas
async function fetchAreas() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    return data.meals;
}

// Function to fetch recipes by area
async function fetchRecipesByArea(area) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await response.json();
    return data.meals;
}

// Function to display areas
async function displayAreas() {
    const areas = await fetchAreas();
    const areasDiv = document.getElementById('areas');
    areasDiv.innerHTML = ''; // Clear existing content

    // Generate HTML content for areas
    const areasHTML = areas.map(area => `
            <div class="area col-md-3 m-0 rounded-4 main mb-4" onclick="showRecipes('${area.strArea}')">
                    <div class=" h-100">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
  <h3 >${area.strArea}</h3>

                    </div>            </div>    `).join('');
    areasDiv.innerHTML = areasHTML;
}

// Function to navigate to the area page
function showRecipes(area) {
    window.location.href = `areas-recipes.html?area=${encodeURIComponent(area)}`;
}

// Function to get URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        area: params.get('area')
    };
}

// Function to display recipes by area
async function displayRecipesByArea() {
    const { area } = getQueryParams();
    const recipes = await fetchRecipesByArea(area);
    const recipesDiv = document.getElementById('recipes');
    const title = document.getElementById('title');

    // Update the title
    title.textContent = `Recipes from ${area}`;
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
if (document.getElementById('areas')) {
    displayAreas();
} else if (document.getElementById('recipes')) {
    displayRecipesByArea();
}

