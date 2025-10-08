const imageInput = document.getElementById("imageInput");
const newImageInput = document.getElementById("newImageInput");
const startScreen = document.getElementById("startScreen");
const appScreen = document.getElementById("appScreen");
const overlayImage = document.getElementById("overlayImage");
const video = document.getElementById("video");
const opacityRange = document.getElementById("opacityRange");
const rotateButton = document.getElementById("rotateButton");
const newImageButton = document.getElementById("newImageButton");

let rotationDegree = 0;

// Inicia a câmera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" }
      },
      audio: false
    });

    video.srcObject = stream;
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
  } catch (error) {
    alert(`Erro ao acessar a câmera.\n${error.name} - ${error.message}\nVerifique permissões no Safari.`);
    console.error("Erro ao iniciar câmera:", error);
  }
}

// Controla opacidade
opacityRange.addEventListener("input", () => {
  overlayImage.style.opacity = opacityRange.value;
});

// Gira a imagem 90° no sentido horário
rotateButton.addEventListener("click", () => {
  rotationDegree = (rotationDegree + 90) % 360;
  overlayImage.style.transform = `rotate(${rotationDegree}deg)`;
});

// Função genérica para carregar imagem
function carregarImagem(file) {
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
}

// Primeira imagem
imageInput.addEventListener("change", (event) => {
  carregarImagem(event.target.files[0]);
});

// Botão "+" abre seletor de nova imagem
newImageButton.addEventListener("click", () => {
  newImageInput.click();
});

// Quando escolhe nova imagem
newImageInput.addEventListener("change", (event) => {
  carregarImagem(event.target.files[0]);
});
