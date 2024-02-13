class Confetti {
    constructor(x, y, s) { // setting parameters for the confetti
      this.x = x;
      this.y = y;
      this.speed = s;
      this.time = random(0, 100);
      this.color = random(confettiColor); // declared before preload
      this.amp = random(2, 30); // amplitude and phase to distribute using polar coordinates
      this.phase = random(0.5, 2);
      this.size = random(width / 25, height / 50);
      this.form = round(random(0, 1)); // alternates between squared and circled shapes
    }
  
    displayConfetti() { // draws the confetti when win
      push();
      translate(this.x, this.y);
      translate(this.amp * sin(this.time * this.phase), this.speed * cos(2 * this.time * this.phase));
      rotate(this.time);
      rectMode(CENTER);
      scale(cos(this.time / 4), sin(this.time / 4));
      fill(this.color);
      noStroke();
      if (this.form === 0) {
        rect(0, 0, this.size, this.size / 2);
      } else {
        ellipse(0, 0, this.size);
      }
      pop();
      
      // gives each confetti a different speed
      this.time = this.time + 0.1;
      this.speed += 1;
      this.y += this.speed;
    }
  }