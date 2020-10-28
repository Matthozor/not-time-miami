class Map {
    constructor() {
        this.startTime = Date.now();
        /**
         * [Players description]
         */
        this.playerContainer = [
            {
                player: this.player1 = { x: 3, y: 2 },
                life: 100,
                damage: 5
            },
            {
                player: this.player2 = { x: 9, y: 4 },
                life: 100,
                damage: 5
            }
        ];


        this.player1 = { x: 2, y: 2 };
        this.player2 = { x: 12, y: 12 };

        this.currentPlayer = this.player1;

        /**
         * [Textures description]
         */

        this.woodPixel = new Image();
        this.woodPixel.src = "images/textures/wood-pixel.png";

        this.wall = new Image();
        this.wall.src = "images/textures/wall.png";

        this.corpse = new Image();
        this.corpse.src = "images/textures/corpse.png";

        this.corpseList = [];
        this.addItem(this.corpseList, 3);

        /**
         * [Weapons description]
         */

        this.knife = new Image();
        this.knife.src = "images/weapons/knife.png";

        this.gun = new Image();
        this.gun.src = "images/weapons/gun.png";

        this.uzi = new Image();
        this.uzi.src = "images/weapons/uzi.png";

        this.gunshot = new Image();
        this.gunshot.src = "images/weapons/gunshot.png";

        this.weaponList = [];
        this.addItem(this.weaponList, 4);

        this.weaponContainer = [
            {
                image: this.knife,
                name: "knife",
                damage: 5
            },
            {
                image: this.gun,
                name: "gun",
                damage: 10
            },
            {
                image: this.uzi,
                name: "uzi",
                damage: 15
            },
            {
                image: this.gunshot,
                name: "gunshot",
                damage: 20
            }
        ];

        this.weaponList = this.mergeArrayObjects(this.weaponList, this.weaponContainer);

        /**
         * [Obstacles description]
         */

        this.obstacleList = [];
        this.addItem(this.obstacleList, 40);

        this.zoneMap = document.querySelector(".game__contain");
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.SQUARE_SIZE = 15;
        this.SQUARE_WIDTH = this.canvas.width / this.SQUARE_SIZE;
        this.SQUARE_HEIGHT = this.canvas.height / this.SQUARE_SIZE;
        this.map = new Array();
        this.bindEvents();
        // this.draw();
        this.loop();
    }
    bindEvents() {
        document.onkeydown = (e) => {
            let hasMove = false;
            switch (e.key) {
                case "ArrowLeft": // Left
                    if (!this.haveCollision(this.currentPlayer.x - 1, this.currentPlayer.y, this.obstacleList)) {
                        this.currentPlayer.x--;
                        hasMove = true;
                    }
                    break;
                case "ArrowRight": // Right
                    if (!this.haveCollision(this.currentPlayer.x + 1, this.currentPlayer.y, this.obstacleList)) {
                        this.currentPlayer.x++;
                        hasMove = true;
                    }
                    break;
                case "ArrowUp": // Top
                    if (!this.haveCollision(this.currentPlayer.x, this.currentPlayer.y - 1, this.obstacleList)) {
                        this.currentPlayer.y--;
                        hasMove = true;
                    }
                    break;
                case "ArrowDown": // Bottom
                    if (!this.haveCollision(this.currentPlayer.x, this.currentPlayer.y + 1, this.obstacleList)) {
                        this.currentPlayer.y++;
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
                if (this.haveCollision(this.currentPlayer.x, this.currentPlayer.y, this.weaponList)) {
                    this.weaponList.some(weapon => {
                        if (this.currentPlayer.x === weapon.x && this.currentPlayer.y === weapon.y) {
                            console.log(weapon.name);
                        }
                    });
                }

                if (this.startFight(this.currentPlayer.x, this.currentPlayer.y, this.player2)) {
                    console.log("fight");
                }

                // this.draw();
            }
        };

        // this.startingDraw(this.weapon);
        // this.startingDraw(this.woodPixel);
        // this.startingDraw(this.wall);
        // this.weapon.addEventListener('load', () => {
        //     this.draw();
        // });
    }

    addItem(itemList, counter) {
        for (let item = 0; item < counter; item++) {
            itemList.push({ x: this.getRandomInt(15), y: this.getRandomInt(15) })
        }
    }

    mergeArrayObjects(arr1, arr2) {
        return arr1.map((item, i) => {
            return Object.assign({}, item, arr2[i])
        })
    }

    startFight(x, y, cible) {
        var hasCollision = false;
        if (x === cible.x && y === cible.y) {
            hasCollision = true;
        }
        return hasCollision;
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

    // startingDraw(element) {
    //     element.addEventListener('load', () => {
    //         this.draw();
    //     });
    // }

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.draw();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    draw() {
        let now = Date.now();
        let elapsed = now - this.startTime;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let x = 0; x < this.SQUARE_SIZE; x++) {
            for (let y = 0; y < this.SQUARE_SIZE; y++) {
                this.ctx.strokeStyle = 'black';
                // this.ctx.strokeRect(x * this.SQUARE_WIDTH, y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
                this.ctx.drawImage(this.woodPixel, x * this.SQUARE_WIDTH, y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);

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
            // this.ctx.fillRect(obstacle.x * this.SQUARE_WIDTH, obstacle.y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
            this.ctx.drawImage(this.wall, obstacle.x * this.SQUARE_WIDTH, obstacle.y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
        });

        this.ctx.strokeStyle = 'red';
        this.weaponList.forEach(weapon => {
            if (Math.floor(elapsed / 1000) % 2) {
                this.ctx.strokeStyle = 'black';
                // this.ctx.strokeRect(weapon.x * this.SQUARE_WIDTH, weapon.y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
            }
            this.ctx.strokeRect(weapon.x * this.SQUARE_WIDTH, weapon.y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
            this.ctx.drawImage(weapon.image, weapon.x * this.SQUARE_WIDTH, weapon.y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
        });

        this.ctx.fillStyle = 'transparent';
        this.corpseList.forEach(corpse => {
            this.ctx.drawImage(this.corpse, corpse.x * this.SQUARE_WIDTH, corpse.y * this.SQUARE_HEIGHT, this.SQUARE_WIDTH, this.SQUARE_HEIGHT);
        });
    }
}
new Map();