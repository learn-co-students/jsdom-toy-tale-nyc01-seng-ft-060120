
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyURL = `http://localhost:3000/toys`
  const toyCollectionDiv = document.querySelector('#toy-collection')
  const toyForm = document.querySelector('.add-toy-form')
  let addToy = false;
  
  
  function toggleForm(){
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
        } else {
          toyFormContainer.style.display = "none";
        }
      });
  }

  function fetchToys(){
    return fetch(toyURL)
            .then(resp => resp.json())
            .then(toyArray => renderAllToys(toyArray))
  }

  function renderAllToys(array){
    array.forEach(toy => {renderToy(toy)})
  }

  function renderToy(toy){
      const toyDiv = document.createElement('div')
      toyDiv.className = "card"
      toyDiv.id = toy.id
      toyCollectionDiv.prepend(toyDiv)
      toyDiv.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p><span>${toy.likes}</span> Likes </p>
        <button class="like-btn">Like <3</button>
        <button class="delete-toy">Delete Toy</button>
      `
      const likeBtn = document.querySelector('.like-btn')
      likeBtn.addEventListener("click", (e) => updateLikes(e,toy))

      const deleteBtn = document.querySelector('.delete-toy')
      deleteBtn.addEventListener("click", (e) => deleteToy(e,toy))
  }

  function updateLikes(e, toy){
    const span = e.target.previousElementSibling.children[0]
    let count = Number(span.innerText) + 1
    
    fetch(`${toyURL}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: count
      })
    })
    .then(resp => resp.json())
    .then(span.innerText = count)

  }

  function deleteToy(e, toy){
    console.log("in delete toy", toy.id)
    fetch(`${toyURL}/${toy.id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(e.target.parentElement.remove())
  }

  function submitToy(){
    toyForm.addEventListener("submit", (e) =>{
      e.preventDefault()
      const formInputs = toyForm.children

      fetch(toyURL,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application.json"
        },
        body: JSON.stringify({
          name: formInputs[1].value,
          image: formInputs[3].value,
          likes: 0
        })
      })
      .then(resp =>resp.json())
      .then(toy => renderToy(toy))

      resetForm()
    })
  }

  function resetForm(){
    console.log("reset")
    toyForm.reset()
  }

  toggleForm();
  submitToy();
  fetchToys();
});

