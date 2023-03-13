// setting variables to link to document
const startBtn = document.querySelector("#startGame");
const startScreen = document.querySelector(".mainPageContainer");
const gameContainer = document.querySelector(".gameContainer");
const winDisplay = document.querySelector(".winDisplay");
const lossDisplay = document.querySelector(".lossDisplay");
const gameText = document.querySelector(".gameTopText");
const letterContainer = document.querySelector(".letterContainer");
const letters = document.querySelector(".letters");
const hintText = document.querySelector(".hint");
const timeLeft = document.querySelector(".clock");
const wrongLetters = document.querySelector(".wrong");
const replayBtn = document.querySelector(".newGame");
const letterCatch = document.querySelector(".letterInput");
const resetBtn = document.querySelector(".reset");

// setting global variables that will need to be called between functions
let word;
let incorrectLetters = [];
let correctLetters = [];
let unique;
let wins;
let losses;
let timeInterval;

// hiding text input that captures types letters
letterCatch.style.zIndex = "-1";

// oject array of all words and hints, thanks to CodingNepal
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

// this funtction pulls any saved scores from local storage, sets the win/loss count, and displays these numbers on the screen. If no scores exist in local storage, which would return a null, the scores are set to 0.
function renderScores() {
  outcomesRaw = localStorage.getItem("outcomes");
  outcomes = JSON.parse(outcomesRaw);

  if (outcomes !== null) {
    wins = Number(outcomes.wins);
    winDisplay.innerText = wins;
  } else {
    wins = 0;
    winDisplay.value = 0;
  }

  if (outcomes !== null) {
    losses = Number(outcomes.losses);
    lossDisplay.innerText = losses;
  } else {
    losses = 0;
    lossDisplay.value = 0;
  }
}

// this function creates an outcomes object and sends it to be saved in local storage
function saveScores() {
  outcomes = { wins, losses };
  localStorage.setItem("outcomes", JSON.stringify(outcomes));
}

// this countdown function sets the gametime to 30 seconds and shows the countdown on the screen. if the timer reaches 0, a loss is added and the scores are saved.
let gameTime;
function countdown() {
  gameTime = 30;

  timeInterval = setInterval(() => {
    gameTime--;
    timeLeft.innerText = gameTime;

    if (gameTime <= 0) {
      clearInterval(timeInterval);
      alert("GAME OVER! \n\nSorry, you ran out of time :(");
      losses++;
      saveScores();
      // renderScores();
    }
  }, 1000);
}

// this function helps pull a random word from the word bank.
//it renders scores first so that any saved scores can be brought in to set the win/loss count correctly prior to any further wins/losses...helps to maintain an accurate count.
//it also triggers the countdown funtion.
//it resets the unique and correct letters variables to 0, which ensures win conditions are not obscured
// the word and hint are pulled from the object and displayed for the user
// depending on the length of the word, the same amount of input boxes are created and displayed
// it will also display the users incorrect guesses
function randomWord() {
  renderScores();
  countdown();
  let wordAndHint = wordBank[Math.floor(Math.random() * wordBank.length)];
  unique = "";
  correctLetters.length = 0;
  word = wordAndHint.word;
  hint = wordAndHint.hint;
  incorrectLetters = [];
  let wordSetup = "";
  for (let i = 0; i < word.length; i++) {
    wordSetup += '<input type="text" class="letter" disabled>';
  }
  letterContainer.innerHTML = wordSetup;
  wrongLetters.innerText = incorrectLetters;
  hintText.innerText = hint;
}

// this function checks the user input vs the word
// the target is the hidden input box, so the value is the key that the user typed.
// if the key is a letter and and is not already in incorred letters, the key moves past line 312 to 313.
// if the word includes the key and correct letters doesn't already include key, the key is added to the correct letters array, and the letter(s) in the word will now display the key as their value
// otherwise, the incorrect key is added to the incorrect letters array and displayed on the screen, as well as the time is docked by 3 seconds
// the hidden letter catch is then reset to ""
function checkLetter(e) {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectLetters.includes(key.toUpperCase())
  ) {
    if (word.includes(key) && !correctLetters.includes(key)) {
      correctLetters.push(key);
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          letterContainer.querySelectorAll("input")[i].value =
            key.toUpperCase();
        }
      }
    } else {
      incorrectLetters.push(key.toUpperCase());
      wrongLetters.innerText = incorrectLetters;
      gameTime = gameTime - 3;
    }
  }
  letterCatch.value = "";

  // the following define win conditions for the game, which were needed for words that contained two of the same letter.
  // the first searches the word letter by letter to pull out all unique characters.
  // the second compares the unique length to correct numbers length, which once met signifies a win
  // it then adds the win point, stops the times, saves the score, and rerenders the score to display the updated count
  for (let i = 0; i < word.length; i++) {
    if (unique.includes(word[i]) === false) {
      unique += word[i];
    }
  }

  if (unique.length === correctLetters.length) {
    setTimeout(() => {
      alert("WOOHOO!!\n\nYou Win!!");
    }, 500);
    wins++;
    clearInterval(timeInterval);
    saveScores();
    renderScores();
  }
}

// adding event listeners to all buttons to trigger functions defined above.
startBtn.addEventListener("click", randomWord);
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameContainer.style.display = "flex";
});
replayBtn.addEventListener("click", randomWord);
document.addEventListener("keydown", () => letterCatch.focus());
letterCatch.addEventListener("input", checkLetter);

// this one clears local storage and refreshes the page if the user wishes to reset the counts to 0
resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset your scores?")) {
    localStorage.clear();
    renderScores();
    location.reload();
  } else {
    return;
  }
});
