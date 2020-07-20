document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyURL = 'http://localhost:3000/toys'
  const toyCollection = document.getElementById('toy-collection')
  const toyForm = document.querySelector('.add-toy-form')

//fetch function

function fetchToys() {
  fetch(toyURL)
  .then(resp => resp.json())
  .then(toys => toys.forEach (toy => renderToy(toy)))

}
//render function
function renderToy(toy){
  const card = document.createElement('div')
  card.className = 'card' 
  card.id = toy.id
  card.innerHTML += `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p><span>${toy.likes}</span> Likes </p>
  <button class="like-btn">Like <3</button>`
  toyCollection.append(card)
}

//post function
function postToys(name, image){
  fetch(toyURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'image': image,
      'likes': 0
    })
  })
  .then(response => response.json())
  .then(toy => renderToy(toy))

}

//increase likes

function increaseLikes(event){
  let id = event.target.parentNode.id 
  let span = event.target.previousElementSibling.children[0]
  let count = Number(span.innerText) + 1

  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify({
      'likes': count
    })
  })
  .then(resp => resp.json())
  .then(span.innerHTML = count)
}

//event listeners
  document.addEventListener('click', (event)=> {
    if (event.target.className === 'like-btn'){
      increaseLikes(event)
    }
  })


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let toyName = document.getElementById('toy-name').value
        let toyImage = document.getElementById('toy-image').value
        postToys(toyName, toyImage)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys()
});
