class Typewriter {
    constructor(elementId, words, waitTime = 2000) {
        this.element = document.getElementById(elementId);
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.waitTime = parseInt(waitTime, 10);
        this.isDeleting = false;
        
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="txt">${this.txt}</span><span class="cursor">|</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2; // Delete twice as fast
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.waitTime; // Pause at end of word
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const titles = [
        "AI/ML Engineer",
        "Generative AI Architect",
        "Agentic Swarm Developer",
        "Deep Learning Researcher"
    ];
    if (document.getElementById('typewriter-text')) {
        new Typewriter('typewriter-text', titles, 2000);
    }
});
