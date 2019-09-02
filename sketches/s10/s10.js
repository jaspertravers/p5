s = {}; //state
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
  //centered grid

  let xm = width / 2;
  let ym = height / 2;
  let xdim = 4;
  let ydim = 4;
  let margin = 10;

  /*
   *  given xdim, ydim
   *  generate that grid centered on the middle
   *
   */

  let cellwidth = width / xdim;
  let cellheight = height / ydim;

  s.boxs = [];
  for (let x = 0; x < width; x += cellwidth) {
    for (let y = 0; y < height; y += cellheight) {
      s.boxs.push ({x: x + margin,
                    y: y + margin,
                    w: cellwidth - 2 * margin,
                    h: cellheight - 2 * margin,
                    margin: 10,
                    lstep: 4});
    }
  }

  // boxes created, each live in the array s.boxs as an object 
  // with {x, y, w, h, margin}
  // lets put a hold on this and figure out the architecture

}

// loop
function sketch () {
  s.boxs.forEach (e => rect (e.x, e.y, e.w, e.h));
  s.boxs.forEach (e => {
    //for (let step = 0; step < ) { }
  });
}

