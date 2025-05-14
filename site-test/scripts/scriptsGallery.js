const feedPage = 0;
    const gallery = document.getElementById('gallery');

    async function fetchImages() {
      for (let i = 0; i < feedPage; i++) {
        try {
          const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
          const data = await res.json();
          const drink = data.drinks[0];

          const img = document.createElement('img');
          img.src = drink.strDrinkThumb;
          img.alt = drink.strDrink;
          gallery.appendChild(img);

          await new Promise(resolve => setTimeout(resolve, 300)); 
        } catch (e) {
          console.error("Erreur lors du chargement de l'image :", e);
        }
      }
    }

    function toggleImg() {
      const gallery = document.getElementById("gallery");
      const btn = document.querySelector("button");

      if (gallery.classList.contains("mosaic")) {
        gallery.classList.remove("mosaic");
        gallery.classList.add("column");
        btn.innerText = "Mosaic";
      } else {
        gallery.classList.remove("column");
        gallery.classList.add("mosaic");
        btn.innerText = "Column";
      }
    }

    function toggleNewImg() {
      fetchImages();
    }

    document.getElementById('imageForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const fileInput = document.getElementById('imageInput');
        const file = fileInput.files[0];

        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {

            const container = document.createElement('div');
            container.style.position = "relative";

            const img = document.createElement('img');
            img.src = event.target.result;
            img.alt = "Image utilisateur";

            const closeButton = document.createElement('button');
            closeButton.innerText = 'X';
            closeButton.id = 'booouuuutttonnn';


            closeButton.onclick = function () {
            container.remove();
            };

            container.appendChild(img);
            container.appendChild(closeButton);
            document.getElementById('gallery').appendChild(container);
        };
        reader.readAsDataURL(file);
        });
   fetchImages();

 const slides = document.querySelector('.slides');
    const slideCount = document.querySelectorAll('.slide').length;
    let index = 0;

    function showNextSlide() {
      index = (index + 1) % slideCount;
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(showNextSlide, 3000);