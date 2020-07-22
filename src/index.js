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

  // MY CODE BELOW 

  const toysUrl = "http://localhost:3000/toys/"
  const toyCollectionDiv = document.querySelector('#toy-collection')
  const addToyForm = document.querySelector('.add-toy-form')
  // console.log(addToyForm)

  function fetchToys(){

    fetch(toysUrl)
    .then(resp => resp.json())
    .then(toys => {
      toyCollectionDiv.innerHTML = ''
      renderAllToys(toys)})
  }

  function renderAllToys(toys){
    toys.forEach( toy => renderToy(toy))
  }

  function renderToy(toy){
    
    const divCard = document.createElement('div')
    divCard.classList += "card"
    divCard.dataset.toyId = toy.id
    divCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
    `

    const button = document.createElement('button')
    button.classList += "like-btn"
    
    
    button.innerText = "Like <3"

    toyCollectionDiv.append(divCard)
    divCard.append(button)

    button.addEventListener('click', (e) => addLikes(toy))
    
  }

  function addLikes(toy){
    const button = document.querySelector('.like-btn')
    const likes = toy.likes

    const newLikes = parseInt(likes, 10) + 1
    console.log(toysUrl + toy.id)
    console.log(newLikes)
   
      fetch(`${toysUrl}${toy.id}`,{
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
      fetchToys()
      // .then(resp => resp.json())
      // .then(data => renderToy(data))
      // .catch(errors => alert(errors.message))
  }
  
  function addNewToy(){
  
    addToyForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const nameInput = addToyForm.querySelector('[name="name"]')
      const imageInput = addToyForm.querySelector('[name="image"]')
      
      fetch(toysUrl,{
        method: "POST",
        headers: {
          "content-type":"application/json",
          "accept":"application/json"
        },
        body: JSON.stringify({
          name: nameInput.value,
          image: imageInput.value,
          likes: 0
        })
      })
      .then(resp => resp.json())
      .then( data => renderToy(data))

      resetForm(addToyForm)
    })
  }

  function resetForm(addToyForm){
    addToyForm.reset()
  }


fetchToys();
addNewToy();
});
