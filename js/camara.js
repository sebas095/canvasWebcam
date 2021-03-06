class Camara {
  constructor(video_id, canvas_id, callback) {
    if (!this.isBrowserValid()) return;
    else {
      this.video = document.getElementById(video_id);
      this.canvas = document.getElementById(canvas_id);
      this.context = this.canvas.getContext('2d');
      this.sticker = null;
      this.camaras = [];
      this.deviceId = null;

      navigator.webkitGetUserMedia(this.constraints(), localMediaStream => {
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
    this.sticker = null;
  }

  addSticker(img) {
    this.sticker = img;
    this.draw();
  }

  constraints() {
    if (this.deviceId === null) {
      return {video: true};
    } else {
      return {
        video: {
          optional: [
            {
              sourceId: this.deviceId
            }
          ]
        }
      };
    }
  }

  getCamaras(callback) {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        if (device.kind === 'videoinput') {
          this.camaras.push(device);
        }
      });
      return callback(this.camaras);
    });
  }

  setCamara(deviceId) {
    this.deviceId = deviceId;
  }
}
