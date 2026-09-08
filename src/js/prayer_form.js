// Prayer Request Form Validation & Processing

export function initPrayerForm() {
  const prayerForm = document.getElementById('prayerForm');
  const prayerSuccessModal = document.getElementById('prayerSuccessModal');
  const closePrayerSuccessModal = document.getElementById('closePrayerSuccessModal');
  const btnDonePrayerModal = document.getElementById('btnDonePrayerModal');

  if (!prayerForm) return;

  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const nameInput = document.getElementById('fullName');
  const messageInput = document.getElementById('prayerMessage');
  const categorySelect = document.getElementById('prayerCategory');

  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const nameError = document.getElementById('nameError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    if (!email) return 'Email address is required.';
    // Check standard email pattern with a valid alphabetic TLD of 2+ chars
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address (e.g., name@example.com).';
    }
    // Verify TLD is not numeric or invalid
    const parts = email.split('@');
    if (parts.length === 2) {
      const domainParts = parts[1].split('.');
      const tld = domainParts[domainParts.length - 1];
      if (!tld || /^\d+$/.test(tld)) {
        return 'Email must end with a valid domain (e.g., .com, .org).';
      }
    }
    return '';
  }

  function validatePhone(phone) {
    if (!phone) return 'Phone / WhatsApp number is required.';
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) {
      return 'Please enter a valid 10-digit phone number.';
    }
    return '';
  }

  function clearError(input, errorElement) {
    if (input) input.classList.remove('input-error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }

  function showError(input, errorElement, msg) {
    if (input) input.classList.add('input-error');
    if (errorElement) {
      errorElement.textContent = '⚠️ ' + msg;
      errorElement.style.display = 'block';
    }
  }

  // Real-time listener clear on input & 10-digit restriction
  emailInput?.addEventListener('input', () => {
    const err = validateEmail(emailInput.value.trim());
    if (!err) clearError(emailInput, emailError);
  });

  phoneInput?.addEventListener('input', () => {
    // Keep only numeric digits and cap at 10 digits
    let digitsOnly = phoneInput.value.replace(/\D/g, '');
    if (digitsOnly.length > 10) {
      digitsOnly = digitsOnly.slice(0, 10);
    }
    phoneInput.value = digitsOnly;

    const err = validatePhone(digitsOnly);
    if (!err) {
      clearError(phoneInput, phoneError);
    }
  });

  nameInput?.addEventListener('input', () => {
    if (nameInput.value.trim()) clearError(nameInput, nameError);
  });

  messageInput?.addEventListener('input', () => {
    if (messageInput.value.trim()) clearError(messageInput, messageError);
  });

  prayerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';
    const category = categorySelect?.value || '';

    let isValid = true;
    let firstInvalidInput = null;

    // Validate Name
    if (!name) {
      showError(nameInput, nameError, 'Full name is required.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = nameInput;
    } else {
      clearError(nameInput, nameError);
    }

    // Validate Email
    const emailErr = validateEmail(email);
    if (emailErr) {
      showError(emailInput, emailError, emailErr);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else {
      clearError(emailInput, emailError);
    }

    // Validate Phone
    const phoneErr = validatePhone(phone);
    if (phoneErr) {
      showError(phoneInput, phoneError, phoneErr);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = phoneInput;
    } else {
      clearError(phoneInput, phoneError);
    }

    // Validate Message
    if (!message) {
      showError(messageInput, messageError, 'Please enter your prayer request details.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = messageInput;
    } else {
      clearError(messageInput, messageError);
    }

    if (!isValid) {
      firstInvalidInput?.focus();
      return;
    }

    // Create Prayer Submission Record
    const newSubmission = {
      id: 'pr-' + Date.now(),
      name,
      email,
      phone,
      category,
      message,
      timestamp: new Date().toISOString()
    };

    const existingRequests = JSON.parse(localStorage.getItem('cc_prayer_requests') || '[]');
    existingRequests.push(newSubmission);
    localStorage.setItem('cc_prayer_requests', JSON.stringify(existingRequests));

    // Reset Form & Clear Errors
    prayerForm.reset();
    clearError(emailInput, emailError);
    clearError(phoneInput, phoneError);
    clearError(nameInput, nameError);
    clearError(messageInput, messageError);

    // Show Confirmation Modal
    if (prayerSuccessModal) {
      prayerSuccessModal.classList.add('active');
    }
  });

  // Modal Dismiss logic
  function closeModal() {
    if (prayerSuccessModal) {
      prayerSuccessModal.classList.remove('active');
    }
  }

  closePrayerSuccessModal?.addEventListener('click', closeModal);
  btnDonePrayerModal?.addEventListener('click', () => {
    closeModal();
    const homeTrigger = document.querySelector('[data-view="home-view"]');
    if (homeTrigger) homeTrigger.click();
  });
}
