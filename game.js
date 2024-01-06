const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bird = new Image();
bird.src = "uttp_officer.png";

const gravity = 0.5;
let birdY = canvas.height / 2;
let velocity = 0;
const jump = -10;

const pipes = [];
const pipeWidth = 50;
const pipeGap = 200;
const pipeDistance = 200;
let pipeX = canvas.width;

function generatePipes() {
  const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap * 2)) + pipeGap;
  pipes.push({
    x: pipeX,
    y: 0,
    height: pipeHeight
  });
  pipes.push({
    x: pipeX,
    y: pipeHeight + pipeGap,
    height: canvas.height - pipeHeight - pipeGap
  });
}

function drawPipes() {
  for (let i = 0; i < pipes.length; i++) {
    ctx.fillStyle = "#008000";
    ctx.fillRect(pipes[i].x, pipes[i].y, pipeWidth, pipes[i].height);
  }
}

function movePipes() {
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 1;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bird, 50, birdY, 50, 50);

  velocity += gravity;
  birdY += velocity;

  if (birdY + 50 >= canvas.height || birdY <= 0) {
    location.reload();
  }

  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - pipeDistance) {
    generatePipes();
  }

  movePipes();
  drawPipes();
  detectCollision();

  requestAnimationFrame(draw);
}

function detectCollision() {
  for (let i = 0; i < pipes.length; i++) {
    if (
      birdY < pipes[i].height &&
      birdY + 50 > pipes[i].y &&
      50 > pipes[i].x &&
      50 < pipes[i].x + pipeWidth
    ) {
      location.reload();
    }
  }
}

document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    velocity = jump;
  }
});

bird.onload = draw;
