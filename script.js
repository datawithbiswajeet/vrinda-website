/* VRINDA AI ANALYTICS - script.js — Dark Premium Theme */
function vrindaInit() {

  /* ---- 1. PARTICLES (Dark Theme) ---- */
  var canvas = document.getElementById('particleCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W, H, mx = -9999, my = -9999;
    function resizeCanvas() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', function() { setTimeout(resizeCanvas, 300); });
    window.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });
    window.addEventListener('touchmove', function(e) {
      if (e.touches.length > 0) { mx = e.touches[0].clientX; my = e.touches[0].clientY; }
    }, { passive: true });
    var COUNT = window.innerWidth < 768 ? 50 : 100;
    var pts = [];
    for (var k = 0; k < COUNT; k++) {
      pts.push({
        x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
        r: Math.random()*1.8+0.4,
        a: Math.random()*0.5+0.15,
        col: k%3===0 ? '139,92,246' : k%3===1 ? '6,182,212' : '167,139,250'
      });
    }
    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        for (var j = i+1; j < pts.length; j++) {
          var dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle='rgba(139,92,246,'+(0.18*(1-d/120)).toFixed(3)+')';
            ctx.lineWidth=0.7; ctx.stroke();
          }
        }
        var ex=pts[i].x-mx, ey=pts[i].y-my, ed=Math.sqrt(ex*ex+ey*ey);
        if (ed < 180) {
          ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(mx,my);
          ctx.strokeStyle='rgba(6,182,212,'+(0.3*(1-ed/180)).toFixed(3)+')';
          ctx.lineWidth=1; ctx.stroke();
        }
      }
      for (var i = 0; i < pts.length; i++) {
        var p=pts[i]; p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.2832);
        ctx.fillStyle='rgba('+p.col+','+p.a+')'; ctx.fill();
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---- 2. JS FLAG ---- */
  document.body.classList.add('js-loaded');

  /* ---- 3. SCROLL REVEAL ---- */
  document.querySelectorAll('.hero .reveal,.hero .reveal-right,.hero .reveal-float,.hero .reveal-left')
    .forEach(function(e){ e.classList.add('visible'); });
  var allReveal = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-float');
  if (window.IntersectionObserver) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.07 });
    allReveal.forEach(function(el){ io.observe(el); });
  } else {
    allReveal.forEach(function(el){ el.classList.add('visible'); });
  }

  /* ---- 4. NAVBAR ---- */
  var nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ---- 5. HAMBURGER ---- */
  var hbg = document.getElementById('hamburger');
  var nLnk = document.querySelector('.nav-links');
  if (hbg && nLnk) {
    hbg.addEventListener('click', function() {
      nLnk.classList.toggle('nav-open');
      hbg.classList.toggle('hbg-open');
    });
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      a.addEventListener('click', function() {
        nLnk.classList.remove('nav-open');
        hbg.classList.remove('hbg-open');
      });
    });
  }
  var ms = document.createElement('style');
  ms.textContent = '@media(max-width:900px){.nav-links{display:flex!important;position:fixed;top:72px;left:0;right:0;background:rgba(8,11,22,.97);backdrop-filter:blur(24px);flex-direction:column;padding:24px 5vw 32px;gap:20px;transform:translateY(-130%);transition:transform .4s ease;border-bottom:1px solid rgba(139,92,246,.15);z-index:999}.nav-links.nav-open{transform:translateY(0)}.nav-links a{font-size:16px;color:#f1f5f9!important;font-weight:700!important}.nav-links a::after{display:none!important}.hbg-open span:nth-child(1){transform:translateY(7px) rotate(45deg)}.hbg-open span:nth-child(2){opacity:0}.hbg-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}}';
  document.head.appendChild(ms);

  /* ---- 6. 3D TILT — desktop only ---- */
  if (!('ontouchstart' in window) && window.innerWidth > 900) {
    document.querySelectorAll('.tilt-card').forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var b = card.getBoundingClientRect();
        var rX = ((e.clientY - b.top - b.height/2) / b.height) * -10;
        var rY = ((e.clientX - b.left - b.width/2) / b.width) * 10;
        card.style.transform = 'perspective(700px) rotateX('+rX+'deg) rotateY('+rY+'deg) scale3d(1.02,1.02,1.02)';
        card.style.transition = 'transform 0.08s linear';
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = 'none';
        card.style.transition = 'transform 0.5s ease';
      });
    });
  }

  /* ---- 7. FAQ ACCORDION ---- */
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.parentElement;
      var isActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item.active').forEach(function(el) { el.classList.remove('active'); });
      // Toggle current
      if (!isActive) item.classList.add('active');
    });
  });

  /* ---- 8. CONTACT FORM — EmailJS ---- */
  var form = document.getElementById('contactForm');
  var formMsg = document.getElementById('formMsg');
  var submitBtn = document.getElementById('submitBtn');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      var params = {
        name:    document.getElementById('ejs_name').value.trim(),
        email:   document.getElementById('ejs_email').value.trim(),
        company: document.getElementById('ejs_company').value.trim() || 'Not provided',
        service: document.getElementById('ejs_service').value || 'Not selected',
        message: document.getElementById('ejs_message').value.trim()
      };
      emailjs.send('service_kjgvh4l', 'template_e42goq1', params)
        .then(function() {
          submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
          submitBtn.style.background = 'linear-gradient(135deg,#16a34a,#15803d)';
          submitBtn.disabled = false;
          formMsg.style.display = 'block';
          formMsg.style.color = '#22c55e';
          formMsg.textContent = 'Thank you! We will get back to you within 24 hours.';
          form.reset();
          setTimeout(function() {
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            submitBtn.style.background = '';
            formMsg.style.display = 'none';
          }, 5000);
        })
        .catch(function(err) {
          submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          formMsg.style.display = 'block';
          formMsg.style.color = '#ef4444';
          formMsg.textContent = 'Failed. Please email: info@vrindaai.com';
          console.error('EmailJS error:', err);
        });
    });
  }

  /* ---- 9. SMOOTH ANCHOR SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', vrindaInit);
} else {
  vrindaInit();
}