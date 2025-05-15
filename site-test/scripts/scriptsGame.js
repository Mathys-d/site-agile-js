let cartes = [];
const gallery = document.getElementById('grille');
const imgBack = 'https://imgs.search.brave.com/mdjVIziF44hrCX8b0dSrrpdYvEuOhB5EUO-Pg5mbhww/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3RpL3Bob3Rv/cy1ncmF0dWl0ZS90/Mi8xODkyNTkyMy1m/b25kLWRlZ3JhZGUt/YWJzdHJhaXQtcGhv/dG8uanBn'; 

const mockData = {
  "memory": {
    "difficulty": "easy",
    "nbPaires": 5,
    "apiLink": "https://mocki.io/v1/5e851730-8a27-4058-a333-0dc1ca97bf8c",
    "cartes": [
      {
        "id": 1,
        "image": "https://imgs.search.brave.com/wtpNa7FSxkgFdUvQv3XWu47e_0yBx8_CQvJMhsIMQE8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucmljYXJkb2N1/aXNpbmUuY29tL3Nl/cnZpY2VzL3JlY2lw/ZXMvMzM0Ni5qcGc",
        "name": "Mojito"
      },
      {
        "id": 2,
        "image": "https://imgs.search.brave.com/8W2B42LdIS5WmsVv1c9R1Sf5b8HSDrYLbwoH35YJPBc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcy/NDMwNjc0L3Bob3Rv/L21hcnRpbmkuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTZS/VDdITXV5dHhqbGVk/cGJ6b3lYR3dTN0df/a244dTl0Z01WekhH/YzJHSzQ9",
        "name": "Martini"
      },
      {
        "id": 3,
        "image": "https://imgs.search.brave.com/Emi2fUV8w-UgK6CwrbPQ2XNU9gegiOtBYZelBMnnJ-s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucmljYXJkb2N1/aXNpbmUuY29tL3Nl/cnZpY2VzL3JlY2lw/ZXMvODk5MC5qcGc",
        "name": "Piña Colada"
      },
      {
        "id": 4,
        "image": "https://imgs.search.brave.com/SgWA_wrbZ_JQydAqPoCUZI5p2eNX7xXPd_wWbrVth0Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODc5/ODQ2MDQvcGhvdG8v/Y29zbW9wb2xpdGFu/LWNvY2t0YWlsLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1z/TkNCdm82dE9laTRP/R2FPSE5GMV9ZY3V3/cnMyM19EblJTaHdH/WVVEOGVjPQ",
        "name": "Cosmopolitan"
      },
      {
        "id": 5,
        "image": "https://imgs.search.brave.com/i3E-ycy8XdWV_2Icc25vJ_iJraUDGLXW1-gZsUHZvVg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cGhvdG9zLXByZW1p/dW0vYmxvb2R5LW1h/cnktY29ja3RhaWxf/MTY1NTM2LTE3NDcy/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA",
        "name": "Bloody Mary"
      }
    ]
  }
};

async function fetchGame(difficulty) {
  const wrapper = document.querySelector('#grille');
  wrapper.innerHTML = ''; 
  const loader = document.createElement('p');
  loader.innerText = 'Chargement...';
  wrapper.appendChild(loader);

  let data = null;

  try {
    if (difficulty === 1) {
      data = mockData;
    } else if (difficulty === 2) {
      const res = await fetch('https://mocki.io/v1/2d48aa67-257c-44ac-a404-0eef9b275a46');
      data = await res.json();
    } else if (difficulty === 3) {
      const res = await fetch('https://mocki.io/v1/dbdb0cac-d60f-4446-ac3a-ccc480c9e6ba');
      data = await res.json();
    }

    loader.remove();
    cartes = data.memory.cartes;
    toggleGame();

  } catch (e) {
    loader.innerText = 'Impossible à charger';
    loader.style.color = 'red';
    console.error('Erreur lors du chargement:', e);
  }
}

function toggleGame() {
  const shuffledIndexes = shuffle([...Array(cartes.length).keys()]);
  let pairDeck = [];

  shuffledIndexes.forEach(i => {
    pairDeck.push(cartes[i]);
    pairDeck.push(cartes[i]);
  });

  pairDeck = shuffle(pairDeck);
  addCartes(pairDeck);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function addCartes(cartesList) {
  gallery.innerHTML = '';
  cartesList.forEach(carte => {
    const img = document.createElement('img');
    img.src = imgBack;
    img.dataset.src = carte.image;
    img.dataset.id = carte.id;
    img.alt = carte.name;
    img.classList.add('card');
    img.onclick = () => toggleTheImg(img);
    gallery.appendChild(img);
  });
}
let nb_clics = 0;
let case1 = null;
let case2 = null;
let img_ok = 0;
let nb_erreurs = 0;
let le_score = 0;
let isBlocked = false;

function toggleTheImg(img) {
  if (isBlocked || img.classList.contains('flipped') || img === case1) return;

  img.src = img.dataset.src;
  img.classList.add('flipped');

  if (nb_clics === 0) {
    case1 = img;
    nb_clics = 1;
  } else {
    case2 = img;
    nb_clics = 0;
    isBlocked = true; 

  
    if (case1 && case2) {
      if (case1.dataset.id === case2.dataset.id) {
        img_ok++;
        le_score++;
        case1 = null;
        case2 = null;
        isBlocked = false;

        if (img_ok === cartes.length) {
          setTimeout(() => alert("Bravo ! Vous avez gagné !"), 300);
        }
      } else {
        setTimeout(() => {
          if (case1) {
            case1.src = imgBack;
            case1.classList.remove('flipped');
          }
          if (case2) {
            case2.src = imgBack;
            case2.classList.remove('flipped');
          }
          case1 = null;
          case2 = null;
          nb_erreurs++;
          isBlocked = false;
        }, 1000);
      }
    } else {
      case1 = null;
      case2 = null;
      isBlocked = false;
    }
  }
}
