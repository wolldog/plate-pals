const apiUrl = `https://www.themealdb.com/api/json/v2/9973533/${search}`

let search = ``

fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayMeals(data)
        
      });
    } else { 
      alert('Error: ' + response.statusText);
    }
  });