// Testimonies Rendering & Submission Handler
import testimoniesData from '../data/testimonies.js';

export function initTestimonies() {
  const homePreview = document.getElementById('homeTestimoniesPreview');
  const fullGrid = document.getElementById('fullTestimoniesGrid');
  const modal = document.getElementById('testimonyModal');
  const openBtn = document.getElementById('openTestimonyModalBtn');
  const closeBtn = document.getElementById('closeTestimonyModal');
  const form = document.getElementById('testimonyForm');

  // Fetch local stored user testimonies + default JSON
  const storedUserTestimonies = JSON.parse(localStorage.getItem('cc_user_testimonies') || '[]');
  const allTestimonies = [...storedUserTestimonies, ...testimoniesData];

  function renderCard(t) {
    return `
      <div class="testimony-card">
        <div>
          <span class="testimony-badge">${t.category || 'Praise Record'}</span>
          <h4 class="testimony-title">${t.title}</h4>
          <p class="testimony-story">"${t.story}"</p>
        </div>
        <div class="testimony-author">
          <div class="author-avatar">${t.name.charAt(0)}</div>
          <div>
            <div class="author-name">${t.name}</div>
            <div class="author-location">${t.city} • ${t.date || 'Recent'}</div>
          </div>
        </div>
      </div>
    `;
  }

  // Render on home preview (2 items)
  if (homePreview) {
    homePreview.innerHTML = allTestimonies.slice(0, 3).map(renderCard).join('');
  }

  // Render on full page
  if (fullGrid) {
    fullGrid.innerHTML = allTestimonies.map(renderCard).join('');
  }

  // Modal Handlers
  openBtn?.addEventListener('click', () => modal?.classList.add('active'));
  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('testifierName')?.value.trim();
    const city = document.getElementById('testifierCity')?.value.trim();
    const title = document.getElementById('testimonyHeadline')?.value.trim();
    const story = document.getElementById('testimonyDetail')?.value.trim();

    if (!name || !city || !title || !story) {
      alert('Please complete all testimony fields.');
      return;
    }

    const newTestimony = {
      id: 'tst-' + Date.now(),
      name,
      city,
      title,
      story,
      category: 'Member Testimony',
      date: 'Just Now'
    };

    storedUserTestimonies.unshift(newTestimony);
    localStorage.setItem('cc_user_testimonies', JSON.stringify(storedUserTestimonies));

    form.reset();
    modal?.classList.remove('active');

    // Re-render
    const updated = [...storedUserTestimonies, ...testimoniesData];
    if (fullGrid) fullGrid.innerHTML = updated.map(renderCard).join('');
    if (homePreview) homePreview.innerHTML = updated.slice(0, 3).map(renderCard).join('');

    alert('Thank you! Your testimony has been submitted.');
  });
}
