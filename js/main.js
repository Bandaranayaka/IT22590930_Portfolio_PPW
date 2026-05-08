/* ════════════════════════════════════════
   MAIN.JS — Thilakshana Bandaranayaka v2
   ════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  if (window.lucide) lucide.createIcons();

  // ── Cursor ──
  const cursor = document.getElementById('cursor');
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    document.body.classList.add('cur');
  });
  (function animCur() {
    cx += (mx - cx) * 0.13;
    cy += (my - cy) * 0.13;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animCur);
  })();
  document.querySelectorAll('a, button, .wpill, .ich, .tl-content, .cert-panel').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width='44px'; cursor.style.height='44px'; cursor.style.borderColor='var(--cobalt)'; });
    el.addEventListener('mouseleave', () => { cursor.style.width='28px'; cursor.style.height='28px'; cursor.style.borderColor='var(--cyan)'; });
  });

  // ── Scroll progress ──
  const bar = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = Math.min(100, pct * 100) + '%';
  }, { passive: true });

  // ── Side nav ──
  const secs = document.querySelectorAll('section[id]');
  const dots = document.querySelectorAll('.dn');
  window.addEventListener('scroll', () => {
    const mid = window.scrollY + window.innerHeight * 0.45;
    secs.forEach(s => {
      if (mid >= s.offsetTop && mid < s.offsetTop + s.offsetHeight) {
        dots.forEach(d => d.classList.remove('active'));
        const d = document.querySelector(`.dn[href="#${s.id}"]`);
        if (d) d.classList.add('active');
      }
    });
  }, { passive: true });

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── Journal week tabs ──
  const wpills = document.querySelectorAll('.wpill');
  const jpanels = document.querySelectorAll('.jp');
  wpills.forEach(p => {
    p.addEventListener('click', () => {
      const w = p.dataset.w;
      wpills.forEach(x => x.classList.remove('active'));
      jpanels.forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      const panel = document.querySelector(`.jp[data-w="${w}"]`);
      if (panel) {
        panel.classList.add('active');
        panel.querySelectorAll('.gb').forEach((g, i) => {
          g.style.opacity = '0';
          g.style.transform = 'translateY(10px)';
          setTimeout(() => {
            g.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            g.style.opacity = '1';
            g.style.transform = 'translateY(0)';
          }, i * 50);
        });
      }
    });
  });

  // ── Skills animate ──
  const fills = document.querySelectorAll('.ski-fill');
  let done = false;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      fills.forEach((f, i) => {
        const t = f.style.getPropertyValue('--w');
        f.style.setProperty('--w', '0%');
        setTimeout(() => f.style.setProperty('--w', t), i * 140 + 200);
      });
    }
  }, { threshold: 0.3 });
  const cs = document.getElementById('career');
  if (cs) obs.observe(cs);

  // ── Reveal on scroll ──
  const els = document.querySelectorAll('.gb, .ich, .tl-content, .ski, .cve, .cert-panel');
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  });
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }, 30);
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => ro.observe(el));

});
