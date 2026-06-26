# 🧠 AI/ML Systems Engineer Portfolio

A premium, interactive, single-page portfolio tailored for **Akshat Dwivedi**, AI/ML Engineer. Built with pure HTML, CSS, and Vanilla JavaScript for blazing-fast loading speeds, responsiveness, and zero dependencies.

## 🚀 Key Interactive Features

1. **🖥️ Live Agent Sandbox Simulator**:
   An interactive terminal console mockup where visitors can click buttons to run live-simulated log outputs for:
   * **Agentic Swarms**: Workload distribution, ThreadPool scheduling, and rate-limit recovery (HTTP 429 backoffs).
   * **RAG Retrieval**: Embedding queries, vector indexes lookup (similarity scores), and model routing.
   * **MCP Clients**: Server tool integration, JSON-RPC schema querying, and utility executions.
2. **📊 Model Monitor Telemetry**:
   An inline dashboard widget showcasing live mock inferences, semantic recall accuracies, rate-limit recovery rates, and concurrent worker threadpool allocations.
3. **🖱️ Spotlight Card Glow**:
   Modern hover effects tracking cursor coordinates and projecting a subtle radial spotlight glow layer behind glassmorphic dashboard panels.
4. **🕸️ Scroll velocity particle canvas**:
   A customized HTML5 neural network background animation. Scrolling down accelerates the moving nodes to visually mimic active system data flow.

## 📂 Project Structure

```
portfolio/
├── index.html          # Main single-page layout & SEO meta
├── css/
│   ├── style.css       # Custom variables, layouts, and spotlight overlays
│   └── animations.css  # Keyframe transitions and breathing pulses
├── js/
│   ├── main.js         # Interactive simulation terminals and observers
│   ├── particles.js    # Neural network Canvas API animations
│   └── typewriter.js   # Typewriter taglines for Hero section
├── assets/
│   ├── images/         # Profile assets
│   └── resume/         # Downloadable CV documents
└── README.md
```

## 💻 Running Locally

To run the portfolio on your local machine:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser. Or simply open `index.html` directly.

## 🌐 Deployment

Perfectly optimized for direct hosting on static providers like **Netlify**, **GitHub Pages**, or **Vercel**.
