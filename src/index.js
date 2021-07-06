
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

  function fetchData (){
    fetch ('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyObject => 
      renderToys(toyObject))
    }



function renderToys(toyObject){
    toyObject.forEach(element => {
    const cardClass = document.createElement('div')
   cardClass.className = 'card'
   cardClass.innerHTML = `
   <h2>${element.name}</h2>
    <img src='${element.image}' class="toy-avatar" />
    <p> ${element.likes} Likes </p>
    <button class="like-btn">Like </button>
 `
 mainContainer.append(cardClass)
  });
 
}
const mainContainer = document.getElementById('toy-collection') 



const createBtn = document.querySelector('.submit')

document.addEventListener('submit', function(e){
  e.preventDefault()


const form = document.querySelector('.add-toy-form')
   const name = form.elements.name.value
  const image = form.elements.image.value
  const newToy = {
    name,
    image,
    likes: '0'
  }
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
      headers: 
          {
            "Content-Type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({
              "name": `${name}`,
              "image": `${image}`,
              "likes": 0
            })
          })
      form.reset()
})

// document.addEventListener('submit', function(e){
//   e.preventDefault()
//   const form = document.querySelector('.add-toy-form')
//   const name = form.elements.name.value
//   const image = form.elements.image.value




      fetchData()
});


// make div class 'card'
// fetch json data
