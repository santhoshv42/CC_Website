// Render Events and Service Timings
import eventsData from '../data/events.json';

export function initEvents() {
  const homeGrid = document.getElementById('homeTimingsGrid');
  const fullGrid = document.getElementById('eventsFullList');

  if (!eventsData || !eventsData.length) return;

  function renderTimingCard(evt) {
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

  if (fullGrid) {
    fullGrid.innerHTML = eventsData.map(renderTimingCard).join('');
  }
}
