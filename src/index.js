let addToy = false;
const url = 'http://localhost:3000/toys';

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('.add-toy-form');
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formName = form.children[1]
    let formURL = form.children[3]
    let newToy = {};

    newToy.name = formName.value;
    newToy.url = formURL.value;
    newToy.likes = 0;
    
    createToy(newToy);
  });

  fetchToys()
});

function renderToys(toys){
  toys.forEach( toy => {
    renderToy(toy)
  })
}

function renderToy(toy) {
  const toyCollection = document.getElementById('toy-collection');

  let toyDiv = document.createElement('div')
  toyDiv.setAttribute('class', 'card')
  toyDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
  toyCollection.appendChild(toyDiv);
  
}

function fetchToys(){
  return fetch(url)
  .then(res => res.json())
  .then(toys => renderToys(toys))
}

function createToy(newToy){
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(newToy)
  }).then(res => res.json())
  .then(toy => (renderToy(toy)))
}