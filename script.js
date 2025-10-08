const imageInput = document.getElementById("imageInput");
const startScreen = document.getElementById("startScreen");
const appScreen = document.getElementById("appScreen");
const overlayImage = document.getElementById("overlayImage");
const video = document.getElementById("video");
const opacityRange = document.getElementById("opacityRange");
const rotateButton = document.getElementById("rotateButton");

let rotationDegree = 0;

// Função para iniciar a câmera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" }
      },
      audio: false
    });

    video.srcObject = stream;

    // Assegurar que o vídeo funcione bem no iOS Safari
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
  } catch (error) {
    alert(`Erro ao acessar a câmera.\n${error.name} - ${error.message}\nVerifique permissões no Safari.`);
    console.error("Erro ao iniciar câmera:", error);
  }
}

// Função para alterar a opacidade da imagem
opacityRange.addEventListener("input", () => {
  overlayImage.style.opacity = opacityRange.value;
});

// Função para girar a imagem
rotateButton.addEventListener("click", () => {
  rotationDegree = (rotationDegree + 90) % 360; // Gira a imagem em 90 graus
  overlayImage.style.transform = `rotate(${rotationDegree}deg)`;
});

// Função para carregar a imagem sobreposta e iniciar a câmera
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    overlayImage.src = reader.result;

    overlayImage.onload = () => {
      // Ajusta o fluxo para garantir que os controles fiquem visíveis
      startScreen.style.display = "none"; // Tela de início escondida
      appScreen.style.display = "block"; // Tela do aplicativo visível
      startCamera(); // Inicia a câmera
    };
  };
  reader.readAsDataURL(file);
});
