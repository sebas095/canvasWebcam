(function() {
  if (navigator.getUserMedia || navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia({video: true}, localMediaStream => {
      const video = document.getElementById('video');
      video.src = window.URL.createObjectURL(localMediaStream);

      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      const downloadBtn = document.getElementById('snap');

      setInterval(() => {
        context.drawImage(this.video, 0, 0);
      }, 1000 / 30);

      downloadBtn.addEventListener('click', () => {
        const imageURL = canvas.toDataURL('image/png');
        const link = document.getElementById('download-link');

        link.href = imageURL;
        link.download = "photo.png";
        link.click();
      });
    }, err => console.log(err));
  } else {
    alert("No soportado");
  }
})();
