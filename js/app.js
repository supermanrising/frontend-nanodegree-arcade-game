// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    var speed = 0;

    // Generate a random number within a range
    // citation: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range

    function generateSpeed() {
        speed = Math.floor(Math.random() * (250 - 150 + 1)) + 150;
        return speed;
    }
    generateSpeed();
    this.speed = speed;

    function randomY() {
       var randomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        if (randomNumber === 1) {
            yCoor = 60;
        } else if (randomNumber === 2) {
            yCoor = 143;
        } else if (randomNumber === 3) {
            yCoor = 226;
        }
        return yCoor;
    }
    randomY();
    this.y = yCoor;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    
    if (this.x > 600) {
        this.x = -300;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var playerClass = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 384;
}
playerClass.prototype.update = function() {
    for (evilBug in allEnemies) {
        var yVariable = allEnemies[evilBug].y - this.y;
        var xVariable = allEnemies[evilBug].x - this.x;
        if (yVariable === 8 && xVariable < 50 && xVariable > -50) {
            this.y = 384;
        }
    }
}
playerClass.prototype.render = function() {
    var playerImage = Resources.get(this.sprite);
    ctx.drawImage(playerImage, this.x, this.y);
}
playerClass.prototype.handleInput = function(keycode) {
    if (keycode === 'right') {
        if (player.x < 404) {
            player.x = player.x + 101;
        }
    } else if (keycode === 'left') {
        if (player.x > 0) {
            player.x = player.x - 101;
        }
    } else if (keycode === 'up') {
        if (player.y > 52) {
            player.y = player.y - 83;
        } else if (player.y <= 52) {
            player.y = 384;
        }
    } else if (keycode === 'down') {
        if (player.y < 384) {
            player.y = player.y + 83;
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

function createEnemyOne () {
    var enemyOne = new Enemy;
    allEnemies.push(enemyOne);
}

function createEnemyTwo () {
    var enemyTwo = new Enemy;
    allEnemies.push(enemyTwo);
}
function createEnemyThree () {
    var enemyThree = new Enemy;
    allEnemies.push(enemyThree);
}
function createEnemyFour () {
    var enemyFour = new Enemy;
    allEnemies.push(enemyFour);
}
function createEnemyFive () {
    var enemyFive = new Enemy;
    allEnemies.push(enemyFive);
}
function createEnemySix () {
    var enemySix = new Enemy;
    allEnemies.push(enemySix);
}

var enemyOneDelay = Math.floor(Math.random() * (4000 - 100 + 1)) + 100;
setTimeout (createEnemyOne, enemyOneDelay);

var enemyTwoDelay = Math.floor(Math.random() * (4000 - 100 + 1)) + 100;
setTimeout (createEnemyTwo, enemyTwoDelay);

var enemyThreeDelay = Math.floor(Math.random() * (4000 - 100 + 1)) + 100;
setTimeout (createEnemyThree, enemyThreeDelay);

var enemyFourDelay = Math.floor(Math.random() * (4000 - 100 + 1)) + 100;
setTimeout (createEnemyFour, enemyFourDelay);

var enemyFiveDelay = Math.floor(Math.random() * (4000 - 100 + 1)) + 100;
setTimeout (createEnemyFive, enemyFiveDelay);

var enemySixDelay = Math.floor(Math.random() * (4000 - 100 + 1)) + 100;
setTimeout (createEnemySix, enemySixDelay);

var player = new playerClass;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
