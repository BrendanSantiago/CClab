let port;
let delta = 0;

let paragraph = [];
let lineHeight = 50;
let movementOn = true;
let pausedAt = 0;

let connectBtn;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  let t = new TextLine(lineHeight);
  paragraph.push(t);
  lineHeight += 45;

  port = createSerial();

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }

  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 370);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background("lightyellow");

  // 读取 Arduino 串口数据
  let str = port.readUntil("\n");
  if (str.length > 0) {
    delta = int(trim(str));
  }

  // 当 delta 过高时暂停移动
  if (delta >= 300 && movementOn === true) {
    movementOn = false;
    pausedAt = millis();  // 记录暂停时间
  }

  // 如果过了5秒，恢复 movementOn
  if (!movementOn && millis() - pausedAt >= 5000) {
    movementOn = true;
  }

  fill("blue");

  for (let i = 0; i < paragraph.length; i++) {
    let element = paragraph[i];
    element.display();

    if (movementOn) {
      element.update();
    }
  
}
}
class TextLine {
  constructor(startY) {
    this.x = 60;
    this.y = startY;
    this.content = "";
  }

  update() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  display() {
    textSize(40);
    text(this.content, this.x, this.y);
  }

  addCharacter(theKey) {
    this.content += theKey;
  }

  removeLastCharacter() {
    this.content = this.content.slice(0, -1);
  }
}

function keyPressed() {
  if (key === "Backspace") {
    paragraph[paragraph.length - 1].removeLastCharacter();
  } else if (key === "Enter") {
    let t = new TextLine(lineHeight);
    lineHeight += 45;
    paragraph.push(t);
  } else {
    paragraph[paragraph.length - 1].addCharacter(key);
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open("Arduino", 57600);
  } else {
    port.close();
  }
}