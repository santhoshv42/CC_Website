// Navigation & View Router Logic

export function initNavigation() {
  const triggers = document.querySelectorAll('.nav-trigger');
  const views = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinks');

  function switchView(targetViewId) {
    if (!targetViewId) return;

    // Hide all views
    views.forEach(v => v.classList.remove('active-view'));

    // Show target view
    const targetView = document.getElementById(targetViewId);
    if (targetView) {
      targetView.classList.add('active-view');
    } else {
      document.getElementById('home-view')?.classList.add('active-view');
    }

    // Update active navbar link
    navLinks.forEach(link => {
      if (link.getAttribute('data-view') === targetViewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile menu if open
    if (navLinksContainer) navLinksContainer.classList.remove('open');

    // Scroll to top of window smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle click on any nav trigger button or link
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const viewId = trigger.getAttribute('data-view');
      if (viewId) {
        e.preventDefault();
        switchView(viewId);
        window.location.hash = trigger.getAttribute('href') || '';
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }

  // Check URL hash on load or URL hash changes (back/forward navigation)
  function handleHashChange() {
    const hash = window.location.hash;
    if (hash) {
      const viewIdFromHash = hash.replace('#', '') + '-view';
      const exists = document.getElementById(viewIdFromHash);
      if (exists) {
        switchView(viewIdFromHash);
        return;
      }
    }
    switchView('home-view');
  }

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}
