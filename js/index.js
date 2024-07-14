let rowData = document.getElementById("rowData");
var nameInput=document.getElementById('nameInput');
var emailInput=document.getElementById('emailInput');
var phoneInput=document.getElementById('phoneInput');
var ageInput=document.getElementById('ageInput');
var passwordInput=document.getElementById('passwordInput');
var repasswordInput=document.getElementById('repasswordInput');
const submitBtn = document.getElementById('submitBtn');



//open nav
    function openSideNav() {
      $(".myNav").animate({
          left: 0
      }, 500)
  
  
      $(".open-close-icon").removeClass("fa-align-justify");
      $(".open-close-icon").addClass("fa-x");
  
  
      for (let i = 0; i < 5; i++) {
          $(".links li").eq(i).animate({
              top: 0
          }, (i + 5) * 100)
      }
  }
  
  function closeSideNav() {
      let boxWidth = $(".myNav .nav-tab").outerWidth()
      $(".myNav").animate({
          left: -boxWidth
      }, 500)
  
      $(".open-close-icon").addClass("fa-align-justify");
      $(".open-close-icon").removeClass("fa-x");
  
  
      $(".links li").animate({
          top: 300
      }, 500)
  }
  
  closeSideNav()
  $(".myNav i.open-close-icon").click(() => {
      if ($(".myNav").css("left") == "0px") {
          closeSideNav()
      } else {
          openSideNav()
      }
  })

//get&display recipes random
async function fetchMeals() {

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    loadingScreen('show');
    const startTime = Date.now();

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        displayMeals(data.meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        document.getElementById('mealContainer').innerHTML = '<p>Error fetching meals. Please try again later.</p>';
    } finally {
        // Calculate elapsed time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 300 - elapsedTime);

        // Ensure the loading screen is displayed for at least 6 seconds
        setTimeout(() => {
            loadingScreen('hide');
        }, remainingTime);
    }
}
async function displayMeals(meals) {
    const rowData = document.getElementById('rowData');
        rowData.innerHTML= meals.map(meal => `
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
        `).join('');
    };
    fetchMeals();

    function loadingScreen(action) {
        const loadingElement = document.getElementById('loading');
        if (action === 'show') {
            loadingElement.style.display = 'block';
        } else if (action === 'hide') {
            loadingElement.style.display = 'none';
        }
    }