// Main JavaScript Entrypoint for Calvary Church Website
import { initDailyVerseTicker } from './ticker.js';
import { initNavigation } from './navigation.js';
import { initCopyHelper } from './copy_helper.js';
import { initPrayerForm } from './prayer_form.js';
import { initTestimonies } from './testimonies.js';
import { initEvents } from './events_render.js';

document.addEventListener('DOMContentLoaded', () => {
  initDailyVerseTicker();
  initNavigation();
  initCopyHelper();
  initPrayerForm();
  initTestimonies();
  initEvents();
  console.log('Calvary Church Website initialized successfully.');
});
