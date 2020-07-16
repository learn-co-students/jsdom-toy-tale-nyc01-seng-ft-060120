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
  const toyCollectionElement = document.getElementById('toy-collection');
  const url = 'http://localhost:3000/toys';

  fetch(url).then((response) => {
    return response.json();
  })
  .then(dataArray => {
    for (const data of dataArray) {
      console.log(data);
      addToy(data.image)
    }
  })

  function addToy(src) {
    console.log(src);
    const toyElement = document.createElement('div');
    const imageElement = document.createElement('img');

    imageElement.src = src;
    toyElement.classList.add('card');
    toyElement.appendChild(imageElement);

    toyCollectionElement.appendChild(toyElement);

  }


});
