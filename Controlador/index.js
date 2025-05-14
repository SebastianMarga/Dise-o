import getAll from "./fetch.js";

document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('recordMovementBtn').addEventListener('click', recordMovement);
document.getElementById('translateTextBtn').addEventListener('click', translateText);

let enfermedades = await getAll();

console.log(enfermedades);


export function sendMessage() {
    const input = document.getElementById('input');
    const text = input.value.trim();
    if (!text) return;

    const messagesContainer = document.getElementById('messages');

    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = text;
    messagesContainer.appendChild(userMessage);

    const botMessage = document.createElement('div');
    botMessage.className = 'message bot';
    if (getDescIllness(text)) {
        botMessage.textContent = getDescIllness(text);
    } else {
        botMessage.textContent = 'Procesando...';
    }
    messagesContainer.appendChild(botMessage);

    // Mostrar alerta si se detecta "hematuria"
    if (text.toLowerCase().includes("hematuria")) {
        showAlert();
    }

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function recordMovement() {
    const cameraStatus = document.getElementById('cameraStatus');
    cameraStatus.style.display = 'block';

    setTimeout(() => {
        cameraStatus.style.display = 'none';
        
        const messagesContainer = document.getElementById('messages');
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.textContent = '(Traduciendo lenguaje de señas...)';
        messagesContainer.appendChild(botMessage);

    }, 5000)

    setTimeout(() => {    
        const messagesContainer = document.getElementById('messages');
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.textContent = 'El problema que tienes se puede deber a distintas causas como...';
        messagesContainer.appendChild(botMessage);

    }, 7000)

}

export function translateText() {

    const avatar = document.getElementById("avatar");
    const pava = document.getElementById('pava');
    pava.style.display = 'none'

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
    const alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
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


const video = document.getElementById('video');

// Solicitar acceso a la cámara
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error("No se pudo acceder a la cámara:", error);
        alert("Error al acceder a la cámara. Verifica permisos.");
    });