let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  
  
  
  function fetchToys() {
    const toysUrl = 'http://localhost:3000/toys'
    fetch(toysUrl)
    .then(resp => resp.json())
    .then(results => {
      results.forEach(toy => addToy(toy))
    })
  }
  
  function addToy(toy){
    const toyCollection = document.getElementById('toy-collection')
    const toyDiv = document.createElement('div')
    toyDiv.className = 'card'
    toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    `
    toyCollection.appendChild(toyDiv)
  }
  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", function(e){
    e.preventDefault()
    postToy(e)
  })


  function postToy(toy){
    const toysUrl = 'http://localhost:3000/toys'
    console.log(form)
    
    fetch(toysUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        "name": `${toy.name}`,
        "image": `${toy.image}`,
        "likes": `${toy.likes}`
      })
      .then (resp => resp.json())
      .then (toy => {
        addToy(toy)
      })
    })
  }

  

  fetchToys()
  addToy()
});

/*
When the page loads, make a 'GET' request to fetch all 
the toy objects. With the response data, make a <div class="card"> 
for each toy and add it to the toy-collection div.

    1. fetch request
    2. const for div where toys live
*/