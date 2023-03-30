let canvas;
let canvas2;  // To achieve post-game state
let context;
let context2;  // To achieve post-game state
let game_animation;

let now;
let fpsInterval;  // 60fps
let then = Date.now();

const songs = [
    "Arriba Amoeba!.mp3",
    "Arroz Con Pollo.mp3",
    "Beachfront Celebration.mp3",
    "Bricks Instrumental.mp3",
    "Chan Chan.mp3",
    "Classical.mp3",
    "Del Rio Bravo.mp3",
    "Feel Good Inc. Bass & Guitar Deep.mp3",
    "Feel Good Inc. Bass & Guitar.mp3",
    "Feel Good Inc. Guitar.mp3",
    "Feel Good Inc..mp3",
    "Follow Your Face.mp3",
    "Happy Happy Game Show.mp3",
    "Hocus Pocus Yodelling.mp3",
    "Jump Up Superstar Music Box.mp3",
    "Jump Up Superstar Slowed Music Box.mp3",
    "K.K. Cruisin'.mp3",
    "Koopa's Theme Flute.mp3",
    "Life Could Be a Dream Instrumental.mp3",
    "Life Could Be a Dream.mp3",
    "Mike Nesmith - Tapioca Tundra.mp3",
    "Modern Jazz Samba.mp3",
    "Morning Flower (Reggae Version).mp3",
    "Mount Lineland.mp3",
    "My Bubblegum.mp3",
    "Oswald's Theme.mp3",
    "Powerful Mario.mp3",
    "Raving_Rabbids_OST.mp3",
    "Raving_Rabbids_OST_1.mp3",
    "Raving_Rabbids_OST_2.mp3",
    "Sesame Street (Instrumental) Ringtone.mp3",
    "She Took the Kids Ending.mp3",
    "Spaz Bridge.mp3",
    "Star vs. the Forces of Evil - Buff Frog's Theme.mp3",
    "Tango de Manzana.mp3",
    "The Walk.mp3",
    "Theme from Up.mp3",
    "Tiki Land.mp3",
    "Verano Sensual.mp3",
    "Washing Machine Whistling.mp3",
    "Wii Party Suggestions Music.mp3",
    "3DS Mii Maker.mp3",
    "59 Seconds Theme.mp3",
    "Doors OST Curious Light.mp3",
    "Doors OST Elevator Jammed.mp3",
    "Ending Theme - Super Mario World.mp3",
    "Flipsville Galaxy.mp3",
    "GTA 5- its a setup (ending song).mp3",
    "GTA IV Loading Screen Theme Song.mp3",
    "Honeybloom Galaxy.mp3",
    "Labour (Human Fall Flat).mp3",
    "Mario Paint theme.mp3",
    "Maro Malt (Malo Mart J-House Remix).mp3",
    "Mii plaza 3ds theme remix (NOTEBLOCK).mp3",
    "Sleepwalk by Santo and Johnny (Slowed Down).mp3",
    "Sonic Mania OST - Rogues Gallery for Mirage Saloon Zone Act 2 Remix.mp3",
    "Starshine Beach Galaxy (Underwater).mp3",
];
let background_song = songs[randint(0, songs.length - 1)];

let terrain_background = [[73,19,85,59,59,59,59,72,84,21,60,86,86,60,86,86,73,73,73,86,19,58,84,59,59,71,85,58,84,71,58,59],
                          [73,73,61,59,85,71,72,71,59,24,60,86,73,86,60,86,86,86,73,60,19,84,58,59,59,59,59,84,12,85,58,59],
                          [60,73,60,61,36,46,46,46,46,22,60,86,73,60,60,60,60,73,73,60,19,59,59,59,59,59,59,59,25,72,58,59],
                          [60,73,86,60,22,85,58,84,71,21,60,73,60,60,73,73,60,86,73,86,19,59,59,59,59,59,59,84,24,46,58,59],
                          [73,86,86,86,61,85,9,46,47,21,60,60,86,60,60,60,60,60,73,60,19,58,58,59,59,72,58,59,25,71,58,59],
                          [60,86,6,7,8,77,25,59,84,21,86,86,73,86,60,60,73,73,86,86,19,59,59,59,59,72,59,59,25,71,58,59],
                          [60,73,19,20,21,19,25,59,58,89,7,7,7,7,7,7,7,7,7,7,90,59,59,59,59,85,59,59,25,71,58,59],
                          [73,73,32,33,34,24,10,46,11,59,72,72,59,59,84,58,59,59,59,59,59,59,59,59,59,59,59,58,25,85,58,59],
                          [73,86,86,60,7,90,59,59,25,59,72,58,59,59,59,59,59,59,59,59,72,58,9,46,46,46,47,59,25,58,58,59],
                          [7,49,73,73,84,59,59,71,24,46,46,46,46,46,11,59,59,84,85,59,58,71,25,59,58,71,84,59,25,84,58,59],
                          [23,21,86,73,77,58,71,59,25,72,59,59,59,9,10,47,59,59,59,59,85,59,25,59,71,59,59,59,25,85,58,59],
                          [46,22,60,60,19,59,59,59,25,59,59,59,59,25,59,59,59,59,59,59,59,59,25,59,59,85,84,59,25,72,58,59],
                          [46,22,86,73,90,59,59,59,38,59,59,84,59,25,71,72,59,59,59,72,59,59,25,71,59,59,84,59,25,58,58,59],
                          [23,35,8,48,84,85,59,72,59,59,59,59,59,24,46,46,46,46,46,46,46,46,22,58,84,59,59,59,25,85,58,59],
                          [33,33,34,19,59,71,84,59,58,71,85,84,59,25,59,59,59,59,85,85,72,59,35,46,46,46,46,46,22,58,58,59],
                          [85,58,71,85,72,59,85,85,58,84,72,71,85,38,85,84,59,71,72,59,71,72,58,71,71,59,72,84,25,84,58,59],
                          [84,84,72,59,84,59,72,84,72,71,72,84,72,58,72,72,84,84,85,58,58,58,85,71,59,71,85,84,25,59,58,59],
                          [71,71,84,58,85,71,84,85,72,84,72,72,72,72,85,59,72,58,59,72,85,59,58,58,58,84,71,84,25,58,59,59],
                          [59,71,59,58,71,85,59,59,84,72,58,84,85,59,58,72,71,59,85,84,84,59,58,71,71,59,72,71,25,71,72,72],
                          [72,71,71,59,59,85,71,72,84,85,85,58,72,58,72,72,71,85,84,58,85,85,58,58,71,85,58,58,25,84,85,85]]

let tilesPerRow = 13;
let tileSize = 16;

let player = {
    x: 0,
    y: 0,
    inner_x: 9,
    inner_width: 15,
    width: 106,
    height: 22,
    frameX: 0,
    frameY: 1,
    xChange: 0,
    yChange: 0,
    turned: false
};

let enemies = ["skull"];
let active_enemies = [];
let enemy_randomiser = enemies[randint(0, enemies.length - 1)];
let enemy_amount = 1;
let enemy_counter = 0;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let shoot = false;

let counter = 0;
let wait_counter = 0;
let cooldown = "off";

let winner = false;

let enable_collisions = true;

let playerImage = new Image();
let enemyImage_skull = new Image();

let BackgroundImage = new Image();




document.addEventListener("DOMContentLoaded", init, false)

function init() {
    canvas = document.getElementById("inner");
    context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;

    let background_audio = new Audio("/Assets/Audio/" + background_song);
    background_audio.play();
    background_audio.addEventListener('ended', () => {
        background_audio.currentTime = 0;
        background_audio.play();
    });
    console.log("Playing " + background_song);

    player.x = canvas.width / 2 - player.width / 5;
    player.y = canvas.height / 2 - player.height / 2;




    window.addEventListener("keydown", activate, false)
    window.addEventListener("keyup", deactivate, false)


    load_assets([
        { "var": playerImage, "url": "Assets/Player/player.png" },
        { "var": enemyImage_skull, "url": "Assets/Enemies/fire-skull.png" },
        { "var": BackgroundImage, "url": "Assets/Tileset/tiles.png" }
    ], draw);
}










function draw() {
    game_animation = window.requestAnimationFrame(draw);

    fpsInterval = 50;
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);


    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background on canvas
    for (let r = 0; r < terrain_background.length; r += 1) {
        for (let c = 0; c < terrain_background[0].length; c += 1) {
            let tile = terrain_background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(BackgroundImage,
                    tileCol * tileSize,
                    tileRow * tileSize,
                    tileSize,
                    tileSize,

                    c * tileSize,
                    r * tileSize,
                    tileSize,
                    tileSize);
            }
        }
    }


    // Draw Player in first phase where game has not been won
    if (winner == false) {
        context.drawImage(playerImage,
            player.width * player.frameX,
            player.height * player.frameY,
            player.width,
            player.height,

            player.x, player.y, player.width, player.height
        );
    }


    if (active_enemies.length < enemy_amount) {
        enemy_counter += 1;
        if (enemy_randomiser == "skull") {
            let enemy = {
                id : enemy_counter,
                image_name : enemyImage_skull,
                x: randint(-1, 1) * canvas.width,
                y: randint(-50, canvas.height + 50),
                inner_x: 7,
                inner_y: 12,
                inner_width: 10,
                inner_height: 14,
                width: 26,
                height: 30,
                frameX: 0,
                frameY: 0,
                xChange: 1,
                yChange: 1,
            };
            active_enemies.push(enemy);
        }
        
    }
    else if (active_enemies.length == 0 && winner == false) {
        win(player);
    }


    // Draw Enemy
    for (let enemy of active_enemies) {
        context.drawImage(enemy.image_name,
                          enemy.width * enemy.frameX,
                          enemy.height * enemy.frameY,
                          enemy.width,
                          enemy.height,

                          enemy.x, enemy.y, enemy.width, enemy.height
        );
        context.font = "10px Arial";
        context.textAlign = "center";
        context.fillText("Enemy " + enemy.id, enemy.x + (enemy.width / 2), enemy.y + enemy.height + 5);
}

    // Moving
    if ((moveLeft || moveRight || moveUp || moveDown) && !(moveRight && moveLeft)) {
        player.frameY = 1
        if (player.turned) {
            player.frameY = 6;
        }
        player.frameX = (player.frameX + 1) % 8;
    }
    // if idle
    if (!(moveLeft || moveRight || moveUp || moveDown) || (moveRight && moveLeft) || (moveUp && moveDown)) {
        if (shoot == false) {

            if (player.frameY != 0 && player.frameY != 5) {
                player.frameX = 0;  // running-sprite row has 8 columns whereas the idle-sprite row only has 5
                if (player.turned) {
                    player.frameY = 5
                }
                else {
                    player.frameY = 0;
                }
            }
            


            
            counter += 1;
            if (counter % 3 == 0) {
            player.frameX = (player.frameX + 1) % 5;
            }
        }

        player.xChange = player.xChange * 0.8; // Friction increased when stopped
        player.yChange = player.yChange * 0.8;
    }

    // Update the Player
    player.x += player.xChange;
    player.y += player.yChange;


    // Update Enemy
    // linear motion
    // for (let enemy of active_enemies) {
    //     enemy.x += enemy.xChange;
    //     enemy.y += enemy.yChange;
    // }

    // FOLLOW PLAYER
    for (let enemy of active_enemies) {

        if (player.x + player.inner_x + player.inner_width <= enemy.x + enemy.inner_x) {
            enemy.x -= enemy.xChange;
        }
        else if (player.x + player.inner_x >= enemy.x + enemy.inner_x + enemy.inner_width) {
            enemy.x += enemy.xChange;
        }

        if (player.y + player.height <= enemy.y) {
            enemy.y -= enemy.yChange;
        }
        else if (player.y >= enemy.y + enemy.height) {
            enemy.y += enemy.yChange;
        }
    }



    //COLLIDING
    for (let enemy1 = 0; enemy1 < active_enemies.length; enemy1 += 1) {
        for (let enemy2 = enemy1 + 1; enemy2 < active_enemies.length; enemy2 += 1) {
            if (enable_collisions) {
                if (collides(active_enemies[enemy1], active_enemies[enemy2])) {
                    console.log("Collision!")
                    // What to do! 🔴🔴🔴
                    active_enemies[enemy1].xChange = active_enemies[enemy1].xChange * -1;
                    // enemy_amount -= 1;
                }
            }
        }
    }


    function collides(e1, e2) {
        disableCollisions();
        if (((e1.x + e1.inner_width) < e2.x) || ((e2.x + e2.inner_width) < e1.x) || (e1.y > (e2.y + e2.height)) || (e2.y > (e1.y + e1.height))) {
            return false;
        }
        else {
            return true;
        }
    }

    function enableCollisions() {
        enable_collisions = true;
    }
    function disableCollisions() {
        enable_collisions = false;

        // Wait for some time before enabling collisions again
        wait_counter += 1;
        if (wait_counter == 50) {
            wait_counter = 0;
            enableCollisions();
        }
    }

    // Physics
    player.xChange = player.xChange * 0.95; // Friction again
    player.yChange = player.yChange * 0.95;


    // Stop player from going out of bounds
    if (player.y < 0) {
        player.y = 0;
    }
    else if ((player.y + player.height) > canvas.height) {
        player.y = canvas.height - player.height
    }
    // Hitting the edge of the canvas
    // left side
    if (player.x + player.inner_x + player.inner_width < 0) {  // Hitting the left edge --- + 24 is used because player's body doesn't end until 24 pixels in
        player.x = canvas.width - player.inner_x;  // Come back at the right edge
    }
    // right side
    if (player.x + player.inner_x > canvas.width) { // Hitting the right edge --- similar here
        player.x = -(player.inner_x + player.inner_width);  // Come back at left edge
    }


    // Enemies' Bounds
    for (let enemy of active_enemies) {
        // Hitting the edge of the canvas
        // left side
        if (enemy.x + 24 < 0) {  // Hitting the left edge --- + 24 is used because player's body doesn't end until 24 pixels in
            enemy.x = canvas.width - player.inner_x;  // Come back at the right edge
        }
        // right side
        if (enemy.x + 9 > canvas.width) { // Hitting the right edge --- similar here
            enemy.x = -24;  // Come back at left edge
        }
    }




    if (moveLeft) {
        turn("left", player);
        player.xChange -= 0.8;  // Acceleration!
    }
    if (moveRight) {
        turn("right", player);
        player.xChange += 0.8;
    }
    if (moveUp) {
        player.yChange -= 0.8;
    }
    if (moveDown) {
        player.yChange += 0.8;
    }

    if (shoot != false) {
        console.log("Shoot = " + shoot)
        if (shoot == "beam" && cooldown != "on") {
            if (player.turned == false) {
                player.frameY = 2;
            }
            else if (player.turned) {
                player.frameY = 7;
            }

            if (player.frameX < 6) {
                counter += 1;
                if (counter == 1 || counter % 4 == 0) {
                    player.frameX += 1;
                }
            }
            else if (player.frameX == 6) {
                player.frameX = 7;
                enemy_hit();
            }
            else if (player.frameX == 7) {
                player.frameX = 6;
                enemy_hit();
            }


            if (player.frameX == 12) {
                shoot = false;
                cooldown = "on";
                player.frameX = 0;
            }
        }

        else if (shoot == "wind_down") {
            if (player.frameX > 0) {
                counter -= 1
                player.frameX -= 1;
            }
            else {
                shoot = false;
            }
        }
    }



    // END OF DRAW()
}



function activate(event) {  // 🟢
    let key = event.key;

    switch (key) {
        case "ArrowLeft":
            if (shoot != "beam") {
                moveLeft = true;
            }
            break; // would go through each case until it reaches a break if this wasn't here. Therefore, each case is its own if statement. By inserting a break at the end of each one, the cases become 'else if' statements.
        case "ArrowRight":
            if (shoot != "beam") {
                moveRight = true;
            }
            break;
        case "ArrowUp":
            if (shoot != "beam") {
                moveUp = true;
            }
            break;
        case "ArrowDown":
            if (shoot != "beam") {
                moveDown = true;
            }
            break;
        case " ":

            if (shoot == false) {
                moveUp = moveRight = moveLeft = moveDown = false;
                shoot = "beam";
            }
    }
}

function deactivate(event) { // 🔴
    let key = event.key;


    switch (key) {
        case "ArrowLeft":
            moveLeft = false;
            break;
        case "ArrowRight":
            moveRight = false;
            break;
        case "ArrowUp":
            moveUp = false;
            break;
        case "ArrowDown":
            moveDown = false;
            break;
        case " ":
            if (shoot == "beam") {
                counter = 10;
                shoot = "wind_down";
            }
    }
}

function turn(position, state) {
    if (position == "left") {
        if (state.turned == true) {
            console.log("object is already turned so will not move them")
        }
        else if (state.turned == false) {
            console.log("moving player")
            state.x -= state.width - state.inner_x - state.inner_width;
        }

        state.turned = true;
        state.frameY = 6;
        state.inner_x = 80;
    }
    else if (position == "right") {
        if (state.turned == false) {
            console.log("object is already turned right so will not move them")
        }
        else if (state.turned == true) {
            state.x += state.inner_x;
        }

        state.turned = false;
        state.frameY = 1;
        state.inner_x = 9;
    }
}

function enemy_hit() {
    console.log("enemy_hit function reached")
    for (let enemy of active_enemies) {
        if (player.turned == false) {
            // if (
                    // X VALUES ALIGN?
                    //(
                        // AFTER THE START OF THE BEAM
                        //(
                            //(enemy.x + enemy.inner_x) > (player.x + player.inner_x + player.inner_width)
                        //) 
                        //&&
                        // BEFORE THE END OF THE BEAM
                        //(
                            //(enemy.x + enemy.inner_x + enemy.inner_width) < (player.x + player.width)
                        //)
                    //) 
                    //&&
                    // Y VALUES ALIGN
                    //(
                        // TOP OF ENEMY
                        //(
                            // UNDER TOP OF BEAM
                            //(enemy.y > player.y)
                            //&&
                            // ABOVE BOTTOM OF BEAM
                            //(enemy.y < (player.y + player.height))
                        //)
                        //||
                        // BOTTOM OF ENEMY
                        //(
                            // UNDER TOP OF BEAM
                            //(enemy.y + enemy.height > player.y)
                            //&&
                            // ABOVE BOTTOM OF BEAM
                            //(enemy.y + enemy.height < player.y + player.height)
                        //)
                        //||
                        // BODY OF ENEMY (IF ENEMY IS BIGGER THAN PLAYER AND PLAYER GETS A BODY SHOT (NO HEAD OR FEET ARE SHOT))
                        //(
                            // TOP OF ENEMY IS ABOVE PLAYER
                            //(enemy.y < player.y) 
                            //&&
                            // BOTTOM OF ENEMY IS BELOW PLAYER
                            //((enemy.y + enemy.height) > (player.y + player.height))
                        //)
                    //)
                //) {}
            if (((enemy.x + enemy.inner_x) > (player.x + player.inner_x + player.inner_width)) && ((enemy.x + enemy.inner_x + enemy.inner_width) < (player.x + player.width)) && (((enemy.y + enemy.inner_y > player.y) && ((enemy.y + enemy.inner_y) < (player.y + player.height))) || (((enemy.y + enemy.height + enemy.inner_y) > player.y) && ((enemy.y + enemy.inner_y + enemy.height) < (player.y + player.height))) || ((enemy.y + enemy.inner_y < player.y) && ((enemy.y + enemy.inner_y + enemy.height) > (player.y + player.height))))) {
                console.log("DIRECT HIT!");
                let index = active_enemies.indexOf(enemy);
                active_enemies.splice(index, 1);
                enemy_amount -= 1;
            }
        }
        else if (player.turned) {
            // if (
                    // X VALUES ALIGN?
                    //(
                        // BEFORE THE START OF THE BEAM
                        //(
                            //(enemy.x + enemy.inner_x + enemy.inner_width) < (player.x + player.inner_x)
                        //)
                        //&&
                        // AFTER THE END OF THE BEAM
                        //(
                            //enemy.x > player.x
                        //)
                    //) 
                    //&&
                    // Y VALUES ALIGN
                    //(
                        // TOP OF ENEMY
                        //(
                            // UNDER TOP OF BEAM
                            //(
                                //enemy.y > player.y
                            //)
                            //&&
                            // ABOVE BOTTOM OF BEAM
                            //(
                                //enemy.y < (player.y + player.height)
                            //)
                        //)
                        //||
                        // BOTTOM OF ENEMY
                        //(
                            // UNDER TOP OF BEAM
                            //(
                                //(enemy.y + enemy.height) > player.y
                            //)
                            //&&
                            // ABOVE BOTTOM OF BEAM
                            //(
                                //(enemy.y + enemy.height) < (player.y + player.height)
                            //)
                        //)
                        //||
                        // BODY OF ENEMY (IF ENEMY IS BIGGER THAN PLAYER AND PLAYER GETS A BODY SHOT (NO HEAD OR FEET ARE SHOT))
                        //(
                            // TOP OF ENEMY IS ABOVE PLAYER
                            //(
                                //enemy.y < player.y
                            //) 
                            //&&
                            // BOTTOM OF ENEMY IS BELOW PLAYER
                            //(
                                //(enemy.y + enemy.height) > (player.y + player.height)
                            //)
                        //)
                    //)
                //) {}
            if ((((enemy.x + enemy.inner_x + enemy.inner_width) < (player.x + player.inner_x)) && ((enemy.x + enemy.inner_x + enemy.inner_width) > player.x)) && ((((enemy.y + enemy.inner_y) > player.y) && ((enemy.y + enemy.inner_y) < (player.y + player.height))) || (((enemy.y + enemy.inner_y + enemy.height) > player.y) && ((enemy.y + enemy.inner_y + enemy.height) < (player.y + player.height))) || (((enemy.y + enemy.inner_y) < player.y) && ((enemy.y + enemy.inner_y + enemy.height) > (player.y + player.height))))) {
                //if   (left of enemy's body > the far left of player's box(beam) and right of enemy's body < start of beam                            and              top of enemy's body underneath top of player's body while also being above the bottom of the player's body. Or, on the other hand, the bottom of the enemy's body being above the bottom of the player's body while also being underneath the top of the player's body
                //if enemy's body is between the x-plane area where the player's beam starts and ends                                                  and              y-plane area
                console.log("DIRECT HIT!");
                let index = active_enemies.indexOf(enemy);
                active_enemies.splice(index, 1);
                enemy_amount -= 1;
            }
        }
    }
}

function win(player) {
    winner = true;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background on canvas
    for (let r = 0; r < terrain_background.length; r += 1) {
        for (let c = 0; c < terrain_background[0].length; c += 1) {
            let tile = terrain_background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(BackgroundImage,
                    tileCol * tileSize,
                    tileRow * tileSize,
                    tileSize,
                    tileSize,

                    c * tileSize,
                    r * tileSize,
                    tileSize,
                    tileSize);
            }
        }
    }
    window.cancelAnimationFrame(game_animation); // must stop this if you want to run another
    canvas2 = document.getElementById("outer");
    context2 = canvas2.getContext("2d");
    context2.imageSmoothingEnabled = false;

    const rect = canvas.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;
    console.log("The inner canvas is " + left + "px from the left of the screen. The player is " + player.x + "px from the left of its canvas.");
    
    player.x = 0 - 9;
    player.y = top;
    round_finished_draw(player);
}



function round_finished_draw(post_game_player) {
    
    draw2();
    console.log("new player's x: " + post_game_player.x + " and y: " + post_game_player.y + "px")
    function draw2() {
        window.requestAnimationFrame(draw2);
        console.log("drawing new player's x at: " + post_game_player.x + " and y at: " + post_game_player.y + "px")
        shoot = false;

        fpsInterval = 50;
        let now = Date.now();
        let elapsed = now - then;
        if (elapsed <= fpsInterval) {
            return;
        }
        then = now - (elapsed % fpsInterval);


        // Clear Canvas
        context2.clearRect(0, 0, canvas2.width, canvas2.height);

        // Draw Player in same position as when game won
        context2.drawImage(playerImage,
            post_game_player.width * post_game_player.frameX,
            post_game_player.height * post_game_player.frameY,
            post_game_player.width,
            post_game_player.height,

            post_game_player.x, post_game_player.y, post_game_player.width, post_game_player.height
        );

        // Moving
        if ((moveLeft || moveRight || moveUp || moveDown) && !(moveRight && moveLeft)) {
            post_game_player.frameY = 1
            if (post_game_player.turned) {
                post_game_player.frameY = 6;
            }
            post_game_player.frameX = (post_game_player.frameX + 1) % 8;
            }
        // if idle
        if (!(moveLeft || moveRight || moveUp || moveDown) || (moveRight && moveLeft) || (moveUp && moveDown)) {

            if (shoot == false) {

                if (post_game_player.frameY != 0 && post_game_player.frameY != 5) {
                    post_game_player.frameX = 0;  // running-sprite row has 8 columns whereas the idle-sprite row only has 5
                    if (post_game_player.turned) {
                        post_game_player.frameY = 5
                    }
                    else {
                        post_game_player.frameY = 0;
                    }
                }
        
        
                
                    counter += 1;
                    if (counter % 3 == 0) {
                    post_game_player.frameX = (post_game_player.frameX + 1) % 5;
                    }
                }
        
                post_game_player.xChange = post_game_player.xChange * 0.8; // Friction increased when stopped
                post_game_player.yChange = post_game_player.yChange * 0.8;
            }

        // Update the Player
        post_game_player.x += post_game_player.xChange;
        post_game_player.y += post_game_player.yChange;


        // Physics
        post_game_player.xChange = post_game_player.xChange * 0.95; // Friction!
        post_game_player.yChange = post_game_player.yChange * 0.95; // Friction!


        // Stop player from going out of bounds
        if (post_game_player.y < 0) {
            post_game_player.y = 0;
        }
        else if ((post_game_player.y + post_game_player.height) > canvas2.height) {
            post_game_player.y = canvas2.height - post_game_player.height
        }
        // Hitting the edge of the canvas
        // left side
        if (post_game_player.x + post_game_player.inner_x + post_game_player.inner_width < 0) {  // Hitting the left edge --- + 24 is used because player's body doesn't end until 24 pixels in
            post_game_player.x = canvas2.width - post_game_player.inner_x;  // Come back at the right edge
        }
        // right side
        if (post_game_player.x + post_game_player.inner_x > canvas2.width) { // Hitting the right edge --- similar here
            post_game_player.x = -(post_game_player.inner_x + post_game_player.inner_width);  // Come back at left edge
        }


        if (moveLeft) {
            turn("left", post_game_player);
            post_game_player.xChange -= 0.8;
        }
        if (moveRight) {
            turn("right", post_game_player);
            post_game_player.xChange += 0.8;
        }
        if (moveUp) {
            post_game_player.yChange -= 0.8;
        }
        if (moveDown) {
            post_game_player.yChange += 0.8;
        }



        //End of draw2()
    }
};


function load_assets(assets, callback_function) {  // Ensures assets (images/audio/etc.) are loaded before script is run
    let number_of_assets = assets.length;
    let loaded = function () {
        console.log("Loaded 😊");
        number_of_assets -= 1;
        if (number_of_assets === 0) {
            callback_function();  // Note that this does not call the function titled 'callback_function' but instead, the string name of a function is inserted here and the result is called
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("Image Loaded:" + element);
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {
            console.log("Audio Loaded:" + element);
            element.addEventListener("canplaythrough", loaded, false);
        };
        element.src = asset.url;
    };
};



function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

let css_colors = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Khaki",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "Yellow",
    "YellowGreen"
]

let random_color = css_colors[randint(1, css_colors.length)];
document.querySelector(":root").style.cssText = "--random_color: " + random_color;