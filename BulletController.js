import Bullet from './Bullet.js';

export default class BulletController {
  bullets = [];
  timeUntilNextBulletAllowed = 0;

  constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;

    this.shootSound = new Audio('sounds/shoot.wav');
    this.shootSound.volume = 0.08;
  }
  draw(ctx) {
    console.log(this.bullets.length);
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );
    this.bullets.forEach((bullet) => bullet.draw(ctx));
    if (this.timeUntilNextBulletAllowed > 0) {
      this.timeUntilNextBulletAllowed--;
    }
  }

  shoot(x, y, velocity, timeUntilNextBulletAllowed = 0) {
    if (
      this.timeUntilNextBulletAllowed <= 0 &&
      this.bullets.length < this.maxBulletsAtATime
    ) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      if (this.soundEnabled) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.timeUntilNextBulletAllowed = timeUntilNextBulletAllowed;
    }
  }
}
