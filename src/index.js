let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollection = document.getElementById("toy-collection");
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => {
      data.forEach(obj => {
        addToyDiv(obj);
      });
    })

  function addToyDiv(obj){
    const toyDiv = document.createElement('div');
    toyDiv.className = 'card';
    toyDiv.id = obj.id;
    toyDiv.innerHTML = `
      <h2>${obj.name}</h2>
      <img src=${obj.image} class = 'toy-avatar'/>
      <p>${obj.likes} Likes</p>
      <button class = 'like-btn'>Like <3</button>
    `
    toyCollection.appendChild(toyDiv);
    const button = toyDiv.lastElementChild;
    // console.log(button);
    button.addEventListener("click", function(e){
      let newDiv = e.target.parentNode;
      let childs = newDiv.childNodes;
      // console.log(childs);
      likesString = childs[5].innerText.charAt(0);
      // console.log(likesString);
      let newLikes = addLikes(likesString, obj.id);
      childs[5].innerText = `${newLikes} Likes`
    })
  }

  toyForm.addEventListener("submit", function(e){
    e.preventDefault();
    const list = toyForm.childNodes;
    // console.log(list);
    const toy = {}
    toy.name = list['3'].value;
    toy.src = list['7'].value;
    // console.log(toy);
    postToy(toy);

  })

  function postToy(toy) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy.name,
        "image": toy.src,
        "likes": 0
      })
    })
      .then(res => res.json())
      .then(obj => {
        // console.log(obj);
        addToyDiv(obj);
      })
  }

  // document.addEventListener("click", function(e)){

  // }

  function addLikes(likes, id){
    let intLikes = parseInt(likes, 10)+1
    // console.log(intLikes);
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        'likes': intLikes
      })
    })
      .then(resp => resp.json())
    return intLikes;
  }
});

