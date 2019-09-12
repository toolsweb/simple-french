
let exercices = [
    {
        type: 'learn', image: 'apple.png', sound:'Bonjour.m4a'
    },
    {
        type: 'learn', image: 'bonjour.png', sound: 'Bonjour.m4a'
    }
]

class Button {
    constructor()
    {
    }

    createButtonSound(exercice)
    {
        let sound = document.createElement('div');
        sound.classList.add('sound');
        let audio = document.createElement('audio');
        audio.src = './audio/' + exercice.sound;
        sound.appendChild(audio);
        audio.controls = true;
        let logo =  document.createElement('img');
        logo.src = 'images/speaker.png';
        sound.appendChild(logo);
        let container = document.getElementsByClassName('exercice')[0];
        container.appendChild(sound);        
    }

    listenButton() {
        let sounds = document.getElementsByClassName('sound');
        console.log(sounds)
        for(var i = 0; i < sounds.length; i++)
        {
            console.log(sounds[i]);
            let child = sounds[i].children[0];
            //child.play();
            const playedPromise = child.play();
if (playedPromise) {
        playedPromise.catch((e) => {
            if (e.name === 'NotAllowedError' ||
                e.name === 'NotSupportedError') {
                //console.log(e.name);
            }
        });
    }
            // sounds[i].addEventListener('click', (e) => {
            //     child.play();


            // })
        }
       

        
    }
}

class App {
    constructor(exercices)
    {    
        this.exercices = exercices;
        this.index = 0;
        this.button = new Button();
        this.init();

    }

    init()
    {
        // selon le type de l'index current, j'appel la méthode pour afficher le type d'exercice
        if (this.exercices[this.index].type === 'learn')
        {
            this.displayLearn(this.exercices[this.index]);
        }
    }

    displayLearn(exercice)
    {
        let image = document.createElement('img');
        image.src = 'images/' + exercice.image;
        let block = document.getElementsByClassName('image')[0];
        block.appendChild(image);

        this.button.createButtonSound(exercice);
        this.button.listenButton();
    }
}

let app = new App(exercices);
