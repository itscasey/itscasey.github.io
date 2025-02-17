let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    this.paper = paper;
    document.addEventListener('mousemove', (e) => this.handleMove(e.clientX, e.clientY));
    paper.addEventListener('mousedown', (e) => this.handleStart(e.clientX, e.clientY));
    window.addEventListener('mouseup', () => this.handleEnd());

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      this.handleMove(touch.clientX, touch.clientY);
      e.preventDefault();
    });
    paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.handleStart(touch.clientX, touch.clientY);
      e.preventDefault();
    });
    window.addEventListener('touchend', () => this.handleEnd());
  }

  handleMove(clientX, clientY) {
    if (this.holdingPaper) {
      this.mouseX = clientX;
      this.mouseY = clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      this.updatePaperTransform();
    }
  }

  handleStart(clientX, clientY) {
    this.holdingPaper = true;
    this.mouseTouchX = clientX;
    this.mouseTouchY = clientY;
    this.prevMouseX = clientX;
    this.prevMouseY = clientY;
    this.paper.style.zIndex = highestZ;
    highestZ += 1;
  }

  handleEnd() {
    this.holdingPaper = false;
  }

  updatePaperTransform() {
    this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});

const playMusic = () => {
  const backgroundMusic = document.getElementById('backgroundMusic');
  backgroundMusic.play().catch(error => {
    console.log("Music autoplay blocked. User interaction needed.");
  });
};

window.addEventListener('click', playMusic, { once: true });
window.addEventListener('touchstart', playMusic, { once: true });