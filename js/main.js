(function() {
  const camara = new Camara('video', 'canvas', () => {
    const downloadBtn = document.getElementById('snap');

    downloadBtn.addEventListener('click', () => {
      const imageURL = camara.canvas.toDataURL('image/png');
      const link = document.getElementById('download-link');

      link.href = imageURL;
      link.download = "photo.png";
      link.click();
    });
  });
})();
