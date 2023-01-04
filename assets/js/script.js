
var foodbyOriginBtn = document.querySelector('#origin-filter');
var foodbyIngredientBtn = document.querySelector('#ingredient-filter');
var foodbyCategoryBtn = document.querySelector('#category-filter');


let search = `randomselection.php`

let filterByIngredient = 'filter.php?i=chicken_breast'

let filterByCategory = 'filter.php?c=Seafood'

let filterByArea = 'filter.php?a=Canadian'

var apiUrl = `https://www.themealdb.com/api/json/v2/9973533/${search}`



fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayMeals(data)
        
      });
    } else { 
      alert('Error: ' + response.statusText);
    }
  });

  function displayMeals(recipies) {
  
    var cardContainer = document.getElementById('card-container')
    
    console.log(recipies)
    
    for(var i = 0; i < 8; i++){
      var cardBodyDivEl = document.createElement('div');
      var cardTitleEl = document.createElement('h5');
      var colDivEl = document.createElement('div');
      var cardDivEl = document.createElement('div');
      var cardImg = document.createElement('img');
      
      colDivEl.setAttribute('class', 'col');
      cardDivEl.setAttribute('class', 'card');
      cardBodyDivEl.setAttribute('class', 'card-body');
      cardTitleEl.setAttribute('class', 'card-title');
      
      cardImg.src = recipies.meals[i].strMealThumb;
      cardTitleEl.textContent = recipies.meals[i].strMeal;
      
      cardContainer.appendChild(colDivEl)
      colDivEl.appendChild(cardDivEl)
      cardDivEl.appendChild(cardImg)
      cardDivEl.appendChild(cardBodyDivEl)
      cardBodyDivEl.appendChild(cardTitleEl)
    }
  }

  // Add click listeners for the food recipe and cocktail recipe refinement options
  foodbyOriginBtn.addEventListener ("click", refineByOrigin );
  foodbyIngredientBtn.addEventListener ("click", refineByIngredients );
  foodbyCategoryBtn.addEventListener ("click", refineByCategory  );



  // Create a function that will dynamically refine the list of dispalyed based on the origin/area
  function refineByOrigin(recipies) {
    // Here I wanna remove the card container entirely from the page when the function is called
    // I get errors here so I commented out:
    
    // cardContainer.style.display = "none";
    // cardBodyDivEl.style.display = "none";
    // cardTitleEl.style.display = "none";
    // colDivEl.style.display = "none";
    // cardDivEl.style.display = "none";
    // cardImg.style.display = "none";


    apiUrl = `https://www.themealdb.com/api/json/v2/9973533/${filterByArea}`



    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayMeals(data)
            console.log("data after event click:");
            console.log(data);
            
          });
        } else { 
          alert('Error: ' + response.statusText);
        }
      });
      // call display meals function
      console.log("recepies after event click:");
      console.log(recipies);
      displayMeals(recipies);
  }

  function refineByIngredients (recipies) {
    apiUrl = `https://www.themealdb.com/api/json/v2/9973533/${filterByIngredient}`



    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayMeals(data)
            console.log("data after event click:");
            console.log(data);
            
          });
        } else { 
          alert('Error: ' + response.statusText);
        }
      });
      // call display meals function
      console.log("recepies after event click:");
      console.log(recipies);
      displayMeals(recipies);
  }

  function refineByCategory (recipies) {
    apiUrl = `https://www.themealdb.com/api/json/v2/9973533/${filterByCategory}`



    fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayMeals(data)
            console.log("data after event click:");
            console.log(data);
            
          });
        } else { 
          alert('Error: ' + response.statusText);
        }
      });
      // call display meals function
      console.log("recepies after event click:");
      console.log(recipies);
      displayMeals(recipies);
  }