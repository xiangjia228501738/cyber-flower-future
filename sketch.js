// 未来花语 CyberFlower Language 完整版（文字置顶可见）
let mood = 7;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(10, 10, 18, 35);
  let size = map(mouseX, 0, width, 60, 220);

  // ====================== 文字写在最顶部，优先渲染，绝对看得见 ======================
  fill(255);
  textAlign(CENTER);
  textSize(36);
  let tipText = "";
  if(mood === 1) tipText = "1 喜悦 Joy";
  if(mood === 2) tipText = "2 平静 Peace";
  if(mood === 3) tipText = "3 孤独 Lonely";
  if(mood === 4) tipText = "4 焦虑 Anxiety";
  if(mood === 5) tipText = "5 思念 Miss";
  if(mood === 6) tipText = "6 愤怒 Anger";
  if(mood === 7) tipText = "7 治愈 Heal";
  if(mood === 8) tipText = "8 期待 Hope";
  text("当前花语：" + tipText, width/2, 90);

  push();
  translate(width / 2, height / 2);
  drawFlower(mood, size);
  pop();

  // 粒子渲染
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function drawFlower(mode, s) {
  let petalNum, col1, col2, speed, shake = 0;
  switch (mode) {
    case 1:
      petalNum = 12; col1 = color(255, 160, 60); col2 = color(255, 230, 120); speed = 2; break;
    case 2:
      petalNum = 6; col1 = color(120, 180, 255); col2 = color(240, 245, 255); speed = 0.3; break;
    case 3:
      petalNum = 3; col1 = color(90, 60, 130); col2 = color(160, 140, 180); speed = 0.6; break;
    case 4:
      petalNum = 22; col1 = color(110, 40, 60); col2 = color(20, 20, 30); speed = 3.5; shake = 6; break;
    case 5:
      petalNum = 8; col1 = color(230, 160, 210); col2 = color(255, 240, 255); speed = 1; break;
    case 6:
      petalNum = 8; col1 = color(220, 0, 0); col2 = color(0, 0, 0); speed = 6; shake = 15; break;
    case 7:
      petalNum = 20; col1 = color(120, 230, 180); col2 = color(240, 255, 200); speed = 0.8; break;
    case 8:
      petalNum = 5; col1 = color(250, 230, 180); col2 = color(200, 240, 230); speed = 0.5; break;
  }

  translate(random(-shake, shake), random(-shake, shake));
  rotate(frameCount * speed);

  // 花瓣绘制
  for (let i = 0; i < petalNum; i++) {
    fill(lerpColor(col1, col2, i / petalNum));
    noStroke();
    ellipse(0, -s / 2, s / 3, s);
    rotate(360 / petalNum);
  }

  // 花朵发光光晕
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = lerpColor(col1, col2, 0.5);
  fill(255, 80);
  circle(0, 0, s / 3);
  drawingContext.shadowBlur = 0;

  // 中心花蕊
  fill(255);
  circle(0, 0, s / 5);

  if (frameCount % 5 === 0) {
    createParticle(mode);
  }
}

function createParticle(mode) {
  let c;
  switch (mode) {
    case 1: c = color(255, 220, 100); break;
    case 2: c = color(180, 220, 255); break;
    case 3: c = color(120, 100, 150); break;
    case 4: c = color(60, 30, 40); break;
    case 5: c = color(220, 180, 240); break;
    case 6: c = color(180, 0, 0); break;
    case 7: c = color(160, 255, 210); break;
    case 8: c = color(255, 240, 200); break;
  }
  let cx = width / 2;
  let cy = height / 2;
  particles.push(new Particle(c, cx, cy, mode));
}

class Particle {
  constructor(c, x, y, m) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.size = random(3, 8);
    this.life = 300;
    if (m == 4 || m == 6) {
      this.vx = random(-5, 5);
      this.vy = random(-5, 5);
    } else if (m == 2 || m == 7) {
      this.vx = random(-1.5, 1.5);
      this.vy = random(-1.5, 1.5);
    } else {
      this.vx = random(-3, 3);
      this.vy = random(-3, 3);
    }
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1.5;
  }
  display() {
    fill(this.c, this.life);
    noStroke();
    circle(this.x, this.y, this.size);
  }
}

function keyPressed() {
  if (key >= "1" && key <= "8") {
    mood = Number(key);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
