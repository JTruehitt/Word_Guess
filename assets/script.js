const startBtn = document.querySelector("#startGame");
const startScreen = document.querySelector(".mainPageContainer");
const gameContainer = document.querySelector(".gameContainer");
const wins = document.querySelector(".winDisplay");
const losses = document.querySelector(".lossScore");
const gameText = document.querySelector(".gameTopText");
const letterContainer = document.querySelector(".letterContainer");
const letters = document.querySelector(".letters");
const hintText = document.querySelector(".hint");
const timeLeft = document.querySelector(".clock");
const wrongLetters = document.querySelector(".wrong");
const resetBtn = document.querySelector(".newGame");
const letterCatch = document.querySelector(".letterInput");

let word;
let incorrectLetters = [];
let correctLetters = [];
let unique;

// function countdown() {
// let gameTime = 30;

// let timeInterval = setInterval(() => {
//     gameTime--;
//     timeLeft.innerText = gameTime;

//     if (gameTime === 0) {
//         clearInterval(timeInterval);
//         // alert("game over");
//     }
// }, 1000)
// }

const wordBank = [
  {
    word: "python",
    hint: "programming language",
  },
  {
    word: "guitar",
    hint: "a musical instrument",
  },
  {
    word: "aim",
    hint: "a purpose or intention",
  },
  {
    word: "venus",
    hint: "planet of our solar system",
  },
  {
    word: "gold",
    hint: "a yellow precious metal",
  },
  {
    word: "ebay",
    hint: "online shopping site",
  },
  {
    word: "golang",
    hint: "programming language",
  },
  {
    word: "coding",
    hint: "related to programming",
  },
  {
    word: "matrix",
    hint: "science fiction movie",
  },
  {
    word: "bugs",
    hint: "related to programming",
  },
  {
    word: "avatar",
    hint: "epic science fiction film",
  },
  {
    word: "gif",
    hint: "a file format for image",
  },
  {
    word: "mental",
    hint: "related to the mind",
  },
  {
    word: "map",
    hint: "diagram represent of an area",
  },
  {
    word: "island",
    hint: "land surrounded by water",
  },
  {
    word: "hockey",
    hint: "a famous outdoor game",
  },
  {
    word: "chess",
    hint: "related to an indoor game",
  },
  {
    word: "viber",
    hint: "a social media app",
  },
  {
    word: "github",
    hint: "code hosting platform",
  },
  {
    word: "png",
    hint: "a image file format",
  },
  {
    word: "silver",
    hint: "precious greyish-white metal",
  },
  {
    word: "mobile",
    hint: "an electronic device",
  },
  {
    word: "gpu",
    hint: "computer component",
  },
  {
    word: "java",
    hint: "programming language",
  },
  {
    word: "google",
    hint: "famous search engine",
  },
  {
    word: "venice",
    hint: "famous city of waters",
  },
  {
    word: "excel",
    hint: "microsoft product for windows",
  },
  {
    word: "mysql",
    hint: "a relational database system",
  },
  {
    word: "nepal",
    hint: "developing country name",
  },
  {
    word: "flute",
    hint: "a musical instrument",
  },
  {
    word: "crypto",
    hint: "related to cryptocurrency",
  },
  {
    word: "tesla",
    hint: "unit of magnetic flux density",
  },
  {
    word: "mars",
    hint: "planet of our solar system",
  },
  {
    word: "proxy",
    hint: "related to server application",
  },
  {
    word: "email",
    hint: "related to exchanging message",
  },
  {
    word: "html",
    hint: "markup language for the web",
  },
  {
    word: "air",
    hint: "related to a gas",
  },
  {
    word: "idea",
    hint: "a thought or suggestion",
  },
  {
    word: "server",
    hint: "related to computer or system",
  },
  {
    word: "svg",
    hint: "a vector image format",
  },
  {
    word: "jpeg",
    hint: "a image file format",
  },
  {
    word: "search",
    hint: "act to find something",
  },
  {
    word: "key",
    hint: "small piece of metal",
  },
  {
    word: "egypt",
    hint: "a country name",
  },
  {
    word: "joker",
    hint: "psychological thriller film",
  },
  {
    word: "dubai",
    hint: "developed country name",
  },
  {
    word: "photo",
    hint: "representation of person or scene",
  },
  {
    word: "nile",
    hint: "largest river in the world",
  },
  {
    word: "rain",
    hint: "related to a water",
  },
];

// function uniqueChar(word) {
//     unique = "";
//     for (let i = 0; i < word.length; i++) {
//         if (unique.includes(word[i]) === false) {
//             unique += word[i];
//         }
//     }
// }

// function to pull a random word from the wordBank
function randomWord() {
  // countdown();
  let wordAndHint = wordBank[Math.floor(Math.random() * wordBank.length)];
  console.log(wordAndHint);
  unique = "";
  correctLetters.length = 0;
  word = wordAndHint.word;
  hint = wordAndHint.hint;
  // console.log(word, hint)
  incorrectLetters = [];
  let wordSetup = "";
  for (let i = 0; i < word.length; i++) {
    wordSetup += '<input type="text" class="letter" disabled>';
  }
  letterContainer.innerHTML = wordSetup;
  wrongLetters.innerText = incorrectLetters;
  hintText.innerText = hint;
}

function checkLetter(e) {
  let key = e.target.value;
  console.log(key);
  if (key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(" " + key)) {
    if (word.includes(key)) {
      correctLetters.push(key);
      console.log(correctLetters);
      console.log(correctLetters.length);
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          letterContainer.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      incorrectLetters.push(" " + key);
      wrongLetters.innerText = incorrectLetters;
    }
  }
  letterCatch.value = "";

  for (let i = 0; i < word.length; i++) {
    if (unique.includes(word[i]) === false) {
      unique += word[i];
    }
  }
  console.log(unique);

  if (unique.length === correctLetters.length) {
    alert("you win");
  }
  console.log;
}

startBtn.addEventListener("click", randomWord);
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameContainer.style.display = "flex";
});
resetBtn.addEventListener("click", randomWord);
document.addEventListener("keydown", () => letterCatch.focus());
letterCatch.addEventListener("input", checkLetter);

//! words as is, need to touch up
