// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const typingText = document.getElementById('typingText');
const loading = document.getElementById('loading');


// Custom Precision Reticle Cursor Logic
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

// Touch device or mobile check to prevent performance drop and visual bugs
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;

if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
    });

    // Smooth lerp animation for the follower target reticle
    function animateCursor() {
        // Lerp logic for smooth tracking
        const ease = 0.12;
        followerX += (mouseX - followerX) * ease;
        followerY += (mouseY - followerY) * ease;
        
        if (cursorFollower) {
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Mouse states
    document.addEventListener('mousedown', () => {
        if (cursor) cursor.style.transform = 'scale(0.7)';
        if (cursorFollower) cursorFollower.style.transform = 'scale(0.8) rotate(45deg)';
    });

    document.addEventListener('mouseup', () => {
        if (cursor) cursor.style.transform = 'scale(1)';
        if (cursorFollower) cursorFollower.style.transform = 'scale(1) rotate(0deg)';
    });

    // Interactive hover bindings
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('a, button, .btn, .project-card, .skill-card, .profile-container, .theme-toggle, .scroll-to-top, .filter-btn');
        if (target) {
            cursor.classList.add('hovered');
            cursorFollower.classList.add('hovered');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest('a, button, .btn, .project-card, .skill-card, .profile-container, .theme-toggle, .scroll-to-top, .filter-btn');
        if (target) {
            cursor.classList.remove('hovered');
            cursorFollower.classList.remove('hovered');
        }
    });
} else {
    // Completely hide cursor elements if touch/mobile device
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
}

// Loading Animation & Initializations
function deactivateLoading() {
    if (loading && !loading.classList.contains('hidden')) {
        loading.classList.add('hidden');
        initAnimations();
        
        // Recalculate ScrollTrigger metrics and Lenis layout after display switches to visible
        setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
            if (typeof lenis !== 'undefined') {
                lenis.resize();
            }
        }, 150);

        setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 800);
    }
}

// Deactivate loading screen as soon as DOM is parsed
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(deactivateLoading, 500);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(deactivateLoading, 500);
    });
}

// Ultimate safety fallbacks to guarantee page loads under any network constraints
window.addEventListener('load', deactivateLoading);
setTimeout(deactivateLoading, 2500); // 2.5s maximum load boundary

// Theme Toggle
themeToggle.addEventListener('click', function () {
    document.body.setAttribute('data-theme',
        document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    );
    themeIcon.className = document.body.getAttribute('data-theme') === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', document.body.getAttribute('data-theme'));
});

// Dynamic Year
document.querySelector('.footer-text').innerHTML = `&copy; 2025 Pratik Thorat. All rights reserved.`;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu
mobileMenuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    });
});

// Typing Animation
const texts = [
    "Writing clean code...",
    "Debugging reality...",
    "Learning new stacks...",
    "Building AI Agents...",
    "Creating experiences..."
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
let lenis;
// Disable Lenis smooth scrolling on touch devices and small viewports to prevent scroll boundary locking and ensure native momentum scrolling
const isMobileOrTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
if (typeof Lenis !== 'undefined' && !isMobileOrTouch) {
    lenis = new Lenis({
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
}

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

// 5. Three.js 3D Background (Deep Space Starfield & Cosmic Constellation System)
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 150);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Starfield configuration
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 1500 : 3000;

    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const speeds = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
        // Randomly distribute stars in a wide 3D sphere coordinate cube
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 120 - 60; // Spread on depth

        // Individual star drift velocities
        speeds[i] = 0.04 + Math.random() * 0.12;

        // Custom cyberpunk star colors matching obsidian neon palette:
        // Cherry-neon (40%), Cyber-cyan (40%), Pure glowing white (20%)
        const rand = Math.random();
        if (rand < 0.4) {
            colors[i * 3] = 1.0;      // R
            colors[i * 3 + 1] = 0.0;  // G
            colors[i * 3 + 2] = 0.27; // B
        } else if (rand < 0.8) {
            colors[i * 3] = 0.0;      // R
            colors[i * 3 + 1] = 0.95; // G
            colors[i * 3 + 2] = 1.0;  // B
        } else {
            colors[i * 3] = 1.0;      // R
            colors[i * 3 + 1] = 1.0;  // G
            colors[i * 3 + 2] = 1.0;  // B
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Premium star points material with additive blending for cyber glows
    const material = new THREE.PointsMaterial({
        size: isMobile ? 0.12 : 0.09,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const starPoints = new THREE.Points(geometry, material);
    scene.add(starPoints);

    // Initial camera position
    camera.position.set(0, 0, 15);

    // Mouse coordinates (scaled)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    document.addEventListener('mousemove', (event) => {
        targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();

    function animateStarfield() {
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse coordinates damping
        currentMouseX += (targetMouseX - currentMouseX) * 0.06;
        currentMouseY += (targetMouseY - currentMouseY) * 0.06;

        // Animate stars drifting forward towards the screen along the Z-axis
        const posAttribute = geometry.attributes.position;
        const array = posAttribute.array;

        for (let i = 0; i < starCount; i++) {
            array[i * 3 + 2] += speeds[i]; // Move star closer

            // Reset star far back if it moves past the camera view plane
            if (array[i * 3 + 2] > 20) {
                array[i * 3] = (Math.random() - 0.5) * 100;
                array[i * 3 + 1] = (Math.random() - 0.5) * 100;
                array[i * 3 + 2] = -80; // Reset to depth
            }
        }

        posAttribute.needsUpdate = true;

        // Smoothly rotate the star constellation based on elapsed time and mouse movements
        starPoints.rotation.y = elapsedTime * 0.012 + currentMouseX * 0.1;
        starPoints.rotation.x = elapsedTime * 0.008 + currentMouseY * 0.1;

        // Interactive camera depth shift based on page scroll
        const scrollY = window.scrollY || 0;
        camera.position.z = 15 - scrollY * 0.005;

        // Subtly sway camera to make the deep space feel alive
        camera.position.x += (currentMouseX * 1.5 - camera.position.x) * 0.05;
        camera.position.y += (-currentMouseY * 1.5 - camera.position.y) * 0.05;

        renderer.render(scene, camera);
        requestAnimationFrame(animateStarfield);
    }
    animateStarfield();

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

        // Progress Bars interaction
        gsap.utils.toArray('.progress-fill').forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 90%',
                },
                width: bar.getAttribute('data-width') + '%',
                duration: 1.5,
                ease: 'power2.out'
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
    // Disable Tilt on touch devices to avoid janky scroll movement
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) {
        VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card, .profile-container, .saturday-ai-image"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }
}



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

// Scroll to Top Logic
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        if (typeof lenis !== 'undefined') {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}
