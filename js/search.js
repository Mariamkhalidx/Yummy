//search by name

async function searchByName() {
    const mealName = document.getElementById('mealName').value.trim();
    const mealContainer = document.getElementById('mealContainer');
    mealContainer.innerHTML = ''; // Clear previous results


    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        const data = await response.json();
        console.log(data)


        if (data.meals === null) {
            mealContainer.innerHTML = '<p>No meal found, please try another name.</p>';
            return;
        }

        // Iterate over each meal and construct HTML string
        let string = '';
        data.meals.forEach(meal => {
            string += `
                                    <a href="details.html?id=${meal.idMeal}"

                <div class="col-md-3 m-0 rounded-4 main mb-4">
                    <div class=" h-100">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
<div class="show-name">
  <h4 >${meal.strMeal}</h4>


</div>
                    </div>
                </div>
                  </a>

            `;
        });

        // Append HTML string to mealContainer
        mealContainer.innerHTML = string;

    } catch (error) {
        console.log('Error fetching data:', error);
    }
}
//search by letter

async function searchByLetter() {
    const mealLetter = document.getElementById('mealLetter').value.trim();
    const mealContainer = document.getElementById('mealContainer');
    mealContainer.innerHTML = ''; // Clear previous results



    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`);
        const data = await response.json();

        if (data.meals === null) {
            mealContainer.innerHTML = '<p>No meal found, please try another name.</p>';
            return;
        }

        // Iterate over each meal and construct HTML string
        let string = '';
        data.meals.forEach(meal => {
            string += `
                                    <a href="details.html?id=${meal.idMeal}"

                <div class="col-md-3 m-0 rounded-4 main mb-4">
                    <div class=" h-100">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
<div class="show-name">
  <h4 >${meal.strMeal}</h4>


</div>
                    </div>
                </div>
                  </a>

            `;
        });

        // Append HTML string to mealContainer
        mealContainer.innerHTML = string;

    } catch (error) {
        console.log('Error fetching data:', error);
    }
}
