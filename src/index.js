let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toysUrl = "http://localhost:3000/toys"
  const toyCollection = document.getElementById('toy-collection')

  

  // FETCH REQUESTS

  function fetchToys(){
    fetch(toysUrl)
    .then(response => response.json())
    .then(toys => toys.map(toy => renderToy(toy)))
  }

  function postToy(){
    const inputArray = document.querySelectorAll('input')
    fetch(toysUrl, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": `${inputArray[0].value}`,
        "image":`${inputArray[1].value}`,
        "likes": 0
      })
    }) .then(response => response.json())
       .then(toy => renderToy(toy));
  }

  function updateLikes(n, id){
    fetch(`${toysUrl}/${id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": parseInt(n,10)
      })
     })
    
  }


  //EVENT LISTENERS


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  toyFormContainer.addEventListener('submit',(e) => {
    e.preventDefault();
    postToy();
  });

  toyCollection.addEventListener('click',(e) => {
    if (e.target.className === 'like-btn'){
      let likesP = e.target.parentNode.querySelector('p')
      let toyId = e.target.parentNode.id
      likesP.innerText = `${parseInt(likesP.innerText,10) +1}`+  ` ` + `Likes`
      let newLikes = likesP.innerText.split(" ")[0]
    
      updateLikes(newLikes, toyId);
    }
  });
 
  

  // FUNCTIONS

  function renderToy(toy){
  
      const divCard = document.createElement('div')
      divCard.className = "card"
      divCard.id = `${toy.id}`
      divCard.innerHTML = `<h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>`
      toyCollection.append(divCard)
  }
  

  // EXECUTIONS 

    fetchToys();
});


//link up specific toy with the id in the database
