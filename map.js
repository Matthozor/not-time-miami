class Map {
    constructor() {

        this.player1 = {x:3, y:2};
        this.player2 = {x:9, y:4};
        this.zoneMap = document.querySelector(".game__contain");
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.SQUARE_SIZE = 15;
        this.SQUARE_WIDTH = this.canvas.width/this.SQUARE_SIZE;
        this.SQUARE_HEIGHT = this.canvas.height/this.SQUARE_SIZE;
        this.map = new Array();
        this.bindEvents();
        this.draw();
    }
    bindEvents() {
        console.log(this.map);
        document.onkeydown = (e) => {
            switch (e.key) {
                case "ArrowLeft": // Left
                    this.player1.x--
                    break;
                case "ArrowRight": // Right
                    this.player1.x++
                    break;
                case "ArrowUp": // Top
                    this.player1.y--
                    break;
                case "ArrowDown": // Bottom
                    this.player1.y++
                    break;
                // case 32: // Bottom
                //     if(isGamePaused) {
                //         unpauseGame();
                //     } else {
                //         pauseGame();
                //     }
                //     break;
            }
            this.draw();
        };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let x = 0; x < this.SQUARE_SIZE; x++) {
            for (let y = 0; y < this.SQUARE_SIZE; y++) {
                this.ctx.strokeStyle = 'black';
                this.ctx.strokeRect(x * this.SQUARE_WIDTH, y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);

                if (this.player1.x === x && this.player1.y === y) {
                    this.ctx.fillStyle = 'red';
                    this.ctx.fillRect(x * this.SQUARE_WIDTH, y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
                }

                if (this.player2.x === x && this.player2.y === y) {
                    this.ctx.fillStyle = 'blue';
                    this.ctx.fillRect(x * this.SQUARE_WIDTH, y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
                }
            }
        }
    }
}
new Map();