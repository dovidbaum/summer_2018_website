class Spot {

    // f(n) = g(n) + h(n)
    constructor(i,j){
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.i = i;
        this.j = j;
        this.neighbors = [];
        this.previous = null;
        this.wall = false; //every spot by default will not be a wall

        if(random(1)< .4){
            this.wall = true;
        }
    }

    show(color){
        //draw a rectangle
       // fill(color);
        if(this.wall){ // everything is white unless it's an obstacle - make it black
            fill(0);
            noStroke();
            ellipse(this.i * w + w/2, this.j * h + h/2, w/2, h/2);
        }
     //   noStroke();
     //   ellipse(this.i * w + w/2, this.j * h + h/2, w/2, h/2);
       // rect(this.i * w, this.j * h, w-1, h-1);
    }

    // as long as the neighbor is on the grid add all the spots neighbors
   addNeighbors(grid){
        if(this.i <  columns-1) {
            this.neighbors.push(grid[this.i + 1][this.j]);
        }
        if(this.i > 0) {
            this.neighbors.push(grid[this.i - 1][this.j]);
        }
        if(this.j < rows -1) {
            this.neighbors.push(grid[this.i][this.j + 1]);
        }
        if(this.j > 0) {
            this.neighbors.push(grid[this.i][this.j - 1]);
        }
        /* add neighbors in the diagonal direction */
        if(this.i > 0 && this.j > 0){ // up to the top left
            this.neighbors.push(grid[this.i-1][this.j - 1]);
        }
        if(this.i < columns-1 && this.j > 0) {     // top right
            this.neighbors.push(grid[this.i+1][this.j - 1]);
        }
        if(this.i > 0 && this.j < rows -1) {     // bottom left
           this.neighbors.push(grid[this.i-1][this.j + 1]);
        }
       if(this.i < columns-1 && this.j < rows-1) {     // bottom right
           this.neighbors.push(grid[this.i+1][this.j + 1]);
       }
    }


}