function setup() {
  BACKGROUND = '#fffbf4'; 
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
  //for (let iter = 0; iter < 4; iter++) { lbox (40, 40 + 100 * iter, 100); }

  drawPath (sand (100, 100, 200, 300));
}

// loop
function sketch () {
}

function lbox (x, y, w) {
  let points = [];
  points.push (sand (x + 0, y + 0, x + w, y + 0));
  points.push (sand (x + w, y + 0, x + w, y + w));
  points.push (sand (x + w, y + w, x + 0, y + w));
  points.push (sand (x + 0, y + w, x + 0, y + 0));

  //drawPath (points);
}

// not even remotely working
function sand (x1, y1, x2, y2) {
  let points = [];
  let step = 1.0;
  let DISTANCE = distance (x1, y1, x2, y2);
  let dist = 0;

  let xratio = 1 - (x2 - x1 != 0) ? (y2 - y1) / (x2 - x1) : 0;
  let yratio = 1 - xratio;

  let x = x1;
  let y = y1;

  while (dist < DISTANCE) {
    x += step * xratio;
    y += step * yratio;
    points.push (vec (x,y));
    dist += step;
  }

  return points;
}

function distance (x1, y1, x2, y2) {
  return sqrt (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
