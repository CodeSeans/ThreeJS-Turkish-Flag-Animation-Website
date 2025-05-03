// Bayrak Animasyonu yapım aşamaları
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Işık
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1);
scene.add(light);

// Bayrak geometrisi
const geometry = new THREE.PlaneGeometry(4, 2.5, 20, 10);
const loader = new THREE.TextureLoader();
const texture = loader.load('flag.webp');

const material = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.DoubleSide,
  transparent: true,
});

const flag = new THREE.Mesh(geometry, material);
scene.add(flag);
flag.position.y = 3.5;
flag.position.x = -5.7;

// Dalga animasyonu
const clock = new THREE.Clock();

const amplitude = 0.130;


let lastTime = 0;
const interval = 1000 / 30; // 30 FPS hedef

function animate(now) {
  requestAnimationFrame(animate);

  if (now - lastTime < interval) return;
  lastTime = now;

  const time = clock.getElapsedTime();
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const wave = Math.sin(x * 5 + time * 5) * amplitude;
    position.setZ(i, wave);
  }

  position.needsUpdate = true;
  renderer.render(scene, camera);
}

const bg = new THREE.TextureLoader();
bg.load('baskent.webp', (texture) => {
  texture.minFilter = THREE.LinearFilter;     // Performans dostu filtre
  texture.generateMipmaps = false;            // Mipmap kapalı = daha az GPU yükü
  texture.colorSpace = THREE.SRGBColorSpace;      
  scene.background = texture;
});

animate();

// Saygıda kusur bırakmama alanı

const btn = document.getElementById('respect-btn');
const videoContainer = document.getElementById('video-container');
const video = document.getElementById('respect-video');

btn.addEventListener('click', () => {
  videoContainer.style.display = 'block';
  video.play();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    video.pause();
    videoContainer.style.display = 'none';
  }
});