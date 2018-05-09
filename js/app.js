
//Global variables to calculate the proper position for the player while it's moving
const cellWidth = 101;
const cellHeight = 83;
const numRows = 5;
const numCols = 4;

const gameLevel = 3;

// Parent constructor to hold the basic information about the game item (Enemy, Player)
var ArcadeGameItem = function (sprite , row, col, x, y, speed) {

    this.sprite = sprite;  // The sprite is the image for the item

    //These variables for setting the position for the game item
    this.row = row;
    this.col = col;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Function to calculate the proper (x,y) and draw the item again and again.
ArcadeGameItem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function () {

    // The sprite is the image for our enemies
    sprite = 'images/enemy-bug.png';

    // Calculate the position and the speed for the ememy randomly
    row = Math.floor(Math.random() * 3) + 1;
    x = -1 * cellWidth;
    y = row * cellHeight - 20;
    
    speed = Math.floor(Math.random() * 10) + 3;
    ArcadeGameItem.call(this, sprite, row, 0, x, y, speed);
};

Enemy.prototype = Object.create(ArcadeGameItem.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed + dt;
    // Collision happens here
    let currentX = this.x + 70;
    if (currentX >= player.x && currentX < player.x + cellWidth) {
        if (this.row === player.row) {
            player = new Player();
        }
    }
};

// A player object to avoid Enemies
var Player = function () {
    // Variables applied to each of our instances go here,

    sprite = 'images/char-boy.png';

    // These variables for setting the player position
    col = 2;
    row = 4;

    ArcadeGameItem.call(this, sprite, row, col, 0, 0, 0);
};

Player.prototype = Object.create(ArcadeGameItem.prototype);
Player.prototype.constructor = Player;

// Update the player's position, required method for game
Player.prototype.update = function (dt) {
    this.x = this.col * cellWidth;
    this.y = this.row * cellHeight - 20;
};

// Function to handle the column and row changes according to the direction of the movement.
Player.prototype.handleInput = function (key) {
    col = this.col;
    row = this.row;
    switch (key) {
        case "left":
            this.col = col === 0 ? col : col - 1;
            break;
        case "up":
            this.row = row === 0 ? row : row - 1;
            break;
        case "right":
            this.col = col === numCols ? col : col + 1;
            break;
        case "down":
            this.row = row === numRows ? row : row + 1;
            break;
    }
    if (row === 1) {
        document.querySelector('.congrats').style.display = "inline";
        document.removeEventListener('keyup', keyPressed);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player();

// Add new Enemy to the board and set the timer according to the level of the game
setInterval(() => {
    allEnemies.push(new Enemy());
}, gameLevel * 200);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
var keyPressed = function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
};
document.addEventListener('keyup', keyPressed);

// To reset all the information about enemies and player to the default ones.
function reset() {
    allEnemies = [];
    player = new Player();
    document.querySelector('.congrats').style.display = "none";
}

// listen to playing again button
document.querySelector('.button').addEventListener('click', function(){
    reset();
    document.addEventListener('keyup', keyPressed);
});