//************the details***************//
const mealDetails = document.getElementById('mealDetails');

document.addEventListener('DOMContentLoaded', function() {
    // Get meal ID from URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('id');

    // If no meal ID is found, show an error message
    if (!mealId) {
        document.getElementById('mealDetails').innerHTML = '<p>Meal ID not found.</p>';
        return;
    }

    // Fetch meal details based on meal ID
    fetchMealDetails(mealId);

});

async function fetchMealDetails(mealId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        if (data.meals === null || data.meals.length === 0) {
            document.getElementById('mealDetails').innerHTML = '<p>Meal details not found.</p>';
            return;
        }

        const meal = data.meals[0];
        
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
        let string = '';
        data.meals.forEach(meal => {
            string += `
            <div class="col-md-4">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <h2 >${meal.strMeal}</h2>

            </div>
            <div class="col-md-6">
                <h2 >Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3 ><strong>Area:</strong> <span >${meal.strArea}</span></h3>

                <h3 ><strong>Category:</strong> <span >${meal.strCategory}</span></h3>
                <h3 ><strong>Recipes:</strong></h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul
                         <h3 ><strong>Tages:</strong></h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

<a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
<a target="_blank" href="${meal.strYoutube
}" class="btn btn-danger">Youtube</a>
            </div>

            `;
        });
                // Append HTML string to mealContainer
                mealDetails.innerHTML = string;

    } catch (error) {
        console.log('Error fetching data:', error);
        document.getElementById('mealDetails').innerHTML = '<p>Failed to fetch data. Please try again later.</p>';
    }
}
