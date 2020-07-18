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

  function newToy(data){
    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data) 
    })
    .then(response => response.json())
    .then(toy => renderToy(toy))
  };


  
  toyFormContainer.addEventListener("submit", function(e){
    e.preventDefault();
    const toyNameInput = document.getElementsByTagName("input")[0]
    const toyImgInput = document.getElementsByTagName("input")[1]

    newToy({"name":`${toyNameInput.value}`, "image": `${toyImgInput.value}`});

  });





  function fetchToys() {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyObject => toyObject.map(toy => renderToy(toy)))
  };

  function renderToy(toy) {
    toyCard = document.createElement("div")
    toyCard.className = "card"
    toyCard.innerHTML = `
      <h2>${toy.name}</h2><br>
      <img src="${toy.image}" class="toy-avatar" /><br>
      <p>${toy.likes}</p><br>
      <button class="like-btn">Like<3</button>
    `
    toyCollection.append(toyCard)

    //last thing for here: 
  };

  console.log('all good')

  fetchToys();  
  newToy({"name": "Rudy", "image":"https://www.gannett-cdn.com/presto/2018/08/25/USAT/15c97a8b-8874-435d-9e44-18eb5b26ad35-rrudy_stl_9_h.jpg?width=300&height=438&fit=crop&format=pjpg&auto=webp", "likes":8});
});



// function iterateToys(toyArray){
//   for (i = 0; i < toyObject.length ; i++){
//     console.log(toyArray[i])
//   };
// };