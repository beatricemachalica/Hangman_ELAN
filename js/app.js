// liste de nos mots
var words_liste = [
  "python",
  "javascript",
  "software",
  "games",
  "sql",
  "php",
  "technology",
  "computer",
  "responsive",
  "design",
];

let answer = "";
let maxWrong = 7;
document.getElementById("maxWrong").innerHTML = maxWrong;
let mistakes = 0;

// solution stackoverflow
// var item = items[Math.floor(Math.random() * items.length)];
function pickWord() {
  answer = words_liste[
    Math.floor(Math.random() * words_liste.length)
  ].toUpperCase();
}

// toUpperCase() convertie en majuscules.

// Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre x.

// Math.random() renvoie un nombre flottant pseudo-aléatoire
// compris dans l'intervalle [0, 1[ (ce qui signifie que 0 est compris dans l'intervalle mais que 1 en est exclu)
// selon une distribution approximativement uniforme sur cet intervalle.
// Ce nombre peut ensuite être multiplié afin de couvrir un autre intervalle.

// On execute la fonction :
pickWord();

let status = answer.split("").map((letter) => "_");

// generate underscores
function underscores() {
  for (let i = 0; i < status.length; i++) {
    document.getElementById("underscoreDiv").innerHTML +=
      `<span class="letterSpan">${status[i]}</span>` + ` `;
  }
}
underscores();
console.log(answer);

// keyboard generator
// autre solution pour une fonction compare qui est directement dans les buttons
// : map((letter) => `<button id='` + letter + `' onClick="compare('` + letter + `')">` + letter +`</button>`)
// .map permet de recréer un tableau à partir d'un tableau
function lettersListe() {
  let buttonsHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((letter) => `<button id='` + letter + `'>` + letter + `</button>`)
    .join("");
  document.getElementById("letters").innerHTML = buttonsHTML;
}
// L'objet Map représente un dictionnaire, autrement dit une carte de clés/valeurs.
// N'importe quelle valeur valable en JavaScript
// (que ce soit les objets ou les valeurs de types primitifs) peut être utilisée comme clé ou comme valeur.
// L'ordre d'insertion des clés est mémorisé dans l'objet et les boucles sur les Map parcourent les clés dans cet ordre.

// exemple de son utilisation :
// const array1 = [1, 4, 9, 16];
// pass a function to map
// const map1 = array1.map(x => x * 2);
// console.log(map1);
// expected output: Array [2, 8, 18, 32]

lettersListe();

const lettersKeys = document.querySelectorAll("#letters button");

for (let letterKey of lettersKeys) {
  letterKey.addEventListener("click", function () {
    let found = false;
    this.style.display = "none";
    for (let i = 0; i < answer.length; i++) {
      if (this.innerHTML === answer[i]) {
        found = true;
        status[i] = answer[i];
        document.querySelector("#underscoreDiv").children[i].innerHTML =
          answer[i];
      }
    }
    if (found === false) {
      mistakes = mistakes + 1;
      document.querySelector("#mistakes").innerHTML = mistakes;
    }
    if (mistakes === 7) {
      console.log("Game over !");
    }
  });
}

function reset() {
  document.querySelector("#underscoreDiv").innerHTML = "";
  mistakes = 0;
  pickWord();
  status = answer.split("").map((letter) => "_");
  underscores();
  lettersListe();
  console.log("reset est cliqué !");
}
