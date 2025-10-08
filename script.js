const imageInput = document.getElementById("imageInput");
const startScreen = document.getElementById("startScreen");
const appScreen = document.getElementById("appScreen");
const overlayImage = document.getElementById("overlayImage");
const video = document.getElementById("video");

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
