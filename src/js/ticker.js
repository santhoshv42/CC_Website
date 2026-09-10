// Daily Verse Marquee Ticker Handler
import dailyVerses from '../data/daily_verses.js';

export function initDailyVerseTicker() {
  const tickerText = document.getElementById('tickerText');
  const tickerRef = document.getElementById('tickerRef');
  const tickerTrack = document.getElementById('tickerTrack');

  if (!dailyVerses || !dailyVerses.length) return;

  // Get current local date formatting (e.g., "Sep 10")
  const now = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthStr = months[now.getMonth()];
  const currentDayNum = now.getDate();
  const formattedToday = `${currentMonthStr} ${String(currentDayNum).padStart(2, '0')}`;

  // Calculate day of year (1 - 366)
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Match by today's date string (e.g. "Sep 10") or day of year
  let todayVerse = dailyVerses.find(v => v.date === formattedToday) ||
                   dailyVerses.find(v => v.day === dayOfYear) ||
                   dailyVerses[(dayOfYear - 1) % dailyVerses.length] ||
                   dailyVerses[0];

  if (todayVerse) {
    const displayRef = `— ${todayVerse.reference} (${formattedToday})`;

    if (tickerText) tickerText.textContent = `"${todayVerse.text}"`;
    if (tickerRef) tickerRef.textContent = displayRef;

    // Double content inside marquee track for continuous loop effect
    if (tickerTrack) {
      const existingDuplicate = tickerTrack.querySelector('.ticker-duplicate');
      if (!existingDuplicate) {
        const duplicateSpan = document.createElement('span');
        duplicateSpan.className = 'ticker-duplicate';
        duplicateSpan.style.marginLeft = '4rem';
        duplicateSpan.innerHTML = `<span class="verse-text-span">"${todayVerse.text}"</span> <span class="verse-ref-span">${displayRef}</span>`;
        tickerTrack.appendChild(duplicateSpan);
      } else {
        const dupRef = existingDuplicate.querySelector('.verse-ref-span');
        if (dupRef) dupRef.textContent = displayRef;
      }
    }
  }
}
