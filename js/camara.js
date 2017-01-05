class Camara {
  constructor(video_id, canvas_id, callback) {
    if (!this.isBrowserValid()) return;
    else {
      this.video = document.getElementById(video_id);
      this.canvas = document.getElementById(canvas_id);
      this.context = this.canvas.getContext('2d');
      this.sticker = null;

      navigator.webkitGetUserMedia({video: true}, localMediaStream => {
        this.setVideo(localMediaStream);
        this.setCanvas();
        callback();
      }, (err) => {
        console.log(err);
      });

    }
  }

  isBrowserValid() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia);
  }

  setVideo(localMediaStream) {
    this.video.src = window.URL.createObjectURL(localMediaStream);
  }

  setCanvas() {
    this.video.addEventListener('play', (ev) => this.loop());
  }

  loop() {
    if (this.video.paused || this.video.ended) return;
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  draw() {
    this.context.drawImage(this.video, 0, 0);
    if (this.sticker !== null)
      this.context.drawImage(this.sticker, 20, 20, 90, 90);
  }

  snap() {
    this.video.pause();
  }

  unSnap() {
    this.video.play();
  }

  addSticker(img) {
    this.sticker = img;
    this.draw();
  }
}
