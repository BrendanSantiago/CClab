let dino;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

dino = new Dinosaur();
}

function draw() {
  background(220);

  dino.display();
}

class Dinosaur{
constructor(){
this.x = 200;
this.y = 200;
this.type = random(["trex", flying]);
this.col = color("green");
this.age = 0;
}
display(){
push();
translate(this.x, this.y);

fill(this.col);
if (this.type == "trex"){
 rect(-30, -30, 60, 60); 

}if else(this.type == "flying"){
  
}





pop();
}
}
