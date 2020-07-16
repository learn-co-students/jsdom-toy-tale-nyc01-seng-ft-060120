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

  const toyForm = document.querySelector(".add-toy-form")
  const toyCollectionElement = document.getElementById('toy-collection');
  const toyIndexUrl = 'http://localhost:3000/toys';

  toyForm.addEventListener("submit", addToy)

  // Load the toys from the database
  fetch(toyIndexUrl).then((response) => {
    return response.json();
  })
  .then(dataArray => {
    for (const data of dataArray) {
      getToys(data)
    }
  })

  function getToys(data) {
    const toyElement = document.createElement('div');
    const imageElement = document.createElement('img');
    const likesElement = document.createElement('p');
    const toyNameElement = document.createElement('h2');
    const btnElement = document.createElement('button');

    toyNameElement.textContent = data.name
    likesElement.textContent = data.likes

    imageElement.src = data.image;
    imageElement.classList.add('toy-avatar');

    btnElement.textContent = "Likes ❤"
    btnElement.addEventListener('click', addLikes);
    btnElement.classList.add('like-btn');

    toyElement.classList.add('card');
    toyElement.dataset.toyId = data.id;
    toyElement.append(imageElement, toyNameElement, likesElement, btnElement);
    toyCollectionElement.appendChild(toyElement);
  }

  function updateToy(toyId, newLikes) {
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers:
      {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: newLikes})
    })
  }

  function addLikes(e) {
    const toyId = e.target.parentNode.dataset.toyId
    fetch(`http://localhost:3000/toys/${toyId}`)
    .then((resp) => {
      return resp.json();

    }).then((data) => {
      let likes = data.likes;
      const pElement = e.target.parentNode.children[2];
      pElement.textContent = likes+1;
      updateToy(toyId, likes+1);
    })
  }
  function addToy(e){
    e.preventDefault();
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
      {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues())
    })
  }

  function formValues(){
    const name = toyForm.name.value
    const image = toyForm.image.value
    return { name: name, likes: 10, image: image};
  }

});
