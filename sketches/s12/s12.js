var s = {}; //state
function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea'; //255 251 244
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  //createCanvas(1080, 2160); //pixel 3
  background(BACKGROUND);
  //stroke(STROKE);
  stroke (28, 28, 28, 120);
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

  //debug
  // line (width / 3, 0, width / 3, height);
  // line ( 2 * width / 3, 0, 2 * width / 3, height);

  let y = height / 2;
  let x1 = 1 * width / 3;
  let xm = 1 * width / 2;
  let x2 = 2 * width / 3;

  //circ (x1, y, 100, 0.007, PI / 4, PI, true);
  //circ (xm, y, 100, 0.007, 0, TWO_PI);
  let margin = -0.05;
  circ (xm, y, 200, 0.007, 0 + margin, TWO_PI / 3 - margin, true);
  circ (xm, y, 300, 0.007, TWO_PI / 3 + margin, 2 * TWO_PI / 3 - margin, true);
  circ (xm, y, 100, 0.007, 2 * TWO_PI / 3 + margin, TWO_PI - margin, true);
  push();
  stroke (255, 251, 244, 120);
  circ (xm, y, 10, 0.017, 0, TWO_PI, true);
  pop();
  //circ (x2, y, 100, 0.007, 5 * PI / 4, TWO_PI, true);
  //BG
  BG();
  //squares
  
  //squares
}

// loop
function sketch () {
}
function circ  (x, y, scale, theta_step, arc_from=0, arc_to=TWO_PI, fill=false) {
  pts = [];
  let offset = 1;
  for (let theta = arc_from; theta < arc_to; theta += theta_step) {
    let ix = scale * cos (theta) + x;
    let iy = scale * sin (theta) + y;
    pts.push (vec (ix, iy));
  }
  outpts = pts.map (e => vec (e.x + random (-offset, offset), e.y + random (-offset, offset)));
  outpts.forEach (e => point (e.x, e.y));
  if (fill) outpts.forEach (e => sand (x, y, e.x, e.y, 200, 0.8));
}

function srect (x1, y1, x2, y2, fill=true) {
}

function sand (x1, y1, x2, y2, n, offset) {
  let xs = linspace (n, x1, x2);
  let ys = linspace (n, y1, y2);

  let pts = zip (xs, ys);

  let points = pts.map (e => e.map (el => el + random (-offset, offset)));
  points.forEach (e => point (e[0], e[1]));

}

function BG () {
  let density = 10000;
  //top inner
  sand (1 * width / 8,
        1 * height / 8,
        7 * width / 8,
        1 * height / 8,
        density, 0.8);
  //top outer
  sand (1 * width / 8 - 10,
        1 * height / 8 - 10,
        7 * width / 8 + 10,
        1 * height / 8 - 10,
        density, 0.8);
  //left vert
  sand (1 * width / 8 + 10,
        1 * height / 8 - 20,
        1 * width / 8 + 10,
        7 * height / 8 + 20,
        density, 0.8);
  //right vert
  sand (7 * width / 8 - 10,
        1 * height / 8 - 20,
        7 * width / 8 - 10,
        7 * height / 8 + 20,
        density, 0.8);
  //bot inner
  sand (1 * width / 8,
        7 * height / 8,
        7 * width / 8,
        7 * height / 8,
        density, 0.8);
  //bot outer
  sand (1 * width / 8 - 10,
        7 * height / 8 + 10,
        7 * width / 8 + 10,
        7 * height / 8 + 10,
        density, 0.8);
}
