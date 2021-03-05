var words_liste = [
  "teacher",
  "python",
  "javascript",
  "software",
  "games",
  "sql",
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
lettersListe();

const lettersKeys = document.querySelectorAll("#letters button");
let found = false;

for (let letterKey of lettersKeys) {
  letterKey.addEventListener("click", function () {
    this.style.display = "none";
    for (let i = 0; i < answer.length; i++) {
      if (this.innerHTML === answer[i]) {
        found = true;
        status[i] = answer[i];
        document.querySelector("#underscoreDiv").children[i].innerHTML =
          answer[i];
      }
      if (found === false) {
        mistakes = mistakes + 1;
        document.querySelector("#mistakes").innerHTML = mistakes;
      }
      if (mistakes === 7) {
        console.log("Game over !");
      }
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
