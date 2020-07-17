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


  const toyList = document.getElementById("toy-collection");
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => {
      data.forEach(toy => {
        renderToys(toy);
      });
    })

  
  function renderToys(toy){
    const card = document.createElement('div');
        card.setAttribute('class', 'card');
        
        card.innerHTML = `
        <h2>${toy.name}<h2>
        <img class="toy-avatar" src="${toy.image}" />
        <p>${toy.likes}</p>
        <button class="like-btn"> ❤️ </button> 
        `
        toyList.append(card);
  }


    fetch(`http://localhost:3000/toys/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(response => response.json())
    .then(toy => {
      const name = toy.name
      alert("The Toy is: " + name)
  
  })



})

 
  



  







