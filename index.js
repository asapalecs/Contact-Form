// =================================================================== Afisarea salutului
function displayGreeting() {
  var numeInput = document.getElementById("numeInput");
  var name = numeInput.value.trim();
  var varstaInput = document.getElementById("varstaInput");
  var birthDate = new Date(varstaInput.value);
  var now = new Date();
  var age = now.getFullYear() - birthDate.getFullYear();
  var sentence = document.getElementById("greeting");
  var location = document.getElementById("locationSelect").value;
  var preference =
    document.querySelector('input[name="preference"]:checked')?.value || "";
  var result = document.getElementById("result");

  // Ajustarea varstei daca luna curenta este inainte de luna nasterii
  if (now.getMonth() < birthDate.getMonth()) {
    age--;
  }
  // Ajustarea varstei daca luna curenta este luna nasterii, dar ziua curenta este inainte de ziua nasterii
  else if (
    now.getMonth() === birthDate.getMonth() &&
    now.getDate() < birthDate.getDate()
  ) {
    age--;
  }

  if (name === "") {
    sentence.textContent = "Te rog completeaza numele";
    sentence.style.color = "red";
  } else if (isNaN(birthDate.getTime())) {
    sentence.textContent = "Te rog completeaza varsta.";
    sentence.style.color = "red";
  } else if (age < 0) {
    sentence.textContent = "Salut " + name + ". Inca nu te-ai nascut, bro :)))";
    sentence.style.color = "red";
  } else {
    sentence.textContent =
      "Salut " + name + "!" + " Se pare ca ai " + age + " ani.";
    sentence.style.color = "black";
  }

  var textContent = ""; // Variable to store the text content
  var htmlContent = ""; // Variable to store the HTML content
  const imageStyle =
    "display: block; margin: 0 auto; max-width: 200px; margin-top: 20px; border-radius:10px"; // Center the images and set their max-width to 200px

  if (location === "") {
    sentence.textContent += ", localitatea";
    sentence.style.color = "red";
  } else {
    textContent += "Esti din " + location + "? Ce tare.";
  }

  if (preference === "like") {
    textContent +=
      " Și, cum ai bifat că-ți plac pisicile, iată o poză cu o pisică:";
    // Fetch a random cat image from the Cat API
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data[0].url;
        htmlContent += `<img src="${imageUrl}" alt="Pisică" style="${imageStyle}">`;
        result.innerHTML = textContent + htmlContent;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    textContent +=
      " Nu-ți plac pisicile? Stai liniștit, nici mie, iată o poză cu un câine:";
    // Fetch a random dog image from the Dog API
    fetch("https://api.thedogapi.com/v1/images/search")
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data[0].url;
        htmlContent += `<img src="${imageUrl}" alt="Câine" style="${imageStyle}">`;
        result.innerHTML = textContent + htmlContent;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

window.addEventListener("DOMContentLoaded", function () {
  var submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", displayGreeting);
});

// =================================================================== Ceasul
function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Formatarea timpului
  var timeString =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  // Actualizarea elementului cu ceasul
  var clock = document.getElementById("clock");
  clock.textContent = timeString;
}

// Actualizarea timpului imediat
updateTime();

// Actualizarea timpului la fiecare secunda
setInterval(updateTime, 1000);