export default class Player {
  rightPressed = false;
  leftPressed = false;

  constructor(canvas, velocity) {
    this.canvas = canvas;
    this.velocity = velocity;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 50;
    this.height = 48;
    this.image = new Image();
    this.image.src = 'images/player.png';

    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
  }

  draw(ctx) {
    this.move();
    this.collideWithWalls();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collideWithWalls() {
    //left
    if (this.x < -18) {
      this.x = this.canvas.width - 40;
    } //right
    if (this.x > this.canvas.width - this.width + 18) {
      this.x = -15;
    }
  }

  move() {
    if (this.rightPressed) {
      console.log(this.x);
      this.x += this.velocity;
    } else if (this.leftPressed) {
      console.log(this.x);
      this.x += -this.velocity;
    }
  }

  keydown = (event) => {
    if (event.code == 'ArrowRight') {
      this.rightPressed = true;
    }
    if (event.code == 'ArrowLeft') {
      this.leftPressed = true;
    }
  };

  keyup = (event) => {
    if (event.code == 'ArrowRight') {
      this.rightPressed = false;
    }
    if (event.code == 'ArrowLeft') {
      this.leftPressed = false;
    }
  };
}
