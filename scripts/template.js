var s = {}; //state

function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(STROKE);
  noFill();
  //noLoop();
  strokeWeight(1);

  build();
}

function draw() {
  sketch();
}

// once
function build () {
}

// loop
function sketch () {
}

function keyPressed() {
  switch (key) {
    case 's':
      let time = "" + year () + "_" + month() + "_" + day() + "_" + hour() + minute() + second();
      save (time + "_" + "sketch.png");
      break;
    default:
      //console.log ("missed switch");
  }
}


function mouseClicked() {
}
