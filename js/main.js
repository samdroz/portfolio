/**
 * Main Application Logic for Sam Dharan Rozario R's Portfolio
 */

// Toast Notification Helper
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconName = 'activity';
  let iconColor = 'var(--accent-cyan)';
  if (type === 'success') {
    iconName = 'check-circle';
    iconColor = '#10b981';
  } else if (type === 'error') {
    iconName = 'alert-circle';
    iconColor = '#ef4444';
  }

  const iconSvg = typeof SVGIcons !== 'undefined' ? getIconSVG(iconName, 18) : '';
  toast.innerHTML = `
    <span style="display: inline-flex; color: ${iconColor}; flex-shrink: 0;">${iconSvg}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Copy Email Helper
function copyEmailToClipboard() {
  const email = (typeof portfolioData !== 'undefined' && portfolioData.personal?.social?.emailRaw) 
    ? portfolioData.personal.social.emailRaw 
    : 'samdharanrozario@gmail.com';
    
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Copied ${email} to clipboard!`, 'success');
  }).catch(() => {
    showToast(`Email: ${email}`, 'info');
  });
}

// Render Skills from data.js
function renderSkills() {
  const skills = portfolioData.skills;

  const categories = [
    { key: 'ai_ml', title: 'AI & Machine Learning', icon: 'brain', items: skills.ai_ml },
    { key: 'llm_ai', title: 'LLM & Generative AI', icon: 'sparkles', items: skills.llm_ai },
    { key: 'programming', title: 'Programming & Languages', icon: 'code', items: skills.programming },
    { key: 'development', title: 'Development & Frameworks', icon: 'layers', items: skills.development },
    { key: 'tools', title: 'Developer Tools & Platforms', icon: 'cpu', items: skills.tools }
  ];

  const target = document.getElementById('skills-render-target');
  if (!target) return;

  target.innerHTML = categories.map(cat => `
    <div class="skill-category-block">
      <div class="category-header">
        <span class="category-icon" style="display: inline-flex;">${getIconSVG(cat.icon, 22)}</span>
        <h3 class="category-title">${cat.title}</h3>
        <span class="category-count">${cat.items.length} Skills</span>
      </div>
      <div class="skills-grid">
        ${cat.items.map(skill => `
          <div class="skill-card">
            <div class="skill-icon-wrapper">
              ${getIconSVG(skill.icon, 20)}
            </div>
            <div class="skill-info">
              <h4 class="skill-name">${skill.name}</h4>
              <p class="skill-desc">${skill.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Render Projects from data.js with Filtering
function renderProjects(filter = 'all') {
  const target = document.getElementById('projects-render-target');
  if (!target) return;

  const projects = portfolioData.projects;
  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => {
        if (filter === 'cv') return p.categoryFilter === 'cv';
        if (filter === 'chatbots') return p.categoryFilter === 'chatbots';
        if (filter === 'aiml') return p.categoryFilter === 'cv' || p.categoryFilter === 'chatbots';
        return true;
      });

  target.innerHTML = filtered.map(p => `
    <div class="project-card ${p.highlight && filter === 'all' ? 'featured' : ''}" data-category="${p.categoryFilter}">
      <div>
        <div class="project-top">
          <span class="project-category-tag">${p.category}</span>
          ${p.badge ? `<span class="badge-flagship">${p.badge}</span>` : ''}
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tech-list">
          ${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="project-footer">
        <div class="project-links">
          <a href="${p.githubUrl || p.liveUrl || 'https://github.com/samdroz'}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
            ${p.customButtonLabel === 'View Project' ? getIconSVG('external-link', 15) : getIconSVG('github', 15)}
            <span>${p.customButtonLabel || 'GitHub Repo'}</span>
          </a>
          ${p.liveUrl && p.liveUrl !== p.githubUrl ? `
            <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              ${getIconSVG('external-link', 15)}
              <span>Live Demo</span>
            </a>
          ` : ''}
        </div>
        ${p.stats ? `<span class="project-stat-pill">${p.stats.label}</span>` : ''}
      </div>
    </div>
  `).join('');
}

// Setup Project Filter Buttons
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

// Render Experience from data.js
function renderExperience() {
  const target = document.getElementById('experience-render-target');
  if (!target) return;

  target.innerHTML = portfolioData.experience.map(exp => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${exp.role}</h3>
            <div class="timeline-company">${exp.company} • ${exp.location}</div>
          </div>
          <span class="timeline-date-badge">${exp.period}</span>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">${exp.description}</p>
        <ul class="timeline-points">
          ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div class="project-tech-list" style="margin-top: 1rem; margin-bottom: 0;">
          ${exp.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Render Certifications from data.js
function renderCertifications() {
  const target = document.getElementById('certifications-render-target');
  if (!target || !portfolioData.certifications) return;

  target.innerHTML = portfolioData.certifications.map(cert => `
    <div class="cert-card ${cert.proctored ? 'priority' : ''}">
      <div class="cert-card-header">
        <span class="cert-issuer">${cert.issuer}</span>
        ${cert.proctored ? `
          <span class="cert-proctored-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Proctored Assessment</span>
          </span>
        ` : ''}
      </div>
      <h4 class="cert-title">${cert.title}</h4>
      <div class="cert-card-footer">
        <span class="tech-tag">${cert.category}</span>
      </div>
    </div>
  `).join('');

  // Render Workshops & Additional Learning
  const workshopsTarget = document.getElementById('workshops-render-target');
  if (!workshopsTarget || !portfolioData.workshops) return;

  workshopsTarget.innerHTML = portfolioData.workshops.map(item => `
    <div class="workshop-card">
      <div class="workshop-type">
        <span class="pulse-dot" style="width: 6px; height: 6px; background: var(--accent-violet);"></span>
        <span>${item.type}</span>
      </div>
      <h4 class="workshop-title">${item.title}</h4>
      <p class="workshop-focus">${item.focus}</p>
    </div>
  `).join('');
}

// Navbar Scroll Effect and Active Links
function setupNavigation() {
  const navbar = document.getElementById('main-navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

  function toggleMobileMenu() {
    mobileToggle.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
    mobileBackdrop.classList.toggle('open');
    document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
}

// Mouse Follower & 3D Tilt Card Light Position
function setupMouseFollower() {
  const cursorGlow = document.getElementById('cursor-glow');
  
  window.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }

    // Set dynamic light coordinates on hovered glass cards
    document.querySelectorAll('.glass-card, .project-card, .timeline-card, .github-dashboard').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Contact Form Handler with Web3Forms AJAX Integration
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('contact-submit-btn') || form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'info');
      return;
    }

    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Please enter a valid email address.', 'info');
      return;
    }

    // Save original button content and lock button to prevent duplicate submissions
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Sending...</span>
        <svg class="btn-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
      `;
    }

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData);

      // Explicitly set dynamic subject and reply-to visitor email
      payload.subject = `Portfolio Message from ${name}`;
      payload.replyto = email;

      // Handle honeypot botcheck: remove if untouched by bots
      const botcheckField = form.querySelector('[name="botcheck"]');
      if (!botcheckField || !botcheckField.checked) {
        delete payload.botcheck;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        showToast('Message sent successfully.', 'success');
        form.reset();
      } else {
        const errorMsg = (result && result.message) ? result.message : 'Failed to send message. Please try again.';
        showToast(errorMsg, 'error');
      }
    } catch (err) {
      showToast('Unable to send message. Please check your connection and try again.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }
    }
  });
}

// Initialize Everything on Load
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderProjects();
  setupProjectFilters();
  renderExperience();
  renderCertifications();
  setupNavigation();
  setupMouseFollower();
  setupContactForm();
});
