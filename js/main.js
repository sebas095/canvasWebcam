(function() {
  const camara = new Camara('video', 'canvas', () => {
    const snap = document.getElementById('snap');
    const downloadBtn = document.getElementById('download');
    const cancelBtn = document.getElementById('cancel');
    const stickers = document.getElementById('sticker');

    snap.addEventListener('click', () => {
      camara.snap();
      document.getElementById('actions').style.display = 'block';
    });

    downloadBtn.addEventListener('click', () => {
      const imageURL = camara.canvas.toDataURL('image/png');
      const link = document.getElementById('download-link');

      link.href = imageURL;
      link.download = "photo.png";
      link.click();
    });

    cancelBtn.addEventListener('click', () => {
      camara.unSnap();
      document.getElementById('actions').style.display = 'none';
    })
  });
})();
