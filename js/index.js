document.addEventListener('DOMContentLoaded', function () {
    // Language Switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    const langElements = document.querySelectorAll('.lang');
    const inputElements = document.querySelectorAll('input[placeholder-pt], textarea[placeholder-pt]');

    function setLanguage(lang) {
        langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
        langElements.forEach(el => el.classList.toggle('hidden', !el.classList.contains(`lang-${lang}`)));
        inputElements.forEach(input => {
            const placeholder = input.getAttribute(`placeholder-${lang}`);
            if (placeholder) input.setAttribute('placeholder', placeholder);
        });
    }

    langButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
    setLanguage('pt');

    // Mobile Menu Toggle
    document.getElementById('mobile-menu-button').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section-fade-in').forEach(section => observer.observe(section));

    // Text Scroller
    const memberNames = ['Senior Sistemas', 'VOCKAN', 'MXM Sistemas', 'CIGAM', 'NASAJON', 'Aliare', 'Sankhya', 'Epicor', 'Invent Software'];
    const track = document.querySelector('.text-track');
    if (track) {
        const allNames = [...memberNames, ...memberNames];
        allNames.forEach(name => {
            const slide = document.createElement('div');
            slide.className = 'text-slide';
            slide.textContent = name;
            track.appendChild(slide);
        });
    }

    // Interactive Hero Canvas Background
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
        window.addEventListener('mousemove', event => {
            mouse.x = event.x;
            mouse.y = event.y;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, dirX, dirY, size, color) {
                this.x = x; this.y = y; this.dirX = dirX; this.dirY = dirY;
                this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > width || this.x < 0) this.dirX = -this.dirX;
                if (this.y > height || this.y < 0) this.dirY = -this.dirY;

                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < width - this.size * 10) this.x += 5;
                    if (mouse.x > this.x && this.x > this.size * 10) this.x -= 5;
                    if (mouse.y < this.y && this.y < height - this.size * 10) this.y += 5;
                    if (mouse.y > this.y && this.y > this.size * 10) this.y -= 5;
                }

                this.x += this.dirX;
                this.y += this.dirY;
                this.draw();
            }
        }

        function init() {
            particles = [];
            let numberOfParticles = (height * width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((height - size * 2) - (size * 2)) + size * 2);
                let dirX = (Math.random() * .4) - .2;
                let dirY = (Math.random() * .4) - .2;
                let color = 'rgba(64, 202, 177, 0.3)';
                particles.push(new Particle(x, y, dirX, dirY, size, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    if (distance < (width / 7) * (height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(172, 205, 211, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        init();
        animate();
    }

});
