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
  let nscale = 0.02;
  for (let x = 100; x < 300; x += 1) {
    for (let y = 100; y < 300; y += 1) {
      let val = noise (x * nscale, y * nscale);
      if (val > .19 && val < .21) point (x, y);
      if (val > .48 && val < .52) point (x, y);
      if (val > .79 && val < .81) point (x, y);
    }
  }
}

// loop
function sketch () {
}
