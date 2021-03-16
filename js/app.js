let answer = "";
let maxWrong = 7;
document.getElementById("maxWrong").innerHTML = maxWrong;
let mistakes = 0;
let status = [];

// On récupère tous les boutons (eh oui y en a plusieurs avec la class topic)
// On fait une bouuuuuuuuuuuuuuuuucle
// On fait l'eventListener <3

const topicButtons = document.querySelectorAll(".topic");
// console.log(topicButtons);

for (let button of topicButtons) {
  // quand on clique sur un bouton
  button.addEventListener("click", function () {
    let theme = this.innerHTML;
    // console.log(theme);

    // l'appel AJAX - il doit se faire dans l'eventListener au dessus, sinon ça va pas marcher
    fetch("http://localhost/Hangman_game_ajax/server/word.php", {
      method: "POST",
      body: JSON.stringify({
        theme,
      }),
    })
      .then((res) => res.json())
      // on récupèrera un mot qui sera le mot à trouver "answer"
      .then((data) => {
        answer = data[
          Math.floor(Math.random() * data.length)
        ].nom.toUpperCase();
        // answer = data.toUpperCase();
        console.log(answer);

        // on est en asynchrone, donc il faut charger le reste du code

        // état de la partie :
        let status = answer.split("").map((letter) => "_");

        // generate underscores :
        function underscores() {
          for (let i = 0; i < status.length; i++) {
            document.getElementById("underscoreDiv").innerHTML +=
              `<span class="letterSpan">${status[i]}</span>` + ` `;
          }
        }
        // On execute la fonction :
        underscores();

        // On sélectionne toutes les lettres-boutons qu'on stocke dans lettersKeys
        const lettersKeys = document.querySelectorAll("#letters button");

        for (let letterKey of lettersKeys) {
          // quand on clique sur un bouton-lettre
          letterKey.addEventListener("click", function () {
            let found = false;
            this.style.display = "none";
            // on parcours le mot answer à l'aide de for et i
            for (let i = 0; i < answer.length; i++) {
              // on compare ce qu'on clique avec toutes les lettres de answer grâce à for et i
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
              document.querySelector(".hangman_" + mistakes).style.opacity = 1;
            }
            if (mistakes === 7) {
              console.log("Game over !");
              document.querySelector(".msg").innerHTML =
                "Game over ... The right answer was : " + answer.toLowerCase();
              document.querySelector("#letters").style.display = "none";
            }
          });
        }
      });
  });
}

function lettersListe() {
  let buttonsHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((letter) => `<button id='` + letter + `'>` + letter + `</button>`) // (voir explication de .map plus bas)
    .join("");
  // join() crée et renvoie une nouvelle chaîne de caractères en concaténant
  // tous les éléments d'un tableau (ou d'un objet semblable à un tableau).
  // La concaténation utilise la virgule ou une autre chaîne, fournie en argument, comme séparateur.
  document.getElementById("letters").innerHTML = buttonsHTML;
}
// On execute la fonction :
lettersListe();

// console.log(status);
// console.log(answer);
// if (status == answer) {
//   document.querySelector(".msg").innerHTML = "victoire !";
// }

// fonction pour reset la partie avec un reload de la page :
function reset() {
  document.location.reload();
}

// work in progress !
// fonction pour reset la partie :
// function reset() {
//   mistakes = 0;
//   status = answer.split("").map((letter) => "_");
//   document.querySelector("#underscoreDiv").innerHTML = "";
//   underscores();
//   lettersListe();
//   console.log(answer);
//   console.log(lettersKeys);
// }

// ************ ancienne méthode sans DB *************************
// on devait utiliser une liste de mots "words_liste"
// puis utiliser une fonction qui prend un mot au hasard "pickWord()"

// liste de nos mots
// var words_liste = [
//   "python",
//   "javascript",
//   "software",
//   "CSS",
//   "sql",
//   "php",
//   "technology",
//   "computer",
//   "responsive",
//   "design",
// ];

// solution stackoverflow :
// var items = Array(523, 3452, 334, 31, ..., 5346);
// var item = items[Math.floor(Math.random() * items.length)];

// function pickWord() {
//   answer = words_liste[
//     Math.floor(Math.random() * words_liste.length)
//   ].toUpperCase();
// }
// On execute la fonction :
// pickWord();

// ****************************************************************

// ****** comment ça marche ? ******

// toUpperCase() convertie en majuscules.
// Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre x.

// Math.random() renvoie un nombre flottant pseudo-aléatoire
// compris dans l'intervalle [0, 1[ (ce qui signifie que 0 est compris dans l'intervalle mais que 1 en est exclu)
// selon une distribution approximativement uniforme sur cet intervalle.
// Ce nombre peut ensuite être multiplié afin de couvrir un autre intervalle.

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
