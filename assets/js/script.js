
var canadianFoodBtn = document.querySelector('#canadian-filter');
var frenchFoodBtn = document.querySelector('#french-filter');
var italianFoodBtn = document.querySelector('#italian-filter');
var britishFoodBtn = document.querySelector('#british-filter');
var japaneseFoodBtn = document.querySelector('#japanese-filter');
var americanFoodBtn = document.querySelector('#american-filter');
var chickenCatBtn = document.querySelector('#chicken-filter');
var seafoodCatBtn = document.querySelector('#seafood-filter');
var meatFoodBtn = document.querySelector('#meat-filter');
var pastaCatBtn = document.querySelector('#pasta-filter');
var dessertCatBtn = document.querySelector('#dessert-filter');
var alcoholicBtn = document.querySelector('#alcoholic-filter');
var nonAlcoholicBtn = document.querySelector('#noAlcohol-filter');
var cocktailBtn = document.querySelector('#cocktail-filter');
var ordinaryDrinkBtn = document.querySelector('#ordinary-filter');
var favouritesBtn = document.querySelector('#favourites-btn');



var cardContainer = document.getElementById('card-container')

var TitleBtn = document.querySelector('#mainPage');



let Random = `randomselection.php`
// Country
let Canadian = 'filter.php?a=Canadian'
let Italian = 'filter.php?a=Italian'
let French = 'filter.php?a=French'
let English = 'filter.php?a=English'
let Japanese = 'filter.php?a=Japanese'
let American = 'filter.php?a=American'
let British = 'filter.php?a=British'

// Category
let Seafood = 'filter.php?c=Seafood'
let Chicken = 'filter.php?c=Chicken'
let Pasta = 'filter.php?c=Pasta'
let Dessert = 'filter.php?c=Dessert'
let Meat = 'filter.php?c=Lamb'

// Alcohol
let Alcoholic = 'filter.php?a=Alcoholic'
let nonAlcholic = 'filter.php?a=Non_Alcoholic'
// Glass Type
let cocktailGlass = 'filter.php?g=Cocktail_glass'
let champagneFlute = 'filter.php?g=Champagne_flute'
// API URL's
var foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${Random}`
var cocktailApiUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/${Random}`


fetch(foodApiUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      displayMeals(data)
        
    });
  } else { 
    alert('Error: ' + response.statusText);
  }
});


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


// 'displayMeals' creates recipe cards based on the current search value. The initial search value
// is a random selection of 8 recipes. Each recipe card has an image, title, and favorite button.

function displayMeals(recipes) {

  // Clear existing cards before creating new set
  clearDiv();
  
  console.log(recipes)
  
  for(var i = 0; i < 8; i++){
    var cardBodyDivEl = document.createElement("div");
    var cardTitleEl = document.createElement("h5");
    var colDivEl = document.createElement("div");
    var cardDivEl = document.createElement("div");
    var cardImg = document.createElement("img");
    var btnEl = document.createElement("button");
    var iconEl = document.createElement("i");
    var linkEl = document.createElement("a")

    colDivEl.setAttribute("class", "col");
    cardDivEl.setAttribute("class", "card border border-0");
    cardBodyDivEl.setAttribute("class", "card-body");
    cardTitleEl.setAttribute("class", "card-title");
    
    // linkEl.setAttribute("href", "./assets/html/method.html")
    linkEl.setAttribute("data-value", recipes.meals[i].idMeal);
    linkEl.addEventListener("click", toMethod);

// Set 3 data attributes of button; unique ID, recipe name, recipe image. These will
// be used to create array of favorites in localStorage. 
    btnEl.setAttribute("data-id", recipes.meals[i].idMeal);
    btnEl.setAttribute("data-title", recipes.meals[i].strMeal);
    btnEl.setAttribute("data-image", recipes.meals[i].strMealThumb);

//Add event listener and intial class of favorites button
    btnEl.addEventListener("click", addToFavs);
    iconEl.setAttribute("class", "bi bi-star");
    cardImg.setAttribute("class", "img-fluid")

    cardImg.src = recipes.meals[i].strMealThumb;
    cardTitleEl.textContent = recipes.meals[i].strMeal;
 
    //Append all elements
    cardContainer.appendChild(colDivEl)
    colDivEl.appendChild(cardDivEl)
    cardDivEl.appendChild(linkEl)
    linkEl.appendChild(cardImg)
    cardDivEl.appendChild(cardBodyDivEl)
    cardBodyDivEl.appendChild(cardTitleEl)
    cardBodyDivEl.appendChild(btnEl)
    btnEl.appendChild(iconEl)

    //Add filled star to a new favorite via class 'bi-star-fill'
    let favorites = []

      let myFavourites = JSON.parse(localStorage.getItem('mySavedFavs'));
      if (myFavourites !==null){
          favorites = myFavourites;
      }

      if (favorites.includes(recipes.meals[i].idMeal)){
        iconEl.setAttribute ("class", "bi-star-fill")
      }

  }
}


function displayDrinks(instructions) {


  console.log(instructions)
  
  for(var j = 0; j < 8; j++){
    var cardBodyDivEl = document.createElement("div");
    var cardTitleEl = document.createElement("h5");
    var colDivEl = document.createElement("div");
    var cardDivEl = document.createElement("div");
    var cardImg = document.createElement("img");
    var btnEl = document.createElement("button");
    var iconEl = document.createElement("i");
    var linkEl = document.createElement("a")

    colDivEl.setAttribute("class", "col");
    cardDivEl.setAttribute("class", "card border border-0");
    cardBodyDivEl.setAttribute("class", "card-body");
    cardTitleEl.setAttribute("class", "card-title");

    linkEl.setAttribute("data-value", instructions.drinks[j].idDrink);
    linkEl.addEventListener("click", toMethod)
    
    //Set data attribute of button to the unique ID of recipe
    btnEl.setAttribute("data-id", instructions.drinks[j].idDrink);
    btnEl.setAttribute("data-title", instructions.drinks[j].strDrink);
    btnEl.setAttribute("data-image", instructions.drinks[j].strDrinkThumb);
    
    //Add event listener and intial class of favorites button
    btnEl.addEventListener("click", addToFavs);
    iconEl.setAttribute("class", "bi bi-star");
    cardImg.setAttribute("class", "img-fluid")

    cardImg.src = instructions.drinks[j].strDrinkThumb;
    cardTitleEl.textContent = instructions.drinks[j].strDrink;

    
    cardContainer.appendChild(colDivEl)
    colDivEl.appendChild(cardDivEl)
    cardDivEl.appendChild(linkEl)
    linkEl.appendChild(cardImg)
    cardDivEl.appendChild(cardBodyDivEl)
    cardBodyDivEl.appendChild(cardTitleEl)
    cardBodyDivEl.appendChild(btnEl)
    btnEl.appendChild(iconEl)

        //Add filled star to a new favorite via class 'bi-star-fill'
        let favorites = []

        let myFavourites = JSON.parse(localStorage.getItem('mySavedFavs'));
        if (myFavourites !==null){
            favorites = myFavourites;
        }
  
        if (favorites.includes(instructions.drinks[j].idDrink)){
          iconEl.setAttribute ("class", "bi-star-fill")
        }


  }
}


// Add click listeners for the nav bar  refinement options and favourite button
canadianFoodBtn.addEventListener ("click", onlyCanadianFood );
frenchFoodBtn.addEventListener ("click", onlyFrenchFood );
italianFoodBtn.addEventListener ("click", onlyItalianFood );
britishFoodBtn.addEventListener ("click", onlyBritishFood );
japaneseFoodBtn.addEventListener ("click", onlyJapaneseFood );
americanFoodBtn.addEventListener ("click", onlyAmericanFood );


chickenCatBtn.addEventListener ("click", onlyChickenFood );
seafoodCatBtn.addEventListener ("click", onlySeafood  );
pastaCatBtn.addEventListener ("click", onlyPastas);
dessertCatBtn.addEventListener ("click", onlyDesserts);
meatFoodBtn.addEventListener ("click", onlyMeats);

alcoholicBtn.addEventListener ("click", onlyAlcohols);
nonAlcoholicBtn.addEventListener ("click", noAlcohols);

cocktailBtn.addEventListener ("click", onlyCocktails);
ordinaryDrinkBtn.addEventListener ("click", onlyOrdinaryDrinks);
favouritesBtn.addEventListener ("click", displayFavorites);

TitleBtn.addEventListener("click", toMainPage);

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
    clearDiv();
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
    clearDiv();
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
    clearDiv();
    displayMeals(recipes);
}

function onlyBritishFood(recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${British}`

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
    clearDiv();
    displayMeals(recipes);
}

function onlyAmericanFood(recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${American}`

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
    clearDiv();
    displayMeals(recipes);
}
function onlyJapaneseFood(recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${Japanese}`

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
    clearDiv();
    displayMeals(recipes);
}

function onlyMeats(recipes) {

  foodApiUrl = `https://www.themealdb.com/api/json/v2/9973533/${Meat}`

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
    clearDiv();
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
    clearDiv();
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
    clearDiv();
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
    clearDiv();
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
    clearDiv();
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
    clearDiv();
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
    clearDiv();
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
    clearDiv();
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
    clearDiv();
    displayDrinks(instructions);
}



// Clear div for food cards
function clearDiv () {
  cardContainer.textContent = "";
}


//When 'Add to Favorites' is clicked.....
   
function addToFavs(event) {

  var recipeId = event.currentTarget.dataset.id;
  var recipeTitle = event.currentTarget.dataset.title;
  var recipeImage = event.currentTarget.dataset.image;


  var favoriteRecipes = {
    id: recipeId,
    title: recipeTitle,
    image: recipeImage
  }


  //Saved favourites are extracted from local storage
    
    let favorites = []
    let myFavourites = JSON.parse(localStorage.getItem('mySavedFavs'));
    if (myFavourites !==null) {
        favorites = myFavourites;
    }

    //The saved recipes are searched for a matching mealID
    
    var findMatch = favorites.map(item => item.id).indexOf(recipeId);
    console.log(findMatch)
    
    

    //If a match IS NOT found, the mealID is added to favorites and the array is saved to localstorage
    
    if (findMatch < 0){
      favorites.push(favoriteRecipes);
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

  function toMethod(event){
    
    var recipeId = event.currentTarget.dataset.value;
    localStorage.setItem("methodId", recipeId)
    document.location = ("./assets/html/method.html")
    
  }

// Function to display cards of recipes when 'Favorites' button is clicked. This differs 
// from the other display functions as it is using an array retrived from local Storage not 
// a call to an API
  
function displayFavorites() {

    clearDiv()
    
    let favorites = []
    let myFavourites = JSON.parse(localStorage.getItem('mySavedFavs'));
    if (myFavourites !==null){
        favorites = myFavourites;  
    }

    for(var i = 0; i < favorites.length; i++){
      var cardBodyDivEl = document.createElement("div");
      var cardTitleEl = document.createElement("h5");
      var colDivEl = document.createElement("div");
      var cardDivEl = document.createElement("div");
      var cardImg = document.createElement("img");
      var btnEl = document.createElement("button");
      var iconEl = document.createElement("i");
      var linkEl = document.createElement("a")
  
      colDivEl.setAttribute("class", "col");
      cardDivEl.setAttribute("class", "card border border-0");
      cardBodyDivEl.setAttribute("class", "card-body");
      cardTitleEl.setAttribute("class", "card-title");
      
      linkEl.setAttribute("data-value", favorites[i].id);
      linkEl.addEventListener("click", toMethod)
  
  //Set data attribute of button to the unique ID of recipe
      btnEl.setAttribute("data-id", favorites[i].id);
      btnEl.setAttribute("data-title", favorites[i].title);
      btnEl.setAttribute("data-image", favorites[i].image);
  
  //Add event listener and intial class of favorites button
      btnEl.addEventListener("click", addToFavs);
      iconEl.setAttribute ("class", "bi-star-fill");
      cardImg.setAttribute("class", "img-fluid")
  
      cardImg.src = favorites[i].image;
      cardTitleEl.textContent = favorites[i].title;
   
      //Append all elements
      cardContainer.appendChild(colDivEl)
      colDivEl.appendChild(cardDivEl)
      cardDivEl.appendChild(linkEl)
      linkEl.appendChild(cardImg)
      cardDivEl.appendChild(cardBodyDivEl)
      cardBodyDivEl.appendChild(cardTitleEl)
      cardBodyDivEl.appendChild(btnEl)
      btnEl.appendChild(iconEl)
    }


  }

// Function that will bring user back to the main page 
function toMainPage() {
  document.location = ("./index.html");
}

//carousel
const apiURL = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php";

setInterval(function() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      
      const meals = data.meals;

      
      const carouselInner = document.querySelector(".carousel-inner");
      carouselInner.innerHTML = "";

      // for Loop through meals
      for (let i = 0; i < meals.length; i++) {
      
        const meal = meals[i];

        // items for the carousel
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (i === 0) {
          carouselItem.classList.add("active");
        }

        // Created image for the meals
        const img = document.createElement("img");
        img.classList.add("d-block", "w-100");
        img.setAttribute("src", meal.strMealThumb);
        img.setAttribute("alt", meal.strMeal);

        
        const mealInfo = document.createElement("div");
        mealInfo.classList.add("meal-info");
        mealInfo.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <button id="view-recipe-btn" data-meal-id="${meal.idMeal}">View Full Recipe</button>
        `;

        
        carouselItem.appendChild(img);
        carouselItem.appendChild(mealInfo);
        carouselInner.appendChild(carouselItem);
      }

      var apiURL = "https://www.themealdb.com/api/json/v2/9973533/";

      var urlParams = new URLSearchParams(window.location.search);
      var mealId = urlParams.get("mealId");

      // Fetch meal by ID
      fetch(`${apiURL}lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
          var meal = data.meals[0];



          
          
        });


      // added event listener for the button
      document.querySelectorAll("#view-recipe-btn").forEach(button => {
        button.addEventListener("click", function() {
          const mealId = this.getAttribute("data-meal-id");
          const currentMeal = meals.find(meal => meal.idMeal === mealId);

          // Open full recipe in carousel.html
          openInNewPage(`./assets/html/method.html?mealId=${mealId}`);
        });
      });
    });
}, 5000);

function openInNewPage(url) {
  window.open(url);
}

function searchMeals(searchTerm) {
  const endpoint = 'https://www.themealdb.com/api/json/v2/9973533/search.php';
  const params = new URLSearchParams({ s: searchTerm });
  const url = `${endpoint}?${params}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // process the API response data here
    })
    .catch(error => {
      console.error(error);
    });
  }

