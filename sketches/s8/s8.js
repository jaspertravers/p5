function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(STROKE);
  noFill();
  //noLoop();
  strokeWeight(1);
  colorMode(HSB)

  build();
}

function draw() {
  sketch();
}

// once
function build () {
  line (0, 100, width, 100);
  line (100, 0, 100, height);

  line (0, 95, width, 95);
  line (95, 0, 95, height);

  line (0, 100, 100, 200);
  line (100, 0, 200, 100);

  for (let x = 100; x < 300; x += 1) {
    for (let y = 100; y < 300; y+= 1) {
      stroke (0, map (x, 100, 300, 0, 100), map (y, 100, 300, 0, 100));
      point (x, y);
    }
  }
}

// loop
function sketch () {
}
