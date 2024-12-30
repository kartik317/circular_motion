const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 22;
const c = canvas.getContext("2d");
const touch = { x: canvas.width/2, y: canvas.height/2}
const colorArray = ['#36BFB1', '#038C73', '#02735E', '#014034', '#234578', '#014034', '#0D0D0D'];

class Create_ball {
  constructor(x, y, radius, color, angle, angularVelocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.angle = angle;
    this.angularVelocity = angularVelocity;
    this.distanceBetween = getRandomInt(150, 350);
    this.lastTouch = {x: x, y: y};
  }

  draw(lastPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }

  update() {
    const lastPoint = {x: this.x, y: this.y}
    this.angle += this.angularVelocity;
    
    this.lastTouch.x += (touch.x - this.lastTouch.x) * 0.05;
    this.lastTouch.y += (touch.y - this.lastTouch.y) * 0.05;
    
    this.x = this.lastTouch.x + Math.cos(this.angle) * this.distanceBetween;
    this.y = this.lastTouch.y + Math.sin(this.angle) * this.distanceBetween;
    this.draw(lastPoint);
  }
}

const playButton = document.getElementById("playButton");
const audio = document.getElementById("myAudio");

playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "||";
    } else {
        audio.pause();
        playButton.textContent = "▷";
    }
});

window.addEventListener("touchmove", event => {
  touch.x = event.touches[0].clientX;
  touch.y = event.touches[0].clientY;
  //console.log(touch.x, touch.y);
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBall(number){
  const balls = [];
  for(let i = 0; i < number; i++){
    let color = colorArray[Math.floor(Math.random() * colorArray.length)];
    let radius = getRandomInt(10, 20);
    let angle = Math.random() * Math.PI * 2;
    let ball = new Create_ball(canvas.width/2, canvas.height/2, radius, color, angle, 0.05)
    balls.push(ball);
  }
  return balls;
}

const balls = generateBall(80);

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255, 255, 255, 0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => ball.update());
}

animate();