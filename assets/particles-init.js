// Shared particles.js initializer used by all pages
(function(){
  if (!window.particlesJS) return;
  try {
    particlesJS('particles-js', {
      particles: {
        number: { value: 120, density: { enable: true, value_area: 900 } },
        color: { value: ['#3b82f6', '#8b5cf6', '#22d3ee'] },
        shape: { type: 'circle' },
        opacity: { value: 0.6, random: true, anim: { enable: true, speed: 0.6, opacity_min: 0.15, sync: false } },
        size: { value: 2.6, random: true, anim: { enable: true, speed: 2, size_min: 0.6, sync: false } },
        line_linked: { enable: true, distance: 140, color: '#3b82f6', opacity: 0.35, width: 1 },
        move: { enable: true, speed: 1.8, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: true, rotateX: 1200, rotateY: 800 } }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: {
          grab: { distance: 180, line_linked: { opacity: 0.6 } },
          bubble: { distance: 280, size: 5, duration: 2, opacity: 0.8, speed: 3 },
          repulse: { distance: 180, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });
  } catch (e) { console.warn('particles-init failed', e); }
})();
