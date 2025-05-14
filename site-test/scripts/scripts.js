let feedPage = 5; 
let num = 1;

const tab = {
    strDrink: [],
    strCategory: [],
    strDrinkThumb: [],
};

async function main() {
    const wrapper = document.querySelector('#lastPosts');

    for (let cpt = 0; cpt < feedPage; cpt++) {
        const loader = document.createElement('p');
        loader.innerText = 'Chargement...';
        wrapper.prepend(loader);

        try {
            const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            const data = await res.json();
            const drink = data.drinks[0];

            wrapper.prepend(newArticle(drink));
            tab.strDrink.push(drink.strDrink);
            tab.strCategory.push(drink.strCategory);
            tab.strDrinkThumb.push(drink.strDrinkThumb);
        } catch (e) {
            loader.innerText = 'Impossible à charger';
            loader.style.color = 'red';
        } finally {
            loader.remove();
        }

        await wait(500);
    }
}

function newArticle(response) {
    const article = document.createElement('article');
    article.innerHTML = `
        <div class="feedBox" onclick="toggleInfo(this)">
            <p>${response.strDrink}</p>
            <p>${response.strCategory}</p> 
            <div class="feedBoxPlus">
                ${[...Array(15).keys()].map(i => {
                    const ingredient = response[`strIngredient${i + 1}`];
                    const measure = response[`strMeasure${i + 1}`];
                    return ingredient ? `<p>${measure ? measure + " of " : ""}${ingredient}</p>` : "";
                }).join("")}
                ${response.strInstructions ? `<p>Instructions: ${response.strInstructions}</p>` : ""}
            </div>
        </div>`;
    return article;
}

function send(event) {
    event.preventDefault();

    const drink = document.querySelector('#strDrink').value.trim();
    const category = document.querySelector('#strCategory').value;
    const instructions = document.querySelector('#strInstructions').value.trim();
    const wrapper = document.querySelector('#lastPosts');

    if (!drink || !category || !instructions) {
        alert("Please fill out the required fields.");
        return;
    }

    const ingredients = [];
    for (let i = 0; i < num; i++) {
        const ing = document.querySelector(`#ingrd${i}`);
        const dose = document.querySelector(`#dose${i}`);
        const unit = document.querySelector(`#liste${i}`);

        if (ing && ing.value.trim() && dose && unit && unit.value) {
            ingredients.push({
                [`strIngredient${ingredients.length + 1}`]: ing.value.trim(),
                [`strMeasure${ingredients.length + 1}`]: `${dose.value} ${unit.value}`
            });
        }
    }

    const drinkData = {
        strDrink: drink,
        strCategory: category,
        strInstructions: instructions
    };

    ingredients.forEach(obj => Object.assign(drinkData, obj));

    wrapper.prepend(newArticle(drinkData));

    document.getElementById('monFormulaire').reset();
    document.getElementById('monFormulaireDrksID').style.display = 'none';

    const groupes = document.querySelectorAll('[id^="ingrd"]:not(#ingrd0), [id^="dose"]:not(#dose0), [id^="liste"]:not(#liste0)');
    groupes.forEach(el => el.closest("div").remove());

    num = 1;
}

const wait = (delay = 1000) => new Promise(resolve => setTimeout(resolve, delay));

document.querySelector('#raf').addEventListener('click', function () {
    document.querySelectorAll(".feedBox").forEach(el => el.remove());
    main();
});

function toggleInfo(element) {
    element.classList.toggle("open");
}

function toggleForm() {
    const form = document.getElementById("monFormulaireDrksID");
    form.style.display = form.style.display === "block" ? "none" : "block";
}

function ajout(referenceElement) {
    const groupe = document.createElement("div");

    const champ1 = document.createElement("input");
    champ1.type = "text";
    champ1.id = `ingrd${num}`;

    const champ2 = document.createElement("input");
    champ2.type = "number";
    champ2.id = `dose${num}`;
    champ2.min = "0";
    champ2.value = "0";

    const champ3 = document.createElement("select");
    champ3.id = `liste${num}`;
    champ3.required = true;

    const options = ["select", "cl", "oz", "shot", "cup", "cup pure", "drops", "scoops", "splashes", "packages"];
    options.forEach(value => {
        const opt = document.createElement("option");
        opt.value = value;
        opt.textContent = value;
        champ3.appendChild(opt);
    });

    const sup = document.createElement("button");
    sup.type = "button";
    sup.textContent = "X";
    sup.onclick = () => suppression(groupe);

    groupe.appendChild(champ2);
    groupe.appendChild(champ3);
    groupe.appendChild(champ1);
    groupe.appendChild(sup);
    groupe.appendChild(document.createElement("br"));

    referenceElement.after(groupe);
    num++;
}

function suppression(element) {
    element.remove();
    num--;
}

window.onload = () => {
    const container = document.getElementById("ingredientContainer");
    ajout(container);
};

function createGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    tab.strDrinkThumb.forEach(url => {
        const image = document.createElement('img');
        image.src = url;
        image.alt = 'Cocktail image';
        image.style.width = "150px";
        image.style.margin = "10px";
        gallery.appendChild(image);
    });
}

main().then(() => {
    if (document.getElementById('gallery')) {
        createGallery();
    }
});
