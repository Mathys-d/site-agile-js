let cartes = []
const gallery = document.getElementById('grille');
let bfkezvfkz ={
  "memory": {
    "difficulty": "easy",
    "nbPaires": 5,
    "apiLink": "https://mocki.io/v1/5e851730-8a27-4058-a333-0dc1ca97bf8c ",
    "cartes": [
      {
        "id": 1,
        "image": "https://www.gettyimages.in/photos/mojito",
        "name": "Mojito"
      },
      {
        "id": 2,
        "image": "https://fr.freepik.com/photos-vecteurs-libre/verres-martini",
        "name": "Martini"
      },
      {
        "id": 3,
        "image": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg",
        "name": "Piña Colada"
      },
      {
        "id": 4,
        "image": "https://images.pexels.com/photos/553823/pexels-photo-553823.jpeg",
        "name": "Cosmopolitan"
      },
      {
        "id": 5,
        "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
        "name": "Bloody Mary"
      }
    ]
  }
}

async function fetchGame(dfficulty) {
    
        const wrapper = document.querySelector('#grille');
        const loader = document.createElement('p');
        loader.innerText = 'Chargement...';
        wrapper.prepend(loader);
        let res = null;
        try {
            /*if (dfficulty === 1) {  res = await fetch('https://mocki.io/v1/5e851730-8a27-4058-a333-0dc1ca97bf8c');};*/
            if (dfficulty === 2) {  res = await fetch('https://mocki.io/v1/2d48aa67-257c-44ac-a404-0eef9b275a46');};
            if (dfficulty === 3) {  res = await fetch('https://mocki.io/v1/dbdb0cac-d60f-4446-ac3a-ccc480c9e6ba');};
            if (dfficulty === 1) {  res = bfkezvfkz;}
            console.log(res);
           /* const data = await res.json();*/
            const data =  res;

            loader.remove();
            console.log(data);
            cartes = data.memory.cartes;
            console.log(cartes);
            toggleGame();
        } catch (e) {
            loader.innerText = 'Impossible à charger';
            loader.style.color = 'red';
    }
}

function toggleGame() {
    for(let i = 0; i<cartes.length; i++){
          const img = document.createElement('img');
          img.src = cartes[i].image;
          console.log(cartes[i]);
          img.id =cartes[i].id;
          img.alt =cartes[i].name;
          gallery.appendChild(img);
    }
      for(let i = 0; i<cartes.length; i++){
          const img = document.createElement('img');
          img.src = cartes[i].image;
          console.log(cartes[i]);
          img.id =cartes[i].id;
          img.alt =cartes[i].name;
          gallery.appendChild(img);
    }
    
}
