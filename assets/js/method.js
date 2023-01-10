
var TitleBtn = document.querySelector('#mainPage');

var recipeId = (localStorage.getItem("methodId"))

var source

const methodApi = `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${recipeId}`

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

function displayMethod (){
  
  document.getElementById("recipeTitle").innerHTML = source.strMeal;
  document.getElementById("recipeImg").src = source.strMealThumb;
  document.getElementById("recipeMethod").innerHTML = source.strInstructions;
  
  console.log(source)
}

function displayIngredients() {

  document.getElementById("recipeMethod").innerHTML = "";
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




 
 const apiURL = "https://www.themealdb.com/api/json/v2/9973533/";
   
   const urlParams = new URLSearchParams(window.location.search);
   const mealId = urlParams.get("mealId");
   
   // Fetch meal by ID
   fetch(`${apiURL}lookup.php?i=${mealId}`)
     .then(response => response.json())
     .then(data => {
       const meal = data.meals[0];
   
       // Create elements for meal name, image, ingredients, and instructions
       const mealContainer = document.querySelector(".meal-container");
       const mealName = document.createElement("h1");
       mealName.textContent = meal.strMeal;
       const img = document.createElement("img");
       img.setAttribute("src", meal.strMealThumb);
       img.setAttribute("alt", meal.strMeal);
       const ingredientsList = document.createElement("ul");
       ingredientsList.classList.add("ingredients-list");
       const instructions = document.createElement("p");
       instructions.classList.add("instructions");
       instructions.textContent = meal.strInstructions;
   
       // list of ingredients
       const ingredients = [];
       for (let i = 1; i <= 15; i++) {
         const ingredientMeasurement = meal[`strMeasure${i}`];
         if (ingredientMeasurement) {
           ingredients.push(`${ingredientMeasurement} ${meal[`strIngredient${i}`]}`);
         } else {
           break;
         }
       }
   
       // Add ingredients 
       ingredients.forEach(ingredient => {
         const listItem = document.createElement("li");
         listItem.textContent = ingredient;
         ingredientsList.appendChild(listItem);
       });
   
       
       mealContainer.appendChild(mealName);
       mealContainer.appendChild(img);
       mealContainer.appendChild(ingredientsList);
       mealContainer.appendChild(instructions);
     });


