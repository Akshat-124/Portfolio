document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Navigation Toggler
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // 2. Header scroll styling class toggle
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations (using Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve if we only want to reveal once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Active Navigation Indicator based on current scroll position
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('nav a:not(.nav-cta)');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset navbar height
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navAnchors.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === `#${sectionId}`) {
                        a.classList.add('active');
                    }
                });
            }
        });
    });

    // 5. Stats Number Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNum = parseInt(target.getAttribute('data-target'), 10);
                const suffix = target.getAttribute('data-suffix') || '';
                let count = 0;
                const duration = 1500; // 1.5s
                const stepTime = Math.max(Math.floor(duration / targetNum), 20);
                
                const timer = setInterval(() => {
                    count++;
                    target.innerText = count + suffix;
                    if (count >= targetNum) {
                        target.innerText = targetNum + suffix;
                        clearInterval(timer);
                    }
                }, stepTime);
                
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });

    stats.forEach(stat => statsObserver.observe(stat));

    // 6. Projects filter mechanism
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-wrapper');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 7. Contact Form Handling
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Simple validation / handling notification
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Collect Form data
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Generate mailto link as fallback/action, or submit to a mock service
            // In a production site, you'd use fetch() to send to formspree or similar.
            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Clear fields
                contactForm.reset();

                // Open mail application as fallback
                const mailtoString = `mailto:ad2323511@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
                window.location.href = mailtoString;

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }

    // 8. Mouse Spotlight Glow Variable Updates
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 9. Model Monitor Metrics Progress Bar Animation
    const monitorDashboard = document.querySelector('.monitor-dashboard');
    if (monitorDashboard) {
        const bars = monitorDashboard.querySelectorAll('.metric-bar');
        const targetWidths = [];
        
        // Reset to 0 initially for transition animation
        bars.forEach((bar, index) => {
            targetWidths[index] = bar.style.width || '50%';
            bar.style.width = '0';
        });

        const monitorObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger progressive layout load
                    setTimeout(() => {
                        bars.forEach((bar, index) => {
                            bar.style.width = targetWidths[index];
                        });
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        monitorObserver.observe(monitorDashboard);
    }
});
