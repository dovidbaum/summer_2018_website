    let columns = 50;  //50
    let rows = 50;
    let grid;
    let openSet = [];
    let closedSet = [];
    let start;
    let end;
    let w,h;
    let path = [];
    let current;



function setup(){
    let canvas = createCanvas(400,400);
    canvas.parent('shortestPath-holder');
    w = width/columns;
    h = height/rows;

    grid  = new Array(columns);

    //creating 2D array - the grid
    for(let i= 0; i < columns; i++ ){
        grid[i] = new Array(rows);
    }
    // initialize each spot in the grid
    for(let i= 0; i<columns; i++){
        for(let j=0; j<rows; j++){
            grid[i][j] = new Spot(i,j);
        }
    }

    // initialize the neighbors for each spot
    for(let i= 0; i<columns; i++){
        for(let j=0; j<rows; j++){
            grid[i][j].addNeighbors(grid);
        }
    }


    start = grid[0][rows-1]; // bottom left
    end = grid[columns-1][0]; // top right
    // ensure start and end are never a wall
    start.wall = false;
    end.wall = false;

    openSet.push(start);

}

function draw(){
    // As long as there are spots to be evaluated, evaluate those spots
    if(openSet.length > 0){
        let lowestIndex = 0;
        for(let i= 0; i< openSet.length; i++ ){
            if(openSet[i].f < openSet[lowestIndex].f){
                lowestIndex = i;
            }
        }
        // current is then ode in openSet that has the lowest f
        current = openSet[lowestIndex];

        if(current === end){
            noLoop();
            console.log("DONE!");
        }

        removeFromArray(openSet,current);
        closedSet.push(current);

        let neighbors = current.neighbors;
        for(let i= 0; i<neighbors.length; i++){
            let neighbor = neighbors[i];
            if(!closedSet.includes(neighbor) && !neighbor.wall){ // if not a valid neighbor
                let tempG = current.g + 1; //I can do +1 because as of now, each node has equal distance from each other
                let newPath = false; //assume I haven't found a better path
                // ensure there is not a 'better' g
                if(openSet.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG; //update g
                        newPath = true;      // I have found a better newPath
                    }
                }else{
                    neighbor.g = tempG;
                    newPath = true;      // I have found a better newPath
                    openSet.push(neighbor);
                }

                //calculate heuristic: straight line from node to end will always be <= to actual
                if(newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h; //f(n) = f(h) + f(g)
                    neighbor.previous = current;
                }
            }
        }

    }else{ //no solution
        console.log("no solution");
        noLoop();
        return;
    }


    background(255);
    // draw the grid
    for(let i= 0; i<columns; i++){
        for(let j=0; j<rows; j++){
            grid[i][j].show(color(255));
        }
    }

    //each spot in the closedSet will have a certain color
    for(let i= 0; i<closedSet.length; i++){
        closedSet[i].show(color(255,0,0));
    }
    //each spot in the opendSet will have a certain color
    for(let i= 0; i<openSet.length; i++){
        openSet[i].show(color(0,255,0));
    }

        //retrace the path
        path = [];
        let temp = current;
        path.push(temp);

        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }


    //show the shortest path
  //  for(let i= 0; i<path.length; i++){
      //  path[i].show(color(0,0,255));
  //  }



    //show the shortest path (a continuous line)
    noFill();
        stroke(255,0,200);
        strokeWeight(w/2)
    beginShape();
    for(let i= 0; i<path.length; i++) {
        vertex(path[i].i *w + w/2,path[i].j*h+h/2);

    }
    endShape();


    }


/* helper functions  */
function removeFromArray(array,element){
        const index = array.indexOf(element);

        if (index !== -1) {
            array.splice(index, 1);
        }
    }

function heuristic(a,b) {
        return dist(a.i,a.j,b.i,b.j);
       // return abs(a.i-b.i) + abs(a.j - b.j);
}

/*document.getElementById('replay').onclick = function () {
    console.log("replay was clicked");
}

document.getElementById('randomize').onclick = function () {
        console.log("randomize was clicked");
}
*/
