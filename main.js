// =============================================
// MADHAV PORTFOLIO — Shared JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Active nav link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // --- Mobile menu ---
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Fade-up on scroll ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // --- Audio click feedback (Tone.js) ---
  if (typeof Tone !== 'undefined') {
    let audioReady = false;
    const synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.005, decay: 0.15, sustain: 0.05, release: 0.15 }
    }).toDestination();
    synth.volume.value = -14;

    document.body.addEventListener('click', async (e) => {
      if (!audioReady) { await Tone.start(); audioReady = true; }
      if (e.target.closest('a, button')) {
        synth.triggerAttackRelease('G5', '16n');
      }
    });
  }

});
