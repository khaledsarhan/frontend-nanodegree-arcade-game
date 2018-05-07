
//Global variables to calculate the proper position for the player while it's moving
const cellWidth = 101;
const cellHeight = 83;
const numRows = 5;
const numCols = 4;

let gameLevel = 3;

// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,

    // The sprite is the image for our enemies
    this.sprite = 'images/enemy-bug.png';

    // Calculate the position and the speed for the ememy randomly
    this.row = Math.floor(Math.random() * 3) + 1
    this.x = -1 * cellWidth;
    this.y = this.row * cellHeight - 20;
    this.speed = Math.floor(Math.random() * 10) + 3;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed + dt;

    // Collision happens here
    let currentX = this.x + 70;
    if (currentX >= player.x && currentX < player.x + cellWidth) {
        if (this.row == player.row) {
            player = new Player();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// A player object to avoid Enemies
var Player = function () {
    // Variables applied to each of our instances go here,

    this.sprite = 'images/char-boy.png';

    // These variables for setting the player position
    this.x = 0;
    this.y = 0;
    this.col = 2;
    this.row = 4;
};

// Update the player's position, required method for game
Player.prototype.update = function (dt) {
    this.x = this.col * cellWidth;
    this.y = this.row * cellHeight - 20;
};

// Function to calculate the proper (x,y) and draw the player again and again.
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to handle the column and row changes according to the direction of the movement.
Player.prototype.handleInput = function (key) {
    col = this.col;
    row = this.row;
    switch (key) {
        case "left":
            this.col = col == 0 ? col : col - 1;
            break;
        case "up":
            this.row = row == 0 ? row : row - 1;
            break;
        case "right":
            this.col = col == numCols ? col : col + 1;
            break;
        case "down":
            this.row = row == numRows ? row : row + 1;
            break;
    }
    if (row == 1) {
        reset();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player();

// Add new Enemy to the board and set the timer according to the level of the game
setInterval(() => {
    allEnemies.push(new Enemy(), );
}, gameLevel * 200);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function reset() {
    allEnemies = [];
    player = new Player();
}