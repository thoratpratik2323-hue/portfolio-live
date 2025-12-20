// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const typingText = document.getElementById('typingText');
const loading = document.getElementById('loading');
const meetModal = document.getElementById('meetModal');
const scheduleCallBtn = document.getElementById('scheduleCall');
const closeMeetModal = document.getElementById('closeMeetModal');
const contactForm = document.getElementById('contactForm');

// Custom Cursor Logic
document.addEventListener('mousemove', (e) => {
    if (cursor && cursorFollower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Small delay for follower
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    }
});

document.addEventListener('mousedown', () => {
    if (cursor) cursor.style.transform = 'scale(0.8)';
    if (cursorFollower) cursorFollower.style.transform = 'scale(0.5)';
});

document.addEventListener('mouseup', () => {
    if (cursor) cursor.style.transform = 'scale(1)';
    if (cursorFollower) cursorFollower.style.transform = 'scale(1)';
});

// Loading Animation
window.addEventListener('load', function () {
    setTimeout(() => {
        if (loading) loading.classList.add('hidden');
        initAnimations();
    }, 1000);
});

// Theme Toggle
themeToggle.addEventListener('click', function () {
    document.body.setAttribute('data-theme',
        document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    );
    themeIcon.className = document.body.getAttribute('data-theme') === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', document.body.getAttribute('data-theme'));
});

// Dynamic Year
document.querySelector('.footer-text').innerHTML = `&copy; ${new Date().getFullYear()} Pratik Thorat. All rights reserved.`;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu
mobileMenuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
        navLinks.classList.remove('active');
    });
});

// Typing Animation
const texts = [
    "Writing clean code...",
    "Debugging reality...",
    "Learning new stacks...",
    "Building cool stuff..."
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return;
    const currentText = texts[textIndex];
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(type, isDeleting ? 50 : 100);
}
type();

// --- PHASE 2 & 3: NEW VISUAL FEATURES ---

// 1. Lenis Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Hacker Text Effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
document.querySelectorAll(".hacker-text").forEach(element => {
    element.onmouseover = event => {
        let iteration = 0;
        clearInterval(event.target.interval);

        event.target.interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return event.target.dataset.value[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= event.target.dataset.value.length) {
                clearInterval(event.target.interval);
            }
            iteration += 1 / 3;
        }, 30);
    };
});

// 3. Magnetic Buttons (GSAP)
if (typeof gsap !== 'undefined') {
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(magnet, {
                duration: 0.3,
                x: x * 0.3, // Magnetic strength
                y: y * 0.3,
                ease: "power2.out"
            });
        });

        magnet.addEventListener('mouseleave', () => {
            gsap.to(magnet, {
                duration: 0.5,
                x: 0,
                y: 0,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// 4. Spotlight Card Effect
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.classList.add('spotlight-card'); // Ensure class exists
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// 5. Three.js 3D Background (Starfield)
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BufferGeometry();
    const isMobile = window.innerWidth < 768;
    const particlesCount = isMobile ? 800 : 2500; // Increased count
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        // Spread particles wider
        posArray[i] = (Math.random() - 0.5) * 25; 
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Vivid cyan/blue color for better visibility against dark background
    const material = new THREE.PointsMaterial({
        size: 0.03, // Increased size
        color: 0x00f3ff, 
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const clock = new THREE.Clock();

    function animateParticles() {
        const elapsedTime = clock.getElapsedTime();
        // Slower, smoother rotation
        particlesMesh.rotation.y = elapsedTime * 0.05;
        
        // Interactive tilt
        particlesMesh.rotation.x += (mouseY * 0.05 - particlesMesh.rotation.x) * 0.1;
        particlesMesh.rotation.y += (mouseX * 0.05) * 0.1;

        renderer.render(scene, camera);
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}

// --- END NEW VISUAL FEATURES ---

// GSAP Standard Animations
function initAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Header
        gsap.from('.profile-container', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
        gsap.from('.name', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.2,
            ease: 'power3.out'
        });

        // Titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8
            });
        });

        // Cards
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1
            });
        });
    }
}

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                gsap.to(card, { scale: 1, opacity: 1, duration: 0.3, display: 'block' });
            } else {
                gsap.to(card, { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => card.style.display = 'none' });
            }
        });
    });
});

// Tilt.js
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card, .profile-container, .saturday-ai-image"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

// Modal Logic
if (scheduleCallBtn) {
    scheduleCallBtn.addEventListener('click', function (e) {
        e.preventDefault();
        meetModal.classList.add('active');
    });
}
if (closeMeetModal) {
    closeMeetModal.addEventListener('click', function () {
        meetModal.classList.remove('active');
    });
}

// Form Validation
function validateForm() {
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    const name = document.getElementById('name').value.trim();
    if (name === '') { document.getElementById('nameError').textContent = 'Name is required'; isValid = false; }
    const email = document.getElementById('email').value.trim();
    if (email === '') { document.getElementById('emailError').textContent = 'Email is required'; isValid = false; }
    const subject = document.getElementById('subject').value.trim();
    if (subject === '') { document.getElementById('subjectError').textContent = 'Subject is required'; isValid = false; }
    const message = document.getElementById('message').value.trim();
    if (message === '') { document.getElementById('messageError').textContent = 'Message is required'; isValid = false; }
    return isValid;
}
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validateForm()) return;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const telegramMessage = `New Message from Portfolio:%0A%0AName: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
        const telegramUrl = `https://t.me/pratik_pt1908?text=${telegramMessage}`;
        const telegramLink = document.getElementById('telegramLink');
        const telegramModal = document.getElementById('telegramModal');
        if (telegramLink && telegramModal) {
            telegramLink.href = telegramUrl;
            showNotification('Message generated! Opening Telegram...', 'success');
            setTimeout(() => {
                telegramModal.classList.add('active');
            }, 1000);
        }
    });
}

// Modal Helpers
window.addEventListener('click', function (e) {
    if (e.target === meetModal) { meetModal.classList.remove('active'); }
    const tModal = document.getElementById('telegramModal');
    if (e.target === tModal) {
        tModal.classList.remove('active');
        contactForm.reset();
    }
});
const closeTModal = document.getElementById('closeTelegramModal');
if (closeTModal) closeTModal.addEventListener('click', function () {
    document.getElementById('telegramModal').classList.remove('active');
    contactForm.reset();
});

// Download Resume
// Resume button is now a direct link, no JS needed.

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        setTimeout(() => notification.classList.remove('show'), 5000);
    }
}
