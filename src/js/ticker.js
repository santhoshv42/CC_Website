// Daily Verse Marquee Ticker Handler
import dailyVerses from '../data/daily_verses.json';

export function initDailyVerseTicker() {
  const tickerText = document.getElementById('tickerText');
  const tickerRef = document.getElementById('tickerRef');
  const tickerTrack = document.getElementById('tickerTrack');

  if (!dailyVerses || !dailyVerses.length) return;

  // Calculate day of year (1 - 365)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Find verse matching today's day of year or fallback to index
  let todayVerse = dailyVerses.find(v => v.day === dayOfYear) || dailyVerses[dayOfYear % dailyVerses.length] || dailyVerses[0];

  if (todayVerse) {
    if (tickerText) tickerText.textContent = `"${todayVerse.text}"`;
    if (tickerRef) tickerRef.textContent = `— ${todayVerse.reference} (${todayVerse.date})`;
  }

  // Double content inside marquee track for continuous loop effect
  if (tickerTrack && todayVerse) {
    const duplicateSpan = document.createElement('span');
    duplicateSpan.style.marginLeft = '4rem';
    duplicateSpan.innerHTML = `<span class="verse-text-span">"${todayVerse.text}"</span> <span class="verse-ref-span">— ${todayVerse.reference}</span>`;
    tickerTrack.appendChild(duplicateSpan);
  }
}
