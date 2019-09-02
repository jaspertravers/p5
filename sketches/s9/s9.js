function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(STROKE);
  noFill();
  noLoop();
  strokeWeight(1);

  build();
}

function draw() {
  sketch();
}

// once
function build () {
  let step = 35;
  let pts = [];
  for (let x = (width % step) / 2; x <= width; x += step) {
    for (let y = (height % step) / 2; y <= height; y += step) {
      pts.push (vec (x, y));
    }
  }

}

// loop
function sketch () {
}
