function sendMessage() {
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
    botMessage.textContent = 'Procesando...';
    messagesContainer.appendChild(botMessage);

    // Mostrar alerta si se detecta "hematuria"
    if (text.toLowerCase().includes("hematuria")) {
      showAlert();
    }

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function recordMovement() {
    const cameraStatus = document.getElementById('cameraStatus');
    cameraStatus.style.display = 'block';
  }

  function translateText() {
    alert("Función de traducción de texto aún no implementada.");
  }

  function showAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'block';
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 5000); // Ocultar después de 5 segundos
  }