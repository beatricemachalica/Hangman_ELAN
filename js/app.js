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
// On execute la fonction :
pickWord();

// toUpperCase() convertie en majuscules.

// Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre x.

// Math.random() renvoie un nombre flottant pseudo-aléatoire
// compris dans l'intervalle [0, 1[ (ce qui signifie que 0 est compris dans l'intervalle mais que 1 en est exclu)
// selon une distribution approximativement uniforme sur cet intervalle.
// Ce nombre peut ensuite être multiplié afin de couvrir un autre intervalle.

// état de la partie :
let status = answer.split("").map((letter) => "_");

// split() permet de diviser une chaîne de caractères à partir d'un séparateur pour fournir un tableau de sous-chaînes.

// .map permet de recréer un tableau à partir d'un tableau :

// L'objet Map représente un dictionnaire, autrement dit une carte de clés/valeurs.
// N'importe quelle valeur valable en JavaScript (que ce soit les objets ou les valeurs de types primitifs)
// peut être utilisée comme clé ou comme valeur.
// L'ordre d'insertion des clés est mémorisé dans l'objet et les boucles sur les Map parcourent les clés dans cet ordre.

// exemple de son utilisation :
// const array1 = [1, 4, 9, 16];
// pass a function to map
// const map1 = array1.map(x => x * 2);
// console.log(map1);
// expected output: Array [2, 8, 18, 32]

// generate underscores :
function underscores() {
  for (let i = 0; i < status.length; i++) {
    document.getElementById("underscoreDiv").innerHTML +=
      `<span class="letterSpan">${status[i]}</span>` + ` `;
  }
}
// On execute la fonction :
underscores();
console.log(answer);

// keyboard generator :

// autre solution pour une fonction compare qui est directement dans les buttons
// : map((letter) => `<button id='` + letter + `' onClick="compare('` + letter + `')">` + letter +`</button>`)

function lettersListe() {
  let buttonsHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((letter) => `<button id='` + letter + `'>` + letter + `</button>`)
    .join("");
  document.getElementById("letters").innerHTML = buttonsHTML;
}
// On execute la fonction :
lettersListe();

// (voir explication de .map plus haut)
// join() crée et renvoie une nouvelle chaîne de caractères en concaténant tous les éléments d'un tableau (ou d'un objet semblable à un tableau).
// La concaténation utilise la virgule ou une autre chaîne, fournie en argument, comme séparateur.

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
