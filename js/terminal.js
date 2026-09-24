/**
 * Interactive AI Developer Terminal & Command Palette
 * Accessible via [Ctrl + K] or UI trigger buttons
 */

class InteractiveTerminal {
  constructor() {
    this.modal = document.getElementById('terminal-modal');
    this.input = document.getElementById('terminal-input');
    this.body = document.getElementById('terminal-body');
    this.closeBtn = document.getElementById('terminal-close-btn');
    this.toggleBtns = document.querySelectorAll('.terminal-trigger');

    this.history = [];
    this.historyIndex = -1;

    this.init();
  }

  init() {
    if (!this.modal || !this.input) return;

    // Toggle button listeners
    this.toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Modal click outside to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Keyboard shortcuts (Ctrl+K or Cmd+K)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Terminal Input Key handling
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.execute(cmd);
        }
        this.input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });
  }

  isOpen() {
    return this.modal && this.modal.classList.contains('open');
  }

  open() {
    this.modal.classList.add('open');
    setTimeout(() => this.input.focus(), 100);
  }

  close() {
    this.modal.classList.remove('open');
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  appendLog(text, type = 'normal') {
    const p = document.createElement('div');
    p.className = `terminal-log ${type}`;
    p.textContent = text;
    this.body.appendChild(p);
    this.body.scrollTop = this.body.scrollHeight;
  }

  execute(rawCmd) {
    this.appendLog(`sam@ai-lab:~$ ${rawCmd}`, 'normal');
    const cmd = rawCmd.toLowerCase().trim();

    switch (cmd) {
      case 'help':
        this.appendLog(
          `Available Commands:
  • about       - View developer background & focus areas
  • skills      - List core AI/ML & engineering stack
  • projects    - Explore featured AI & Computer Vision projects
  • exp         - View internship & industry experience
  • contact     - Display communication channels
  • github      - Open Sam's GitHub profile
  • clear       - Clear terminal output
  • exit        - Close this terminal session`, 'system'
        );
        break;

      case 'about':
      case 'bio':
        this.appendLog(
          `SAM DHARAN ROZARIO R
Specialization: Computer Science Engineering (AI & ML)
Institution: St. Joseph's Institute of Technology, Chennai (Class of 2029)
Focus: Computer Vision, Real-Time Detection, RAG & LLMs, Open-Source Software.`, 'success'
        );
        break;

      case 'skills':
        this.appendLog(
          `CORE SKILLS & TECH STACK:
• Programming: Python, C, HTML, CSS
• AI / ML: Machine Learning, Computer Vision, YOLOv8, TensorFlow, OpenCV
• LLM / AI: LangChain, RAG Systems, Hugging Face, Local LLMs, Prompt Engineering
• Development: Flask, Streamlit, REST APIs
• Tools: Git, GitHub, VS Code, LM Studio`, 'system'
        );
        break;

      case 'projects':
        this.appendLog(
          `FEATURED PROJECTS:
1. Project ARGUS [Computer Vision & Surveillance Intelligence]
2. Smart Traffic Management System [YOLOv8 + OpenCV + Streamlit]
3. Medi Assist Chatbot [Python + Flask + NLP]
4. Face Detection using OpenCV [Real-time frame processing]
5. RAG Chatbot [AI-PDF-RAG-Chatbot • LangChain + FAISS + LLMs]`, 'success'
        );
        break;

      case 'exp':
      case 'experience':
        this.appendLog(
          `EXPERIENCE:
• AI/ML Intern @ Dot Com Infoway (Madurai) - June 2026
  Focus: Python development, Retrieval-Augmented Generation, LLM integration, Chatbot development.`, 'system'
        );
        break;

      case 'contact':
        this.appendLog(
          `CONTACT CHANNELS:
• Email: samdharanrozario@gmail.com
• GitHub: https://github.com/samdroz
• LinkedIn: https://www.linkedin.com/in/samdroz/`, 'success'
        );
        break;

      case 'github':
        this.appendLog(`Opening GitHub (https://github.com/samdroz)...`, 'system');
        window.open('https://github.com/samdroz', '_blank');
        break;

      case 'clear':
        this.body.innerHTML = '';
        this.appendLog(`Terminal reset. Type 'help' for command manual.`, 'system');
        break;

      case 'exit':
      case 'quit':
        this.close();
        break;

      default:
        this.appendLog(`Command not found: '${rawCmd}'. Type 'help' to see available commands.`, 'error');
        break;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.terminalApp = new InteractiveTerminal();
});
