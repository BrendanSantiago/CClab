/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Digital States: Immersion / Distortion / Reformation</title>
  <style>
    /* 
      DIGITAL AWARENESS FINAL (CODED VERSION)
      ---------------------------------------
      - 3 stages: immersion, distortion, reformation
      - Uses: layered "screens", glitch, motion blur, text overlays
      - You can screen-record this as your 5-min final video
    */

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #050506;
      color: #e8e8f0;
    }

    body.stage-immersion {
      background: radial-gradient(circle at top left, #2f5bff 0, #050506 55%);
    }

    body.stage-distortion {
      background: radial-gradient(circle at top, #ff3060 0, #050506 55%);
      filter: contrast(1.2) saturate(1.25);
    }

    body.stage-reformation {
      background: radial-gradient(circle at center, #22d2aa 0, #050506 60%);
    }

    .app {
      position: relative;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* Faint grid to suggest unseen infrastructure */
    .grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      mix-blend-mode: soft-light;
      pointer-events: none;
      opacity: 0.4;
    }

    .screen-stack {
      position: relative;
      width: min(900px, 90vw);
      height: min(520px, 70vh);
      backdrop-filter: blur(18px);
      background: rgba(5, 6, 15, 0.8);
      border-radius: 24px;
      box-shadow:
        0 40px 120px rgba(0,0,0,0.9),
        0 0 0 1px rgba(255,255,255,0.05);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Title bar (like a fake app window) */
    .screen-header {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      gap: 10px;
      background: linear-gradient(to right, rgba(255,255,255,0.03), rgba(255,255,255,0));
      border-bottom: 1px solid rgba(255,255,255,0.06);
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.65);
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
    }
    .dot.red { background: #ff5f57; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #28c840; }

    .stage-label {
      margin-left: auto;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 10px;
      border: 1px solid rgba(255,255,255,0.1);
      text-transform: uppercase;
    }

    /* Main content area */
    .screen-body {
      flex: 1;
      display: grid;
      grid-template-columns: 1.2fr 0.9fr;
      overflow: hidden;
    }

    .left-pane, .right-pane {
      position: relative;
      padding: 18px 20px;
      overflow: hidden;
    }

    .left-pane {
      border-right: 1px solid rgba(255,255,255,0.05);
    }

    /* Simulated social feed / notifications */
    .feed {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-height: 100%;
      overflow: hidden;
      mask-image: linear-gradient(to bottom, transparent 0, black 40px, black calc(100% - 40px), transparent 100%);
    }

    .feed-item {
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      font-size: 13px;
      color: rgba(232,232,240,0.88);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .feed-meta {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: rgba(200,200,220,0.6);
    }

    .typing-line {
      font-family: "JetBrains Mono", "SF Mono", ui-monospace, monospace;
      font-size: 13px;
      color: rgba(210,210,255,0.9);
      white-space: nowrap;
      overflow: hidden;
      border-right: 2px solid rgba(210,210,255,0.9);
      width: 0;
    }

    /* Pixelated reflection / ghost of self */
    .reflection {
      position: absolute;
      inset: 14% 12%;
      opacity: 0.25;
      filter: blur(1px) contrast(1.4);
      image-rendering: pixelated;
      background-position: center;
      background-size: cover;
      mix-blend-mode: screen;
      pointer-events: none;
    }

    /* Right pane: captions + waveform-ish visualization */
    .caption-block {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }

    .caption-text {
      font-size: 15px;
      line-height: 1.6;
      color: rgba(240,240,252,0.9);
    }

    .caption-text span.fragment {
      display: inline-block;
      transition: transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease;
    }

    .voice-wave {
      height: 110px;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.08);
      background: radial-gradient(circle at left, rgba(255,255,255,0.12), transparent 55%);
      overflow: hidden;
      position: relative;
    }

    .voice-bars {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      gap: 4px;
      padding: 0 10px 8px;
    }

    .voice-bar {
      flex: 1;
      border-radius: 999px;
      background: rgba(255,255,255,0.2);
      height: 20%;
      transform-origin: center bottom;
    }

    /* Stage-specific styles */

    /* IMMERSION: smooth scroll, glow, slight blur */
    body.stage-immersion .feed-item {
      box-shadow: 0 0 18px rgba(79,129,255,0.18);
    }

    body.stage-immersion .reflection {
      opacity: 0.35;
    }

    body.stage-immersion .caption-text span.fragment {
      opacity: 0.9;
    }

    /* DISTORTION: glitch & jitter */
    body.stage-distortion .screen-stack {
      animation: tilt 2.4s infinite alternate;
    }

    @keyframes tilt {
      0% { transform: translateY(0) rotate(0deg); }
      40% { transform: translateY(-3px) rotate(-0.3deg); }
      60% { transform: translateY(2px) rotate(0.4deg); }
      100% { transform: translateY(-1px) rotate(-0.2deg); }
    }

    body.stage-distortion .feed-item {
      position: relative;
      overflow: hidden;
    }

    body.stage-distortion .feed-item::before,
    body.stage-distortion .feed-item::after {
      content: "";
      position: absolute;
      inset: 0;
      mix-blend-mode: screen;
      opacity: 0;
      pointer-events: none;
    }

    body.stage-distortion .feed-item::before {
      background: linear-gradient(90deg, rgba(255,0,0,0.4), transparent);
      animation: glitch-slice 1.1s infinite steps(2, end);
    }

    body.stage-distortion .feed-item::after {
      background: linear-gradient(90deg, transparent, rgba(0,255,255,0.45));
      animation: glitch-slice 0.9s infinite steps(2, end) reverse;
    }

    @keyframes glitch-slice {
      0%, 80% { opacity: 0; transform: translate(0,0); }
      81% { opacity: 1; transform: translate(-3px,-2px); }
      86% { opacity: 1; transform: translate(3px,2px); }
      100% { opacity: 0; transform: translate(0,0); }
    }

    body.stage-distortion .caption-text span.fragment {
      filter: blur(1px);
      opacity: 0.7;
    }

    /* REFORMATION: calmer, more centered, cleaner type */
    body.stage-reformation .screen-stack {
      transform: translateY(0) scale(1.01);
      box-shadow:
        0 30px 90px rgba(0,0,0,0.7),
        0 0 0 1px rgba(120,255,210,0.4);
    }

    body.stage-reformation .reflection {
      opacity: 0.18;
      filter: blur(2px) contrast(1.2);
    }

    body.stage-reformation .caption-text span.fragment {
      filter: none;
      opacity: 1;
      transform: translateY(0);
    }

    /* Stage hint / progress at bottom */
    .bottom-bar {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 11px;
      color: rgba(230,230,240,0.7);
    }

    .pill {
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(0,0,0,0.5);
    }

    .dots {
      display: flex;
      gap: 4px;
    }
    .dots span {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.4);
      background: transparent;
    }
    .dots span.active {
      background: rgba(255,255,255,0.9);
    }

    .hint {
      opacity: 0.75;
    }

    /* Small screens */
    @media (max-width: 800px) {
      .screen-body {
        grid-template-columns: 1fr;
      }
      .left-pane {
        border-right: none;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }
      .bottom-bar {
        bottom: 8px;
        flex-direction: column;
      }
    }
  </style>
</head>
<body class="stage-immersion">
  <div class="app">
    <div class="grid"></div>

    <div class="screen-stack">
      <div class="screen-header">
        <div class="dot red"></div>
        <div class="dot yellow"></div>
        <div class="dot green"></div>
        <span style="margin-left:8px;">/digital_self/session_01</span>
        <div class="stage-label" id="stageLabel">Immersion</div>
      </div>

      <div class="screen-body">
        <!-- LEFT PANE: feed / notifications / typing -->
        <div class="left-pane">
          <!-- Pixelated "self" reflection, replace URL with your AI / distorted self-portrait -->
          <div class="reflection" id="reflection"
               style="background-image:url('img/ai_self_placeholder.png');"></div>

          <div class="feed" id="feed">
            <!-- Items will be injected by JS -->
          </div>
        </div>

        <!-- RIGHT PANE: voiceover captions + waveform -->
        <div class="right-pane">
          <div class="caption-block">
            <div class="caption-text" id="captionText">
              <!-- Text fragments controlled by JS -->
            </div>

            <div class="voice-wave">
              <div class="voice-bars" id="voiceBars">
                <!-- Bars generated by JS -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom stage info & controls -->
    <div class="bottom-bar">
      <div class="pill">
        <span id="timerLabel">00:00</span> • <span id="stageName">Immersion</span>
      </div>
      <div class="dots" id="stageDots">
        <span class="active"></span><span></span><span></span>
      </div>
      <div class="hint">Click anywhere to jump to next stage • Esc = restart</div>
    </div>
  </div>

  <!-- Optional audio: replace these with your own files -->
  <audio id="typingAudio" src="audio/typing.mp3" preload="auto"></audio>
  <audio id="glitchAudio" src="audio/glitch.mp3" preload="auto"></audio>
  <audio id="ambientAudio" src="audio/ambient_loop.mp3" preload="auto" loop></audio>

  <script>
    // ------- DATA FOR STAGES (EDIT THIS PART TO MATCH YOUR SCRIPT) -------

    const STAGES = [
      {
        id: "immersion",
        label: "Immersion",
        durationSec: 90,  // adjust to match your 5min timing
        captionFragments: [
          "I don’t remember the last time I was bored.",
          "There’s always another scroll, another notification, another tiny hit of relevance.",
          "My thumb moves before I decide anything.",
          "I tell myself I’m just checking in.",
          "I’m not sure when watching became performing."
        ],
        feedItems: [
          { user: "@friend_01", time: "now", text: "you see this?? 💀" },
          { user: "@algorithm", time: "3m", text: "You might like: 242 new videos about self-improvement." },
          { user: "@system", time: "5m", text: "Screen time up 37% this week." },
          { user: "@unknown", time: "10m", text: "someone is typing…" }
        ]
      },
      {
        id: "distortion",
        label: "Distortion",
        durationSec: 90,
        captionFragments: [
          "My face repeats in every reflection, but it’s not really mine.",
          "I replay the same clips until they stop feeling true.",
          "The voice in my head starts buffering.",
          "I sound clearer to strangers than I do to myself.",
          "Every gesture looks like content, even when I’m alone."
        ],
        feedItems: [
          { user: "@loop_01", time: "now", text: "[reposted] [reposted] [reposted] [reposted]" },
          { user: "@mirror", time: "1m", text: "do you recognize yourself in this video?" },
          { user: "@system", time: "3m", text: "Error: connection unstable. Please perform again." },
          { user: "@ghost", time: "8m", text: "you are live to no one." }
        ]
      },
      {
        id: "reformation",
        label: "Reformation",
        durationSec: 90,
        captionFragments: [
          "When the feed runs out, there’s a quiet I don’t know how to hold.",
          "I try to remember what my attention felt like before it was measured.",
          "I rebuild myself from screenshots and half-finished drafts.",
          "Some parts are honest, some parts are curated, all of them are mine.",
          "Maybe awareness isn’t escape, but noticing who I become when I log back in."
        ],
        feedItems: [
          { user: "@archive", time: "now", text: "saved to camera roll: 1 new moment." },
          { user: "@self", time: "2m", text: "do not disturb for the next five minutes." },
          { user: "@system", time: "5m", text: "New profile detected: same body, different script." },
          { user: "@future", time: "10m", text: "draft: a version of you that doesn’t need an audience." }
        ]
      }
    ];

    // Total project runtime (just for label)
    const totalSeconds = STAGES.reduce((sum, s) => sum + s.durationSec, 0);

    // ------- DOM ELEMENTS -------

    const bodyEl = document.body;
    const feedEl = document.getElementById("feed");
    const captionEl = document.getElementById("captionText");
    const voiceBarsEl = document.getElementById("voiceBars");
    const stageLabelEl = document.getElementById("stageLabel");
    const timerLabelEl = document.getElementById("timerLabel");
    const stageNameEl = document.getElementById("stageName");
    const dotsEl = document.getElementById("stageDots");
    const reflectionEl = document.getElementById("reflection");

    const typingAudio = document.getElementById("typingAudio");
    const glitchAudio = document.getElementById("glitchAudio");
    const ambientAudio = document.getElementById("ambientAudio");

    // ------- STATE -------

    let currentStageIndex = 0;
    let elapsedInStage = 0;
    let elapsedTotal = 0;
    let lastTimestamp = null;
    let running = true;

    // ------- UTIL -------

    function formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    function updateDots() {
      const dotSpans = dotsEl.querySelectorAll("span");
      dotSpans.forEach((d, i) => {
        d.classList.toggle("active", i === currentStageIndex);
      });
    }

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ------- BUILD VOICE BARS -------

    function buildVoiceBars() {
      voiceBarsEl.innerHTML = "";
      const barCount = 40;
      for (let i = 0; i < barCount; i++) {
        const bar = document.createElement("div");
        bar.className = "voice-bar";
        voiceBarsEl.appendChild(bar);
      }
    }

    // ------- BUILD STAGE CONTENT -------

    function loadStage(stageIndex) {
      const stage = STAGES[stageIndex];
      if (!stage) return;

      currentStageIndex = stageIndex;
      elapsedInStage = 0;

      // Update body class
      bodyEl.className = "";
      bodyEl.classList.add(`stage-${stage.id}`);

      // Update labels
      stageLabelEl.textContent = stage.label;
      stageNameEl.textContent = stage.label;
      updateDots();

      // FEED
      feedEl.innerHTML = "";

      // One "typing" line at the top to simulate live input
      const typingItem = document.createElement("div");
      typingItem.className = "feed-item";
      const typingMeta = document.createElement("div");
      typingMeta.className = "feed-meta";
      typingMeta.innerHTML = `<span>@you</span><span>typing…</span>`;
      const typingLine = document.createElement("div");
      typingLine.className = "typing-line";
      typingLine.id = "typingLine";
      typingLine.textContent = "> ";
      typingItem.appendChild(typingMeta);
      typingItem.appendChild(typingLine);
      feedEl.appendChild(typingItem);

      // Other feed items
      stage.feedItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "feed-item";
        div.innerHTML = `
          <div class="feed-meta">
            <span>${item.user}</span>
            <span>${item.time}</span>
          </div>
          <div>${item.text}</div>
        `;
        feedEl.appendChild(div);
      });

      // CAPTION FRAGMENTS
      captionEl.innerHTML = "";
      stage.captionFragments.forEach((text, i) => {
        const span = document.createElement("span");
        span.className = "fragment";
        span.textContent = (i > 0 ? " " : "") + text;
        captionEl.appendChild(span);
      });

      // Small variation in reflection (you could swap image per stage)
      reflectionEl.style.opacity = stage.id === "distortion" ? 0.35 : (stage.id === "immersion" ? 0.3 : 0.18);

      // Audio cues
      try {
        if (stage.id === "immersion") {
          ambientAudio.volume = 0.4;
          ambientAudio.play().catch(()=>{});
        } else if (stage.id === "distortion") {
          glitchAudio.currentTime = 0;
          glitchAudio.play().catch(()=>{});
        } else if (stage.id === "reformation") {
          ambientAudio.volume = 0.2;
        }
      } catch(e) {
        // ignore autoplay errors
      }

      // Start typing animation for this stage
      startTypingLoop();
    }

    // ------- TYPING EFFECT -------

    let typingTextPool = [
      "scroll, tap, repeat",
      "am I performing or existing?",
      "notification: you have 0 new thoughts",
      "algorithm is watching",
      "buffering..."
    ];

    function startTypingLoop() {
      const typingLine = document.getElementById("typingLine");
      if (!typingLine) return;

      let currentIndex = 0;

      function typeNext() {
        const base = "> ";
        const text = typingTextPool[randomInt(0, typingTextPool.length - 1)];
        const full = base + text;
        let i = 0;

        // reset width to animate
        typingLine.style.width = "0";
        typingLine.textContent = "";

        const interval = setInterval(() => {
          typingLine.textContent = full.slice(0, i);
          typingLine.style.width = "auto";
          i++;

          if (i === full.length + 1) {
            clearInterval(interval);
            // small pause then next
            setTimeout(typeNext, randomInt(800, 1600));
          }
        }, randomInt(30, 55));

        try {
          typingAudio.currentTime = 0;
          typingAudio.play().catch(() => {});
        } catch(e) {}
      }

      // Kick off
      typeNext();
    }

    // ------- CAPTION GLITCH / MOVEMENT -------

    function animateCaptionFragments(stageId, tNorm) {
      const fragments = captionEl.querySelectorAll(".fragment");
      fragments.forEach((frag, i) => {
        const phase = (tNorm * STAGES[currentStageIndex].captionFragments.length + i * 0.4) % 1;
        if (stageId === "immersion") {
          frag.style.transform = `translateY(${Math.sin(phase * Math.PI * 2) * 2}px)`;
        } else if (stageId === "distortion") {
          const jitterX = (Math.random() - 0.5) * 4;
          const jitterY = (Math.random() - 0.5) * 4;
          frag.style.transform = `translate(${jitterX}px, ${jitterY}px) skewX(${(Math.random()-0.5)*4}deg)`;
          frag.style.opacity = 0.6 + Math.random() * 0.3;
        } else if (stageId === "reformation") {
          frag.style.transform = `translateY(${(1 - tNorm) * 4 * (i / fragments.length)}px)`;
          frag.style.opacity = 0.9 + 0.1 * Math.cos(phase * Math.PI * 2);
        }
      });
    }

    // ------- VOICE BAR ANIMATION -------

    function animateVoiceBars(stageId) {
      const bars = voiceBarsEl.querySelectorAll(".voice-bar");
      bars.forEach((bar, i) => {
        let baseHeight;
        if (stageId === "immersion") {
          baseHeight = 15 + Math.sin(performance.now()/600 + i*0.3) * 10;
        } else if (stageId === "distortion") {
          baseHeight = randomInt(5, 80);
        } else {
          baseHeight = 10 + Math.sin(performance.now()/900 + i*0.25) * 18;
        }
        baseHeight = Math.max(5, Math.min(90, baseHeight));
        bar.style.height = baseHeight + "%";
      });
    }

    // ------- MAIN LOOP -------

    function tick(timestamp) {
      if (!running) return;
      if (lastTimestamp == null) lastTimestamp = timestamp;
      const dt = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const stage = STAGES[currentStageIndex];
      elapsedInStage += dt;
      elapsedTotal += dt;

      // Normalized time within stage [0,1]
      const tNorm = Math.min(1, elapsedInStage / stage.durationSec);

      // Timer display
      timerLabelEl.textContent = formatTime(elapsedTotal);

      // Animate captions & voice bars
      animateCaptionFragments(stage.id, tNorm);
      animateVoiceBars(stage.id);

      // Auto-advance stages
      if (elapsedInStage >= stage.durationSec) {
        if (currentStageIndex < STAGES.length - 1) {
          loadStage(currentStageIndex + 1);
        } else {
          // At the end: gently stop or loop
          running = false;
          // If you prefer a loop, uncomment:
          // running = true;
          // loadStage(0);
        }
      }

      if (running) {
        requestAnimationFrame(tick);
      }
    }

    // ------- INTERACTION -------

    // Click to jump to next stage
    window.addEventListener("click", () => {
      const next = (currentStageIndex + 1) % STAGES.length;
      loadStage(next);
    });

    // Esc to restart
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        elapsedTotal = 0;
        loadStage(0);
        running = true;
        lastTimestamp = null;
        requestAnimationFrame(tick);
      }
    });

    // ------- INIT -------

    buildVoiceBars();
    loadStage(0);
    requestAnimationFrame(tick);
  </script>
</body>
</html>


