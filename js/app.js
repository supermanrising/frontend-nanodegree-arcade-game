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
    
    // If an enemy goes off canvas, loop back to the left
    for (bug in allEnemies) {
        // To avoid overlapping enemies, check to see if
        // the other bug on this bug's y coordinate is at
        // least half way through the screen before
        // looping this bug
        if (this != allEnemies[bug] && this.y === allEnemies[bug].y && this.x > 600 && allEnemies[bug].x > 300) {
            // Re-calculate bug speed
            this.speed = Math.floor(Math.random() * (500 - 150 + 1)) + 150;
            // place bug to the left of canvas
            this.x = -300;
        }
    }
    

    /*
    if (this.x > 600) {
        this.speed = Math.floor(Math.random() * (500 - 150 + 1)) + 150;
        this.x = -300;
    }
    */
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Heart = function(y) {
    this.sprite = 'images/Heart.png';
    this.x = -100;
    this.y = y;
    this.speed = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
}
Heart.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > 3000) {
        this.x = -300;
    }
}
Heart.prototype.render = function() {
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
            this.x = 202;
            if (this.hearts > 0) {
                this.hearts = this.hearts - 1;
            } 
        }
    }

    for (heart in allHearts) {
        var yHeartVar = allHearts[heart].y - this.y;
        var xHeartVar = allHearts[heart].x - this.x;

        //console.log(xHeartVar + ', ' + yHeartVar);

        if (yHeartVar === 28 && xHeartVar < 50 && xHeartVar > -50) {
            this.hearts = this.hearts + 1;
            // Move heart outside canvas after it's been used
            allHearts[heart].y = 1000;
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
            player.x = 202;
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

function createEnemies () {

    var enemyOne = new Enemy(60);
    setTimeout(function() {
        allEnemies.push(enemyOne);
    }, Math.floor(Math.random() * (2000 - 100 + 1)) + 100)

    var enemyTwo = new Enemy(60);
    setTimeout(function() {
        allEnemies.push(enemyTwo);
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000)

    var enemyThree = new Enemy(143);
    setTimeout(function() {
        allEnemies.push(enemyThree);
    }, Math.floor(Math.random() * (2000 - 100 + 1)) + 100)

    var enemyFour = new Enemy(143);
    setTimeout(function() {
        allEnemies.push(enemyFour);
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000)

    var enemyFive = new Enemy(226);
    setTimeout(function() {
        allEnemies.push(enemyFive);
    }, Math.floor(Math.random() * (2000 - 100 + 1)) + 100)

    var enemySix = new Enemy(226);
    setTimeout(function() {
        allEnemies.push(enemySix);
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000)
}

var allHearts = [];

function createHearts () {
    var heartOne = new Heart(80);
    setTimeout(function() {
        allHearts.push(heartOne);
    }, Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000)

    var heartTwo = new Heart(163);
    setTimeout(function() {
        allHearts.push(heartTwo);
    }, Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000)

    var heartThree = new Heart(246);
    setTimeout(function() {
        allHearts.push(heartThree);
    }, Math.floor(Math.random() * (35000 - 25000 + 1)) + 25000)
}

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
