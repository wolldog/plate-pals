
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
  
  debugger
  var carrot = document.getElementById("recipeIngredients")
  var number = 1
  var ingredient = `source.strIngredient${number}`

  for (var i=0; i > 20; i++){

    var liEl = document.createElement('li')
    console.log(ingredient)
    liEl.textContent = ingredient
    carrot.appendChild(liEl)
    number++
    
  }

  
}





TitleBtn.addEventListener("click", toMainPage);

// Added a function that will take user back to the main html page
// Function that will bring user back to the main page 
function toMainPage() {
  document.location = ("../../index.html");
}
