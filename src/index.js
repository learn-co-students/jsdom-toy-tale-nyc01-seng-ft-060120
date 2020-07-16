// Pseudo Code
// √1. Add Toy Info to the Card
    // a. create a div for the new card 
    // b. Add h2, img w/ src & class "toy-avatar", p tag with likes the toy Has , button tag with class "like-btn"
// √2. Add A New Toy
    // a. When add toy button is selected, do post request and add card 
    // b. if fields are empty, don't send, and other validations - this is where we create our body
    // c. send post request via fetch - this is where we stringify it and send the post request
// √3. Increase Toy's Likes
    // a . read like count of that toy , add it to a variable
    // b. send a patch request with fetch to update the like count for that toy 
    // c. update the likes in the DOM

let addToy = false;
const toysURL = 'http://localhost:3000/toys';

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection')
  const newToyForm = document.querySelector('.add-toy-form')
  
  function addToyToList(object) {
    const toyDiv = document.createElement('div') 
    toyDiv.className = 'card'
    const toyName = document.createElement('h2')
    toyName.innerText = object['name']
    const toyImage = document.createElement('img')
    toyImage.className = 'toy-avatar'
    toyImage.setAttribute('src', object['image'])
    const toyLikes = document.createElement('p')
    toyLikes.innerText = `${object['likes']} Likes`
    const toyBTN = document.createElement('button')
    toyBTN.className = 'like-btn'
    toyBTN.setAttribute('id', object['id'])
    toyBTN.innerText = 'Like <3'
    toyDiv.append(toyName, toyImage, toyLikes, toyBTN)
    toyCollection.append(toyDiv)
  }

  fetch(toysURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      for(const toy of json) {
        addToyToList(toy)
      }
    })
    
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  newToyForm.addEventListener("submit", e => {
    e.preventDefault();
    let formData = {
      name: document.querySelectorAll('.input-text')[0].value, 
      image: document.querySelectorAll('.input-text')[1].value, 
      likes: 0
    };

    let configObj = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(toysURL, configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object){
      })
  })

  toyCollection.addEventListener('click', function(e) {
    if (e.target.className === "like-btn") {
      
      let formData = {
        likes: parseInt(e.target.previousSibling.innerText) + 1
      };

      let configObj = {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };

      fetch(`${toysURL}/${e.target.id}`, configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(object){
          console.log(object)
        })
    }
  })

});
