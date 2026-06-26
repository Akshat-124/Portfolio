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

    // 10. Agent Sandbox Simulator Terminal Scripts
    const terminalOutput = document.getElementById('terminal-output-container');
    const systemStatusDot = document.getElementById('system-status-dot');
    const systemStatusText = document.getElementById('system-status-text');
    const btnSwarm = document.getElementById('btn-swarm');
    const btnRag = document.getElementById('btn-rag');
    const btnMcp = document.getElementById('btn-mcp');
    const btnClearTerminal = document.getElementById('btn-clear-terminal');
    
    let isSimulating = false;

    // Log Stream Datasets
    const logsSwarm = [
        { text: '> python agentic_swarm_orchestration.py', type: 'system-prompt' },
        { text: '[INFO] Initializing Master Swarm Agent...', type: 'info' },
        { text: '[INFO] Mapping geographic zones hierarchy: Countries ➔ Cities ➔ Zones ➔ Sub-Areas.', type: 'info' },
        { text: '[SYSTEM] Partitioning scraper workload (ThreadPoolExecutor: 16 active workers)...', type: 'info' },
        { text: '[SWARM] Spawning Sub-Agent #1: Locating active business listings in Zone Gurgaon...', type: 'info' },
        { text: '[SWARM] Spawning Sub-Agent #2: Scraping local services in Zone Noida...', type: 'info' },
        { text: '[WARNING] Sub-Agent #2 hit rate-limiting HTTP 429. Invoking exponential backoff...', type: 'error' },
        { text: '[SWARM] Sub-Agent #2 backoff succeeded after 1.5s delay. Resuming queue processing.', type: 'mcp' },
        { text: '[SWARM] Sub-Agent #1 completed work. Extracted 2,145 verified entries.', type: 'success' },
        { text: '[SYSTEM] Compiling parallel outputs. Results aggregated from all sub-agents.', type: 'info' },
        { text: '[DB] Committing aggregated records to Supabase & PostgreSQL database layers...', type: 'info' },
        { text: '[SUCCESS] Swarm process completed. Transaction Committed. Active Threads: Idle.', type: 'success' }
    ];

    const logsRag = [
        { text: '> python vector_rag_query.py --query "Akshat\'s agentic expertise"', type: 'system-prompt' },
        { text: '[INFO] RAG pipeline triggered. Reading user search query embeddings...', type: 'info' },
        { text: '[RAG] Embedding query string via HuggingFace sentence-transformers/all-MiniLM-L6-v2...', type: 'rag' },
        { text: '[RAG] Connecting to ChromaDB vector store. Index similarity metric: Cosine...', type: 'rag' },
        { text: '[RAG] Fetching top-K closest document segments (K = 3)...', type: 'rag' },
        { text: '[RAG] Retrieval successful. Similarity score: 0.941. Context extracted:', type: 'success' },
        { text: '[CONTEXT] "Worked at OxiqAI developing distributed Agentic Swarms and fault-tolerant RAG systems using LangGraph, LangChain, and ChromaDB."', type: 'system-prompt' },
        { text: '[INFO] Constructing augmented context system prompt for Llama 3.3 model...', type: 'info' },
        { text: '[LLM] Dispatching prompt tokens to model endpoint...', type: 'info' },
        { text: '[LLM] Model output generated. Inference Time: 1.18s. GPU Load: 12.5%.', type: 'success' },
        { text: '[SUCCESS] Response streamed to client terminal output.', type: 'success' }
    ];

    const logsMcp = [
        { text: '> mcp-client connect --server stdio_server.py', type: 'system-prompt' },
        { text: '[INFO] Initializing Model Context Protocol (MCP) Client communication bridge...', type: 'info' },
        { text: '[MCP] Fetching server tool manifest schema...', type: 'mcp' },
        { text: '[MCP] Manifest loaded: 3 custom tools registered successfully.', type: 'mcp' },
        { text: '[MCP] Model requests tool call: "query_live_stock" with args {"symbol": "NVDA"}', type: 'mcp' },
        { text: '[INFO] Executing tool call JSON-RPC request over secure stdio transport...', type: 'info' },
        { text: '[MCP] Tool response: { "symbol": "NVDA", "price": "$124.50", "change": "+2.4%" }', type: 'success' },
        { text: '[MCP] Model requests tool call: "calculate_percentage" with args {"val": 124.5, "pct": 1.05}', type: 'mcp' },
        { text: '[SUCCESS] Tool execution successful. Results routed back to LLM context manager.', type: 'success' }
    ];

    // Typist engine
    function runTerminalSimulation(logs) {
        if (isSimulating) return;
        isSimulating = true;
        
        // Update dashboard status
        systemStatusDot.className = 'dot running';
        systemStatusText.innerText = 'Agent Running...';
        
        // Disable buttons
        toggleButtonsState(true);

        // Clear cursor-line initially, we append logs and recreate the cursor line at the end
        clearCursorLine();

        let index = 0;
        
        function printNextLine() {
            if (index < logs.length) {
                const log = logs[index];
                const lineElement = document.createElement('div');
                lineElement.className = `terminal-line ${log.type}`;
                
                // Add tag prefixes for extra tech style
                let text = log.text;
                lineElement.innerText = text;
                
                const cursorLine = getOrCreateCursorLine();
                terminalOutput.insertBefore(lineElement, cursorLine);
                
                // Auto Scroll
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                
                index++;
                
                // Variable delays to simulate computational processing
                const delay = log.type === 'system-prompt' ? 400 : Math.floor(Math.random() * 500) + 300;
                setTimeout(printNextLine, delay);
            } else {
                // Done
                isSimulating = false;
                systemStatusDot.className = 'dot idle';
                systemStatusText.innerText = 'System Idle';
                toggleButtonsState(false);
                getOrCreateCursorLine(); // Make sure cursor is showing at the end
            }
        }

        printNextLine();
    }

    function toggleButtonsState(disabled) {
        btnSwarm.disabled = disabled;
        btnRag.disabled = disabled;
        btnMcp.disabled = disabled;
        
        const btns = [btnSwarm, btnRag, btnMcp];
        btns.forEach(btn => {
            if (disabled) {
                btn.classList.add('running');
                btn.style.opacity = '0.6';
                btn.style.cursor = 'not-allowed';
            } else {
                btn.classList.remove('running');
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            }
        });
    }

    function clearCursorLine() {
        const cursor = terminalOutput.querySelector('.cursor-line');
        if (cursor) {
            cursor.remove();
        }
    }

    function getOrCreateCursorLine() {
        let cursor = terminalOutput.querySelector('.cursor-line');
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.className = 'terminal-line cursor-line';
            cursor.innerHTML = `> <span class="blink-cursor">_</span>`;
            terminalOutput.appendChild(cursor);
        }
        return cursor;
    }

    // Attach listeners
    if (btnSwarm) btnSwarm.addEventListener('click', () => runTerminalSimulation(logsSwarm));
    if (btnRag) btnRag.addEventListener('click', () => runTerminalSimulation(logsRag));
    if (btnMcp) btnMcp.addEventListener('click', () => runTerminalSimulation(logsMcp));
    
    if (btnClearTerminal) {
        btnClearTerminal.addEventListener('click', () => {
            if (isSimulating) return;
            // Clear all terminal lines except system prompts
            terminalOutput.innerHTML = `
                <div class="terminal-line system-prompt"># Akshat Dwivedi AI Agent Environment v1.0.4</div>
                <div class="terminal-line system-prompt"># Select a simulator button to launch agent task scripts.</div>
                <div class="terminal-line cursor-line">> <span class="blink-cursor">_</span></div>
            `;
            terminalOutput.scrollTop = 0;
        });
    }
});

