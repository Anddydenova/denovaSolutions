// ==== TYPING HERO ====
const heroText = document.getElementById('hero-text');
const words = [
    "Transformamos ideas en soluciones digitales",
    "Innovamos en software y apps móviles",
    "Impulsamos tu negocio con tecnología"
];
let wordIndex = 0;
let charIndex = 0;
let typingSpeed = 50;
let deleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (!deleting) {
        heroText.textContent = currentWord.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(type, 1500);
            return;
        }
    } else {
        heroText.textContent = currentWord.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(type, typingSpeed);
}
type();

// ==== SCROLL SUAVE ====
const links = document.querySelectorAll('nav a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ==== ANIMACIÓN DE SECCIONES ====
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));

// ==== MODO OSCURO CON BOTÓN ====
const toggleDark = document.getElementById('toggle-dark');
toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleDark.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    document.querySelector('header').classList.toggle('dark');
    document.querySelectorAll('section').forEach(sec => sec.classList.toggle('dark'));
    document.querySelectorAll('.service, .project').forEach(card => card.classList.toggle('dark'));
    document.querySelectorAll('.contact input, .contact textarea').forEach(input => input.classList.toggle('dark'));
    document.querySelector('.contact button').classList.toggle('dark');
    document.querySelector('footer').classList.toggle('dark');
    document.querySelector('.hero').classList.toggle('dark');

    // Cambiar colores de partículas
    particlesArray.forEach(p => {
        p.color = document.body.classList.contains('dark') 
            ? colorsDark[Math.floor(Math.random() * colorsDark.length)] 
            : colorsLight[Math.floor(Math.random() * colorsLight.length)];
    });
});

// ==== PARTICULAS INTERACTIVAS CON CRECIMIENTO ====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numParticles = 100;

const colorsLight = ['#0D3B66', '#F95738', '#F9A03F'];
const colorsDark = ['#ffffff', '#F95738', '#F9A03F'];

const mouse = { x: null, y: null };
canvas.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
canvas.addEventListener('mouseleave', e => { mouse.x = null; mouse.y = null; });

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.baseSize = this.size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speed = 0.05 + Math.random() * 0.05;
        this.color = document.body.classList.contains('dark') 
            ? colorsDark[Math.floor(Math.random() * colorsDark.length)]
            : colorsLight[Math.floor(Math.random() * colorsLight.length)];
    }

    update() {
        // Movimiento hacia el mouse
        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            this.x += dx * this.speed;
            this.y += dy * this.speed;

            // Crecimiento según distancia
            let distance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
            if (distance < 100) this.size = this.baseSize + (100 - distance)/20;
            else this.size = this.baseSize;
        } else {
            let dx = this.baseX - this.x;
            let dy = this.baseY - this.y;
            this.x += dx * 0.02;
            this.y += dy * 0.02;
            this.size = this.baseSize;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});
