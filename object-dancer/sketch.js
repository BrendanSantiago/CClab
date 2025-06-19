/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new BrendanDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();

  
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class BrendanDancer {
  constructor(startX, startY) {
   this.x = startX;
     this.y = startY;
    // add properties for your dancer here:
    // ..
    // ..
    // ..
    this.yOffset = 0;
    this.ySpeed = -12;
    this.gravity = 0.2;
    this.xOffset = 0;
    this.Xspeed = -19;
  }
  update() {
   //this.yOffset = sin(frameCount*0.1)*30
    // update properties here to achieve
    // your dancer's desired moves and behaviour

    this.yOffset += this.ySpeed;
    this.xOffset += this.xSpeed;
    this.ySpeed += this.gravity;

    if(this.yOffset > 0){
      this.yOffset = 0;
    }

  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y + this.yOffset);
    // this.yOffset = sin(frameCount*0.1)*30

     fill("lightblue")
     noStroke();
    circle(0, 0, 40);
    ellipse(-20, -20, 10, 40);
    ellipse(20, -20, 10, 40);
    fill("black")
    ellipse(0, 0, 20, 3);
    circle(-7, 0, 10);
    circle(7, 0, 10);
    fill("lightblue")
    rect(-5, 20, 10, 60);
    circle(0, 35, 30);
    ellipse(0, 25, 70, 10);
    circle(-12, 80,  20);
    circle(-12, 90,  20);
    circle(12, 80,  20);
    circle(12, 90, 20);
    circle(-12, 100,  20);
    circle(-12, 110,  20);
    circle(12, 100,  20);
    circle(12, 110, 20);
     circle(27, 30,  20);
     circle(-27, 30,  20);
     circle(27, 40,  15);
     circle(-27, 40,  15);
     circle(27, 50,  10);
     circle(-27, 50,  10);
    //circle(12, -20, 30);
    // ******** //
    // ⬇️ draw your dancer from here ⬇️






    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  
     
  }
  triggerA(){
    // this function will be called when the "a" key is pressed.
    // your dancer should perform some kind of reaction (i.e. make a special move or gesture) 
    //this,ySpeed = -10;

    


  }
  triggerD(){
    // this function will be called when the "d" key is pressed.
    // your dancer should perform some kind of reaction (i.e. make a special move or gesture) 

    //arm
    

  
   

  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    //line(-5, 0, 5, 0);
    //line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }

}

/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/

/*
Here are the key events that your dancer should react to in some way.
*/

function keyPressed(){
  if(key == "a"){
    dancer.triggerA()
  }else if(key == "d"){
    dancer.triggerD()
  }
}