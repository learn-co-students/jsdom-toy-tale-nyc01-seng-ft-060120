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

  // Start of code
  const toyForm = document.querySelector(".add-toy-form")
  const toyCollectionElement = document.getElementById('toy-collection');
  const url = 'http://localhost:3000/toys';

  fetch(url).then((response) => {
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
    btnElement.textContent = "Likes ❤"

    imageElement.src = data.image;
    imageElement.classList.add('toy-avatar');
    btnElement.classList.add('like-btn');

    toyElement.classList.add('card');
    toyElement.append(imageElement, toyNameElement, likesElement, btnElement);
    toyCollectionElement.appendChild(toyElement);
  }
  
  

  function addToy(body){
    fetch(url, {
      method: 'post',
      body: JSON.stringify(body)
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      ChromeSamples.log('Created Toy:', data.html_url);
    });
  }

  function formValues(e){
    e.preventDefault()
    const name = toyForm.name.value
    const image = toyForm.image.value
    console.log(name, image)
    addToy({
      name: name,
      likes: 10,
      image: image,
      id: 9
    })

    
  }
  
  
  toyForm.addEventListener("submit", formValues)

});
