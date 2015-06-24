// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = y;
    // Generate a random number within a range
    // citation: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
    this.speed = Math.floor(Math.random() * (500 - 150 + 1)) + 150;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    
    // move each enemy according to their pre-defined speed variable
    this.x = this.x + (this.speed * dt);
    
    // If an enemy goes off canvas, recalculate speed and loop back to the left
    if (this.x > 600) {
        this.speed = Math.floor(Math.random() * (500 - 150 + 1)) + 150;
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
    this.x = 202;
    this.y = 384;
    this.score = 0;
    this.hearts = 3;
}
playerClass.prototype.update = function() {
    for (evilBug in allEnemies) {
        var yVariable = allEnemies[evilBug].y - this.y;
        var xVariable = allEnemies[evilBug].x - this.x;
        if (yVariable === 8 && xVariable < 50 && xVariable > -50) {
            this.y = 384;
            if (this.hearts > 1) {
                this.hearts = this.hearts - 1;
            } else {
                this.hearts = 3;
                this.score = 0;
            }
        }
    }
}
playerClass.prototype.render = function(character) {
    var playerImage = Resources.get(character);
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
            player.score = player.score + 1;
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
    var enemyOne = new Enemy(60);
    allEnemies.push(enemyOne);
}
function createEnemyTwo () {
    var enemyTwo = new Enemy(60);
    allEnemies.push(enemyTwo);
}
function createEnemyThree () {
    var enemyThree = new Enemy(143);
    allEnemies.push(enemyThree);
}
function createEnemyFour () {
    var enemyFour = new Enemy(143);
    allEnemies.push(enemyFour);
}
function createEnemyFive () {
    var enemyFive = new Enemy(226);
    allEnemies.push(enemyFive);
}
function createEnemySix () {
    var enemySix = new Enemy(226);
    allEnemies.push(enemySix);
}

var enemyOneDelay = Math.floor(Math.random() * (2500 - 100 + 1)) + 100;
setTimeout (createEnemyOne, enemyOneDelay);

var enemyTwoDelay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
setTimeout (createEnemyTwo, enemyTwoDelay);

var enemyThreeDelay = Math.floor(Math.random() * (2500 - 100 + 1)) + 100;
setTimeout (createEnemyThree, enemyThreeDelay);

var enemyFourDelay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
setTimeout (createEnemyFour, enemyFourDelay);

var enemyFiveDelay = Math.floor(Math.random() * (2500 - 100 + 1)) + 100;
setTimeout (createEnemyFive, enemyFiveDelay);

var enemySixDelay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
setTimeout (createEnemySix, enemySixDelay);

var player = new playerClass();

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
