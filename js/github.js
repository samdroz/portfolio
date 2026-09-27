/**
 * GitHub Developer Activity Dashboard
 * Fetches public GitHub profile and repository metrics dynamically
 * Handles rate-limiting and offline conditions gracefully
 */

async function fetchGitHubData() {
  const username = 'samdroz';
  const profileContainer = document.getElementById('gh-profile-target');
  const reposContainer = document.getElementById('gh-repos-target');

  // Fallback data in case of API rate limits
  const fallbackProfile = {
    avatar_url: 'https://avatars.githubusercontent.com/u/10000000?v=4',
    name: 'Sam Dharan Rozario R',
    login: 'samdroz',
    bio: 'AI/ML Developer • CSE (AI & ML) Student • Computer Vision & RAG enthusiast',
    public_repos: 4,
    following: 15,
    html_url: 'https://github.com/samdroz'
  };

  const fallbackRepos = [
    {
      name: 'Project_ARGUS',
      description: 'Next-generation visual surveillance and real-time situational intelligence architecture.',
      language: 'Python',
      stargazers_count: 5,
      forks_count: 1,
      html_url: 'https://github.com/samdroz/Project_ARGUS'
    },
    {
      name: 'smart-traffic-management-system',
      description: 'An AI-powered traffic monitoring system using computer vision to detect vehicles and assist with intelligent traffic management.',
      language: 'Python',
      stargazers_count: 3,
      forks_count: 1,
      html_url: 'https://github.com/samdroz/smart-traffic-management-system'
    },
    {
      name: 'Medi_Assist_Chatbot',
      description: 'An AI-powered conversational assistant designed to provide healthcare-related information through an interactive chatbot interface.',
      language: 'Python',
      stargazers_count: 2,
      forks_count: 0,
      html_url: 'https://github.com/samdroz/Medi_Assist_Chatbot'
    },
    {
      name: 'face-detection-opencv',
      description: 'A real-time computer vision project for face detection using OpenCV and Python.',
      language: 'Python',
      stargazers_count: 1,
      forks_count: 0,
      html_url: 'https://github.com/samdroz/face-detection-opencv'
    }
  ];

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const user = userRes.ok ? await userRes.json() : fallbackProfile;

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    const repos = reposRes.ok ? await reposRes.json() : fallbackRepos;

    renderGitHubProfile(user);
    renderGitHubRepos(repos);
  } catch (err) {
    console.warn('GitHub API fetch failed, rendering fallback data:', err);
    renderGitHubProfile(fallbackProfile);
    renderGitHubRepos(fallbackRepos);
  }
}

function renderGitHubProfile(user) {
  const profileTarget = document.getElementById('gh-profile-target');
  if (!profileTarget) return;

  const githubIcon = typeof SVGIcons !== 'undefined' ? getIconSVG('github', 16) : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;

  profileTarget.innerHTML = `
    <div class="gh-profile-header">
      <div class="gh-profile-info">
        <img src="${user.avatar_url}" alt="${user.name || user.login}" class="gh-avatar" onerror="this.src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'">
        <div>
          <h3 class="gh-name">${user.name || 'Sam Dharan Rozario R'}</h3>
          <p class="gh-handle">@${user.login}</p>
        </div>
      </div>
      <a href="${user.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
        ${githubIcon}
        <span>View Profile</span>
      </a>
    </div>

    <div class="gh-stats-row">
      <div class="gh-stat-box">
        <div class="gh-stat-number">${user.public_repos ?? 4}</div>
        <div class="gh-stat-label">Repositories</div>
      </div>
      <div class="gh-stat-box">
        <div class="gh-stat-number">100%</div>
        <div class="gh-stat-label">Open Source</div>
      </div>
      <div class="gh-stat-box">
        <div class="gh-stat-number">Python</div>
        <div class="gh-stat-label">Primary Stack</div>
      </div>
    </div>
  `;
}

function renderGitHubRepos(repos) {
  const reposTarget = document.getElementById('gh-repos-target');
  if (!reposTarget) return;

  if (!Array.isArray(repos) || repos.length === 0) {
    reposTarget.innerHTML = `<p style="color: var(--text-muted);">No public repositories found.</p>`;
    return;
  }

  reposTarget.innerHTML = repos.slice(0, 4).map(repo => `
    <div class="gh-repo-item">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="font-weight: 600; color: #ffffff; font-size: 0.95rem;">
            ${repo.name}
          </a>
          <span class="tech-tag" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">${repo.language || 'Python'}</span>
        </div>
        <p style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.4;">
          ${repo.description || 'Open source repository exploring AI, Computer Vision, and Machine Learning.'}
        </p>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
        <span>★ ${repo.stargazers_count ?? 0}</span>
        <span>⑂ ${repo.forks_count ?? 0}</span>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan);">Browse Code →</a>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', fetchGitHubData);
