class Map {
    constructor() {

        this.player1 = {x:3, y:2};
        this.player2 = {x:9, y:4};

        this.weapon = new Image();
        this.weapon.src = "images/sword.png";

        this.obstacleList = [
            {x:this.getRandomInt(15), y:this.getRandomInt(15)},
            {x:this.getRandomInt(15), y:this.getRandomInt(15)},
            {x:this.getRandomInt(15), y:this.getRandomInt(15)}
        ];

        this.weaponList = [
            {x:this.getRandomInt(15), y:this.getRandomInt(15)},
            {x:this.getRandomInt(15), y:this.getRandomInt(15)},
            {x:this.getRandomInt(15), y:this.getRandomInt(15)}
        ];

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
        document.onkeydown = (e) => {
            let hasMove = false;
            switch (e.key) {
                case "ArrowLeft": // Left
                    if (!this.haveCollision(this.player1.x -1, this.player1.y, this.obstacleList)) {
                        this.player1.x--;
                        hasMove = true;
                    }
                    break;
                case "ArrowRight": // Right
                    if (!this.haveCollision(this.player1.x +1, this.player1.y, this.obstacleList)) {
                        this.player1.x++;
                        hasMove = true;
                    }
                    break;
                case "ArrowUp": // Top
                    if (!this.haveCollision(this.player1.x, this.player1.y -1, this.obstacleList)) {
                        this.player1.y--;
                        hasMove = true;
                    }
                    break;
                case "ArrowDown": // Bottom
                    if (!this.haveCollision(this.player1.x, this.player1.y +1, this.obstacleList)) {
                        this.player1.y++;
                        hasMove = true;
                    }
                    break;
                // case 32: // Bottom
                //     if(isGamePaused) {
                //         unpauseGame();
                //     } else {
                //         pauseGame();
                //     }
                //     break;
            }
            if (hasMove) {
                if (this.haveCollision(this.player1.x, this.player1.y, this.weaponList)) {
                    console.log("arme");
                }
                this.draw();
            }
        };

        this.weapon.addEventListener('load', () => {
            this.draw();
        });
    }

    haveCollision(x, y, itemList) {
        // var hasCollision = false;
        // itemList.forEach(item => {
        //     if (x === item.x && y === item.y) {
        //         hasCollision = true;
        //     }
        // });
        // return hasCollision;
        return itemList.some(item => (x === item.x && y === item.y));
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
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

        this.ctx.fillStyle = 'grey';
        this.obstacleList.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x * this.SQUARE_WIDTH, obstacle.y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
        });

        this.ctx.fillStyle = 'green';
        this.weaponList.forEach(weapon => {
            this.ctx.fillRect(weapon.x * this.SQUARE_WIDTH, weapon.y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
            this.ctx.drawImage(this.weapon, weapon.x * this.SQUARE_WIDTH, weapon.y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
        });
    }
}
new Map();