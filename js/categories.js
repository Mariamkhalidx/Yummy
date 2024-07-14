

// Function to fetch categories from TheMealDB API
async function fetchCategories() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        
        const data = await response.json();
        const categories = data.categories;
        console.log(data);


        // Display categories on the page
        const categoriesList = document.getElementById('categories-list');
        categoriesList.innerHTML = categories.map(category => `
            <div class="category col-md-3 m-0 rounded-4 main mb-4" onclick="showRecipes('${category.strCategory}')">
                    <div class=" h-100">
                        <img src="${category.strCategoryThumb}" class="card-img-top" alt="${category.strcategories}">
                        <div class="show-cat">
  <h3 >${category.strCategory}</h3>
<p>${category.strCategoryDescription}</p>

</div>
                    </div>            </div>
        `).join('');

    } catch (error) {
        console.log('Error fetching categories:', error);
    }
}

// Function to navigate to recipes.html and pass selected category name
function showRecipes(categoryName) {
    window.location = `categories-recipes.html?category=${encodeURIComponent(categoryName)}`;
}

// Function to fetch and display recipes for a specific category
async function fetchRecipesForCategory(categoryName) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const data = await response.json();
        const recipes = data.meals;
        console.log(data);

        // Display recipes on the page
        const recipesList = document.getElementById('recipes-list');
        recipesList.innerHTML = recipes.map(recipe => `
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

    } catch (error) {
        console.log(`Error fetching recipes for category ${categoryName}:`, error);
    }
}

// Code execution based on current page
if (document.title === 'Categories') {
    // If on index.html page, fetch and display categories
    fetchCategories();
} else if (document.title === 'Recipes for Category') {
    // If on recipes.html page, extract category name from URL query parameter and fetch recipes
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');

    if (categoryName) {
        fetchRecipesForCategory(categoryName);
    } else {
        console.log('Category name not provided in URL.');
    }
}
