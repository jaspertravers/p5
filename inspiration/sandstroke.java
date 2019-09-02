// Sand Stroke
// j.tarbell   January, 2004
// Albuquerque, New Mexico
// complexification.net

int dim = 500;
int k = 22;
int num = 0;
int maxnum = k+1;
int time;

int ticks = 1;
int frms = 13;

Sweep[] sweeps;

int maxpal = 256;
int numpal = 0;
color[] goodcolor = new color[maxpal];

void setup() {
  size(500,500);
  colorMode(RGB,255);
  takecolor("longcolor.gif");
  background(255);

  sweeps = new Sweep[maxnum];
  int g=int(dim/k);
  for (int y=0;y<k;y++) {
    sweeps[num] = new Sweep(0,random(dim),g*10);
    num++;
  }

}

void loop() {
  //background(0);
  time++;
  for (int n=0;n<num;n++) {
    sweeps[n].render();
  }
}


class Sweep {
  // feet
  float ox, oy;
  float x, y;
  float vx;

  float ogage;
  float gage;

  color myc;

  float time;
  float  sc, sg;

  Sweep(float X, float Y, float Gage) {
    // init
    ox = x = X;
    oy = y = Y;
    ogage = gage = Gage;

    // randomize limb properties
    selfinit();
  }

  void selfinit() {
    // init color sweeps
    myc = somecolor();
    sg = random(0.01,0.1);
    x = ox;
    y = oy;
    gage = ogage;
    vx = 1.0;
  }

  void render() {
    // move through time
    x+=vx;
    if (x>dim) selfinit();

    tpoint(int(x),int(y),myc,0.07);

    sg+=random(-0.042,0.042);

    if (sg<-0.3) {
      sg=-0.3;
    } else if (sg>0.3) {
      sg=0.3;
    } else if ((sg>-0.01) && (sg<0.01)) {
      if (random(10000)>9900) myc = somecolor();
    }

    float wd = 200;
    float w = sg/wd;
    for (int i=0;i<wd;i++) {
      tpoint(int(x),int(y + gage*sin(i*w)),myc,0.1-i/(wd*10+10));
      tpoint(int(x),int(y - gage*sin(i*w)),myc,0.1-i/(wd*10+10));
    }
  }

}

color somecolor() {
  // pick some random good color
  return goodcolor[int(random(numpal))];
}

void takecolor(String fn) {
  BImage b;
  b = loadImage(fn);
  image(b,0,0);

  for (int x=0;x<b.width;x++){
    for (int y=0;y<b.height;y++) {
      color c = get(x,y);
      boolean exists = false;
      for (int n=0;n<numpal;n++) {
        if (c==goodcolor[n]) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        // add color to pal
        if (numpal<maxpal) {
          goodcolor[numpal] = c;
          numpal++;
        } else {
          break;
        }
      }
    }
  }

  // pad with whites
  for (int k=0;k<6;k++) {
    goodcolor[numpal] = #FFFFFF;
    numpal++;
  }

  // pad with blacks
  for (int k=0;k<6;k++) {
    goodcolor[numpal] = #000000;
    numpal++;
  }

}
// translucent point
void tpoint(int x1, int y1, color myc, float a) {
  int r, g, b;
  color c;

  c = get(x1, y1);

  r = int(red(c) + (red(myc) - red(c)) * a);
  g = int(green(c) +(green(myc) - green(c)) * a);
  b = int(blue(c) + (blue(myc) - blue(c)) * a);
  color nc = color(r, g, b);
  stroke(nc);
  point(x1,y1);

}

// Sand Stroke
// j.tarbell   January, 2004
