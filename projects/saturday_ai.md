# Saturday AI 2.0 (Jarvis-Like Assistant)

**Saturday** is an advanced, locally-hosted AI assistant designed for high-performance automation, voice interaction, and intelligent reasoning. It bridges the gap between local privacy and cloud intelligence.

## 🚀 Key Features

### 🧠 **Hybrid Brain Architecture**
- **Cloud Intelligence:** Integrated with **DeepSeek-V3** and **Gemini Flash** for high-speed conversation.
- **Deep Reasoning:** Uses **DeepSeek-R1 (Reasoner)** for complex logic, math, and coding tasks.
- **Offline Fallback:** Automatically switches to a local **Ollama (DeepSeek-R1 1.5B)** model if the internet goes down, ensuring 100% uptime.

### 👁️ **Vision 2.0 (Identity System)**
- **Face Recognition:** Uses OpenCV & LBPH to detect and recognize the user immediately upon sitting down.
- **Security:** "Intruder Alert" capabilities for unknown faces.
- **Privacy:** All biometric processing happens locally on the device.

### 🗣️ **Voice 2.0 (Real-Time Interaction)**
- **Wake Word:** "Saturday" (Constant background listening).
- **Speech Engine:** Google Speech Recognition with natural TTS response.
- **Hands-Free:** Full voice control for all system commands.

### ⚡ **Automation & Control**
- **Web Control:** Automates browser tasks like playing YouTube videos, Google searches, and sending WhatsApp messages.
- **System Ops:** Manages local files, system diagnostics, and application control.
- **Matrix HUD:** A futuristic, cyberpunk-inspired dashboard with real-time system telemetry, digital rain effects, and "Overclock" mode.

### 📚 **Memory & Learning**
- **Reflective Learning:** Analyzes conversations to extract long-term insights about the user (e.g., "User is learning Python").
- **Vector Memory:** Uses TF-IDF/Vector embeddings to recall context by meaning, not just keywords.

## 🛠️ Tech Stack
- **Core:** Python 3.10+
- **AI/ML:** DeepSeek API, Gemini API, Ollama, OpenCV, Scikit-learn
- **Voice:** SpeechRecognition, PyAudio, PyTTSx3
- **Frontend:** Flask (Local Dashboard), HTML5/CSS3 (Cyberpunk UI)
- **Automation:** PyWhatKit, Subprocess, msvcrt

---
*Built by Pratik Thorat.*
