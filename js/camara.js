class Camara {
  constructor(video_id, canvas_id, callback) {
    if (!this.isBrowserValid()) return;
    else {
      this.video = document.getElementById(video_id);
      this.canvas = document.getElementById(canvas_id);
      this.context = this.canvas.getContext('2d');

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
    this.context.drawImage(this.video, 0, 0);
    requestAnimationFrame(() => this.setCanvas());
  }
}
