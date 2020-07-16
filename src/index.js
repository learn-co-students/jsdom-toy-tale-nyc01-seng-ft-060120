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
  const toysUrl = "http://localhost:3000/toys"
  const toyCollection = document.getElementById('toy-collection')

  function fetchToys(){
    fetch(toysUrl)
    .then(response => response.json())
    .then(toys => renderToys(toys))
  }

  function renderToys(toys){
    for (let i = 0; i < toys.length; i++){
      const divCard = document.createElement('div')
      divCard.innerHTML = `<h2>${toys[i].name}</h2>
      
        <img src=${toys[i].image} class="toy-avatar" />
        <p>${toys[i].likes} Likes </p>
        <button class="like-btn">Like <3</button>`
      toyCollection.append(divCard)
    }
  }
  
    // "id": 1,
    // "name": "Woody",
    // "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
    // "likes": 5
  
    // createToyCard()
    // <div class="card">
    //   <h2>Woody</h2>
    //   <img src=toy_image_url class="toy-avatar" />
    //   <p>4 Likes </p>
    //   <button class="like-btn">Like <3</button>
    // </div>
  
    fetchToys()
});

