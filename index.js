let score = 0;

//Sets time intervals for moles to appear/change status
function getNextInterval() {
  return Date.now() + 1000;
}
function getHiddenInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 2000) + 2000;
}

//10% chhance mole is a "king" mole
function getKingStatus() {
  return Math.random() > 0.9;
}

//Arrary of objects containing each individual mole
const moles = [
  {
    status: "sad",
    next: getNextInterval(),
    king: false,
    node: document.getElementById("hole0"),
  },
  {
    status: "sad",
    next: getNextInterval(),
    king: false,
    node: document.getElementById("hole1"),
  },
  {
    status: "sad",
    next: getNextInterval(),
    king: false,
    node: document.getElementById("hole2"),
  },
  {
    status: "sad",
    next: getNextInterval(),
    king: false,
    node: document.getElementById("hole3"),
  },
  {
    status: "sad",
    next: getNextInterval(),
    king: false,
    node: document.getElementById("hole4"),
  },
  {
    status: "sad",
    next: getNextInterval(),
    king: false,
    node: document.getElementById("hole5"),
  },
  {
    status: "sad",
    next: getNextInterval(),
    king: false,
    node: document.getElementById("hole6"),
  },
  {
    status: "sad",
    next: getNextInterval(),
    king: false,
    node: document.getElementById("hole7"),
  },
  {
    status: "sad",
    next: getNextInterval(),
    king: false,
    node: document.getElementById("hole8"),
  },
  {
    status: "sad",
    next: getNextInterval(),
    king: false,
    node: document.getElementById("hole9"),
  },
];

//different stages and statuses of moles
function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
      mole.next = getNextInterval();
      mole.status = "turning";
      if (mole.king) {
        mole.node.children[0].src = "./img/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./img/mole-leaving.png";
      }
      break;
    case "turning":
      mole.next = getHiddenInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone");
      break;
    case "gone":
      mole.next = getHungryInterval();
      mole.status = "hungry";
      //runs to see if mole will be king mole for next cycle
      mole.king = getKingStatus();
      if (mole.king) {
        mole.node.children[0].src = "./img/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./img/mole-hungry.png";
      }
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      break;
    case "hungry":
      mole.next = getNextInterval();
      mole.status = "sad";
      if (mole.king) {
        mole.node.children[0].src = "./img/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./img/mole-sad.png";
      }
      mole.node.children[0].classList.remove("hungry");

      break;
    case "fed":
      mole.next = getNextInterval();
      mole.status = "turning";
      if (mole.king) {
        mole.node.children[0].src = "./img/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./img/mole-leaving.png";
      }
  }
}

function feed(event) {
  //click only runs successfully if there is a hungry img showing
  if (
    event.target.tagName !== "IMG" ||
    !event.target.classList.contains("hungry")
  ) {
    return;
  }

  const mole = moles[parseInt(event.target.dataset.index)];
  //feeds a mole and updates
  if (mole.king) {
    score += 2;
    mole.node.children[0].src = "./img/king-mole-fed.png";
  } else {
    score++;
    mole.node.children[0].src = "./img/mole-fed.png";
  }

  event.target.classList.remove("hungry");
  mole.next = getNextInterval();
  mole.status = "fed";

  document.querySelector(".worm-container").style.width = `${10 * score}%`;
  
  if (score >= 10) {
    win();
  }
}
  

function win() {
  document.querySelector(".background").classList.add("hide");
  document.querySelector(".win").classList.remove("hide");
}


//request animation frame runs time to check mole status. Runs nextStatus based on timer
let runAgainAt = Date.now() + 1000;
function nextFrame() {
  const now = Date.now();

  if (runAgainAt <= now) {
    moles.map((mole) => {
      if (mole.next <= now) {
        getNextStatus(mole);
      }
    });
    runAgainAt = now + 1000;
  }
  requestAnimationFrame(nextFrame);
}

//adds click listener anywhere on the background
document.querySelector(".background").addEventListener("click", feed);

nextFrame();
