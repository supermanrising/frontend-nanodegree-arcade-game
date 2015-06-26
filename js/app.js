// Enemies our player must avoid
var Enemy = function(y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // The starting x coordinate for enemies, to the left of the canvas
    this.x = -101;

    // The starting y coordinate gets passed into the class for each enemy
    this.y = y;

    // Generate a random number within a range
    // citation: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range

    // Generate a speed for each enemy.  If halfSpeed is currently
    // true, speed is half what it would normally be
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

    
    // update the x coordinate according to the speed variable
    this.x = this.x + (this.speed * dt);
    
    // If an enemy goes off canvas, re-calculate speed and loop back to the left
    for (bug in allEnemies) {
        // To avoid overlapping enemies, check to see if
        // the other bug on this bug's y coordinate is at
        // least half way through the screen before
        // looping this bug
        if (this != allEnemies[bug] && this.y === allEnemies[bug].y && this.x > 600 && allEnemies[bug].x > 300) {
            // Re-calculate bug speed
            if (halfSpeed === true) {
                this.speed = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
            } else {
                this.speed = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
            }
            // place bug to the left of canvas
            this.x = -101;
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Heart class
var Heart = function(y) {
    this.sprite = 'images/Heart.png';
    this.x = -101;
    this.y = y;
    this.speed = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    // set new hearts to active, once they are used or off canvas we de-activate them
    this.active = true;
}
Heart.prototype.update = function(dt) {
    // Set heart to inactive  when it exits the canvas view
    if (this.x > 600) {
        this.active = false;
        this.speed = 0;
    }
    // Only continue calculating x coordinate if heart is active
    if (this.active === true) {
        this.x = this.x + (this.speed * dt);
    }
    /* If the user has 8 or more hearts, stop heart creation.
     * We do this partly because we have limited space at the bottom right to display
     * hearts, and partly because it makes if more difficult for the advanced player.
     * Also we can clear all old heart objects here just to save load time
     */
    if (heartsBeingCreated === true && player.hearts >= 8) {
        clearTimeout(pushHearts);
        heartsBeingCreated = false;
        allHearts.length = 0;
        console.log('stop heart creation');
    }
    // If the user goes below 8 hearts and hearts aren't being created, restarts the creatHeart loop
    if (heartsBeingCreated === false && player.hearts < 8) {
        heartsBeingCreated = true;
        createHeart();
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
// Create a Star prototype that delegates to Heart's prototype
Star.prototype = Object.create(Heart.prototype);
Star.prototype.constructor = Star;
Star.prototype.update = function(dt) {
    // Set star to inactive when it exits canvas
    if (this.x > 600) {
        this.active = false;
        this.speed = 0;
    }
    // Only continue calculating x coordinate if star is active
    if (this.active === true) {
        this.x = this.x + (this.speed * dt);
    }
}

// Player class
var playerClass = function() {
    // Start our player in the first center square
    this.x = 202;
    this.y = 384;
    // start the score at 0, and hearts at 3
    this.score = 0;
    this.hearts = 3;
}
// Set endStarPower as a global variable so we can clear the setTimeout on reset (see line 150)
var endStarPower;
// Set halfSpeed as a global variable (see line 45 + 149)
var halfSpeed = false;
playerClass.prototype.update = function() {

    // check if the player and enemies occupy the same space
    for (evilBug in allEnemies) {
        var yVariable = allEnemies[evilBug].y - this.y;
        var xVariable = allEnemies[evilBug].x - this.x;

        // if the player and an enemy are in the same spot, reset player and remove 1 heart
        if (yVariable === 8 && xVariable < 50 && xVariable > -50) {
            this.y = 384;
            this.x = 202;
            if (this.hearts > 0) {
                this.hearts = this.hearts - 1;
            } 
        }
    }

    // check if the player and Hearts occupy the same space
    for (heart in allHearts) {
        var yHeartVar = allHearts[heart].y - this.y;
        var xHeartVar = allHearts[heart].x - this.x;

        // if a collision is detected, give the player 1 heart
        if (yHeartVar === 28 && xHeartVar < 50 && xHeartVar > -50) {
            this.hearts = this.hearts + 1;
            // Move heart outside canvas and stop drawing after it's been used
            allHearts[heart].active = false;
            allHearts[heart].speed = 0;
            allHearts[heart].y = 1000;
        }
    }

    // check if the player and Stars occupy the same space
    for (star in allStars) {
        var yStarVar = allStars[star].y - this.y;
        var xStarVar = allStars[star].x - this.x;

        // if a collision is detected, make all enemies run at half speed for 5 seconds
        if (yStarVar === 18 && xStarVar < 50 && xStarVar > -50) {
            for (evilBug in allEnemies) {
                allEnemies[evilBug].speed = allEnemies[evilBug].speed * .5;
            }
            // set half speed to true so that enemies will loop at half speed
            halfSpeed = true;
            // set a function to increase speed back to normal in 5 seconds
            endStarPower = setTimeout(function() {
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
    // Draw the user's selected character during preGame function (engine.js - line 75)
    ctx.drawImage(Resources.get(character), this.x, this.y);
}
playerClass.prototype.handleInput = function(keycode) {
    // If the user presses right and they aren't on the far right square, move right
    if (keycode === 'right') {
        if (player.x < 404) {
            player.x = player.x + 101;
        }
    } 
    // If the user presses left and they aren't on the far left square, move left
    else if (keycode === 'left') {
        if (player.x > 0) {
            player.x = player.x - 101;
        }
    } 
    // If the user presses up and they aren't on the top square, move up
    // If they are on the top square, add 1 to score and reset player
    else if (keycode === 'up') {
        if (player.y > 52) {
            player.y = player.y - 83;
        } else if (player.y <= 52) {
            player.y = 384;
            player.x = 202;
            player.score = player.score + 1;
        }
    } 
    // If the user presses down and they aren't on the bottom square, move down
    else if (keycode === 'down') {
        if (player.y < 384) {
            player.y = player.y + 83;
        }
    }
}


// Instantiate objects.

// Create an array to hold our enemies
var allEnemies = [];

/* This function creates our new enemies when the game starts
 * It will be called by the initGame function (engine.js - line 298)
 * It creates 2 enemies per row and pushes them to the allEnemies array.
 * Timing is split up for enemies on the same row
 */
function createEnemies () {
    window.createEnemyOne = setTimeout(function() {
        var enemyOne = new Enemy(60);
        allEnemies.push(enemyOne);
    }, Math.floor(Math.random() * (2000 - 100 + 1)) + 100)

    window.createEnemyTwo = setTimeout(function() {
        var enemyTwo = new Enemy(60);
        allEnemies.push(enemyTwo);
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000)

    window.createEnemyThree = setTimeout(function() {
        var enemyThree = new Enemy(143);
        allEnemies.push(enemyThree);
    }, Math.floor(Math.random() * (2000 - 100 + 1)) + 100)

    window.createEnemyFour = setTimeout(function() {
        var enemyFour = new Enemy(143);
        allEnemies.push(enemyFour);
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000)
    window.createEnemyFive = setTimeout(function() {
        var enemyFive = new Enemy(226);
        allEnemies.push(enemyFive);
    }, Math.floor(Math.random() * (2000 - 100 + 1)) + 100)

    window.createEnemySix = setTimeout(function() {
        var enemySix = new Enemy(226);
        allEnemies.push(enemySix);
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000)

}

// Create an array to hold our Hearts
var allHearts = [];
// create an array with Heart y coordinates, to be selected from at random
var heartY = [80, 163, 246];

/* Create a setTimeout Function for creating a new heart every 8 - 30 seconds.
 * Do this as a variable on the global scope so we can clear the setInterval on reset().
 * We set a global boolean variable to whether or not hearts are currently being created
 * so we can stop heart creation after the player has 8 or more hearts.  This is set up
 * to loop itself with a new interval each time
 * For the Y coordinate, we randomly choose a number from the heartY array
 * Citation: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
 */
var heartsBeingCreated = true;
function createHeart () {
    var randomHeartInterval = Math.floor(Math.random() * (3000 - 3000 + 1)) + 3000;
    if (heartsBeingCreated = true) {
        window.pushHearts = setTimeout(function() {
            var heart = new Heart(heartY[Math.floor(Math.random() * heartY.length)]);
            allHearts.push(heart);
            createHeart();
        }, randomHeartInterval)
    }
}

// Create an array to hold our Stars
var allStars = [];
// create an array with Star y coordinates, to be selected from at random
var StarY = [70, 153, 236];

// Create a Star every 20 - 60 seconds, same as createHearts
function createStar () {
    var randomStarInterval = Math.floor(Math.random() * (60000 - 20000 + 1)) + 20000;
    window.pushStars = setTimeout(function() {
        var star = new Star(StarY[Math.floor(Math.random() * StarY.length)]);
        allStars.push(star);
        createStar();
    }, randomStarInterval)
}

// Create our player
var player = new playerClass();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
