// Smart Guest Experience & Greetings
async function initGreetings() {
    const greetingEl = document.getElementById('time-greeting');
    if (!greetingEl) return;

    // 1. Time-based Greeting
    const hour = new Date().getHours();
    let timeGreeting = "नमस्ते";
    if (hour >= 5 && hour < 12) timeGreeting = "शुभ सकाळ";
    else if (hour >= 12 && hour < 17) timeGreeting = "शुभ दुपार";
    else if (hour >= 17 && hour < 21) timeGreeting = "शुभ संध्या";
    else timeGreeting = "शुभ रात्री";

    greetingEl.innerHTML = `<h3>${timeGreeting}</h3>`;
    greetingEl.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', initGreetings);

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
        // Marigold Colors (Orange/Yellow mix)
        const colors = ['255, 165, 0', '255, 215, 0', '255, 69, 0'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.color = `rgba(${randomColor}, 0.7)`;
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

// Akshata Shower Logic
const akshataCanvas = document.getElementById('akshata');
const aCtx = akshataCanvas.getContext('2d');
akshataCanvas.width = window.innerWidth;
akshataCanvas.height = window.innerHeight;

const akshataParticles = [];
let isAkshataActive = false;

class Akshata {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * akshataCanvas.width;
        this.y = -20;
        this.size = Math.random() * 4 + 2;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += 5;
        if (this.y > akshataCanvas.height) this.reset();
    }
    draw() {
        aCtx.save();
        aCtx.translate(this.x, this.y);
        aCtx.rotate(this.rotation * Math.PI / 180);
        aCtx.fillStyle = '#fff9e6'; // Rice color
        aCtx.shadowBlur = 5;
        aCtx.shadowColor = 'gold';
        aCtx.beginPath();
        aCtx.ellipse(0, 0, this.size, this.size / 3, 0, 0, Math.PI * 2);
        aCtx.fill();
        aCtx.restore();
    }
}

function initAkshata() {
    for (let i = 0; i < 100; i++) akshataParticles.push(new Akshata());
}

function animateAkshata() {
    if (!isAkshataActive) return;
    aCtx.clearRect(0, 0, akshataCanvas.width, akshataCanvas.height);
    akshataParticles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateAkshata);
}

const akshataObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            isAkshataActive = true;
            if (akshataParticles.length === 0) initAkshata();
            animateAkshata();
            setTimeout(() => { isAkshataActive = false; }, 5000); // Stop after 5s
        }
    });
}, { threshold: 0.5 });

// Target high-level "Shubh Vivah" mention
const shubhVivahSection = document.querySelector('.main-event');
if (shubhVivahSection) akshataObserver.observe(shubhVivahSection);

let isPlaying = false;
let musicTimeout; // To handle auto-stop
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

function startExperience() {
    const envelope = document.getElementById('envelope');
    const wrapper = document.getElementById('envelope-wrapper');

    // Trigger animation
    envelope.classList.add('opened');

    // Hide wax seal and show shubharambh if needed (or just proceed)
    const seal = document.getElementById('wax-seal');
    if (seal) seal.style.display = 'none';

    // Kalash Entry
    const kalash = document.getElementById('kalash-container');
    if (kalash) {
        kalash.style.display = 'block';
        setTimeout(() => { kalash.style.left = '20px'; }, 100);
    }

    // Music and Voice start after flap opens
    setTimeout(() => {
        // Attempt to play music
        music.play().then(() => {
            isPlaying = true;
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';

            // Voice Welcome
            speakWelcome();

            // Auto-stop after 1 minute (60000ms)
            musicTimeout = setTimeout(() => {
                if (isPlaying) {
                    music.pause();
                    isPlaying = false;
                    musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                    console.log("Music auto-stopped after 1 minute");
                }
            }, 60000);
        }).catch(e => {
            console.log("Autoplay blocked, user must interact manually");
        });

        // Fade out envelope and show content
        wrapper.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => {
            wrapper.style.display = 'none';
            // Auto Scroll Experience
            autoScrollDown();
        }, 1000);
    }, 1500); // Wait for flap animation
}

function autoScrollDown() {
    setTimeout(() => {
        window.scrollBy({
            top: 500,
            behavior: 'smooth'
        });
    }, 1000);
}

function speakWelcome() {
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = "आपलं हार्दिक स्वागत आहे";
        msg.lang = 'mr-IN';
        msg.rate = 0.9;
        msg.pitch = 1.1;
        window.speechSynthesis.speak(msg);
    }
}

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        if (musicTimeout) clearTimeout(musicTimeout); // Cancel auto-stop if user manually pauses
    } else {
        music.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}



// Countdown Timer
function updateTimer() {
    const weddingDate = new Date('2026-02-06T11:54:00').getTime();
    const now = new Date().getTime();
    const gap = weddingDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(gap / day);
    const hours = Math.floor((gap % day) / hour);
    const minutes = Math.floor((gap % hour) / minute);
    const seconds = Math.floor((gap % minute) / second);

    if (gap < 0) {
        document.getElementById('countdown').innerHTML = "<h3>शिभे विवाह संपन्न!</h3>";
    } else {
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }
}
setInterval(updateTimer, 1000);
updateTimer();

// 1. Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('theme-toggle');
    const isDark = document.body.classList.contains('dark-mode');

    // Change Icon
    btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    // Optional: Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Check Saved Theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
}

// 2. Wishes Function
function sendWish() {
    const text = document.getElementById('wish-text').value;
    if (text.trim() === "") {
        alert("कृपया काहीतरी लिहा!");
        return;
    }
    const message = encodeURIComponent(`शुभेच्छा: ${text}`);
    window.open(`https://wa.me/919370433392?text=${message}`, '_blank');
}

// 3. Reveal on Scroll (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
});

// 4. Gesture Based Controls (Swipe)
let touchstartX = 0;
let touchendX = 0;

function checkDirection() {
    const threshold = 100;
    if (touchendX < touchstartX - threshold) {
        // Swipe Left -> Gallery
        document.querySelector('.gallery').scrollIntoView({ behavior: 'smooth' });
    }
    if (touchendX > touchstartX + threshold) {
        // Swipe Right -> Events
        document.querySelector('.events').scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
});

// 5. Return Gift Reveal
function revealGift() {
    const img = document.getElementById('gift-img');
    const overlay = document.getElementById('gift-overlay');
    const status = document.getElementById('gift-status');

    if (img) img.style.filter = 'none';
    if (overlay) overlay.style.opacity = '0';
    setTimeout(() => {
        if (overlay) overlay.style.display = 'none';
        if (status) status.style.display = 'block';
    }, 1000);
}

// 6. Ganesh Camera Modal
let stream = null;
async function openGaneshCamera() {
    const modal = document.getElementById('camera-modal');
    const video = document.getElementById('webcam');
    modal.style.display = 'block';

    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        video.srcObject = stream;
    } catch (err) {
        alert("Camera access denied or not available");
        modal.style.display = 'none';
    }
}

function closeGaneshCamera() {
    const modal = document.getElementById('camera-modal');
    const video = document.getElementById('webcam');
    modal.style.display = 'none';
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}
