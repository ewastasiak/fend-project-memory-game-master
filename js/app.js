document.addEventListener("DOMContentLoaded", setup);


// Music
const audio = new Audio("sfx/elevator-monroe-kopcinski.mp3");

document.querySelector("body").addEventListener("click", playAudio);

const soundIcon = document.getElementById("sound");

//TODO: make this work
// 	function toggleAudio() {
// 		if (playAudio()) {
// 	  return audio.paused ? playAudio() : pauseAudio()
// }
// 	}
// 	soundIcon.onclick = function {}
// 	toggleAudio();

function playAudio() {
  audio.loop = true;
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function setup() {



















  const deckRef = document.getElementsByClassName("deck")[0];

  // create an array of cards
  let cardsArr = [
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-bomb"
  ];

  let openCardArr = [];
  let compareArr = [];
  let matchedCardArr = [];

  const movesRef = document.getElementsByClassName("moves")[0];
  let movesNum = 0;
  movesRef.innerHTML = 0;

  //create list elements and icons, assign classes to them
  function makeList() {
    deckRef.innerHTML = "";
    for (let i = 0; i < cardsArr.length; i++) {
      deckRef.innerHTML += `<li class=\"card\"><i class=\"${
        cardsArr[i]
      }\"></i></li>`;
    }

    let shuffledArray = shuffle(cardsArr);
    let cardItems = document.querySelectorAll(".card .fa");
    for (let j = 0; j < cardsArr.length; j++) {
      cardItems[j].className = shuffledArray[j];
    }
  }

  makeList();

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const shuffledCards = shuffle(cardsArr);

  //Open a card on click
  const cardsObjs = deckRef.children;
  for (let i = 0; i < cardsObjs.length; i++) {
    // add event listener, later it needs to be removed (after opening) and added back if cards did not match
    cardsObjs[i].addEventListener("click", isOpen);
  }

  function isOpen() {
    //If two cards open - do nothing (idea: @Kepelrs)
    if (openCardArr.length === 2) {
      return;
    }

    //If not, open a card
    this.classList.add("show", "open");
    openCardArr.push(this);

    if (openCardArr.length === 2) {
      setTimeout(function() {
        comparePair();
      }, 900);
    }
  }

  function isMatched() {
    let compareArr = openCardArr;
  //  console.log("a pair is matched");
    for (let i = 0; i < compareArr.length; i++) {
      compareArr[i].classList.add("match");
      matchedCardArr.push("card.li");
      console.log(matchedCardArr);
    }
    if (matchedCardArr.length === 16) {
      setTimeout(function() {
        endOfGame();
      }, 700);
    }
  }


  function comparePair() {
    let compareArr = openCardArr;
    //compare the icon classes
    if (compareArr[0].innerHTML === compareArr[1].innerHTML) {
     // console.log("compared cards are the same");
      isMatched();
    } else {
     // console.log("compared cards are not the same");
      let cardsClassOut = compareArr;

      // // This is too complicated, srsly
      //       for (let i = 0; i < compareArr.length; i++) {
      //         let compareArr = cardsClassOut[i];
      //
      // 						function isWrong() {
      // 						 cardsClassOut[i].classList.add("nope");
      // 					 }
      // 						 isWrong();
      //
      // 						function nope() {
      // 							cardsObjs[i].classList.add("nope");
      // 											}
      //
      // 						if (cardsObjs[0].classList.contains("wrong") && cardsObjs[1].classList.contains("wrong")) {
      // 							nope();
      // 						}
      //removeclasses
      for (let i = 0; i < compareArr.length; i++) {
        let compareArr = cardsClassOut[i];

        cardsClassOut[i].classList.remove("show", "open");

     //   console.log("remove the class");
      }
    }

    movesFunc();
    compareArr.splice(0, 2);
  }











  //Repeat/play-again Button SEEMS TO WORK
  const repeatFaIcon = document.getElementsByClassName("fa-repeat");
  repeatFaIcon[0].addEventListener("click", resetGame);

  //Replay button in the modal
  const replayBtn = document.getElementsByTagName("button")[0];
  // replayBtn.addEventListener('click', resetGame);
  replayBtn.onclick = function() {
    resetGame();
  };
  //if modal.style.display = "visible";

  //Moves
  function movesFunc() {
    movesNum++;
    movesRef.innerHTML++;
    // let starsCount = 3;


    // Get stars
    // const starOne = document.getElementById('star-one');
    const starTwo = document.getElementById('star-two');
    const starThree = document.getElementById('star-three');

    // Star rating change
    if (movesNum > 15) {
      starThree.className = 'fa fa-star-o';
    }

    if (movesNum > 23) {
      starTwo.className = 'fa fa-star-o';
    }


  }

  // TODO: reset everything
  function resetGame() {
    modal.style.display = "none";
    deckRef.innerHTML = "";
    setup();
    // classList.remove("show", "open");
    //reset Array
    let openCardArr = [];
    let matchedCardArr = [];
    //moves
    movesNum = 0;
    movesRef.innerHTML = 0;

    //clear the deckRef
    //	deckRef.removeChild

    //TODO: star rating and timer; function setup? or restartDeck
  }

  function endOfGame() {
    modal.style.display = "block";
    pauseAudio();
    //TODO:
    // haltTimer();
  }

  // template taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
  //TODO: leaderboard modal
  // Get the modal
  const modal = document.getElementById("myModal");
  // Get the <span> element that closes the modal
  const closeModal = document.getElementsByClassName("close")[0];
  // When the user clicks on <span> (x), close the modal
  closeModal.onclick = function() {
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  //MODAL CONTENT
  const modalContents = document.getElementsByClassName("modal-content")[0];

  const modalText = modalContents.children.getElementsByTagName("p");

  modalText[0].innerHTML = `<p>${movesNum}</p>`;




















}
