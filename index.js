// Fake data
let exercices = [
  {
    type: "learn",
    image: "apple.png",
    sound: "Bonjour.m4a"
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
    console.log(sounds);
    for (var i = 0; i < sounds.length; i++) {
      console.log(sounds[i]);
      let child = sounds[i].children[0];
      sounds[i].addEventListener("click", e => {
        child.play();
      });
    }
  }
}

class App {
  constructor(exercices, buttonManager) {
    this.exercices = exercices;
    this.index = 0;
    this.buttonManager = buttonManager;
    this.init();
    let nextButton = document.getElementsByClassName("next");
    nextButton[0].addEventListener("click", e => {
        
      this.index += 1;

      this.init();
    });
  }

  init() {
    // selon le type de l'index current, j'appel la méthode pour afficher le type d'exercice
    if (this.exercices[this.index].type === "learn") {
      this.displayLearn(this.exercices[this.index]);
    }
  }

  displayLearn(exercice) {
    let image = document.createElement("img");
    image.src = "images/" + exercice.image;
    let block = document.getElementsByClassName("image")[0];
    block.appendChild(image);
    this.buttonManager.createButtonSound(exercice);
    this.buttonManager.listenButtons();
    let sounds = document.getElementsByClassName("sound");
    sounds[0].addEventListener("click", e => {
      let nextButton = document.getElementsByClassName("next");
      nextButton[0].classList.remove("hidden");
    });
  }
}

let buttonManager = new ButtonManager();
let app = new App(exercices, buttonManager);
