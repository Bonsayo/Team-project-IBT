
'use strict';
const PROJECTS_COUNT = 3;
const CATEGORIES     = ['javascript', 'html-css', 'other'];
const CAT_TAGS = {
  javascript: ['JavaScript', 'ES6+', 'DOM API', 'Fetch API'],
  'html-css':  ['HTML5', 'CSS3', 'Flexbox', 'Grid Layout'],
  other:       ['Git', 'REST API', 'Accessibility', 'Performance'],
};
const STATUSES = ['Completed', 'In Progress', 'Archived', 'Live'];
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function assignCategory(index) {
  return CATEGORIES[index % CATEGORIES.length];
}
const hamburgerBtn  = $('#hamburger-btn');
const mobileNav     = $('#mobile-nav');
const navLinks      = $$('.nav__links a, .nav__mobile a');
const sections      = $$('main section[id]');
const projectsGrid  = $('#projects-grid');
const projectStatus = $('#projects-status');
const filterBtns    = $$('.filter-btn');
const contactForm   = $('#contact-form');
const formMsg       = $('#form-msg');
const footerYear    = $('#footer-year');
footerYear.textContent = new Date().getFullYear();
hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  hamburgerBtn.classList.toggle('is-open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
});
$$('.nav__mobile a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    hamburgerBtn.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  });
});
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        const match = a.getAttribute('href') === `#${id}`;
        a.classList.toggle('active', match);
        match ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(sec => navObserver.observe(sec));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
$$('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
$$('.skill-card').forEach(card => skillObserver.observe(card));
let allProjects  = [];
let activeFilter = 'all';
let expandedCard = null;
function toggleDetail(card, project, shortTitle, catLabel, statusLabel, displayIndex) {
  const panel   = card.querySelector('.card-detail');
  const loading = card.querySelector('.detail-loading');
  const content = card.querySelector('.detail-content');
  const btn     = card.querySelector('.view-details-btn');
  if (card.classList.contains('is-expanded')) {
    card.classList.remove('is-expanded');
    panel.classList.remove('is-open');
    btn.querySelector('.btn-label').textContent = 'View Details';
    expandedCard = null;
    return;
  }
  if (expandedCard && expandedCard !== card) {
    const prevPanel   = expandedCard.querySelector('.card-detail');
    const prevBtn     = expandedCard.querySelector('.view-details-btn');
    expandedCard.classList.remove('is-expanded');
    prevPanel.classList.remove('is-open');
    prevBtn.querySelector('.btn-label').textContent = 'View Details';
  }
  expandedCard = card;
  card.classList.add('is-expanded');
  btn.querySelector('.btn-label').textContent = 'Hide Details';
  content.classList.remove('is-visible');
  loading.style.display = 'flex';
  panel.classList.add('is-open');
  setTimeout(() => {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 80);
  setTimeout(() => {
    loading.style.display = 'none';
    fillDetailContent(content, project, shortTitle, catLabel, statusLabel, displayIndex);
    content.classList.add('is-visible');
  }, 650);
}
function fillDetailContent(content, project, shortTitle, catLabel, statusLabel, displayIndex) {
  const tags = CAT_TAGS[project.category] ?? ['Web', 'Development'];
  content.querySelector('.detail-desc').textContent  = capitalize(project.body);
  content.querySelector('.d-id').textContent         = `#${project.id}`;
  content.querySelector('.d-cat').textContent        = catLabel;
  content.querySelector('.d-user').textContent       = `User ${project.userId}`;
  content.querySelector('.d-status').textContent     = statusLabel;
  const tagsEl = content.querySelector('.detail-tags');
  tagsEl.innerHTML = tags.map(t => `<span class="detail-tag">${t}</span>`).join('');
}
function buildProjectCard(project, displayIndex) {
  const card = document.createElement('article');
  card.className = 'project-card';
  card.setAttribute('role', 'listitem');
  card.dataset.category = project.category;
  card.dataset.id       = project.id;
  const statusLabel = STATUSES[project.id % STATUSES.length];
  const catLabel    = project.category === 'html-css' ? 'HTML/CSS' : capitalize(project.category);
  const shortTitle  = capitalize(project.title.split(' ').slice(0, 4).join(' '));
  card.innerHTML = `
    <div class="project-card__top">
      <span class="project-card__num">#${String(displayIndex).padStart(2, '0')}</span>
      <span class="project-card__tag">${catLabel}</span>
    </div>
    <div class="project-card__body">
      <h3 class="project-card__title">${shortTitle}</h3>
      <p  class="project-card__desc">${capitalize(project.body)}</p>
    </div>
    <div class="project-card__footer">
      <span class="project-card__id">ID #${project.id} &bull; ${statusLabel}</span>
      <button
        class="view-details-btn"
        data-project-id="${project.id}"
        aria-label="View details for ${shortTitle}"
        id="view-btn-${project.id}"
      >
        <span class="btn-label">View Details</span>
        <i class="chevron">&#x276F;</i>
      </button>
    </div>
    <!-- ── INLINE DETAIL PANEL ── -->
    <div class="card-detail" aria-live="polite">
      <!-- Loading state -->
      <div class="detail-loading" style="display:none;">
        <div class="detail-spinner"></div>
        <span>Loading details&hellip;</span>
      </div>
      <!-- Actual content (hidden until loaded) -->
      <div class="detail-content">
        <p class="detail-desc"></p>
        <div class="detail-meta">
          <div class="detail-meta-item">
            <div class="detail-meta-label">Project ID</div>
            <div class="detail-meta-value d-id"></div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">Category</div>
            <div class="detail-meta-value d-cat"></div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">Author</div>
            <div class="detail-meta-value d-user"></div>
          </div>
          <div class="detail-meta-item">
            <div class="detail-meta-label">Status</div>
            <div class="detail-meta-value d-status"></div>
          </div>
        </div>
        <div class="detail-tags"></div>
      </div>
    </div>
  `;
  card.querySelector('.view-details-btn').addEventListener('click', () => {
    toggleDetail(card, project, shortTitle, catLabel, statusLabel, displayIndex);
  });
  return card;
}
function renderProjects(projects) {
  projectsGrid.innerHTML = '';
  expandedCard = null;
  if (projects.length === 0) {
    projectsGrid.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;color:var(--clr-text-muted);padding:2rem;">
        No projects found for this category.
      </p>`;
    return;
  }
  projects.forEach((project, i) => {
    const card = buildProjectCard(project, i + 1);
    card.style.animationDelay = `${i * 0.06}s`;
    projectsGrid.appendChild(card);
  });
}
function applyFilter() {
  const filtered = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);
  renderProjects(filtered);
}
async function fetchProjects() {
  projectStatus.style.display = 'none';
  allProjects = [
    { id: 1, title: 'Weather App', body: 'A modern weather application providing real-time forecasts, beautiful UI, and detailed climate data.', category: 'javascript', userId: 1 },
    { id: 2, title: 'Addis Bank', body: 'A sleek banking dashboard for managing transactions, viewing balances, and tracking financial goals.', category: 'javascript', userId: 1 },
    { id: 3, title: 'Habesh Restaurant', body: 'A beautiful restaurant website featuring online ordering, dynamic menus, and reservation booking.', category: 'javascript', userId: 1 }
  ];
  applyFilter();
}
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    if (filter === activeFilter) return;
    activeFilter = filter;
    filterBtns.forEach(b => {
      const active = b.dataset.filter === filter;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    applyFilter();
  });
});
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function setValidity(el, invalid) {
  el.classList.toggle('invalid', invalid);
  el.setAttribute('aria-invalid', String(invalid));
}
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const nameInput  = $('#input-name');
  const emailInput = $('#input-email');
  const msgInput   = $('#input-message');
  const submitBtn  = $('#form-submit-btn');
  const nameVal  = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const msgVal   = msgInput.value.trim();
  [nameInput, emailInput, msgInput].forEach(el => setValidity(el, false));
  formMsg.textContent = '';
  formMsg.className   = 'form-msg';
  let hasError = false;
  if (!nameVal)                          { setValidity(nameInput, true);  hasError = true; }
  if (!emailVal || !EMAIL_RE.test(emailVal)) { setValidity(emailInput, true); hasError = true; }
  if (!msgVal)                           { setValidity(msgInput, true);   hasError = true; }
  if (hasError) {
    formMsg.textContent = 'Please fill in all required fields correctly.';
    formMsg.classList.add('error');
    return;
  }
  submitBtn.disabled   = true;
  submitBtn.textContent = 'Sending...';
  setTimeout(() => {
    formMsg.textContent = "Message sent! I'll get back to you within 24 hours.";
    formMsg.classList.add('success');
    contactForm.reset();
    submitBtn.disabled  = false;
    submitBtn.innerHTML = 'Send Message';
    setTimeout(() => { formMsg.textContent = ''; formMsg.className = 'form-msg'; }, 6000);
  }, 1200);
});
['input-name', 'input-email', 'input-message'].forEach(id => {
  $(`#${id}`).addEventListener('input', function () {
    if (this.value.trim()) setValidity(this, false);
  });
});
fetchProjects();
