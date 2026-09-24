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
  toast.className = 'toast';
  const iconSvg = typeof SVGIcons !== 'undefined' ? getIconSVG(type === 'success' ? 'check-circle' : 'activity', 18) : '';
  toast.innerHTML = `
    <span style="display: inline-flex; color: var(--accent-cyan);">${iconSvg}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
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
  if (!target) return;

  target.innerHTML = portfolioData.certifications.map(cert => `
    <div class="cert-card">
      <span class="cert-issuer">${cert.issuer} • ${cert.date}</span>
      <h4 class="cert-title">${cert.title}</h4>
      <p style="font-size: 0.85rem; color: var(--text-secondary);">${cert.desc}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto; padding-top: 0.75rem;">
        ${cert.skills.map(s => `<span class="tech-tag" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">${s}</span>`).join('')}
      </div>
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

// Contact Form Handler
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'info');
      return;
    }

    const mailtoUrl = `mailto:samdharanrozario@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    showToast('Redirecting to your email client...', 'success');
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);

    form.reset();
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
