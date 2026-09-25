// Render Events and Service Timings
import eventsData from '../data/events.js';

export function initEvents() {
  const homeGrid = document.getElementById('homeTimingsGrid');
  const aboutGrid = document.getElementById('aboutTimingsGrid');
  const fullGrid = document.getElementById('eventsFullList');

  if (!eventsData || !eventsData.length) return;

  function renderTimingCard(evt) {
    const imgHtml = evt.image ? `
      <div class="timing-card-image" data-title="${evt.title}" data-badge="${evt.badge || evt.category}">
        <img src="${evt.image}" onerror="if (this.src.includes('/public/')) { this.src = this.src.replace('/public/', '/'); } else { this.src='./assets/church_hero.png'; }" alt="${evt.title}">
      </div>
    ` : '';

    const detailsHtml = evt.details ? `
      <div class="timing-details">
        ${evt.details.replace(/\n/g, '<br>')}
      </div>
    ` : '';

    const noteHtml = evt.note ? `
      <div class="timing-note">
        ${evt.note}
      </div>
    ` : '';

    return `
      <div class="timing-card">
        ${imgHtml}
        <div class="timing-card-body">
          <span class="timing-day-badge">${evt.badge || evt.category}</span>
          <h3 class="timing-title">${evt.title}</h3>
          <div class="timing-time">
            <span>⏰</span> <span>${evt.day} — ${evt.time}</span>
          </div>
          ${detailsHtml}
          <p class="timing-desc">${evt.description}</p>
          ${noteHtml}
        </div>
        <div class="timing-card-footer">
          <span style="flex-shrink:0;">📍</span>
          <span>${evt.location}</span>
        </div>
      </div>
    `;
  }

  if (homeGrid) {
    homeGrid.innerHTML = eventsData.map(renderTimingCard).join('');
  }

  if (aboutGrid) {
    aboutGrid.innerHTML = eventsData.map(renderTimingCard).join('');
  }

  if (fullGrid) {
    fullGrid.innerHTML = eventsData.map(renderTimingCard).join('');
  }
}
