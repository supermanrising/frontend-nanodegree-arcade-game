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
    if (halfSpeed === true) {
        this.speed = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
    } else {
        this.speed = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
    }
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
            console.log(halfSpeed);
            if (halfSpeed === true) {
                this.speed = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
            } else {
                this.speed = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
            }
            // place bug to the left of canvas
            this.x = -101;
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
    this.x = -101;
    this.y = y;
    this.speed = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    this.active = true;
}
Heart.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    // Set heart to inactive when it exits the canvas view
    if (this.x > 600) {
        this.active = false;
        this.speed = 0;
    }
}
Heart.prototype.render = function() {
    // Only draw each heart if it's within the canvas view, just to save load time
    if (this.active === true) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Create new star variable as a Pseudoclassical Subclass of Heart
var Star = function(y) {
    Heart.call(this, y);
    this.sprite = 'images/Star.png'
}
Star.prototype = Object.create(Heart.prototype);
Star.prototype.constructor = Star;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var playerClass = function() {
    this.x = 202;
    this.y = 384;
    this.score = 0;
    this.hearts = 3;
}
// Set endStarPower as a global variable so we can clear the timeout on reset
var endStarPower;
// Set halfSpeed as a global variable so we can slow down new enemies during Star Power
var halfSpeed = false;
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
            // Move heart outside canvas and stop drawing after it's been used
            allHearts[heart].active = false;
            allHearts[heart].speed = 0;
            allHearts[heart].y = 1000;
        }
    }

    for (star in allStars) {
        var yStarVar = allStars[star].y - this.y;
        var xStarVar = allStars[star].x - this.x;

        //console.log(xStarVar + ', ' + yStarVar);

        if (yStarVar === 18 && xStarVar < 50 && xStarVar > -50) {
            for (evilBug in allEnemies) {
                allEnemies[evilBug].speed = allEnemies[evilBug].speed * .5;
            }
            halfSpeed = true;
            speedBackUp = setTimeout(function() {
                for (evilBug in allEnemies) {
                    allEnemies[evilBug].speed = allEnemies[evilBug].speed * 2;
                }
                halfSpeed = false;
            }, 5000)
            // Move star outside canvas and stop drawing after it's been used
            allStars[star].active = false;
            allStars[star].speed = 0;
            allStars[star].y = 1000;
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

var createEnemyOne;
var createEnemyTwo;
var createEnemyThree;
var createEnemyFour;
var createEnemyFive;
var createEnemySix;

function createEnemies () {
    createEnemyOne = setTimeout(function() {
        var enemyOne = new Enemy(60);
        allEnemies.push(enemyOne);
    }, Math.floor(Math.random() * (2000 - 100 + 1)) + 100)

    createEnemyTwo = setTimeout(function() {
        var enemyTwo = new Enemy(60);
        allEnemies.push(enemyTwo);
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000)

    createEnemyThree = setTimeout(function() {
        var enemyThree = new Enemy(143);
        allEnemies.push(enemyThree);
    }, Math.floor(Math.random() * (2000 - 100 + 1)) + 100)

    createEnemyFour = setTimeout(function() {
        var enemyFour = new Enemy(143);
        allEnemies.push(enemyFour);
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000)
    createEnemyFive = setTimeout(function() {
        var enemyFive = new Enemy(226);
        allEnemies.push(enemyFive);
    }, Math.floor(Math.random() * (2000 - 100 + 1)) + 100)

    createEnemySix = setTimeout(function() {
        var enemySix = new Enemy(226);
        allEnemies.push(enemySix);
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000)

}

var allHearts = [];
var heartY = [80, 163, 246];

/* Create a setInterval Function for creating a new heart every 10 - 45 seconds
 * Do this as a variable so we can clear the setInterval on reset()
 * For the Y position, we randomly choose a number from the heartY array
 * Citation: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
 */
function createHearts () {
    window.pushHearts = setInterval(function() {
        var heart = new Heart(heartY[Math.floor(Math.random() * heartY.length)]);
        allHearts.push(heart);
    }, Math.floor(Math.random() * (45000 - 10000 + 1)) + 10000)
}

var allStars = [];
var StarY = [70, 153, 236];
function createStars () {
    // Same as createHearts
    window.pushStars = setInterval(function() {
        var star = new Star(StarY[Math.floor(Math.random() * StarY.length)]);
        allStars.push(star);
    }, Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000)
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
