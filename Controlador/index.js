import getAll from "./fetch.js";

document.getElementById("sendBtn").addEventListener("click", sendMessage);
document
  .getElementById("translateTextBtn")
  .addEventListener("click", translateText);

let enfermedades = await getAll();

console.log(enfermedades);

export function sendMessage() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  const messagesContainer = document.getElementById("messages");

  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = text;
  messagesContainer.appendChild(userMessage);

  const botMessage = document.createElement("div");
  botMessage.className = "message bot";
  if (getDescIllness(text)) {
    botMessage.textContent = getDescIllness(text);
  } else {
    botMessage.textContent = "Procesando...";
  }
  messagesContainer.appendChild(botMessage);

  // Mostrar alerta si se detecta "hematuria"
  if (text.toLowerCase().includes("hematuria")) {
    showAlert();
  }

  input.value = "";
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

document.getElementById("recordMovementBtn").addEventListener("click", () => {
  startCountdownAndCapture();
});

function startCountdownAndCapture() {
  const countdownTime = 2; // segundos
  let currentTime = countdownTime;

  // Crear cronómetro
  const countdown = document.createElement("div");
  countdown.id = "countdown";
  countdown.textContent = formatTime(currentTime);
  Object.assign(countdown.style, {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: "8px 16px",
    fontSize: "20px",
    borderRadius: "8px",
    zIndex: "100",
    fontFamily: "monospace",
  });

  // Insertar el cronómetro dentro del contenedor derecho
  const rightContainer = document.querySelector(".camera");
  rightContainer.style.position = "relative"; // Asegura que la posición absoluta funcione
  rightContainer.appendChild(countdown);

  // Contador regresivo
  const timer = setInterval(() => {
    currentTime -= 1;
    if (currentTime < 0) {
      clearInterval(timer);
      rightContainer.removeChild(countdown);
      captureFrame();
    } else {
      countdown.textContent = formatTime(currentTime);
    }
  }, 1000);
}

function captureFrame() {
  const video = document.getElementById("video");
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 350;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageDataURL = canvas.toDataURL("image/png");
  console.log("Frame capturado:", imageDataURL);
  // Crear imagen para mostrar
  const img = document.createElement("img");
  img.src = imageDataURL;
  img.style.maxWidth = "80vw"; // 80% del ancho de la ventana
  img.style.maxHeight = "80vh"; // 80% de la altura de la ventana
  img.style.border = "5px solid white";
  img.style.borderRadius = "12px";
  img.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
  img.style.position = "fixed";
  img.style.top = "50%";
  img.style.left = "50%";
  img.style.transform = "translate(-50%, -50%)";
  img.style.zIndex = "2000";
  img.style.backgroundColor = "black";

  // Fondo semi-transparente para el modal
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.zIndex = "1999";

  // Añadir overlay e imagen al body
  document.body.appendChild(overlay);
  document.body.appendChild(img);

  // Quitar imagen y overlay después de 2 segundos
  setTimeout(() => {
    document.body.removeChild(img);
    document.body.removeChild(overlay);
  }, 2000);
  const cameraArea = document.getElementById("cameraArea");

  showCustomAlert("¡Movimiento capturado exitosamente!", "success");
}

function showCustomAlert(message, type = "success") {
  const alert = document.getElementById("customAlert");
  alert.textContent = message;
  alert.className = `custom-alert show ${
    type === "error" ? "error" : type === "warning" ? "warning" : ""
  }`;

  setTimeout(() => {
    alert.classList.remove("show");
  }, 3000);
}

export function translateText() {
  const avatar = document.getElementById("avatar");
  const pava = document.getElementById("pava");
  pava.style.display = "none";

  avatar.style.backgroundImage = 'url("../Vista/gitChoking.gif")';
  setTimeout(() => {
    avatar.style.backgroundImage = 'url("../Vista/gifAlz.gif")';
  }, 6000);
  setTimeout(() => {
    avatar.style.backgroundImage = 'url("../Vista/gifMental.gif")';
  }, 4000);
  setTimeout(() => {
    avatar.style.backgroundImage = 'url("../Vista/gifSoreThroat.gif")';
  }, 2000);
}

function showAlert() {
  const alertBox = document.getElementById("alertBox");
  alertBox.style.display = "block";
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 5000); // Ocultar después de 5 segundos
}

function getDescIllness(texto) {
  texto = texto.toLowerCase();

  for (const enfermedad of enfermedades) {
    if (texto.includes(enfermedad.nombre.toLowerCase())) {
      return enfermedad.descripcion;
    }
  }

  return false;
}

const video = document.getElementById("video");

// Solicitar acceso a la cámara
navigator.mediaDevices
  .getUserMedia({
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error("No se pudo acceder a la cámara:", error);
  });
