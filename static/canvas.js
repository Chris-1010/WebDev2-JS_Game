let canvas;
let context;
let game_animation;

let row_counter = 2;
let row_count = 32;
let col_counter = 2;
let col_count = 64;
let finished_tile = false;

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
    "Follow Your Face.mp3",
    "Happy Happy Game Show.mp3",
    "K.K. Cruisin'.mp3",
    "Mike Nesmith - Tapioca Tundra.mp3",
    "Modern Jazz Samba.mp3",
    "Mount Lineland.mp3",
    "Oswald's Theme.mp3",
    "Raving_Rabbids_OST.mp3",
    "Spaz Bridge.mp3",
    "Tango de Manzana.mp3",
    "The Walk.mp3",
    "Theme from Up.mp3",
    "Verano Sensual.mp3",
    "Washing Machine Whistling.mp3",
    "59 Seconds Theme.mp3",
    "Doors OST Curious Light.mp3",
    "Doors OST Elevator Jammed.mp3",
    "Flipsville Galaxy.mp3",
    "Cosmic Cove.mp3",
    "Honeybloom Galaxy.mp3",
    "Maro Malt (Malo Mart J-House Remix).mp3",
    "Mii plaza 3ds theme remix (NOTEBLOCK).mp3",
    "Sleepwalk by Santo and Johnny (Slowed Down).mp3",
    "Sonic Mania OST - Rogues Gallery for Mirage Saloon Zone Act 2 Remix.mp3",
    "Starshine Beach Galaxy (Underwater).mp3"
];
let background_song = songs[randint(0, songs.length - 1)];

let terrain_background = [
    [71,72,71,71,59,85,85,84,84,59,58,72,71,59,72,85,71,72,71,84],
[72,58,84,59,58,58,85,72,58,84,85,58,72,71,84,84,84,72,85,84],
[85,85,72,85,71,85,59,84,72,85,71,59,71,58,84,84,72,59,59,72],
[84,85,59,58,58,85,85,58,84,85,59,58,85,71,71,85,58,59,71,86],
[84,85,84,84,58,58,71,72,71,58,58,84,59,85,72,84,59,72,73,60],
[71,58,71,59,72,58,58,71,84,59,85,59,84,85,58,85,58,86,58,73],
[84,72,71,85,71,85,71,71,58,71,59,72,71,86,60,86,60,58,73,58],
[59,84,85,71,84,72,71,58,73,60,86,86,73,60,60,86,58,73,58,60],
[60,60,60,86,6,7,7,7,7,7,7,7,7,7,7,8,73,58,60,58],
[86,6,7,7,90,58,58,58,58,58,58,58,58,58,58,21,58,60,58,73],
[60,19,85,72,84,85,58,59,58,72,72,72,58,71,72,21,60,58,86,58],
[60,19,85,59,72,59,59,58,84,72,58,85,84,59,85,21,58,86,58,60],
[86,19,72,58,72,85,59,84,85,85,71,84,58,71,59,21,60,58,73,58],
[86,19,59,58,72,59,58,85,84,71,71,58,85,58,72,21,58,73,58,60],
[86,19,85,84,72,85,85,84,58,72,85,72,84,84,85,21,86,58,73,58],
[86,32,33,33,33,33,33,33,33,33,33,33,33,33,33,34,58,73,58,86]    
]

let tilesPerRow = 13;
let tileSize = 16;
let starting_row = 8;
let end_row = 16;
let end_col = 20;
let shift_down = 24;

let player = {
    max_health: 300,
    health: 300,
    x: 0,
    y: 0,
    inner_x: 9,
    inner_y: 4,
    inner_width: 15,
    inner_height: 14,
    width: 106,
    height: 22,
    frameX: 0,
    frameY: 1,
    xChange: 0,
    yChange: 0,
    turned: false,
    shoot: false,
    weapon: "pellet",
    damage: 10,
    immune: false
};

// Weapons
// Pellet
let pellet;
let pellets = [];

let hearts = [];

let shop = {
    x: 0,
    y: 0,
    inner_x: 56,
    inner_width: 88,
    inner_height: 111,
    width: 200,
    height: 149,
    frameX: 0,
    in_view: "no"
}

let enemies = ["skull"];
let active_enemies = [];
let enemy_randomiser = enemies[randint(0, enemies.length - 1)];
let enemy_counter = 0;
let ash_piles = [];
let enemy_amount = 0;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let in_shop = false;

let player_counter = 0;
let collision_counter = 0;
let unconditional_counter = 0;
let noted_counter = 0;
let cooldown = "off";

let winner = false;

let enable_collisions = true;

// IMAGES
let playerImage = new Image();

let enemyImage_skull = new Image();
let AshImage = new Image();

let BackgroundImage = new Image();

let ShopImage1 = new Image();
let ShopInterior1 = new Image();
let ShowroomImage = new Image();
let Podium = new Image();

let Heart_Image = new Image();
let Fox_Image = new Image();
let Beam_Weapon_Image = new Image();



// AUDIO
let background_audio = new Audio();
let player_hurt_audio = new Audio();
// let power_down_audio = new Audio();
let firing_beam_audio = new Audio();
let hitmarker_audio = new Audio();

let shop1_inventory = [];
let shop2_inventory = [];
let shop3_inventory = [];
// Possible Items in Shop
let fox = {
    name: "Fox",
    image: Fox_Image,
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    inner_x: 6,
    inner_y: 17,
    inner_width: 19,
    inner_height: 15,
    frameX: 0,
    frameY: 0,
    shop_x: 0,
    shop_y: 0,
    shop_width: 64,
    shop_height: 64,

    cost: 1000,
    description: "A friendly fox to keep you company on your adventure. It pounces at enemies when close, dealing a small amount of damage."
}

let beam_weapon = {
    name: "Beam",
    image: Beam_Weapon_Image,
    width: 64,
    height: 64,
    inner_x: 24,
    inner_y: 33,
    inner_width: 64,
    inner_height: 52,
    frameX: 0,
    frameY: 0,
    shop_x: 0,
    shop_y: 0,
    shop_width: 64,
    shop_height: 64,

    cost: 250,
    description: "An energy blaster that emits a devastating beam of energy to enemies. Must be charged up before firing."
}

let extra_heart = {
    name: "Extra Heart",
    image: Heart_Image,
    width: 56,
    height: 47,
    inner_x: 3,
    inner_y: 0,
    inner_width: 50,
    inner_height: 47,
    frameX: 0,
    frameY: 0,
    shop_x: 12,
    shop_y: 25,
    shop_width: 45,
    shop_height: 35
}

let items = [fox, beam_weapon, extra_heart];
let available_items = [fox, beam_weapon, extra_heart];


document.addEventListener("DOMContentLoaded", init, false)

function init() {
    canvas = document.getElementById("inner");
    context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false; // Stops the sprite image from becoming blurry when idle

    // Initial Player Positioning
    player.x = canvas.width / 2 - player.width / 5;
    player.y = canvas.height / 2 - player.height / 2;

    // Initial Shop Positioning
    shop.x = canvas.width / 2 - shop.inner_width; // Centered
    shop.y = -shop.height; // Just above the canvas, out of sight


    for (let times = 0; times < 3; ++times) { // 3 items per shop
        let chosen_item = available_items[randint(0, available_items.length - 1)]; // Pick random item
        shop1_inventory.push(chosen_item); // add to shop's inventory
        let index = available_items.indexOf(chosen_item); // find the index of this item in available_items list
        available_items.splice(index, 1); // remove this item from the choice pool to prevent the same item from being offered twice
    }
    console.log("Shop 1's Inventory: " + shop1_inventory[0].name + ", " + shop1_inventory[1].name + ", " + shop1_inventory[2].name)


    window.addEventListener("keydown", activate, false)
    window.addEventListener("keyup", deactivate, false)


    load_assets([
        { "var": playerImage, "url": "/static/Assets/Player/player.png" },
        { "var": enemyImage_skull, "url": "/static/Assets/Enemies/fire-skull.png" },
        { "var": AshImage, "url": "/static/Assets/Enemies/Ash.png" },
        { "var": BackgroundImage, "url": "/static/Assets/Tileset/tiles.png" },
        { "var": ShopImage1, "url": "/static/Assets/Tileset/Shop1.png" },
        { "var": ShopInterior1, "url": "/static/Assets/Tileset/Shop1_BG.png" },
        { "var": ShowroomImage, "url": "/static/Assets/Tileset/black spotlight.png" },
        { "var": Podium, "url": "/static/Assets/Tileset/Shop_Podium.png" },

        { "var": Heart_Image, "url": "/static/Assets/Player/hearts.png" },
        { "var": Fox_Image, "url": "/static/Assets/Player/Fox Sprite Sheet.png"},
        { "var": Beam_Weapon_Image, "url": "/static/Assets/Player/Energy Beam Weapon.png"},

        // { "var": background_audio, "url": "/static/Assets/Audio/" + background_song},
        { "var": player_hurt_audio, "url": "/static/Assets/Audio/SFX/hurt.wav"},
        { "var": firing_beam_audio, "url": "/static/Assets/Audio/SFX/Firing Beam.mp3"},
        { "var": hitmarker_audio, "url": "/static/Assets/Audio/SFX/Hitmarker.wav"}
    ], draw);

    // Accompanying Developer Music
    background_audio.currentTime = randint(0, 60);
    background_audio.play();
    background_audio.addEventListener('ended', () => {
        background_audio.currentTime = 0;
        background_audio.play();
    });
    console.log("Playing " + background_song);
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
    for (let r = starting_row; r < end_row; r += 1) {
        for (let c = 0; c < end_col; c += 1) {
            let tile = terrain_background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                if (winner) {
                    context.drawImage(BackgroundImage,
                            tileCol * tileSize,
                            tileRow * tileSize,
                            tileSize,
                            tileSize,
    
                            c * (tileSize / 1.06), //- (canvas_width - 1024)/0.5,
                            r * (tileSize / 1.2) - 3.4*shift_down,
                            tileSize / 1.06,
                            tileSize / 1.2)
                    }
                    else {
                        context.drawImage(BackgroundImage,
                            tileCol * tileSize,
                            tileRow * tileSize,
                            tileSize,
                            tileSize,
    
                            c * (tileSize / 1.06),
                            r * (tileSize / 1.2) - 3.4*shift_down,
                            tileSize / 1.06,
                            tileSize / 1.2);
                    }
            }
        }
    }

    // Draw shop building
    context.drawImage(ShopImage1,
        shop.width * shop.frameX,
        0,
        shop.width,
        shop.height,
        
        shop.x, shop.y, shop.width, shop.height)

    // Draw Ash Piles
    for (let ash_pile of ash_piles) {
        context.drawImage(AshImage,
            0,
            0,
            30,
            13,
    
            ash_pile.x, ash_pile.y, ash_pile.width, ash_pile.inner_height
            );
    }

    // Draw Player
    context.drawImage(playerImage,
        player.width * player.frameX, // starting left-hand side
        player.height * player.frameY, // starting left-hand top
        player.width,
        player.height,

        player.x, player.y, player.width, player.height
    );

    // Draw Weapon's Bullets/Particles
    if (player.weapon == "pellet") {
        context.fillStyle = "yellow";
        for (let pellet of pellets) {
            context.fillRect(pellet.x, pellet.y, pellet.width, pellet.height)
        }
    }


    // Create Enemies
    if (active_enemies.length < enemy_amount) {
        enemy_counter += 1;
        if (enemy_randomiser == "skull") {
            let enemy = {
                id : enemy_counter,
                type : "skull",
                image_name : enemyImage_skull,
                health: 100,
                damage: 50,

                x: canvas.width - ((canvas.width) * randint(0,1)),
                y: randint(50, canvas.height - 50),
                inner_x: 7,
                inner_y: 12,
                inner_width: 8,
                inner_height: 13,
                width: 25,
                height: 29,
                frameX: 0,
                frameY: 0,
                xChange: (2 + randint(0, 1)) - (4 * randint(0, 1)),
                yChange: 2 - (4 * randint(0, 1)),

                counter: 0
            };
            active_enemies.push(enemy);
        }
        
    }
    // WIN Round!
    else if (active_enemies.length == 0 && winner == false) {
        winner = true;
    }


    // Draw Enemies
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


    // Draw Interior of shop + items
    if (in_shop == true) {
        context.drawImage(ShowroomImage, 0, 0, canvas.width, canvas.height)
        if (unconditional_counter > 70) {  // Comes first so that background of shop is in the background, not in front of the items
            context.drawImage(ShopInterior1, 0, 0, canvas.width, canvas.height)
        }
        if (unconditional_counter >= 10) {
            context.drawImage(Podium,
                              0,
                              0,
                              500,
                              500,
                              
                              8,
                              80,
                              120,
                              120
                              );
            context.drawImage(shop1_inventory[0].image,
                              shop1_inventory[0].width * shop1_inventory[0].frameX,
                              shop1_inventory[0].height * shop1_inventory[0].frameY,
                              shop1_inventory[0].width,
                              shop1_inventory[0].height,
                              
                              shop1_inventory[0].shop_x + 35,
                              shop1_inventory[0].shop_y + 35,
                              shop1_inventory[0].shop_width,
                              shop1_inventory[0].shop_height
                              );
        }
        if (unconditional_counter >= 30) {
            context.drawImage(Podium,
                              0,
                              0,
                              500,
                              500,
                              
                              90,
                              80,
                              125,
                              125
                              );
            context.drawImage(shop1_inventory[1].image,
                              shop1_inventory[1].width * shop1_inventory[1].frameX,
                              shop1_inventory[1].height * shop1_inventory[1].frameY,
                              shop1_inventory[1].width,
                              shop1_inventory[1].height,
                              
                              shop1_inventory[1].shop_x + 120,
                              shop1_inventory[1].shop_y + 36,
                              shop1_inventory[1].shop_width,
                              shop1_inventory[1].shop_height
                              );
        }
        if (unconditional_counter >= 50) {
            context.drawImage(Podium,
                              0,
                              0,
                              500,
                              500,
                              
                              175,
                              80,
                              120,
                              120);
            context.drawImage(shop1_inventory[2].image,
                              shop1_inventory[2].width * shop1_inventory[2].frameX,
                              shop1_inventory[2].height * shop1_inventory[2].frameY,
                              shop1_inventory[2].width,
                              shop1_inventory[2].height,
                              
                              shop1_inventory[2].shop_x + 200,
                              shop1_inventory[2].shop_y + 35,
                              shop1_inventory[2].shop_width,
                              shop1_inventory[2].shop_height
                              );                
        }
    }

    // Create Hearts
    if (hearts.length < player.max_health / 100) {
        for (let heart_number = (hearts.length * 100); heart_number < player.max_health; heart_number += 100) {
                let heart = {
                    width: 56,
                    height: 47,
                    frameX: 0,
                    beat: 0,
                }
                hearts.push(heart);
            }
        }
    let health_lost = (player.max_health - player.health)
    switch (health_lost) {
        case 50:
            hearts[0].frameX = 1;
            break;
        case 100:
            hearts[0].frameX = 2;
            break;
        case 150:
            hearts[0].frameX = 2;
            hearts[1].frameX = 1;
            break;
        case 200:
            hearts[0].frameX = 2;
            hearts[1].frameX = 2;
            break;
        case 250:
            hearts[0].frameX = 2;
            hearts[1].frameX = 2;
            hearts[2].frameX = 1;
            break;
        case 300:
            hearts[0].frameX = 2;
            hearts[1].frameX = 2;
            hearts[2].frameX = 2;
            break;
        case 350:
            hearts[0].frameX = 2;
            hearts[1].frameX = 2;
            hearts[2].frameX = 2;
            hearts[3].frameX = 1;
            break;
        case 400:
            hearts[0].frameX = 2;
            hearts[1].frameX = 2;
            hearts[2].frameX = 2;
            hearts[3].frameX = 2;
            break;
        case 450:
            hearts[0].frameX = 2;
            hearts[1].frameX = 2;
            hearts[2].frameX = 2;
            hearts[3].frameX = 2;
            hearts[4].frameX = 1;
            break;
        case 500:
            hearts.forEach(function(heart) {
                heart.frameX = 2;
              });
            break;
        default:
            hearts.forEach(function(heart) {
                heart.frameX = 0;
              });
    }

    // Draw UI
    for (let heart of hearts) {
            context.drawImage(Heart_Image,
                                            heart.width * heart.frameX,
                                            0,
                                            heart.width,
                                            heart.height,
                                            
                                            (canvas.width - (hearts.length * 26)) + ((heart.width / 2.2) * hearts.indexOf(heart)),
                                            2,                                            
                                            (heart.width / 2.2) - heart.beat,
                                            (heart.height / 2.2) - heart.beat)

            if ((unconditional_counter - hearts.indexOf(heart)) % (25 - (3 * Math.floor(player.max_health / player.health))) == 0) {  // staggered heart-beat effect
                heart.beat = 2;

                if (heart.frameX == 2) {
                    heart.beat = 0;
                }
            
                if (heart.frameX == 1) {  // if half-heart, less of a heartbeat
                    heart.beat = 1;
                }
            }
            else {
                heart.beat = 0;
            }
        }


    // Player Movement & Physics
    // Moving
    if ((moveLeft || moveRight || moveUp || moveDown) && !(moveRight && moveLeft) && !player.immune) {
        player.frameY = 1;
        if (player.turned) {
            player.frameY = 6;
        }
        player.frameX = (player.frameX + 1) % 8;
    }
    // Idle
    if ((!(moveLeft || moveRight || moveUp || moveDown) || (moveRight && moveLeft) || (moveUp && moveDown)) && player.immune == false && player.health != 0) {
        if (player.weapon != "beam" || player.shoot == false) {

            if (player.frameY != 0 && player.frameY != 5) {
                player.frameX = 0;  // running-sprite row has 8 columns whereas the idle-sprite row only has 5
                if (player.turned) {
                    player.frameY = 5
                }
                else {
                    player.frameY = 0;
                }
            }
            
            player_counter += 1;
            if (player_counter % (5 - (Math.floor(player.max_health / player.health))) == 0) {
            player.frameX = (player.frameX + 1) % 5;
            }
        }

        player.xChange = player.xChange * 0.8; // Friction increased when stopped
        player.yChange = player.yChange * 0.8;
    }
    // Dead
    if (player.health == 0) {
        player.frameY = 4;
        if (player.turned) {
            player.frameY = 9;
        }
        if (player.frameX < 4 && unconditional_counter % 6 == 0) {
            player.frameX += 1;
        }
        if (unconditional_counter % 45 == 0) {
            player.frameX = 0;
        }
    }
    // Attacked
    else if (player.immune) {
        player.frameY = 3;
        if (player.turned) {
            player.frameY = 8;
        }
        player.frameX = (player.frameX + 1) % 2;
    }
    player.x += player.xChange;
    player.y += player.yChange;

    player.xChange = player.xChange * 0.95;
    player.yChange = player.yChange * 0.95;


    // Weapon Particle Movement
    if (player.weapon == "pellet") {
        for (let pellet of pellets) {
            pellet.x += pellet.xChange;
            for (let enemy of active_enemies) {
                if (
                    ((!player.turned && 
                    ((pellet.x + pellet.width > enemy.x + enemy.inner_x) && (pellet.x < enemy.x + enemy.inner_x + enemy.inner_width))
                    )
                    || (player.turned &&
                    ((pellet.x < enemy.x + enemy.inner_x + enemy.inner_width) && (pellet.x + pellet.width > enemy.x + enemy.inner_x))
                    ))
                    && ((pellet.y + pellet.height > enemy.y + enemy.inner_y) && (pellet.y < enemy.y + enemy.inner_y + enemy.inner_height))
                    ) {
                    let index = pellets.indexOf(pellet);
                    pellets.splice(index, 1);
                    enemy_hit(enemy);
                }
            }
        }
    }

    // Enemy Movement
    for (let enemy of active_enemies) {
        if (enemy.type == "skull") {
                // linear motion
            enemy.x += enemy.xChange;
            enemy.y += enemy.yChange;

            if (enemy.xChange < 0) {
                enemy.frameY = 1;
            }
            enemy.counter += 1;
            if (enemy.counter % 3 == 0) {
    	            enemy.frameX = (enemy.frameX + 1) % 8;
    
            }
        }
        else {
            // Follow Player
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
    }

    // Ash Pile Movement 
    for (let ash_pile of ash_piles) {
        ash_pile.xChange = ash_pile.xChange * 0.75;
        if (ash_pile.y + ash_pile.height <= canvas.height) {
        ash_pile.yChange += 0.3;
        }
        ash_pile.x += ash_pile.xChange;
        ash_pile.y += ash_pile.yChange;
    }

    // Shop-Exterior Animation
    if (unconditional_counter % 3 == 0) {
        shop.frameX = (shop.frameX + 1) % 6;
    }

    // Shop Item Animations
    if (shop1_inventory.includes(fox)) {
        shop1_inventory[shop1_inventory.indexOf(fox)].frameY = 5;
        if (unconditional_counter % 15 == 0 || unconditional_counter % 20 == 0)
        shop1_inventory[shop1_inventory.indexOf(fox)].frameX = (shop1_inventory[shop1_inventory.indexOf(fox)].frameX + 1) % 5;
    }
    if (shop1_inventory.includes(extra_heart)) {
        if ((unconditional_counter - (3 * hearts.indexOf(extra_heart))) % 25 == 0) {
            shop1_inventory[shop1_inventory.indexOf(extra_heart)].shop_x += 2;
            shop1_inventory[shop1_inventory.indexOf(extra_heart)].shop_y += 2;
            shop1_inventory[shop1_inventory.indexOf(extra_heart)].shop_width -= 2;
            shop1_inventory[shop1_inventory.indexOf(extra_heart)].shop_height -= 2;
        }
        else {
            
            shop1_inventory[shop1_inventory.indexOf(extra_heart)].shop_x = 12;
            shop1_inventory[shop1_inventory.indexOf(extra_heart)].shop_y = 25;
            shop1_inventory[shop1_inventory.indexOf(extra_heart)].shop_width = 45;
            shop1_inventory[shop1_inventory.indexOf(extra_heart)].shop_height = 35;
        }
    }



    // Player Bounds
    // Hit top
    if (player.y <= shift_down ) {
        player.y = shift_down;
    }
    // Hit bottom
    else if ((player.y + player.inner_y + player.inner_height) > canvas.height - shift_down) {
        player.y = canvas.height - player.inner_height - shift_down;
    }
    // Hitting the edge of the canvas
    // left side
    if (player.x + player.inner_x + player.inner_width < 0) {
        player.x = canvas.width - player.inner_x;  // Come back at the right edge
    }
    // right side
    if (player.x + player.inner_x > canvas.width) {
        player.x = -(player.inner_x + player.inner_width);  // Come back at left edge
    }
    // when shop in view
    if (shop.in_view == "yes") {
        if ((player.y < shop.y + shop.inner_height - 10) && (player.x + player.inner_x > shop.x + shop.inner_x && player.x + player.inner_x + player.inner_width < shop.x + shop.inner_x + shop.inner_width)) {
            player.y = shop.y + shop.inner_height - 10;
        }
    }


    // Enemies' Bounds
    for (let enemy of active_enemies) {
        if (enemy.type == "skull") {
            // Hitting the edge of the canvas
            // left side
            if (enemy.x + enemy.inner_x + enemy.inner_width < 0) {
                enemy.x = canvas.width - enemy.inner_x;  // Come back at the right edge
            }
            // right side
            if (enemy.x > canvas.width) {
                enemy.x = -(enemy.inner_x + enemy.inner_width);  // Come back at left edge
            }
            // top
            if (enemy.y + enemy.inner_y <= shift_down) {
                enemy.yChange = -enemy.yChange;
            }
            // bottom
            if (enemy.y + enemy.inner_y + enemy.inner_height >= canvas.height - shift_down) {
                enemy.yChange = -enemy.yChange;
            }
    }
    }

    // Ash Pile Bounds
    for (let ash_pile of ash_piles) {
        if (ash_pile.y + ash_pile.inner_height > canvas.height) {
            ash_pile.yChange = 0;
            ash_pile.y = canvas.height - ash_pile.inner_height;
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

    // Shooting
    if (player.shoot == true) { // if player is currently shooting, mainly used for SFX
        if (player.weapon == "pellet") {

        }
        if (player.weapon == "beam") {
                if (player.turned == false) {
                    player.frameY = 2;
                }
                else if (player.turned) {
                    player.frameY = 7;
                }

                if (player.frameX < 6) {
                    player_counter += 1;
                    if (player_counter == 1 || player_counter % 4 == 0) {
                        player.frameX += 1;
                    }
                }
                else if (player.frameX == 6) { // Alternate between instances of firing
                    if (firing_beam_audio.paused) {
                        firing_beam_audio.play();
                    }
                    player.frameX = 7;
                    for (let enemy of active_enemies) {
                        if (
                            ((!player.turned && 
                            ((enemy.x + enemy.inner_x > player.x + player.inner_x + player.inner_width) && (enemy.x + enemy.inner_x + enemy.inner_width < player.x + player.width))
                            )
                            || (player.turned && 
                            ((enemy.x + enemy.inner_x + enemy.inner_width < player.x + player.inner_x) && (enemy.x + enemy.inner_x + enemy.inner_width > player.x))
                            ))
                            && (((enemy.y + enemy.inner_y > player.y) && (enemy.y + enemy.inner_y < player.y + player.height)) || ((enemy.y + enemy.inner_y + player.inner_height > player.y + player.inner_y) && (enemy.y + enemy.inner_y + enemy.height < player.y + player.height)) || ((enemy.y + enemy.inner_y < player.y) && (enemy.y + enemy.inner_y + enemy.height > player.y + player.height))
                            )
                            ) {
                            enemy_hit(enemy);
                        }
                    }
                }
                else if (player.frameX == 7) { // Alternate between instances of firing
                    player.frameX = 6;
                    for (let enemy of active_enemies) {
                        if ((!player.turned && (((enemy.x + enemy.inner_x) > (player.x + player.inner_x + player.inner_width)) && ((enemy.x + enemy.inner_x + enemy.inner_width) < (player.x + player.width)) && (((enemy.y + enemy.inner_y > player.y) && ((enemy.y + enemy.inner_y) < (player.y + player.height))) || (((enemy.y + enemy.inner_y + player.inner_height) > player.y + player.inner_y) && ((enemy.y + enemy.inner_y + enemy.height) < (player.y + player.height))) || ((enemy.y + enemy.inner_y < player.y) && ((enemy.y + enemy.inner_y + enemy.height) > (player.y + player.height)))))) || (player.turned && ((((enemy.x + enemy.inner_x + enemy.inner_width) < (player.x + player.inner_x)) && ((enemy.x + enemy.inner_x + enemy.inner_width) > player.x)) && ((((enemy.y + enemy.inner_y) > player.y) && ((enemy.y + enemy.inner_y) < (player.y + player.height))) || (((enemy.y + enemy.inner_y + enemy.inner_height) > player.y + player.inner_y) && ((enemy.y + enemy.inner_y + enemy.height) < (player.y + player.height))) || (((enemy.y + enemy.inner_y) < player.y) && ((enemy.y + enemy.inner_y + enemy.height) > (player.y + player.height))))))) {
                            enemy_hit(enemy);
                        }
                    }
                }


                if (player.frameX == 12) {
                    player.shoot = false;
                    player.frameX = 0;
                }
            }
    }
    else if (player.shoot == "wind_down" ) { // Winding down of energy "beam" weapon
        if (player.frameX > 0) {
            player_counter -= 1
            player.frameX -= 1;
        }
        else {
            player.shoot = false;
        }
    };

    // Enemy attacks Player
    if (player.immune == false) {
        for (let enemy of active_enemies) {
            // if in range
            if ((((player.x + player.inner_x < enemy.x + enemy.width) && ( player.x + player.inner_x > enemy.x + enemy.inner_x)) || ((player.x + player.inner_x + player.inner_width > enemy.x) && (player.x + player.inner_x < enemy.x + enemy.inner_x))) && (((player.y + player.inner_y > enemy.y) && (player.y + player.inner_y < enemy.y + enemy.inner_y + enemy.inner_height)) || ((player.y + player.inner_y + player.inner_height > enemy.y + enemy.inner_y) && (player.y + player.inner_y + player.inner_height < enemy.y + enemy.height)))) {
                    noted_counter = unconditional_counter;
                    player.immune = true;
                    player.frameX = 0;
                    if (player.health > 0) {
                        player_hurt_audio.play();
                        player.health -= enemy.damage;
                        if (player.health == 0) {
                            death();
                        }
                    }
                    console.log("An enemy hit you! Player health is now " + player.health)
            }
        }
    }
    if (unconditional_counter == noted_counter + 30) {
        player.immune = false;
    }
    
    //COLLIDING WITH OTHER ENEMY
    for (let target_enemy of active_enemies) {
        for (let compared_enemy of active_enemies) {
            if (enable_collisions) {
                if (target_enemy != compared_enemy) {
                    if (collides(target_enemy, compared_enemy)) {
                        console.log("Collision!")
                        // What to do! 🔴🔴🔴
                        target_enemy.xChange -= .1;
                    }
                }
            }
        }
    }



    if (winner) {
        player.health = player.max_health;

        if (starting_row > 0) {
            starting_row -= 1;
        }
        
        if (shift_down > 10) {
            shift_down -= 0.3;
            player.y += 1;
            shop.y += 2;
            shop.in_view = "yes"
        }
    }

    unconditional_counter += 1;
    // END OF DRAW()
}



function activate(event) {  // 🟢
    let key = event.key;

    switch (key) {
        case "a":
        case "ArrowLeft":
            if (player.shoot == false && in_shop == false && !(player.health <= 0)) {
                moveLeft = true;
            }
            break; // would go through each case until it reaches a break if this wasn't here. Therefore, each case is its own if statement. By inserting a break at the end of each one, the cases become 'else if' statements.
        case "d":
        case "ArrowRight":
            if (player.shoot == false && in_shop == false && !(player.health <= 0)) {
                moveRight = true;
            }
            break;
        case "w":
        case "ArrowUp":
            if (player.shoot == false && in_shop == false && !(player.health <= 0)) {
                moveUp = true;
            }
            break;
        case "s":
        case "ArrowDown":
            if (player.shoot == false && in_shop == false && !(player.health <= 0)) {
                moveDown = true;
            }
            break;
        case " ":
            if (shop.in_view == "yes" && in_shop == false && ((player.y > shop.y + shop.inner_height - 15 && player.y + player.inner_y + player.inner_height < shop.y + shop.height) && (player.x + player.inner_x < shop.x + shop.inner_x + shop.inner_width && player.x + player.inner_x > shop.x + shop.inner_x))) {  // Enter Shop
                in_shop = true;
                unconditional_counter = -1; // To create a staggered presentation of items on sale in shop
            }
            else if (in_shop == true) { // Exit shop
                in_shop = false;
            }
            if (player.shoot == false && winner != true && !(player.health <= 0)) { // Shoot
                if (player.weapon == "beam") {
                    firing_beam_audio.currentTime = 0;
                    player.frameX = 0;
                    moveUp = moveRight = moveLeft = moveDown = false;
                }
                if (player.weapon == "pellet") {
                    // Fire (create) new pellet
                    pellet = {
                        x: player.x + player.inner_x + player.inner_width - 2,
                        y: player.y + player.inner_y + player.inner_height / 2,
                        width: 2,
                        height: 2,
                        xChange: 5
                    }
                    if (player.turned) { // Change direction of particle if facing left
                        pellet.xChange = -pellet.xChange;
                        pellet.x = player.x + player.inner_x + 2;
                    }
                    pellets.push(pellet)
                }
                player.shoot = true;
            }
    }
}

function deactivate(event) { // 🔴
    let key = event.key;

    switch (key) {
        case "a":
        case "ArrowLeft":
            moveLeft = false;
            break;
        case "d":
        case "ArrowRight":
            moveRight = false;
            break;
        case "w":
        case "ArrowUp":
            moveUp = false;
            break;
        case "s":
        case "ArrowDown":
            moveDown = false;
            break;
        case " ":
            player.shoot = false;
            if (player.weapon == "beam") {
                
                firing_beam_audio.currentTime = 3.5
                if (!winner && !(player.health > 0)) {                
                    player_counter = 10;
                    player.shoot = "wind_down"; // Power down energy weapon
                }
            }
    }
}

function turn(position, state) {
    if (position == "left") {
        if (state.turned == true) {
        }
        else if (state.turned == false) {
            state.x -= state.width - state.inner_x - state.inner_width;
        }

        state.turned = true;
        state.frameY = 6;
        state.inner_x = 80;
    }
    else if (position == "right") {
        if (state.turned == true) {
            state.x += state.inner_x;
        }

        state.turned = false;
        state.frameY = 1;
        state.inner_x = 9;
    }
}


/* function collides(e1, e2) {
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
    collision_counter += 1;
    if (collision_counter == 50) {
        collision_counter = 0;
        enableCollisions();
    }
} */
hitmarker_audio.play();

// Player hits Enemy
function enemy_hit(enemy) {
    console.log("DIRECT HIT!");
    hitmarker_audio.play();
    enemy.health -= player.damage;
    if (enemy.health <= 0) {
                    let index = active_enemies.indexOf(enemy);
                    active_enemies.splice(index, 1);
                    enemy_amount -= 1;
                    if (player.x + player.inner_x + player.inner_width < enemy.x && enemy.xChange < 0) {
                        console.log("Changing xChange of enemy. Their xChange was " + enemy.xChange)
                        enemy.xChange = enemy.xChange * -1;
                        console.log("is now " + enemy.xChange)
                    }
                    else if (enemy.x + enemy.inner_x + enemy.inner_width < player.x + player.inner_x && enemy.xChange < 0) {
                        enemy.xChange = -enemy.xChange;
                    }
                    enemy.y += enemy.height / 2;
                    enemy.xChange = enemy.xChange * 5;
                    enemy.yChange = -3;
                    enemy.width = 30;
                    enemy.height = 13;
                    enemy.inner_height = 13 + randint(-5,5)
                    ash_piles.push(enemy);
        }
}

// Player Dies
function death() {
    moveLeft = moveRight = moveUp = moveDown = false;
}


function load_assets(assets, callback_function) {  // Ensures assets (images/audio/etc.) are loaded before script is run
    let number_of_assets = assets.length;
    let loaded = function () {
        number_of_assets -= 1;
        if (number_of_assets === 0) {
            callback_function();  // Note that this does not call the function titled 'callback_function' but instead, the string name of a function is inserted here and the result is called. This is where the parameter is inserted.
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
