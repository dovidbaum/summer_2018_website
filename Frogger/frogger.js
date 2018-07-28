let grid = 50;
const SAFETY = 0;
const CAR = 1;
const LOG = 2;
const FINISH = 3;
let lanes = [];   //height/width is how many lanes you need
let frog;
let roadImagestoLeft = [];
let roadImagestoRight = [];
let oceanImagestoLeft = [];
let oceanImagestoRight = [];
let canvas;
let gameState;
const PLAYING = 0;
const GAMEOVERMENU = 1;
const YOUWIN = 2;
let level = 1;
let waitingForUser;
let replayLevel;
let nextLevel;
let restartGame;
let howToPlay;
const finalLevel = 5;
let pWidth;
let pHeight;
let sketchHolder;
let positionInfo;
let upArrowIsClicked = false;
let downArrowIsClicked = false;
let leftArrowIsClicked = false;
let rightArrowIsClicked = false;
let gameoverContentContainer;




function preload() {
  //  frogImage = loadImage('Frogger/images/frog.png');
    frogImage = loadImage('Frogger/images/frog2.png');
    up = loadImage('Frogger/arrowKeys/up.png');
    down = loadImage('Frogger/arrowKeys/down.png');
    left = loadImage('Frogger/arrowKeys/left.png');
    right = loadImage('Frogger/arrowKeys/right.png');

    // load road images
    for (let i = 0; i <= 11; i++) {
        roadImagestoLeft[i] = loadImage('Frogger/images/RoadImages/toLeft/' + i + '.png');
        roadImagestoRight[i] = loadImage('Frogger/images/RoadImages/toRight/' + i + '.png');
    }
    // load ocean images
    for (let i = 0; i <= 8; i++) {
        oceanImagestoLeft[i] = loadImage('Frogger/images/OceanImages/toLeft/' + i + '.png');
        oceanImagestoRight[i] = loadImage('Frogger/images/OceanImages/toRight/' + i + '.png');
    }
    roadImage = loadImage('Frogger/images/RoadImages/road.png');
    oceanImage = loadImage('Frogger/images/OceanImages/sea.png');
    grassImage = loadImage('Frogger/images/grass.jpg');
    finishLine = loadImage('Frogger/images/checkered.jpg');
}

function resetGame() {
    frog = new Frog((width / 2) - grid / 2, height - grid, grid);  // start frog at the beginning
    frog.attach(null);
}

function setup() {
    //initially game will be setup at level 1
    gameState = PLAYING;  // change manually to test different states: GAMEOVERMENU or PLAYING or YOUWIN
    waitingForUser = false;
    sketchHolder = document.getElementById('sketch-holder');
    positionInfo = sketchHolder.getBoundingClientRect();
    pWidth = positionInfo.width;
    console.log("parent's width: "+pWidth);

    canvas = createCanvas(pWidth, 550);
    canvas.id("froggerCanvas");
    canvas.parent('sketch-holder');
   // gameoverContentContainer.parent('froggerCanvas');
  //  gameoverContentContainer.id('gameoverContentContainer');

    // Displays the image at point (0, height/2) at half size
  //  image(left,600, 600);

    resetGame();
    setupGame();


}

function setupGame() {
    //todo: create 5 levels, each time a user clicks next level it increments level and each
    // time a user clicks previous level it decrements level. within this function I'll have if
    // statements that take you to different levels. ie. if level == 2 Theb setupLevel2()

    if (level == 1) {
        setUpLevel1();
    } else if (level == 2) {
        setUpLevel2();
    } else if (level ==3){
        setUpLevel3();
    } else if (level == 4){
        setUpLevel4();
    } else if (level == 5){
        setUpLevel5();
    } else{
        gameState = YOUWIN;
    }
    sketchHolder = document.getElementById('sketch-holder');
    positionInfo = sketchHolder.getBoundingClientRect();
    pWidth = positionInfo.width;
    pHeight = positionInfo.height;


}

function draw() {

    if (!waitingForUser) {
        if (gameState == PLAYING) {
            fill(255, 100);
            for (let lane of lanes) {
                lane.run();
            }
            let laneIndex = int(frog.y / grid);
            lanes[laneIndex].check(frog); //only check the lane in which the frog is in
    /*        if (mouseIsPressed){
                frog.mousePressed();
            }
            frog.adjustLocation();
            frog.mouseReleased();
            */

            frog.update();
            frog.show(); //draw the frog last
            if (laneIndex === 0) { //0 is the FINISH cause it's "backwards"
                if(level == finalLevel){
                    gameState = YOUWIN;
                }else {
                    gameState = GAMEOVERMENU;
                }
            }
        } else if (gameState == GAMEOVERMENU) {
            if (!waitingForUser) { // ensures buttons are only created once
                waitingForUser = true;
                background('#222222');
                fill("#86f73b");
                textSize(40);
                text('You Beat Level ' + level + "!", ((pWidth / 2)) - 150, (550 / 2) - 150);
                replayLevel = createGameOverMenuButton("Replay Level", (((pWidth / 2)) - 50), ((550 / 2) - 100));
                nextLevel = createGameOverMenuButton("Next Level", (((pWidth / 2)) - 50), ((550 / 2) - 50));
                restartGame = createGameOverMenuButton("Restart Game", (((pWidth/ 2)) - 50), ((550 / 2)));

            }
            replayLevel.mousePressed(replay);
            nextLevel.mousePressed(next);
            restartGame.mousePressed(restart);
        } else if (gameState == YOUWIN){
            if (!waitingForUser) { // ensures buttons are only created once
                waitingForUser = true;
                background('#222222');
                fill("#21c4e6");
                textSize(100);
                text('You',((windowWidth / 2) / 2) - 100, (550 / 2) - 150);
                text('Win!',((windowWidth / 2) / 2) - 100, (550 / 2));
                replayLevel = createGameOverMenuButton("Replay Level", (((windowWidth / 2) / 2) - 50), ((550 / 2) + 100),"replay");
                restartGame = createGameOverMenuButton("Restart Game", (((windowWidth / 2) / 2) - 50), ((550 / 2))+ 150,"restart");
            }
            replayLevel.mousePressed(replay);
            restartGame.mousePressed(restart);
        }
    }

}





function keyPressed() {
    if ((keyCode === UP_ARROW)) {
        moveUp();
    } else if ((keyCode === DOWN_ARROW)) {
       moveDown();

    } else if ((keyCode === LEFT_ARROW)) {
        moveLeft();

    } else if ((keyCode === RIGHT_ARROW)) {
        moveRight();
    }

}

/*prevent scrolling while playing */
window.addEventListener("keydown", function (e) {
    if (e.keyCode == 40 /* Down arrow */) {
        e.preventDefault(); // prevents the "default" action from happening, in this case, scrolling down.
    }
}, false);
window.addEventListener("keyup", function (e) {
    if (e.keyCode == 38 /* Down arrow */) {
        e.preventDefault(); // prevents the "default" action from happening, in this case, scrolling down.
    }
}, false);

function windowResized() {
    sketchHolder = document.getElementById('sketch-holder');
    positionInfo = sketchHolder.getBoundingClientRect();
    pWidth = positionInfo.width;
    pHeight = positionInfo.height;

  //  replay = button.document.getElementById("replay");
  //  replay.position(pWidth/2, pHeight/2);


    resizeCanvas(pWidth, 550);


}


function createGameOverMenuButton(buttonName, posX, posY,idName) {
    let button = createButton(buttonName);
    button.id(idName); //i.e
    button.parent("sketch-holder");    //document.getElementById(buttonName).style.background='#000000';
    button.size(150);
    button.position(posX, posY); //position in the middle of canvas
    button.style("border", "2px solid #f74c3b");
    button.style("padding","10px");
    button.style("border-radius","50px 20px");
    button.style("background","#eae8e8");
 //   button.style("color","#21c4e6");
    return button;
}

function replay() {
    clearGameOverMenu(); // clear the gameOverMenu
    setup(); // setup the same level

}

function next() {
    clearGameOverMenu(); // clear the gameOverMenu
    level++; //increment level
    setup(); // setup next level
}

function restart() {
    clearGameOverMenu(); // clear the gameOverMenu
    level = 1; //start at first level
    setup(); // setup next level
}

function instructions() {
    console.log("instructions pressed: Objective: avoid Safetly traffic and then cross the river to get to the bakery ");
}

function clearGameOverMenu() {
    console.log("clearing GameOver menu...");
    if(replayLevel) {
        replayLevel.remove();
    }
    if(nextLevel) {
        nextLevel.remove();
    }
    if(restartGame) {
        restartGame.remove();
    }
    if(howToPlay) {
        howToPlay.remove();
    }
}

function setUpLevel1() {
    lanes[0] = new Lane(0, FINISH, 0, 0, 0, 0);  //this is the most top row
    lanes[1] = new Lane(1, LOG, 4, 1, 150, 3);
    lanes[2] = new Lane(2, LOG, 3, 1, 350, -2.5);
    lanes[3] = new Lane(3, LOG, 5, 1, 250, 1.1);
    lanes[4] = new Lane(4, LOG, 4, 1, 200, -1.7);  // bottom most ocean row
    lanes[5] = new Lane(5, SAFETY, 0, 0, 0, 0);
    lanes[6] = new Lane(6, CAR, 4, 1, 150, 2.4); //
    lanes[7] = new Lane(7, CAR, 2, 1, 150, -3.6);
    lanes[8] = new Lane(8, CAR, 1, 1, 150, 2.3);
    lanes[9] = new Lane(9, CAR, 3, 1, 150, -1); //index, type, number of vehicles, len, spacing, speed
    lanes[10] = new Lane(10, SAFETY, 0, 0, 0, 0);   //this is the most bottom row
}

function setUpLevel2() {
    // game gets harder by increasing the speed
    lanes[0] = new Lane(0, FINISH, 0, 0, 0, 0);  //this is the most top row
    lanes[1] = new Lane(1, LOG, 4, 1, 150, 3.5);
    lanes[2] = new Lane(2, LOG, 3, 1, 350, -3);
    lanes[3] = new Lane(3, LOG, 5, 1, 250, 1.6);
    lanes[4] = new Lane(4, LOG, 4, 1, 200, -2.2);  // bottom most ocean row
    lanes[5] = new Lane(5, SAFETY, 0, 0, 0, 0);
    lanes[6] = new Lane(6, CAR, 4, 1, 150, 2.9); //
    lanes[7] = new Lane(7, CAR, 2, 1, 150, -4.1);
    lanes[8] = new Lane(8, CAR, 2, 1, 150, 2.9);
    lanes[9] = new Lane(9, CAR, 3, 1, 150, -1.5); //index, type, number of vehicles, len, spacing, speed
    lanes[10] = new Lane(10, SAFETY, 0, 0, 0, 0);   //this is the most bottom row
}
function setUpLevel3() {
    // game gets harder by increasing cars and decreasing boats number (and speed a little bit)
    lanes[0] = new Lane(0, FINISH, 0, 0, 0, 0);  //this is the most top row
    lanes[1] = new Lane(1, LOG, 3, 1, 130, 4);
    lanes[2] = new Lane(2, LOG, 2, 1, 300, -3.5);
    lanes[3] = new Lane(3, LOG, 3, 1, 230, 2.2);
    lanes[4] = new Lane(4, LOG, 3, 1, 200, -2.6);  // bottom most ocean row
    lanes[5] = new Lane(5, SAFETY, 0, 0, 0, 0);
    lanes[6] = new Lane(6, CAR, 4, 1, 120, 3.9); //
    lanes[7] = new Lane(7, CAR, 3, 1, 120, -4.6);
    lanes[8] = new Lane(8, CAR, 3, 1, 150, 3.3);
    lanes[9] = new Lane(9, CAR, 4, 1, 140, -2); //index, type, number of vehicles, len, spacing, speed
    lanes[10] = new Lane(10, SAFETY, 0, 0, 0, 0);   //this is the most bottom row
}
//todo levels below (actually just copies of level 1
//
//level 4 game gets harder by decreasing car space and increasing boat space (and speed and number a little bit)
function setUpLevel4() {
    lanes[0] = new Lane(0, FINISH, 0, 0, 0, 0);  //this is the most top row
    lanes[1] = new Lane(1, LOG, 2, 1, 150, 3.5);
    lanes[2] = new Lane(2, LOG, 3, 1, 350, -3.1);
    lanes[3] = new Lane(3, LOG, 4, 1, 250, 2.7);
    lanes[4] = new Lane(4, LOG, 1, 1, 200, -3.1);  // bottom most ocean row
    lanes[5] = new Lane(5, SAFETY, 0, 0, 0, 0);
    lanes[6] = new Lane(6, CAR, 4, 1, 150, 2.9); //
    lanes[7] = new Lane(7, CAR, 3, 1, 150, -4.1);
    lanes[8] = new Lane(8, CAR, 4, 1, 150, 3.8);
    lanes[9] = new Lane(9, CAR, 3, 1, 150, -2.5); //index, type, number of vehicles, len, spacing, speed
    lanes[10] = new Lane(10, SAFETY, 0, 0, 0, 0);   //this is the most bottom row
}
function setUpLevel5() {
    lanes[0] = new Lane(0, FINISH, 0, 0, 0, 0);  //this is the most top row
    lanes[1] = new Lane(1, LOG, 2, 1, 150, 4.5);
    lanes[2] = new Lane(2, LOG, 2, 1, 350, -4.1);
    lanes[3] = new Lane(3, LOG, 2, 1, 250, 3.7);
    lanes[4] = new Lane(4, LOG, 1, 1, 200, -4.1);  // bottom most ocean row
    lanes[5] = new Lane(5, SAFETY, 0, 0, 0, 0);
    lanes[6] = new Lane(6, CAR, 4, 1, 150, 3.9); //
    lanes[7] = new Lane(7, CAR, 3, 1, 150, -5.1);
    lanes[8] = new Lane(8, CAR, 4, 1, 150, 4.8);
    lanes[9] = new Lane(9, CAR, 3, 1, 150, -3.5); //index, type, number of vehicles, len, spacing, speed
    lanes[10] = new Lane(10, SAFETY, 0, 0, 0, 0);   //this is the most bottom row
}
//level 5 everything gets pumped to it's maximum


// also be on the loot out for on screen clicks
document.getElementById('upArrow').onclick = function () {
    moveUp();

};
document.getElementById('downArrow').onclick = function () {
    moveDown();

};
document.getElementById('leftArrow').onclick = function () {
    moveLeft();

};
document.getElementById('rightArrow').onclick = function () {
    moveRight();
};

function moveUp() {
    frog.move(0, -1);   // move up
    document.getElementById('upArrow').style.color = "blue";

    document.getElementById('downArrow').style.color = "black";
    document.getElementById('leftArrow').style.color = "black";
    document.getElementById('rightArrow').style.color = "black";

}
function moveDown() {
    frog.move(0, 1);   // move down
    document.getElementById('downArrow').style.color = "red";

    document.getElementById('upArrow').style.color = "black";
    document.getElementById('leftArrow').style.color = "black";
    document.getElementById('rightArrow').style.color = "black";
}
function moveLeft() {
    frog.move(-1, 0);  // move left
    document.getElementById('leftArrow').style.color = "orange";

    document.getElementById('upArrow').style.color = "black";
    document.getElementById('downArrow').style.color = "black";
    document.getElementById('rightArrow').style.color = "black";
}
function moveRight() {
    frog.move(1, 0);   // move right
    document.getElementById('rightArrow').style.color = "green";

    document.getElementById('upArrow').style.color = "black";
    document.getElementById('downArrow').style.color = "black";
    document.getElementById('leftArrow').style.color = "black";
}




