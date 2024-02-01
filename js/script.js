// Here we can store the divs of the 4 main windows, to cycle through later...
var myWindowIDs = [
  "mydiv",
  "myDIVextra2",
  "myDIVextra3",
  "myDIVextra4",
  "myDIVextra5",
  "myDIVextra6",
  "myDIVextra7",
  "myDIVextra8",
  "myDIVextra12",
  "myDIVextra13",
  "myDIVextra14",
  "myDIVextra15",
];

// One function for all the window toggles
// you just need to pass in which ID to handle...
function toggleMe(id) {
  var x = document.getElementById(id);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// ____________________________________________

// Live Time
function showTime() {
  let date = new Date();
  let hours = date.getHours(); //0-23
  let minutes = date.getMinutes(); //0 - 59
  let seconds = date.getSeconds(); //0-59

  let formatHours = convertFormat(hours);

  hours = checkTime(hours);

  hours = addZero(hours);
  minutes = addZero(minutes);
  seconds = addZero(seconds);

  document.getElementById(
    "clock"
  ).innerHTML = `${hours}:${minutes}:${seconds} ${formatHours}`;
}

function convertFormat(time) {
  console.log(time);
  let format = "AM";
  if (time >= 12) {
    format = "PM";
  }
  return format;
}

function checkTime(time) {
  if (time > 12) {
    time = time - 12;
  }
  if (time === 0) {
    time = 12;
  }
  return time;
}

function addZero(time) {
  if (time < 10) {
    time = "0" + time;
  }
  return time;
}

showTime();
setInterval(showTime, 1000);

// ____________________________________________

// Window Drag n dop
dragElement(document.getElementById("mydiv"));

// Drag n drop Element 2
dragElement(document.getElementById("mydiv2"));

// Drag n drop Element 3
dragElement(document.getElementById("mydiv3"));

// Drag n drop Element 4
dragElement(document.getElementById("mydiv4"));

// Drag n drop Element 5
dragElement(document.getElementById("mydiv5"));

// Drag n drop Element 6
dragElement(document.getElementById("mydiv6"));

// Drag n drop Element 7
dragElement(document.getElementById("mydiv7"));

// Drag n drop Element 8
dragElement(document.getElementById("mydiv8"));

// Drag n drop Element 12
dragElement(document.getElementById("mydiv12"));

// Drag n drop Element 13
dragElement(document.getElementById("mydiv13"));

// Drag n drop Element 14
dragElement(document.getElementById("mydiv14"));

// Drag n drop Element 15
dragElement(document.getElementById("mydiv15"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  // Überprüfe, ob das Element ein Header hat, an dem gezogen werden kann
  if (document.getElementById(elmnt.id + "header")) {
    // Mausklick- und Touch-Events hinzufügen
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    document.getElementById(elmnt.id + "header").ontouchstart = dragTouchStart;
  } else {
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragTouchStart;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault(); // Verhindert Standardaktionen (wie das Verschieben eines Bilds in einigen Browsern)

    pos3 = e.clientX;
    pos4 = e.clientY;

    startDragging();
  }

  function dragTouchStart(e) {
    e = e || window.event;
    e.preventDefault();

    // Berühreigenschaften lesen
    var touch = e.touches[0];
    pos3 = touch.clientX;
    pos4 = touch.clientY;

    startDragging();
  }

  function startDragging() {
    // Z-Index zurücksetzen
    myWindowIDs.forEach((id) => {
      document.querySelector(`#${id}`).style.zIndex = "0";
    });

    elmnt.parentElement.style.zIndex = "99";
    elmnt.style.zIndex = "99";

    // Events für Mausbewegung und Mausfreigabe hinzufügen
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    // Events für Touchbewegung und Touchfreigabe hinzufügen
    document.ontouchend = closeDragElement;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // Touch-Eigenschaften lesen
    if (e.touches && e.touches.length > 0) {
      var touch = e.touches[0];
      pos1 = pos3 - touch.clientX;
      pos2 = pos4 - touch.clientY;
      pos3 = touch.clientX;
      pos4 = touch.clientY;
    } else {
      // Maus-Eigenschaften lesen
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeElement() {
    // Hier füge den Code hinzu, um das Element zu schließen
    // Beispiel: mydiv.style.display = "none";
  }

  function closeDragElement() {
    // Events für Mausbewegung, Mausfreigabe, Touchbewegung und Touchfreigabe entfernen
    document.onmouseup = null;
    document.onmousemove = null;
    document.removeEventListener("touchend", closeDragElement); // Hinzugefügt
    document.removeEventListener("touchmove", elementDrag); // Hinzugefügt
  }
}
// ____________________________________________

// Play Song
// var aud = document.getElementById("ASong").children[0];
// var isPlaying = false;
// aud.pause();

// function playPause() {
//   if (isPlaying) {
//     aud.pause();
//   } else {
//     aud.play();
//   }
//   isPlaying = !isPlaying;
// }

// ____________________________________________

//Playmusic at bottom
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audio");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const progressBar = document.getElementById("progress-bar");

  playPauseBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = "Pause";
    } else {
      audio.pause();
      playPauseBtn.textContent = "Play";
    }
  });

  audio.addEventListener("timeupdate", function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
  });
});
