let grid = 50;
const SAFETY = 0;
const CAR = 1;
const LOG = 2;
const FINISH = 3;
var gameFinished = false;
let lanes  = [];   //height/width is how many lanes you need
let frog;
let roadImagestoLeft = [];
let roadImagestoRight = [];
let oceanImagestoLeft = [];
let oceanImagestoRight = [];
let canvas;
let gameState;
const PLAYING = 0;
const GAMEOVERMENU = 1;
let level;
let waitingForUser;
let replayLevel;
let nextLevel;
let restartGame;
let howToPlay;


function preload(){
    frogImage = loadImage('Frogger/images/frog.png');
    // load road images
    for(let i = 0; i<= 11;i++){
        roadImagestoLeft[i] = loadImage('Frogger/images/RoadImages/toLeft/'+i+'.png');
        roadImagestoRight[i] = loadImage('Frogger/images/RoadImages/toRight/'+i+'.png');
    }
    // load ocean images
    for(let i = 0; i<= 8;i++){
        oceanImagestoLeft[i] = loadImage('Frogger/images/OceanImages/toLeft/'+i+'.png');
        oceanImagestoRight[i] = loadImage('Frogger/images/OceanImages/toRight/'+i+'.png');
    }

    roadImage = loadImage('Frogger/images/RoadImages/road.png');
    oceanImage = loadImage('Frogger/images/OceanImages/sea.png');
    grassImage = loadImage('Frogger/images/grass.jpg');


}

function resetGame(){
    frog = new Frog((width/2)-grid/2, height-grid, grid);  // start frog at the beginning
    frog.attach(null);
}

function setup(){
    //initially game will be setup at level 1
    gameState = PLAYING;  // change manually to test different states: GAMEOVERMENU or PLAYING
    level = 1;
    waitingForUser = false;
    canvas = createCanvas(windowWidth/2,550);
    canvas.id("froggerCanvas");
    canvas.parent('sketch-holder');
    resetGame();
    setupGame();


}

function setupGame() {

    //for demonstration purposes manually create each lane
    lanes[0] = new Lane(0, FINISH, 0, 0, 0, 0);  //this is the most top row
    lanes[1] = new Lane(1, LOG, 3, 1, 150, 3);
    lanes[2] = new Lane(2, LOG, 2, 3, 350, -2.5);
    lanes[3] = new Lane(3, LOG, 4, 1, 250, 1);
    lanes[4] = new Lane(4, LOG, 3, 22, 100, -1.7);  // bottom most ocean row
    lanes[5] = new Lane(5, SAFETY, 0, 0, 0, 0);
    lanes[6] = new Lane(6, CAR, 4, 1, 150, 2.4); //
    lanes[7] = new Lane(7, CAR, 2, 1, 150, -3.6);
    lanes[8] = new Lane(8, CAR, 1,1, 150, 2.3);
    lanes[9] = new Lane(9, CAR, 3, 1, 150,-1); //index, type, number of vehicles, len, spacing, speed
    lanes[10] = new Lane(10, SAFETY, 0, 0, 0, 0);   //this is the most bottom row
}

function draw(){
    if(!waitingForUser) {
        if (gameState == PLAYING) {
            fill(255, 100);
            for (let lane of lanes) {
                lane.run();
            }
            let laneIndex = int(frog.y / grid);
            lanes[laneIndex].check(frog); //only check the lane in which the frog is in
            frog.update();
            frog.show(); //draw the frog last
            if (laneIndex === 0) { //0 is the FINISH cause it's "backwards"
                console.log("finished 2");
                // clear();
                gameState = GAMEOVERMENU;
            }
        } else if (gameState == GAMEOVERMENU) {
            if(!waitingForUser) {
                waitingForUser == true;
                background('#222222');
                fill("green");
                textSize(55);
                text('You Win!', ((windowWidth / 2) / 2) - 100, (550 / 2) - 150);
                if (!replayLevel) {
                    replayLevel = createGameOverMenuButton("Replay Level", (((windowWidth / 2) / 2) - 50), ((550 / 2) - 100));
                }
                if (!nextLevel) {
                    nextLevel = createGameOverMenuButton("Next Level", (((windowWidth / 2) / 2) - 50), ((550 / 2) - 50));
                }
                if (!restartGame) {
                    restartGame = createGameOverMenuButton("Restart Game", (((windowWidth / 2) / 2) - 50), ((550 / 2)));
                }
                if (!howToPlay) {
                    howToPlay = createGameOverMenuButton("How to Play", (((windowWidth / 2) / 2) - 50), ((550 / 2)) + 50);
                }
            }


            // have a go to level n (increments each time)
            //pause game
            replayLevel.mousePressed(replay);
            nextLevel.mousePressed(next);
            restartGame.mousePressed(restart);
            howToPlay.mousePressed(instructions);
        }
    }

}

function keyPressed(){
    if(keyCode === UP_ARROW){
        frog.move(0,-1);
    } else if (keyCode === DOWN_ARROW){
        frog.move(0,1);
    }else if (keyCode === LEFT_ARROW){
        frog.move(-1,0);
    }else if (keyCode === RIGHT_ARROW){
        frog.move(1,0);
    }
}
/*prevent scrolling while playing */
window.addEventListener("keydown", function(e) {
    if(e.keyCode == 40 /* Down arrow */) {
        e.preventDefault(); // prevents the "default" action from happening, in this case, scrolling down.
    }
}, false);
window.addEventListener("keyup", function(e) {
    if(e.keyCode == 38 /* Down arrow */) {
        e.preventDefault(); // prevents the "default" action from happening, in this case, scrolling down.
    }
}, false);

function windowResized() {
    resizeCanvas(windowWidth/2,550);
}


function createGameOverMenuButton(buttonName,posX,posY) {
    let button = createButton(buttonName);
    button.id(buttonName)
    button.parent("sketch-holder");
    //document.getElementById(buttonName).style.background='#000000';
    button.size(150);
    button.position(posX,posY); //position in the middle of canvas
    return button;
}
 function replay() {
     console.log("replayLevel pressed");
 }
function next() {
    console.log("nextLevel pressed");
    // clear the gameOverMenu
    clearGameOverMenu();
    // setup next level
    setup();

}
function restart() {
    console.log("restart pressed");
}
function instructions() {
    console.log("instructions pressed");
}
function clearGameOverMenu() {
    console.log("clearing GameOver menu...")
    replayLevel.remove();
    nextLevel.remove();
    restartGame.remove();
    howToPlay.remove();



}
