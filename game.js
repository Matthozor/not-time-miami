class Game {
    constructor() {
        this.buttonNext = document.querySelector(".miami__start");
        this.buttonReturn = document.querySelector(".miami__return");
        this.buttonsPlayers = document.querySelector(".miami__players");
        this.buttonsCharacters = document.querySelector(".character__wrapper");
        this.gameContain = document.querySelector(".game__contain");
        this.bindEvents();
    }
    bindEvents() {
        this.buttonNext.addEventListener('click', () => {
            this.hiddenFunction(this.buttonNext);
            this.hiddenFunction(this.buttonsPlayers);
            this.hiddenFunction(this.buttonReturn);
        });

        this.buttonsPlayers.addEventListener('click', () => {
            this.hiddenFunction(this.buttonsPlayers);
            this.hiddenFunction(this.buttonsCharacters);
        });

        this.buttonsCharacters.addEventListener('click', () => {
            this.hiddenFunction(this.buttonsCharacters);
            this.hiddenFunction(this.gameContain);
        });

        // this.buttonReturn.addEventListener('click', () => {
        //     if (this.gameContain.classList.contains('js-hidden')) {
        //         this.hiddenFunction(this.buttonsCharacters);
        //         this.hiddenFunction(this.gameContain);
        //     }
        // });
        console.log(this.buttonNext);

    }
    // Fonction JS qui permet de caché/rendre visible un élément souhaité
    hiddenFunction(zone) {
        zone.classList.toggle("js-hidden");
    };
}
new Game();