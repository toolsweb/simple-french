// Fake data
let exercices = [
  {
    type: "learn",
    image: "apple.png",
    sound: "Combien.m4a"
  },
  {
    type: "learn",
    image: "bonjour.png",
    sound: "Bonjour.m4a"
  },
  {
    type: "learn",
    image: "bonjour.png",
    sound: "Bonjour.m4a"
  },
  {
    type: "learn",
    image: "apple.png",
    sound: "Combien.m4a"
  },
  {
    type: "learn",
    image: "bonjour.png",
    sound: "Bonjour.m4a"
  },
  {
    type: "learn",
    image: "apple.png",
    sound: "Combien.m4a"
  },
  {
    type: "learn",
    image: "bonjour.png",
    sound: "Bonjour.m4a"
  }
];


class ButtonManager {
  constructor() {}

  createButtonSound(exercice) {
    let sound = document.createElement("div");
    sound.classList.add("sound");
    let audio = document.createElement("audio");
    audio.src = "./audio/" + exercice.sound;
    audio.controls = true;
    sound.appendChild(audio);
    let logo = document.createElement("img");
    logo.src = "images/speaker.png";
    sound.appendChild(logo);
    let container = document.getElementById("container");
    container.appendChild(sound);
  }

  listenButtons() {
    let sounds = document.getElementsByClassName("sound");
    for (var i = 0; i < sounds.length; i++) {
      let child = sounds[i].children[0];
      sounds[i].addEventListener("click", e => {
        child.play();
      });
    }
  }
}

class ProgressBar {
    constructor(){}

    init(exercices) {
        let i = 0;
        let progression = document.getElementsByClassName("progression");
        while (i < exercices.length) {
            let div = document.createElement("div");
            div.classList.add("level");
            progression[0].appendChild(div);
            i++;
        }
    }
}

class App {
  constructor(exercices, buttonManager, progressbar) {
    this.exercices = exercices;
    this.index = 0;
    this.buttonManager = buttonManager;
    this.progressbar = progressbar;
    this.init();
    this.listenNextExercice();
    this.progressbar.init(exercices);
  }

  init() {
    // selon le type de l'index current, j'appel la méthode pour afficher le type d'exercice
    if (this.exercices[this.index].type === "learn") {
      this.displayLearn(this.exercices[this.index]);
    }
  }

  listenNextExercice() {
    let nextButton = document.getElementsByClassName("next");
    nextButton[0].addEventListener("click", e => {
      // Si next n'a pas rouge
      let levels = document.getElementsByClassName("level");
      console.log(levels);
      levels[this.index].classList.add("blue");

      this.index += 1;
      let container = document.getElementById("container");
      container.innerHTML = "";
      this.init();
      nextButton[0].classList.add("hidden");
    });
  }

  displayLearn(exercice) {
    let image = document.createElement("img");
    image.src = "images/" + exercice.image;

    let block = document.createElement("div");
    block.classList.add("image");
    block.appendChild(image);
    let container = document.getElementById("container");
    container.appendChild(block);

    this.buttonManager.createButtonSound(exercice);
    this.buttonManager.listenButtons();
    let sounds = document.getElementsByClassName("sound");
    sounds[0].addEventListener("click", e => {
      let nextButton = document.getElementsByClassName("next");
      nextButton[0].classList.remove("hidden");
    });
  }
}

let progressbar = new ProgressBar();
let buttonManager = new ButtonManager();

// Injection de dépandances
let app = new App(exercices, buttonManager, progressbar);
