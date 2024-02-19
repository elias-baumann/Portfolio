var video = document.getElementById("fullscreenVideo");

function togglePlayPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
