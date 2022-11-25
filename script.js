const NOTES = {
  F2: ["q", "white"],
  Gb2: ["2", "black"],
  G2: ["w", "white"],
  Ab2: ["3", "black"],
  A2: ["e", "white"],
  Bb2: ["4", "black"],
  B2: ["r", "white"],
  C3: ["t", "white"],
  Db3: ["6", "black"],
  D3: ["y", "white"],
  Eb3: ["7", "black"],
  E3: ["u", "white"],
  F3: ["i", "white"],
  Gb3: ["9", "black"],
  G3: ["o", "white"],
  Ab3: ["0", "black"],
  A3: ["p", "white"],
  Bb3: ["-", "black"],
  B3: ["[", "white"],
  C4: ["]", "white"],
  Db4: ["Backspace", "black"],
  D4: ["\\", "white"],
  Eb4: ["Insert", "black"],
  E4: ["Delete", "white"],
};
const KEYS = Object.keys(NOTES); //array of keys of object NOTES
const keyboardKeysArray = new Array();
const displayBox = document.querySelector(".display-box");

KEYS.forEach((key) => {
  const note = NOTES[key];
  //add new HTML elements and attributes
  //Sample Output: <div class="key white" data-note="C3"></div>
  const div = document.createElement("div");
  div.classList = "key " + note[1];
  div.setAttribute("data-note", key);
  document.querySelector(".piano").append(div);

  //Sample Output: <audio id="C3" src="notes/C3.mp3" ></audio>;
  const audio = document.createElement("audio");
  audio.id = key;
  audio.src = `notes/${key}.mp3`;
  document.body.append(audio);

  keyboardKeysArray.push(note[0]);
});

/* Play audio by KeyboardEvent
Target: for every keydown, two results must be executed:
1) Play the note audio
2) animate div element of the note */
document.addEventListener("keydown", (k) => {
  if (k.repeat) return; //prevents long press bug
  console.log(k);
  const index = keyboardKeysArray.indexOf(k.key);
  if (index == -1) return; //prevents error in console, index -1 means not found in array
  playAudio(index);
  let divElement = document.querySelector(`[data-note="${KEYS[index]}"]`);
  divElement.classList.add("active");

  document.addEventListener("keyup", () => {
    divElement.classList.remove("active");
  });

  displayBox.innerHTML = KEYS[index];
});

//Play Audio function
function playAudio(index) {
  let audioElement = document.getElementById(KEYS[index]);
  audioElement.currentTime = 0;
  audioElement.play();
}

//For playing audio by mouse click Event
const pianoKeys = document.querySelectorAll(".key"); //array of all div with class "key"
pianoKeys.forEach((key) => {
  key.addEventListener("click", () => {
    const x = key.getAttribute("data-note");
    playAudio(KEYS.indexOf(x));
    displayBox.innerHTML = x;
  });
});

//For Keyboard mapping feature:
const checkBoxMapping = document.getElementById("keyboard-map");
checkBoxMapping.addEventListener("click", () => {
  pianoKeys.forEach((key) => {
    notesCheckBox.checked = false;
    key.innerHTML = null;
    if (checkBoxMapping.checked) {
      const i = key.getAttribute("data-note");
      key.innerHTML = `<p>${keyboardKeysArray[KEYS.indexOf(i)]}</p>`;
    }
  });
});
//For Notes feature
const notesCheckBox = document.getElementById("see-notes");
notesCheckBox.addEventListener("click", () => {
  pianoKeys.forEach((key) => {
    checkBoxMapping.checked = false;
    key.innerHTML = null;
    if (notesCheckBox.checked) {
      const j = key.getAttribute("data-note");
      key.innerHTML = `<p>${j}</p>`;
    }
  });
});

//For Mute audio feature
const audioElements = document.querySelectorAll("audio");
const muteCheckBox = document.getElementById("mute-audio");
muteCheckBox.addEventListener("click", () => {
  audioElements.forEach((element) => {
    if (element.muted) return (element.muted = false);
    element.muted = true;
  });
});

//Sidebar Functions
function openSideBar() {
  document.getElementById("sidebar").style.width = "400px";
  document.getElementById("main").style.marginLeft = "400px";
}
function closeSideBar() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

//LoginForm Functions
function openLoginForm() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("piano").style.opacity = "30%";
}
function closeLoginForm() {
  document.getElementById("login-form").style.display = "none";
}
