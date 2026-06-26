class NeuralNetworkParticles {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.numberOfParticles = 80;
        this.connectionDistance = 120;
        
        // Scroll speed velocity variables
        this.scrollSpeedMultiplier = 1.0;
        this.lastScrollTop = 0;
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resizeCanvas();
        this.particles = [];
        // Calculate number of particles based on screen size
        this.numberOfParticles = Math.min(80, Math.floor((this.canvas.width * this.canvas.height) / 15000));
        
        for (let i = 0; i < this.numberOfParticles; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * (this.canvas.width - size * 2) + size;
            const y = Math.random() * (this.canvas.height - size * 2) + size;
            const directionX = (Math.random() * 0.8) - 0.4;
            const directionY = (Math.random() * 0.8) - 0.4;
            // Cyan (#00F0FF) or Purple (#8B5CF6)
            const color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.8)' : 'rgba(139, 92, 246, 0.8)';
            
            this.particles.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.init();
        });

        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Speed up particles during scroll
        window.addEventListener('scroll', () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            const diff = Math.abs(st - this.lastScrollTop);
            this.lastScrollTop = st <= 0 ? 0 : st;
            
            // Set speed boost based on scroll delta
            this.scrollSpeedMultiplier = Math.min(3.5, 1.0 + (diff / 15));
        });
    }

    drawConnections() {
        let opacityValue = 1;
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    opacityValue = 1 - (distance / this.connectionDistance);
                    // Fade color from Cyan/Violet connection
                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue * 0.25})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                    this.ctx.stroke();
                }
            }

            // Connect to mouse
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.particles[a].x - this.mouse.x;
                const dy = this.particles[a].y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.mouse.radius) {
                    opacityValue = 1 - (distance / this.mouse.radius);
                    this.ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue * 0.35})`;
                    this.ctx.lineWidth = 1.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(this.canvas.width, this.canvas.height, this.scrollSpeedMultiplier);
            this.particles[i].draw(this.ctx);
        }
        
        this.drawConnections();
        
        // Decay the scroll speed multiplier back to 1.0
        if (this.scrollSpeedMultiplier > 1.0) {
            this.scrollSpeedMultiplier -= 0.05;
            if (this.scrollSpeedMultiplier < 1.0) this.scrollSpeedMultiplier = 1.0;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    update(width, height, speedMultiplier = 1.0) {
        if (this.x > width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX * speedMultiplier;
        this.y += this.directionY * speedMultiplier;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NeuralNetworkParticles('particles-canvas');
});
