let canvas;
let context;

let now;
let fpsInterval = 50;  // 60fps
let then = Date.now();



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
    
    let moveLeft = false;
    let moveRight = false;
    let moveUp = false;
    let moveDown = false;
    // let shoot;
    
    let playerImage  = new Image();
    let BackgroundImage = new Image();
    
    let tilesPerRow = 6;
    let tileSize = 16;
    
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

    let background_audio = new Audio("/Assets/Audio/Modern Jazz Samba.mp3");
    background_audio.play();
    background_audio.addEventListener('ended', () => {
        background_audio.currentTime = 0;
        background_audio.play();
    });
    console.log("Playing background_audio");

    player.x = canvas.width / 2 - player.width / 5;
    player.y = canvas.height / 2 - player.height / 2;


    window.addEventListener("keydown", activate, false)
    window.addEventListener("keyup", deactivate, false)


    load_assets([
        {"var": playerImage, "url": "Assets/Player/all.png"},
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

    if ((moveLeft || moveRight || moveUp || moveDown) && !(moveRight && moveLeft)) {
        player.frameY = 1;
        player.frameX = (player.frameX + 1) % 8;
    }

    // Update the Player
    player.x += player.xChange;
    player.y += player.yChange;

    // Physics
    player.xChange = player.xChange * 0.95; // Friction!
    player.yChange = player.yChange * 0.95; // Friction!

    // Hitting the edge of the canvas
    if (player.x + player.width < 0) {  // Hitting the left edge
        player.x = canvas.width;  // Come back at the right edge
    }
    else if (player.x > canvas.width) { // Hitting the right edge
        player.x = 0 - player.width;  // Come back at left edge
    }


    if (moveLeft) {

    
        player.xChange -= 0.8;  // Acceleration! Increases the distance the player is moving every time the animation is played while leftArrow is held down
    }
    
    if (moveRight) {
    
    
        player.xChange += 0.8;
    }
    if (moveUp) {
    console.log("Yes")
        
        player.yChange -= 0.8;  // Acceleration! Increases the distance the player is moving every time the animation is played while leftArrow is held down
    }
    
    if (moveDown) {
    
        player.yChange += 0.8;
    }


    // Stop player from going out of bounds
    if (player.y < 0) {
        player.y = 0;
    }
    else if ((player.y + player.height) > canvas.height) {
        player.y = canvas.height - player.height
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

