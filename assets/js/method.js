
var TitleBtn = document.querySelector('#mainPage');

var recipeId = (localStorage.getItem("methodId"))

var source

const methodApi = `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${recipeId}`
const methodApiDrink = `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${recipeId}`

fetch(methodApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        source = (data.meals[0]);
        displayMethod ();
        displayIngredients();
        
      });
    } else { 
      alert('Error: ' + response.statusText);
    }
  });

  fetch(methodApiDrink).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        source = (data.drinks[0]);
        displayMethodDrinks ();
        displayIngredients();
        
      });
    } else { 
      alert('Error: ' + response.statusText);
    }
  });



function displayMethod (){
  
  document.getElementById("recipeTitle").innerHTML = source.strMeal;
  document.getElementById("recipeImg").src = source.strMealThumb;
  document.getElementById("recipeMethod").innerHTML = source.strInstructions;

  console.log(source)
}
function displayMethodDrinks (){

  document.getElementById("recipeTitle").innerHTML = source.strDrink;
  document.getElementById("recipeImg").src = source.strDrinkThumb;
  document.getElementById("recipeMethod").innerHTML = source.strInstructions;
  console.log(source)
}

function displayIngredients() {

   
  document.getElementById("item-1").innerHTML = source.strIngredient1 + ' - ' + source.strMeasure1;
  document.getElementById("item-2").innerHTML = source.strIngredient2 + ' - ' + source.strMeasure2;
  document.getElementById("item-3").innerHTML = source.strIngredient3 + ' - ' + source.strMeasure4;
  document.getElementById("item-4").innerHTML = source.strIngredient4 + ' - ' + source.strMeasure5;
  document.getElementById("item-5").innerHTML = source.strIngredient5 + ' - ' + source.strMeasure6;
  document.getElementById("item-6").innerHTML = source.strIngredient6 + ' - ' + source.strMeasure7;
  document.getElementById("item-7").innerHTML = source.strIngredient7 + ' - ' + source.strMeasure8;
  document.getElementById("item-8").innerHTML = source.strIngredient8 + ' - ' + source.strMeasure9;


}





TitleBtn.addEventListener("click", toMainPage);

// Added a function that will take user back to the main html page
// Function that will bring user back to the main page 
function toMainPage() {
  document.location = ("../../index.html");
}
