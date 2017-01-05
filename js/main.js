(function() {
  const camara = new Camara('video', 'canvas', () => {
    const snap = document.getElementById('snap');
    const downloadBtn = document.getElementById('download');
    const cancelBtn = document.getElementById('cancel');
    const stickers = document.getElementById('sticker');

    document.querySelectorAll('.sticker').forEach((item) => {
      item.addEventListener('click', addSticker);
    });

    snap.addEventListener('click', (ev) => {
      ev.preventDefault();
      camara.snap();
      document.getElementById('actions').style.display = 'block';
    });

    downloadBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const imageURL = camara.canvas.toDataURL('image/png');
      const link = document.getElementById('download-link');

      link.href = imageURL;
      link.download = "photo.png";
      link.click();
    });

    cancelBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      camara.unSnap();
      document.getElementById('actions').style.display = 'none';
    });

    stickers.addEventListener('click', (ev) => {
      ev.preventDefault();
      document.getElementById('stickers').style.display = 'block';
    });

    function addSticker() {
      camara.addSticker(this);
      document.getElementById('stickers').style.display = 'none';
    }
  });
})();
