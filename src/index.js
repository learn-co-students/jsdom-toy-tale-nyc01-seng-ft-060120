// let toyObject;
document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection");
  let addToy = false;
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
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyObject => toyObject.map(toy => renderToy(toy)));
  }

  function renderToy(toy) {
    toyCard = document.createElement("div")
    toyCard.className = "card"
    toyCard.innerHTML = `
      <h2>${toy.name}</h2><br>
      <img src="${toy.image}"><br>
      <p>${toy.likes}</p><br>
      <button class="like-btn">Like<3</button>
     
    `
    toyCollection.append(toyCard)

    //last thing for here: 
  }

  console.log('all good')

  fetchToys()  
});



// function iterateToys(toyArray){
//   for (i = 0; i < toyObject.length ; i++){
//     console.log(toyArray[i])
//   };
// };