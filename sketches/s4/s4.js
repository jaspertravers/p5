var s = {}; //state
var preset = [];
var postset = [];

//live
  var xm;// = width / 2;
  var hm;// = height / 2;
  var lev = 0;


//data structure
//for_ (cur, cond, next, fbody)
var ds = {
  n: 0,
  levels: [],
};

function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(40, 40, 40, 100);
  noFill();
  frameRate (10);
  noLoop();
  strokeWeight(1);

  //build();
  build1();
}

function draw() {
  sketch();
}

// once
function build () {
  let scale = 0.05;
  for (let x = -2; x < 2; x += scale) {
    for (let y = -2; y < 2; y += scale) {
      preset.push (vec (x, y));
    }
  }

  //iterative function system
  let ifs = (alpha, beta, gamma, delta) => (p) =>
    vec ( sin (alpha * p.y) - cos (beta  * p.x),
          sin (gamma * p.x) - cos (delta * p.y));

  let ifs1 = ifs(-2, -2, -1.2, 2);

  //want to go from any depth to depth+1. Also want to store all of these dp style
  //let level = (ds) => ds.levels[ds.n + 1];

  for (let iter = 0; iter < preset.length; iter++) {
    postset.push (ifs1 (preset[iter]));
  }
}
function build1 () {
  //init
  console.log ("start");
  init = (scale) => {ds.levels[ds.n] = [];
                    for_ (-2, x => x < 2, x => x + scale, x =>
                      for_ (-2, y => y < 2, y => y + scale, y =>
                        ds.levels[ds.n].push(vec (x, y))));}

  level = () => {ds.levels[ds.n + 1] = [];
                ds.levels[ds.n].forEach (e => ds.levels[ds.n + 1].push (ifs1 (e))); ds.n++};

  ifs = (alpha, beta, gamma, delta) => (p) =>
    vec ( sin (alpha * p.y) - cos (beta  * p.x),
          sin (gamma * p.x) - cos (delta * p.y)),

  //ifs1 = ifs (-2, -2, -1.1, 2);
  ifs1 = ifs (-1.214, -0.5958, -2.256, .9604);

  init(0.008);
  for (let iter = 0; iter < 9; iter++) {
    level();
  }

}

// loop
function sketch () {
  //let xm = width / 2;
  //let hm = height / 2;
  //let scale = 100;
  //let lev = 9;
  xm = width / 2;
  hm = height / 2;
  let scale = 100;
  background(BACKGROUND);
  //lev = (lev + 1) % 20;
  lev = 8;
  for (let iter = 0; iter < ds.levels[lev].length; iter++) {
    let dot = ds.levels[lev][iter];
    point (xm + dot.x * scale, hm + dot.y * scale);
  }
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
