var s = {}; //state

let myFont;

function preload() {
  myFont = loadFont('includes/assets/et-book-roman-line-figures.ttf');
}


function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(STROKE);
  noFill();
  noLoop();
  strokeWeight(1);
  textFont (myFont);
  textSize (16);
  colorMode (HSB, 100); //change color from RGB to HSB

  build();
}

function draw() {
  sketch();
}

// once
function build () {
  {n: 400,
   t: 3,
   offset: 0.80
  }
  s.n = 400;
  s.t = 3;
  s.offset = 0.80;
}

// loop
function sketch () {
  background(BACKGROUND);

  text ("n: " + s.n, 20, 30);
  text ("t: " + s.t, 20, 50);
  text ("offset: " + s.offset, 20, 70);


  let y = height / 4;
  let BARS = 160;
  let pairs = [];

  for (let x = width / 8; x <= 7 * width / 8; x += width / 2 / (BARS - 0)) {
    //let off = random (height / 4);
    let off = noise (x * 0.02) * (height / 4);
    let v1 = vec (x, height / 2 - off);
    let v2 = vec (x, height / 2 + off);

    pairs.push ([v1, v2]);
  }

  weave (pairs);

}

function weave (pairs) {
  //let n = 400;
  //let t = 3;
  //let offset = 0.80;
  let n = s.n;
  let t = s.t;
  let offset = s.offset;

  for (let index = 0; index < pairs.length; index++) {
    let v1 = pairs[index][0];
    let v2 = pairs[index][1];

    sand (n, v1, v2, t, offset);

  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      s.n += 50;
      break;
    case LEFT_ARROW:
      s.t -= 1;
      break;
    case RIGHT_ARROW:
      s.t += 1;
      break;
    case DOWN_ARROW:
      s.n -= 50;
      break;
    case 79: //o
      s.offset += 0.1;
      break;
    case 73: //i
      s.offset -= 0.1;
      break;
    default:
      console.log ("missed switch");
  }
}

function wave () {
  let x = 1 * width / 4;
  let y = 2 * height / 4;
  let astep = TWO_PI / 400;
  let increment = 1;
  let range = 400;
  let amp = 80;

  for (let step = 0, ang = 0; step < range; step += increment, ang += TWO_PI / range) {
    point (x + step, y + sin (ang) * amp);
  }
}

/*
 * n: number of points
 * v: line begin
 * w: line end
 * t: times
 * offset: how much each point varries per iteration
 *
 * //rgba: color/transparency
 */

function sand (n, v, w, t, offset) {

  let xs = linspace (n, v.x, w.x);
  let ys = linspace (n, v.y, w.y);

  for (let times = 0; times < t; times++) {

    for (let i = 0; i < n; i++) {
      point (xs[i], ys[i]);
      //line (xs[i], ys[i], xs[i], ys[i] + 10);
    }

    xs = xs.map (e => e += random (-offset, offset));
    ys = ys.map (e => e += random (-offset, offset));
  }
}

/*
 * Pick a number of grains, n.
 * Pick a color, and a corresponding transparency, rgba.
 * Pick two points, v and w.
 * Randomly draw n points (uniformly distributed) between v and w, using color rgba.
 * Move v and w slightly, then draw again.
 *
 * -  linspace(n, mi, ma)
 *      // get n numbers evenly distributed between (mi, ma).
 *      // includes the end values.
 *
 */
