
var canadianFoodBtn = document.querySelector('#canadian-filter');
var frenchFoodBtn = document.querySelector('#french-filter');
var italianFoodBtn = document.querySelector('#italian-filter');
var chickenCatBtn = document.querySelector('#chicken-filter');
var seafoodCatBtn = document.querySelector('#seafood-filter');
var pastaCatBtn = document.querySelector('#pasta-filter');
var dessertCatBtn = document.querySelector('#dessert-filter');
var alcoholicBtn = document.querySelector('#alcoholic-filter');
var nonAlcoholicBtn = document.querySelector('#noAlcohol-filter');
var cocktailBtn = document.querySelector('#cocktail-filter');
var ordinaryDrinkBtn = document.querySelector('#ordinary-filter');
var favouritesBtn = document.querySelector('#favourites-btn');

var cardContainer = document.getElementById('card-container')
var cardContainer2 = document.getElementById('card-container-2')


let Random = `randomselection.php`
// Country
let Canadian = 'filter.php?a=Canadian'
let Italian = 'filter.php?a=Italian'
let French = 'filter.php?a=French'

// Category
let Seafood = 'filter.php?c=Seafood'
let Chicken = 'filter.php?c=Chicken'
let Pasta = 'filter.php?c=Pasta'
let Dessert = 'filter.php?c=Dessert'

// Alcohol
let Alcoholic = 'filter.php?a=Alcoholic'
let nonAlcholic = 'filter.php?a=Non_Alcoholic'
// Glass Type
let cocktailGlass = 'filter.php?g=Cocktail_glass'
let champagneFlute = 'filter.php?g=Champagne_flute'
// API URL's
var foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${Random}`
var cocktailApiUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/${Random}`


fetch(cocktailApiUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      displayDrinks(data)
      console.log("Drinks API");
      console.log(data);
        
    });
  } else { 
    alert('Error: ' + response.statusText);
  }
});


fetch(foodApiUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      displayMeals(data)
        
    });
  } else { 
    alert('Error: ' + response.statusText);
  }
});



function displayDrinks(instructions) {

  clearDiv2();

  console.log(instructions)
  
  for(var j = 0; j < 8; j++){
    var cardBodyDivEl = document.createElement('div');
    var cardTitleEl = document.createElement('h5');
    var colDivEl = document.createElement('div');
    var cardDivEl = document.createElement('div');
    var cardImg = document.createElement('img');

    colDivEl.setAttribute('class', 'col');
    cardDivEl.setAttribute('class', 'card');
    cardBodyDivEl.setAttribute('class', 'card-body');
    cardTitleEl.setAttribute('class', 'card-title');


    cardImg.src = instructions.drinks[j].strDrinkThumb;
    cardTitleEl.textContent = instructions.drinks[j].strDrink;

    
    cardContainer2.appendChild(colDivEl)
    colDivEl.appendChild(cardDivEl)
    cardDivEl.appendChild(cardImg)
    cardDivEl.appendChild(cardBodyDivEl)
    cardBodyDivEl.appendChild(cardTitleEl)


  }
}

// 'displayMeals' creates recipe cards based on the current search value. The initial search value
// is a random selection of 8 recipes. Each recipe card has an image, title, and favorite button.

function displayMeals(recipes) {

  // Clear existing cards before creating new set
  clearDiv();
  
  console.log(recipes)
  
  for(var i = 0; i < 8; i++){
    var cardBodyDivEl = document.createElement('div');
    var cardTitleEl = document.createElement('h5');
    var colDivEl = document.createElement('div');
    var cardDivEl = document.createElement('div');
    var cardImg = document.createElement('img');
    var btnEl = document.createElement('button');
    var btnIEl = document.createElement('i');

    colDivEl.setAttribute('class', 'col');
    cardDivEl.setAttribute('class', 'card');
    cardBodyDivEl.setAttribute('class', 'card-body');
    cardTitleEl.setAttribute('class', 'card-title');

//Set data attribute of button to the unique ID of recipe
    btnEl.setAttribute('data-value', recipes.meals[i].idMeal)
//Add event listener and intial class of favorites button
    btnEl.addEventListener("click", addToFavs);
    btnIEl.setAttribute("class", "bi bi-star")

    cardImg.src = recipes.meals[i].strMealThumb;
    cardTitleEl.textContent = recipes.meals[i].strMeal;
 
    //Append all elements
    cardContainer.appendChild(colDivEl)
    colDivEl.appendChild(cardDivEl)
    cardDivEl.appendChild(cardImg)
    cardDivEl.appendChild(cardBodyDivEl)
    cardBodyDivEl.appendChild(cardTitleEl)
    cardBodyDivEl.appendChild(btnEl)
    btnEl.appendChild(btnIEl)

    //Add filled star to a new favorite via class 'bi-star-fill'
    let favorites = []

      let myFavourites = JSON.parse(localStorage.getItem('mySavedFavs'));
      if (myFavourites !==null){
          favorites = myFavourites;
      }

      if (favorites.includes(recipes.meals[i].idMeal)){
        btnIEl.setAttribute ("class", "bi-star-fill")
      }

  }
}

// Add click listeners for the nav bar  refinement options and favourite button
canadianFoodBtn.addEventListener ("click", onlyCanadianFood );
frenchFoodBtn.addEventListener ("click", onlyFrenchFood );
italianFoodBtn.addEventListener ("click", onlyItalianFood );

chickenCatBtn.addEventListener ("click", onlyChickenFood );
seafoodCatBtn.addEventListener ("click", onlySeafood  );
pastaCatBtn.addEventListener ("click", onlyPastas);
dessertCatBtn.addEventListener ("click", onlyDesserts);

alcoholicBtn.addEventListener ("click", onlyAlcohols);
nonAlcoholicBtn.addEventListener ("click", noAlcohols);

cocktailBtn.addEventListener ("click", onlyCocktails);
ordinaryDrinkBtn.addEventListener ("click", onlyOrdinaryDrinks);



// Create a function that will dynamically refine the list of dispalyed based on the origin/area
function onlyCanadianFood(recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${Canadian}`

  fetch(foodApiUrl).then(function (response) {
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
    console.log("recipes after event click:");
    console.log(recipes);
    displayMeals(recipes);
}

function onlyFrenchFood(recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${French}`

  fetch(foodApiUrl).then(function (response) {
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
    console.log("recipes after event click:");
    console.log(recipes);
    displayMeals(recipes);
}

function onlyItalianFood(recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${Italian}`

  fetch(foodApiUrl).then(function (response) {
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
    console.log("recipes after event click:");
    console.log(recipes);
    displayMeals(recipes);
}

function onlyChickenFood(recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${Chicken}`

  fetch(foodApiUrl).then(function (response) {
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
    console.log("recipes after event click:");
    console.log(recipes);
    displayMeals(recipes);
}


function onlySeafood (recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${Seafood}`



  fetch(foodApiUrl).then(function (response) {
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
    console.log("recipes after event click:");
    console.log(recipes);
    displayMeals(recipes);
}

function onlyPastas (recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${Pasta}`



  fetch(foodApiUrl).then(function (response) {
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
    console.log("recipes after event click:");
    console.log(recipes);
    displayMeals(recipes);
}

function onlyDesserts (recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${Dessert}`



  fetch(foodApiUrl).then(function (response) {
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
    console.log("recipes after event click:");
    console.log(recipes);
    displayMeals(recipes);
}

function onlyAlcohols (instructions) {
  cocktailApiUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/${Alcoholic}`

  fetch(cocktailApiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayDrinks(data)
          console.log("data after event click:");
          console.log(data);
          
        });
      } else { 
        alert('Error: ' + response.statusText);
      }
    });
    // call display drinks function
    console.log("Instructions after event click:");
    console.log(instructions);
    displayDrinks(instructions);
}

function noAlcohols (instructions) {
  cocktailApiUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/${nonAlcholic}`

  fetch(cocktailApiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayDrinks(data)
          console.log("data after event click:");
          console.log(data);
          
        });
      } else { 
        alert('Error: ' + response.statusText);
      }
    });
    // call display drinks function
    console.log("Instructions after event click:");
    console.log(instructions);
    displayDrinks(instructions);
}

function onlyCocktails (instructions) {
  cocktailApiUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/${cocktailGlass}`

  fetch(cocktailApiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayDrinks(data)
          console.log("data after event click:");
          console.log(data);
          
        });
      } else { 
        alert('Error: ' + response.statusText);
      }
    });
    // call display drinks function
    console.log("Instructions after event click:");
    console.log(instructions);
    displayDrinks(instructions);
}

function onlyOrdinaryDrinks (instructions) {
  cocktailApiUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/${champagneFlute}`

  fetch(cocktailApiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayDrinks(data)
          console.log("data after event click:");
          console.log(data);
          
        });
      } else { 
        alert('Error: ' + response.statusText);
      }
    });
    // call display drinks function
    console.log("Instructions after event click:");
    console.log(instructions);
    displayDrinks(instructions);
}


// This function will display the list of favourited recipes stored in local storage
function displayFavorites () {
    console.log("Favorites was clicked");
}

// Clear div for food cards
function clearDiv () {
  cardContainer.textContent = "";
}

// Clear div for drink cards
function clearDiv2 () {
  cardContainer2.textContent = "";
}

//When 'Add to Favorites' is clicked.....
   
function addToFavs(event) {

  var recipeId = event.currentTarget.dataset.value;
  

  //Saved favourites are extracted from local storage
    
    let favorites = []
    let myFavourites = JSON.parse(localStorage.getItem('mySavedFavs'));
    if (myFavourites !==null){
        favorites = myFavourites;
    }

    //The saved recipes are searched for a matching mealID
    
    var findMatch = favorites.indexOf(recipeId)
    

    //If a match IS NOT found, the mealID is added to favorites and the array is saved to localstorage
    
    if (findMatch < 0){
      favorites.push(recipeId);
      localStorage.setItem('mySavedFavs', JSON.stringify(favorites))
      this.children[0].classList.remove("bi-star");
      this.children[0].classList.add("bi-star-fill")
      
    }
    //If a match IS found the mealID is removed from favorites and the array is saved to localstorage
    
    else {

      let removeFavorite = favorites.splice(findMatch, 1)
      localStorage.setItem('mySavedFavs', JSON.stringify(favorites))
      console.log(removeFavorite);
      this.children[0].classList.remove("bi-star-fill");
      this.children[0].classList.add("bi-star")


    }

  }
