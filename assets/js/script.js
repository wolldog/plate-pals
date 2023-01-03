
let search = `randomselection.php`

const apiUrl = `https://www.themealdb.com/api/json/v2/9973533/${search}`



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