// Guest Name Logic
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get('guest');
    const guestBox = document.getElementById('guest-welcome');

    if (guestName) {
        // Replace underscores with spaces for cleaner names
        const cleanName = guestName.replace(/_/g, ' ');
        guestBox.innerHTML = `<h3>सहर्ष स्वागत, ${cleanName}</h3>`;
        guestBox.style.display = 'block';
    }
});

// Petal Animation
const canvas = document.getElementById('petals');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const petals = [];
const petalImage = new Image();
// Using a SVG path or placeholder logic for drawing petals to avoid loading external images
// We will draw simple shapes instead of images for reliability

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.spin = Math.random() * 2 - 1;
        this.color = `rgba(255, ${Math.floor(Math.random() * 100) + 100}, 100, 0.6)`; // Red/Pink shades
    }

    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) + this.speedX * 0.5;
        this.rotation += this.spin;

        if (this.y > canvas.height) {
            this.y = -20;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;

        // Draw simple petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

for (let i = 0; i < 50; i++) {
    petals.push(new Petal());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    requestAnimationFrame(animate);
}

animate();

// Music Toggle
let isPlaying = false;
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

function startExperience() {
    document.getElementById('start-overlay').style.animation = 'fadeOut 1s forwards';
    setTimeout(() => {
        document.getElementById('start-overlay').style.display = 'none';
    }, 1000);

    // Attempt to play music
    music.currentTime = 28; // Skip intro (Saregama)
    music.play().then(() => {
        isPlaying = true;
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(e => {
        console.log("Autoplay blocked, user must interact manually");
    });
}

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        music.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Add CSS for fadeOut
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOut {
    to { opacity: 0; visibility: hidden; }
}
`;
document.head.appendChild(style);
