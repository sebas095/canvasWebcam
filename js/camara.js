(function() {
  if (navigator.getUserMedia || navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia({video: true}, localMediaStream => {
      document.getElementById('video').src = window.URL.createObjectURL(localMediaStream);
    }, err => console.log(err));
  } else {
    alert("No soportado");
  }
})();
