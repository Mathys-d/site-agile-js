let feedPage = 1;

const tab = {
    strDrink: [],
    strCategory: [],
    dose: [],
    liste: [],
    ingrd: [],
    strInstructions: [],
};

let cpt = 0;
let l = 0;
let start = 0;

function newArticle(response) {
    console.log("reponse", response.strDrink);
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
    const ingredient = document.querySelector('#ingrd').value.trim();
    const unit = document.querySelector('#liste').value;
    const quantity = document.querySelector('#dose').value;

    if (drink && category && instructions && ingredient && unit && quantity) {
        const measure = `${quantity} ${unit}`;
        const wrapper = document.querySelector('#lastPosts');
        wrapper.prepend(newArticle({
            strDrink: drink,
            strCategory: category,
            strMeasure1: measure,
            strIngredient1: ingredient,
            strInstructions: instructions
        }));
    }
}

const wait = (delay = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
};

async function main() {
    for (cpt = 0; cpt < feedPage; cpt++) {
        const wrapper = document.querySelector('#lastPosts');
        const loader = document.createElement('p');
        loader.innerText = 'Chargement...';
        wrapper.prepend(loader);

        try {
            fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(response => {
                    loader.remove();
                    wrapper.prepend(newArticle(response.drinks[0]));
                    tab.strDrink.push(response.drinks[0].strDrink);
                    tab.strCategory.push(response.drinks[0].strCategory);
                });
        } catch (e) {
            loader.innerText = 'impossible a charger';
            loader.style.color = 'red';
            break;
        }

        await wait(500);
        console.log("après mon délai");
    }
}

document.querySelector('#raf').addEventListener('click', function () {
    let allChildrens = document.querySelectorAll(".feedBox");
    console.log(allChildrens);
    for (let i = 0; i < allChildrens.length; i++) {
        allChildrens[i].remove();
        main();
    }
});

function toggleInfo(element) {
    element.classList.toggle("open");
}

function toggleForm() {
    let ouvrir = document.getElementById("monFormulaireDrksID");
    if (ouvrir.style.display === "block") {
        ouvrir.style.display = "none";
    } else {
        ouvrir.style.display = "block";
    }
}

main();

let num = 1;

function ajout(element) {
    let formulaire = window.document.formulairedrks;

    let sup = document.createElement("button");
    sup.type = "button";
    sup.id = "btn";
    sup.textContent = "X";
    sup.onclick = function () {
        suppression(groupe);
    };

    let groupe = document.createElement("div");

    let champ1 = document.createElement("input");
    champ1.name = "champs1";
    champ1.type = "text";
    champ1.id = "ingrd" + num;

    let champ2 = document.createElement("input");
    champ2.name = "champs2";
    champ2.type = "number";
    champ2.id = "dose" + num;
    champ2.min = "0";
    champ2.value = "0";

    let champ3 = document.createElement("select");
    champ3.name = "champs3";
    champ3.id = "liste" + num;
    champ3.required = true;

    const options = [
        "cl", "oz", "shot", "cup", "cup pure",
        "drops", "scoops", "splashes", "packages"
    ];

    options.forEach(value => {
        let option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        champ3.appendChild(option);
    });

    groupe.appendChild(champ2);
    groupe.appendChild(champ3);
    groupe.appendChild(champ1);
    groupe.appendChild(sup);
    groupe.appendChild(document.createElement("br"));

    element.after(groupe);
    num++;
}

function suppression(element) {
    let formulaire = window.document.formulairedrks;
    element.remove();
    num--;
}
