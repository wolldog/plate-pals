
var TitleBtn = document.querySelector('#mainPage');

var recipeId = (localStorage.getItem("methodId"))

var source

var ingredient

const methodApi = `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${recipeId}`

const drinksApi = `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${recipeId}`


fetch(methodApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        source = (data.meals[0]);
        displayMethod ();
        
      });
    } else { 
      alert('Error: ' + response.statusText);
    }
  });

  fetch(drinksApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        ingredient = (data.drinks[0]);
        displayFavDrink ();
        
      });
    } else { 
      alert('Error: ' + response.statusText);
    }
  });


function displayMethod () {
  
  document.getElementById("recipeTitle").innerHTML = source.strMeal;

  document.getElementById("recipeImg").src = source.strMealThumb;

  document.getElementById("recipeMethod").innerHTML = source.strIngredient1;
  document.getElementById("recipeIngredients").innerHTML = source.strInstructions;
  console.log(source)

}

function displayFavDrink () {
  document.getElementById("recipeTitle").innerHTML = ingredient.strDrink;
  document.getElementById("recipeImg").src = ingredient.strDrinkThumb;
  document.getElementById("recipeMethod").innerHTML = ingredient.strIngredient1;
  document.getElementById("recipeIngredients").innerHTML = ingredient.strInstructions;
  // Drink API
  console.log("Drink source")
  console.log(ingredient)
}

TitleBtn.addEventListener("click", toMainPage);

// Added a function that will take user back to the main html page
// Function that will bring user back to the main page 
function toMainPage() {
  document.location = ("../../index.html");
}
