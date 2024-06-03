console.log('Main JS Loaded')
//functie om naar het volgende pagina(level) te gaan 
function secondPage() {
    window.open("farm.html", "_self")
}

//variable voor het ophalen van buttons en images
//button variable
const openGateButton = document.querySelector(".open-gate-button");
const startOverBtn = document.querySelector(".start-over-btn")
const startOverAgainBtn = document.querySelector(".restart-game-btn")
const morseInstructionBtn = document.querySelector(".morse-instruction-btn")
const lvl2StartBtn = document.querySelector(".level2-start-btn")
//image variable
const imageHeartOne = document.querySelector(".heart-image-1");
const imageHeartTwo = document.querySelector(".heart-image-2");
const imageHeartThree = document.querySelector(".heart-image-3");

//variable voor het credit systeem
let lolaHetKonijntjeHart = 3;
let lolaHetKonijntjePoints = 0;

// functie voor het terug roepen en nakijken van de scores!
function gameUpdate() {
    //if statement voor Lola het konijntje zodra zij een punt/hart verliest krijg je een alert(in progress)
    if (lolaHetKonijntjeHart === 2) {
        alert('Je hebt een hart verloren');
        if (imageHeartOne) {
            imageHeartOne.remove();
        }
    } else if (lolaHetKonijntjeHart === 1) {
        alert('Je hebt nog een hart verloren, pas op dit is je laatste kans!');
        if (imageHeartTwo) {
            imageHeartTwo.remove();
        }
    } else if (lolaHetKonijntjeHart === 0) {
        alert('Je hebt alle hartjes van Lola verloren!');
        if (imageHeartThree) {
            imageHeartThree.remove();
        }
        window.open("game-over.html", "_self");
    }
    // if statement voor Lola het konijntje die 5 punten heeft behaalt wordt ze verwezen naar het eindschrem.
    if (lolaHetKonijntjePoints === 4) {
        window.open("ending-screen.html", "_self");
        alert('Je hebt alle levels voltooid!');
    }
    console.log(lolaHetKonijntjeHart)
    console.log(lolaHetKonijntjePoints)
};

//game-over scherm
// if statement voor het bekijken of de queryselector in de variable klopt
if (startOverBtn) {
    startOverBtn.addEventListener('click', function () {
        window.open("index.html", "_self");
    });
};

//eind-scherm
// if statement voor het bekijken of de queryselector in de variable klopt
if (startOverAgainBtn) {
    startOverAgainBtn.addEventListener('click', function () {
        window.open("index.html", "_self");
    });
};

//level 1 Boerderij
// if statement voor het bekijken of de queryselector in de variable klopt
if (openGateButton) {
    openGateButton.addEventListener('click', function () {
        //prompt voor het beantwoorden van de vraag
        const result = prompt('probeer het morsecode te raden!');
        //als Lola het konijntje de morsecode het juist invoert met behulp van hints komt ze uit op HOOP.
        if (result === "HOOI") {
            alert("De poort is geopend, op naar het bos!")
            window.open("the-forest.html", "_self")
            lolaHetKonijntjePoints += 1;
            // het verkeerd antwoord
        } else {
            alert("Fout morsecodebericht, probeer het opnieuw.")
            lolaHetKonijntjeHart -= 1;
        }
        gameUpdate();
    });
};

//level 1: morse code instructie knop
if (morseInstructionBtn) {
    morseInstructionBtn.addEventListener('click', function () {
        alert('De morsecode is te vinden in het level, en let op dat (/) tekens het einde van een morsezin aanduiden. Je zult de morsecode moeten ontcijferen om de poort te openen en verder te komen in het spel. Veel succes!');
    });
};

// level 2: hoger of lager met de wolf
if (lvl2StartBtn) {
  //eventlistener voor de button in mijn forest document. zodra je klikt voert het alle anonieme functies uit.
  lvl2StartBtn.addEventListener('click', function() {
      //math random om random getallen te genereren
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      //parsInt voor het omzetten van string naar cijfers en het prompt om het te kunnen beantwoorden voor hoger of lager. 
      const userGuess = parseInt(prompt("Raad een getal tussen 1 en 6:"));
      //if statement voor Lola het konijntje. als Lola het konijntje hoger gooit dan de wolf wint zij.
      if (userGuess > randomNumber) {
      alert("Gefeliciteerd! Je hebt het juiste getal geraden. De boomstronk is verwijderd.");
      lolaHetKonijntjePoints += 1;
      //wint Lola het konijntje mag ze naar het volgende level
      window.open("level-3.html","_self");
      //het is gelijk spel
      } else if (userGuess === randomNumber)  {
          alert("gelijk spel. Probeer het opnieuw");
          lolaHetKonijntjeHart += 0;
          lolaHetKonijntjePoints += 0;

      //De wolf heeft hoger geraden
      } else {
          alert("Helaas, dat is niet het juiste getal. Probeer het opnieuw.");
          lolaHetKonijntjeHart -= 1;
      }

      lolaHetKonijntjeHart;
      lolaHetKonijntjePoints;
      console.log(userGuess + ' ' + 'userguess');
      console.log(randomNumber + ' ' + 'randomguess');
      gameUpdate();
  });
};

//level 3 : galgje om de roofdieren te onwijken
//Dit is een reeks woorden waaruit het spel willekeurig zal kiezen. Je kunt meer woorden aan deze array toevoegen om het spel uit te breiden.
let words = ["lola"];
//Deze regel selecteert een willekeurig woord uit de reeks woorden.
let word = words[Math.floor(Math.random() * words.length)];
// Hierdoor wordt een reeks onderstrepingstekens ("_") gemaakt met dezelfde lengte als het geselecteerde woord. Deze tekenreeks vertegenwoordigt het gedeeltelijk geraden woord.
let guessed = "_".repeat(word.length);
//Zijn array slaat alle letters op die de gebruiker heeft geraden.
let guessedLetters = [];
//Deze variabele vertegenwoordigt het aantal pogingen dat de gebruiker heeft toegestaan om het woord te raden.
let attempts = 6;
//Zijn variabele houdt de huidige index van het executioner image in de array Images bij.
let currentImageIndex = 0;
//Deze array bevat de bestandspaden voor de verschillende afbeeldingen die worden weergegeven als de gebruiker onjuiste gissingen maakt.
const images = ["/Image/lola.png", "/Image/lola1.png", "/Image/lola2.png", "/Image/lola3.png", "/Image/lola4.png", "/Image/lola5.png"];
//Al deze functies zijn verantwoordelijk voor het bijwerken van de overeenkomstige elementen in de HTML met de huidige spelinformatie.
function displayWord() {
  document.querySelector(".word").textContent = guessed;
}

function displayAttempts() {
  document.querySelector(".attempts").textContent = attempts;
}

function displayGuessedLetters() {
  document.querySelector(".guessedLetters").textContent = guessedLetters.join(", ");
}

function displayImage() {
  let imageElement = document.querySelector(".lola");
  if (imageElement) {
    imageElement.setAttribute("src", images[currentImageIndex]);
  } else {
    console.error("Image element not found.");
  }
}
function guessLetter() {
  let guessInput = document.querySelector(".guessInput").value.toLowerCase();
  document.querySelector(".guessInput").value = "";

  //Functie is de kern van de spellogica. Het controleert of de geraden letter correct is en werkt de spelstatus dienovereenkomstig bij. 
//Als de gebruiker het woord correct raadt of geen pogingen meer heeft, worden de juiste waarschuwingen weergegeven.

  if (!/^[a-zA-Z]$/.test(guessInput)) {
    alert("Please enter a valid letter.");
    return;
  }
  if (guessedLetters.includes(guessInput)) {
    alert("You already guessed that letter. Try again.");
    lolaHetKonijntjeHart -= 1;
    return;
  }
  guessedLetters.push(guessInput);

  if (word.includes(guessInput)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guessInput) {
        guessed = guessed.substr(0, i) + guessInput + guessed.substr(i + 1);
      }
    }
    displayWord();
    if (!guessed.includes("_")) {
      alert("Congratulations! You guessed the word: " + word);
      lolaHetKonijntjePoints += 1;
      window.open("level-4.html","_self")
    }
  } else {
    if (attempts > 0) {
      lolaHetKonijntjeHart -= 1;
      attempts--;
      currentImageIndex++;
      displayAttempts();
      displayImage(); 
    }
    if (attempts === 0) {
      alert("Game over! The word was: " + word);
      lolaHetKonijntjeHart -= 1;
    }
  }

  displayGuessedLetters();
  gameUpdate();
}

//level 4
//alle knoppen opgehaald
const nextButton = document.querySelector('.target-page-level-4');
const checkAntw = document.querySelector('.check-answer-level-4');
const antwoordStatus = document.querySelector('.answer-status-level-4');
const answerInput = document.querySelector('.answer-input-level-4')

nextButton.disabled = true;
 
//functie knoppen
checkAntw.addEventListener('click', function(){
  
  antwoordStatus.disabled = false;
  nextButton.disabled = true;
  checkAntw.disabled = false;
  
  const rightAnswer = 20;
  
  if (answerInput.value == rightAnswer) {
    antwoordStatus.textContent = ('Het antwoord is goed');
    window.open("ending-screen.html", "_self")
    lolaHetKonijntjePoints += 1;
  
  }else {
    antwoordStatus.textContent = ('Het antwoord is fout');
    nextButton.disabled = true;
    lolaHetKonijntjeHart -= 1;
}
lolaHetKonijntjeHart;
lolaHetKonijntjePoints;
gameUpdate();
});

//knop voor de uitleg
const alertBtn = document.querySelector('.explanation-page-level-4');
alertBtn.addEventListener('click', function () {
    alert('Welkom bij dit spel. In dit spel moet je het juiste antwoord uitrekenen. Als je het antwoord juist hebt, dan ga je naar de volgende level, is het antwoord foutt, probeer het dan opnieuw.');
});

