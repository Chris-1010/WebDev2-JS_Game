let canvas;
let context;

let now;
let fpsInterval = 50;  // 60fps
let then = Date.now();

const myArray = [
    "Arriba Amoeba!.mp3",
    "Arroz Con Pollo.mp3",
    "Beachfront Celebration.mp3",
    "Bricks Instrumental.mp3",
    "Chan Chan.mp3",
    "Classical.mp3",
    "Del Rio Bravo.mp3",
    "Esskeetit Notification.mp3",
    "Feel Good Inc Bass Only.mp3",
    "Feel Good Inc Short Bass.mp3",
    "Feel Good Inc Short Guitar Strum.mp3",
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
    "Life Could Be a Dream Instrumental Trimmed.mp3",
    "Life Could Be a Dream Instrumental.mp3",
    "Life Could Be a Dream Notification.mp3",
    "Life Could Be a Dream Short Notification 1 1.mp3",
    "Life Could Be a Dream Short Notification 1.mp3",
    "Life Could Be a Dream Short Notification.mp3",
    "Life Could Be a Dream.mp3",
    "metal music 1.mp3",
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
    "Sesame Street Short Notification Sound.mp3",
    "Sesame Street Shorter Ringtone .mp3",
    "Sesame Street Tiny Notification Sound.mp3",
    "She Took the Kids Ending.mp3",
    "Spaz Bridge.mp3",
    "Star vs. the Forces of Evil - Buff Frog's Theme.mp3",
    "Tango de Manzana.mp3",
    "The Walk.mp3",
    "Theme from Up.mp3",
    "Tiki Land.mp3",
    "Verano Sensual.mp3",
    "Washing Machine Whistling.mp3",
    "what's poppin'.mp3",
    "Wii Party Suggestions Music.mp3",
    "3DS Mii Maker.mp3",
    "59 Seconds Theme.mp3",
  ];
let background_song = myArray[randint(0,myArray.length)];



let player = {
    x : 0,
    y : 0,
    width : 106,
    height : 22,
    frameX : 0,
    frameY : 0,
    xChange : 0,
    yChange : 0,
    };
// IMPORTANT TO NOTE:
// player's body doesn't really start until roughly 9 pixels in
// it doesn't end until roughly 24 pixels

let enemies = []

    let moveLeft = false;
    let moveRight = false;
    let moveUp = false;
    let moveDown = false;
    let shoot = false;
    

    let enable_collisions = true;
    
    let playerImage  = new Image();
    let enemyImage  = new Image();
    let enemy_amount = 10;

    let BackgroundImage = new Image();
    
    // let tilesPerRow = 6;
    // let tileSize = 16;
    
    // let background = [
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    // [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    // [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    // ]



document.addEventListener("DOMContentLoaded", init, false)

function init() {
    canvas = document.querySelector("canvas");  // Looks for the tag 'canvas'
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
        {"var": playerImage, "url": "Assets/Player/all.png"},
        {"var": enemyImage, "url": "Assets/Player/enemy.png"},
        // {"var": BackgroundImage, "url":"tiles.png"}
    ], draw);
}
function draw() {
    window.requestAnimationFrame(draw);

    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);


    // Draw background on canvas
    context.clearRect(0, 0, canvas.width, canvas.height);


    // Draw Player
    context.drawImage(playerImage,
        player.width * player.frameX,
        player.height * player.frameY,
        player.width,
        player.height,
        
        player.x, player.y, player.width, player.height
);


if (enemies.length <= enemy_amount) {
    setTimeout(function() {
    let enemy = {
        x : randint(-1,1) * canvas.width,
        y : randint(-50, canvas.height + 50),
        inner_x : 9,
        inner_width : 15,
        width : 106,
        height : 22,
        frameX : 0,
        frameY : 0,
        xChange : 1,
        yChange : 1,
        };
        enemies.push(enemy);
    }, 5000);
}
    else {
        enemies.pop();
    }

// Draw Enemy

for (let enemy of enemies) {
    context.drawImage(enemyImage,
        enemy.width * enemy.frameX,
        enemy.height * enemy.frameY,
        enemy.width,
        enemy.height,
        
        enemy.x, enemy.y, enemy.width, enemy.height
    );
}

    if ((moveLeft || moveRight || moveUp || moveDown) && !(moveRight && moveLeft)) {
        player.frameY = 1;
        player.frameX = (player.frameX + 1) % 8;
    }
    // if idle
    if (!(moveLeft || moveRight || moveUp || moveDown)) {
        
        if (shoot == false) {
            console.log("You are idle")
        player.frameX = player.frameY = 0;
    }
        player.xChange = player.xChange * 0.8;
        player.yChange = player.yChange * 0.8;
    }

    // Update the Player
    player.x += player.xChange;
    player.y += player.yChange;

    // Update Enemy
    // for (let enemy of enemies) {
    //     enemy.x += enemy.xChange;
    //     enemy.y += enemy.yChange;
    // }
    // FOLLOW PLAYER
    for (let enemy of enemies) {
    if (enemy.x % player.x < 1) {
        if (enemy.xChange < 2) {
        enemy.xChange += 1;
        }
    }
    if (player.x <= enemy.x) {
        enemy.x -= enemy.xChange;
    }
    else if (player.x >= enemy.x) {
        enemy.x += enemy.xChange;
    }
    if (player.y <= enemy.y) {
        enemy.y -= enemy.yChange;
    }
    else if (player.y >= enemy.y) {
        enemy.y += enemy.yChange;
    }}

    

    //COLLIDING
    
    for (let enemy1 of enemies) {
        console.log("testing " + enemy1)
        for (let enemy2 of enemies) {
            console.log("testing with " + enemy2)
            if (enemy1 == enemy2) {
                break;
            }
            if (enable_collisions) {
            if (collides(enemy1, enemy2)) {
                console.log("Collision!")
                // What to do! 🔴🔴🔴
                enemy1.x = enemy1.xChange * -1;
                enemies.pop(enemy2);
                enemy_amount -= 1;
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
        setTimeout(enableCollisions, 50);
      }

    // Physics
    player.xChange = player.xChange * 0.95; // Friction!
    player.yChange = player.yChange * 0.95; // Friction!


    // Stop player from going out of bounds
    if (player.y < 0) {
        player.y = 0;
    }
    else if ((player.y + player.height) > canvas.height) {
        player.y = canvas.height - player.height
    }
    // Hitting the edge of the canvas
        // left side
    if (player.x + 24 < 0) {  // Hitting the left edge --- + 24 is used because player's body doesn't end until 24 pixels in
        player.x = canvas.width - 9;  // Come back at the right edge
    }
        // right side
    if (player.x + 9 > canvas.width) { // Hitting the right edge --- similar here
        player.x = -24;  // Come back at left edge
    }
/////
for(let enemy of enemies) {
    // Hitting the edge of the canvas
        // left side
    if (enemy.x + 24 < 0) {  // Hitting the left edge --- + 24 is used because player's body doesn't end until 24 pixels in
        enemy.x = canvas.width - 9;  // Come back at the right edge
    }
        // right side
    if (enemy.x + 9 > canvas.width) { // Hitting the right edge --- similar here
        enemy.x = -24;  // Come back at left edge
    }
}
//////




    if (moveLeft) {
        player.xChange -= 0.8;  // Acceleration! Increases the distance the player is moving every time the animation is played while leftArrow is held down
    }
    if (moveRight) {
        player.xChange += 0.8;
    }
    if (moveUp) {        
        player.yChange -= 0.8;  // Acceleration! Increases the distance the player is moving every time the animation is played while leftArrow is held down
    }
    if (moveDown) {
        player.yChange += 0.8;
    }
    if (shoot) {
        // shoot = false;
        console.log("Shoot = " + shoot)
        player.frameY = 2;
        player.frameX += 1;
        if (player.frameX == 12) {
            shoot = false;
            player.frameX = 0;
            fpsInterval = 50;
        }

    }

}




function activate(event) {  // 🟢
    let key = event.key;

    switch (key) {
        case "ArrowLeft":
            moveLeft = true;
            break; // would go through each case until it reaches a break if this wasn't here. Therefore, each case is its own if statement. By inserting a break at the end of each one, the cases become 'else if' statements.
        case "ArrowRight":
            moveRight = true;
            break;
        case "ArrowUp":
            console.log("Yup")
            moveUp = true;
            break;
        case "ArrowDown":
            moveDown = true;
            break;
        case " ":
            if (shoot != true) {
            player.frameX = 0;
            shoot = true;
            }
            break;
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
    }
}



function load_assets(assets, callback_function) {  // Ensures assets (images/audio/etc.) are loaded before script is run
    let number_of_assets = assets.length;
    let loaded = function() {
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
    return Math.round(Math.random() * (max-min)) + min;
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
