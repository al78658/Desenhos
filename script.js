const imageInput = document.getElementById("imageInput");
const startScreen = document.getElementById("startScreen");
const appScreen = document.getElementById("appScreen");
const overlayImage = document.getElementById("overlayImage");
const video = document.getElementById("video");
const rotateButton = document.getElementById("rotateButton");
const opacitySlider = document.getElementById("opacitySlider");
const opacityValue = document.getElementById("opacityValue");

let rotationDegree = 0; // Rotações acumuladas

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" }
      },
      audio: false
    });

    video.srcObject = stream;

    // Assegurar que vídeo funciona bem no iOS Safari
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
  } catch (error) {
    alert(`Erro ao acessar a câmera.\n${error.name} - ${error.message}\nVerifique permissões no Safari.`);
    console.error("Erro ao iniciar câmera:", error);
  }
}

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    overlayImage.src = reader.result;

    overlayImage.onload = () => {
      startScreen.style.display = "none";
      appScreen.style.display = "block";
      startCamera();
    };
  };
  reader.readAsDataURL(file);
});

// Função para girar a imagem
rotateButton.addEventListener("click", () => {
  rotationDegree -= 90; // Gira 90 graus para a esquerda
  overlayImage.style.transform = `rotate(${rotationDegree}deg)`;
});

// Atualiza a transparência da imagem
opacitySlider.addEventListener("input", (event) => {
  const opacity = event.target.value / 100;
  overlayImage.style.opacity = opacity;
  opacityValue.textContent = `${event.target.value}%`;
});
