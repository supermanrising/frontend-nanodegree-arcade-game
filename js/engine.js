/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = function (global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 706;
    doc.body.appendChild(canvas);

    // Create initial character variable
    var character;

    // Set array of available player choices
    var playerOptions = [
        {
            image: 'images/char-boy.png',
            x: 50,
            y: 210
        },
        {
            image: 'images/char-cat-girl.png',
            x: 202.5,
            y: 210
        },
        {
            image: 'images/char-horn-girl.png',
            x: 360,
            y: 210
        },
        {
            image: 'images/char-pink-girl.png',
            x: 115,
            y: 310
        },
        {
            image: 'images/char-princess-girl.png',
            x: 290,
            y: 310
        }
    ];

    // Get mouse coordinates over canvas
        // Citation: http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function preGame() {

        reset();

        // Set font style
        ctx.font = "18pt VT323";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.save();


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(Resources.get('images/pregame-bg.png'), 0, 50);
        ctx.drawImage(Resources.get('images/title.png'), 5, 100);
        ctx.fillText('Choose a Player to Start Hopping', canvas.width / 2, 220);

        for (playerCharacter in playerOptions) {
            ctx.drawImage(Resources.get(playerOptions[playerCharacter].image), playerOptions[playerCharacter].x, playerOptions[playerCharacter].y);
        }

        if (character === 'images/char-boy.png') {
            selectCharacter(character, 51, 237);
        } else if (character === 'images/char-cat-girl.png') {
            selectCharacter(character, 203.5, 237);
        } else if (character === 'images/char-horn-girl.png') {
            selectCharacter(character, 361, 237);
        } else if (character === 'images/char-pink-girl.png') {
            selectCharacter(character, 116, 337);
        } else if (character === 'images/char-princess-girl.png') {
            selectCharacter(character, 291, 337);
        }

        function selectCharacter (selectedCharacter, x, y) {
            character = selectedCharacter

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(Resources.get('images/pregame-bg.png'), 0, 50);
            ctx.drawImage(Resources.get('images/title.png'), 5, 100);
            ctx.fillText('Choose a Player to Start Hopping', canvas.width / 2, 220);

            ctx.drawImage(Resources.get('images/Star.png'), x, y);

            for (playerCharacter in playerOptions) {
                ctx.drawImage(Resources.get(playerOptions[playerCharacter].image), playerOptions[playerCharacter].x, playerOptions[playerCharacter].y);
            }
            ctx.fillText('Start Game', canvas.width / 2, 495);
        }

        canvas.addEventListener('mousemove', preGameMouseLocation, false);

        function preGameMouseLocation(evt) {
            var mousePos = getMousePos(canvas, evt);
            var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
            console.log(message);

            if (mousePos.x > 68.5 && mousePos.x < 135.5 && mousePos.y > 275 && mousePos.y < 351 ||
            mousePos.x > 221.5 && mousePos.x < 288.5 && mousePos.y > 275 && mousePos.y < 351 ||
            mousePos.x > 378.5 && mousePos.x < 444.5 && mousePos.y > 275 && mousePos.y < 351 ||
            mousePos.x > 131.5 && mousePos.x < 201.5 && mousePos.y > 375 && mousePos.y < 451 ||
            mousePos.x > 308.5 && mousePos.x < 375.5 && mousePos.y > 375 && mousePos.y < 451 ||
            mousePos.x > 205.5 && mousePos.x < 303.5 && mousePos.y > 481 && mousePos.y < 498  && character != null)
            {
                canvas.style.cursor = "pointer";
            }
            else {
                canvas.style.cursor = "default";
            }
        }

        // Determine canvas click location
        // Citation: http://www.webdeveloper.com/forum/showthread.php?240982-Clickable-image-object-on-canvas-tag
        canvas.addEventListener('click', onPreGameClick, false);
        function onPreGameClick(evt) {
            var mousePos = getMousePos(canvas, evt);
            //console.log(mousePos.x + ', ' + mousePos.y);

            if (mousePos.x > 68.5 && mousePos.x < 135.5 && mousePos.y > 275 && mousePos.y < 351) {
                selectCharacter('images/char-boy.png', 51, 237);
            } else if (mousePos.x > 221.5 && mousePos.x < 288.5 && mousePos.y > 275 && mousePos.y < 351) {
                selectCharacter('images/char-cat-girl.png', 203.5, 237);
            } else if (mousePos.x > 378.5 && mousePos.x < 444.5 && mousePos.y > 275 && mousePos.y < 351) {
                selectCharacter('images/char-horn-girl.png', 361, 237);
            } else if (mousePos.x > 131.5 && mousePos.x < 201.5 && mousePos.y > 375 && mousePos.y < 451) {
                selectCharacter('images/char-pink-girl.png', 116, 337);
            } else if (mousePos.x > 308.5 && mousePos.x < 375.5 && mousePos.y > 375 && mousePos.y < 451) {
                selectCharacter('images/char-princess-girl.png', 291, 337);
            } else if (mousePos.x > 205.5 && mousePos.x < 303.5 && mousePos.y > 481 && mousePos.y < 498 && character != null) {
                initGame();
                canvas.removeEventListener('mousemove', preGameMouseLocation, false);
                canvas.removeEventListener('click', onPreGameClick, false);
                canvas.style.cursor = "default";
            }
        }    
    }

    function reset() {
        // Set player's score and hearts back to zero
        player.hearts = 3;
        player.score = 0;
        // Empty the allEnemies and allHearts arrays
        allEnemies.length = 0;
        allHearts.length = 0;
    }

    function gameOver(playerScore) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(Resources.get('images/pregame-bg.png'), 0, 50);
        ctx.font = "60pt VT323";
        ctx.textAlign = "center";
        ctx.fillText('GAME OVER', canvas.width / 2, 220);
        ctx.restore();
        ctx.fillText('Your Score: ' + playerScore, canvas.width / 2, 290);
        ctx.fillText('PLAY AGAIN', 140, 370);
        ctx.fillText('NEW CHARACTER', canvas.width - 140, 370);

        canvas.addEventListener('mousemove', gameOverMouseLocation, false);

        function gameOverMouseLocation(evt) {
            var mousePos = getMousePos(canvas, evt);
            //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
            //console.log(message);

            if (mousePos.x > 93.5 && mousePos.x < 191.5 && mousePos.y > 357 && mousePos.y < 373 ||
            mousePos.x > 302.5 && mousePos.x < 431.5 && mousePos.y > 357 && mousePos.y < 373)
            {
                canvas.style.cursor = "pointer";
            }
            else {
                canvas.style.cursor = "default";
            }
        }

        canvas.addEventListener("click", onGameOverClick, false);
        function onGameOverClick(evt) {
            var mousePos = getMousePos(canvas, evt);
            //console.log(mousePos.x + ', ' + mousePos.y);

            if (mousePos.x > 93.5 && mousePos.x < 191.5 && mousePos.y > 357 && mousePos.y < 373) {
                canvas.removeEventListener('mousemove', gameOverMouseLocation, false);
                canvas.removeEventListener('click', onGameOverClick, false);
                canvas.style.cursor = "default";
                console.log('initialize game, same character');
                //initGame();
            } else if (mousePos.x > 302.5 && mousePos.x < 431.5 && mousePos.y > 357 && mousePos.y < 373) {
                canvas.removeEventListener('mousemove', gameOverMouseLocation, false);
                canvas.removeEventListener('click', onGameOverClick, false);
                canvas.style.cursor = "default";
                console.log('initialize pregame, new character');
                preGame();
            }
        }    
    }

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();
        

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        if (player.hearts > 0) {
            win.requestAnimationFrame(main);
        } else {
            gameOver(player.score);
        }
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        //reset();
        //lastTime = Date.now();
        preGame();
    }

    function initGame() {
        reset();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        lastTime = Date.now();

        // Add enemies to allEnemies array
        createEnemies();
        // Add hearts to allHearts array
        createHearts();

        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
        updateScore(player.score);
        updateHearts(player.hearts);
    }

    function updateScore(score) {
        ctx.clearRect(0, 602, 250, 30);
        ctx.textAlign = "left";
        ctx.fillText("SCORE: " + score, 0, 620);
    }

    function updateHearts(hearts) {
        ctx.clearRect(canvas.width - 250, 602, 250, 30);
        if (player.hearts > 0) {
            ctx.drawImage(Resources.get('images/heart-small.png'), canvas.width - 20, 602);
        }
        if (player.hearts > 1) {
            ctx.drawImage(Resources.get('images/heart-small.png'), canvas.width - 45, 602);
        }
        if (player.hearts > 2) {
            ctx.drawImage(Resources.get('images/heart-small.png'), canvas.width - 70, 602);
        }
        if (player.hearts > 3) {
            ctx.drawImage(Resources.get('images/heart-small.png'), canvas.width - 95, 602);
        }
        if (player.hearts > 4) {
            ctx.drawImage(Resources.get('images/heart-small.png'), canvas.width - 120, 602);
        }
        if (player.hearts > 5) {
            ctx.drawImage(Resources.get('images/heart-small.png'), canvas.width - 145, 602);
        }
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        allHearts.forEach(function(heart) {
            heart.update(dt);
        });
        player.update();
    }
    
    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }


        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        allHearts.forEach(function(heart) {
            heart.render();
        });

        player.render(character);
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/pregame-bg.png',
        'images/title.png',
        'images/Star.png',
        'images/heart-small.png',
        'images/Heart.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
}(this);
