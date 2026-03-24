/* ═══════════════════════════════════════
   VRINDA AI ANALYTICS — script.js FINAL
═══════════════════════════════════════ */

/* ── safe starter: works whether DOM ready or not ── */
function vrindaInit() {

  /* ══════════════════════════════════════
     1. PARTICLES + MOUSE EFFECT
  ══════════════════════════════════════ */
  var canvas = document.getElementById('particleCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width  = window.innerWidth;
    var H = canvas.height = window.innerHeight;
    var mx = -9999, my = -9999;

    window.addEventListener('resize', function() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });
    window.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });

    var pts = [];
    for (var k = 0; k < 100; k++) {
      pts.push({
        x:  Math.random() * W, y:  Math.random() * H,
        vx: (Math.random()-0.5)*0.45, vy: (Math.random()-0.5)*0.45,
        r:  Math.random()*1.6+0.4,    a:  Math.random()*0.55+0.15,
        col: k%2===0 ? '14,165,233' : '34,211,238'
      });
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        for (var j = i+1; j < pts.length; j++) {
          var dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
          if (d < 115) {
            ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle='rgba(14,165,233,'+(0.28*(1-d/115)).toFixed(3)+')';
            ctx.lineWidth=0.65; ctx.stroke();
          }
        }
        var ex=pts[i].x-mx, ey=pts[i].y-my, ed=Math.sqrt(ex*ex+ey*ey);
        if (ed < 170) {
          ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(mx,my);
          ctx.strokeStyle='rgba(34,211,238,'+(0.55*(1-ed/170)).toFixed(3)+')';
          ctx.lineWidth=1; ctx.stroke();
        }
      }
      for (var i = 0; i < pts.length; i++) {
        var p=pts[i]; p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.2832);
        ctx.fillStyle='rgba('+p.col+','+p.a+')'; ctx.fill();
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ══════════════════════════════════════
     2. TYPEWRITER — most reliable version
  ══════════════════════════════════════ */
  function startTypewriter() {
    var el = document.getElementById('typewriter');
    if (!el) { setTimeout(startTypewriter, 100); return; }

    var WORDS = ['Reports', 'Dashboards', 'MIS Systems', 'Data Pipelines', 'Insights'];
    var wi=0, ci=0, del=false;

    function tick() {
      var w = WORDS[wi];
      if (!del) {
        ci++;
        el.textContent = w.substring(0, ci);
        if (ci >= w.length) { del=true; setTimeout(tick, 1800); return; }
        setTimeout(tick, 90);
      } else {
        ci--;
        el.textContent = w.substring(0, ci);
        if (ci <= 0) { del=false; wi=(wi+1)%WORDS.length; setTimeout(tick, 350); return; }
        setTimeout(tick, 55);
      }
    }
    el.textContent = '';
    setTimeout(tick, 1000);
  }
  startTypewriter();

  /* ══════════════════════════════════════
     3. JS FLAG → CSS animations activate
  ══════════════════════════════════════ */
  document.body.classList.add('js-loaded');

  /* ══════════════════════════════════════
     4. SCROLL REVEAL
  ══════════════════════════════════════ */
  /* hero always visible immediately */
  var heroEls = document.querySelectorAll('.hero .reveal, .hero .reveal-right, .hero .reveal-float, .hero .reveal-left');
  heroEls.forEach(function(e){ e.classList.add('visible'); });

  var allReveal = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-float');
  if (window.IntersectionObserver) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.07 });
    allReveal.forEach(function(el){ io.observe(el); });
  } else {
    allReveal.forEach(function(el){ el.classList.add('visible'); });
  }

  /* ══════════════════════════════════════
     5. NAVBAR
  ══════════════════════════════════════ */
  var nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', function(){
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive:true });
  }

  /* ══════════════════════════════════════
     6. HAMBURGER
  ══════════════════════════════════════ */
  var hbg = document.getElementById('hamburger');
  var nLnk = document.querySelector('.nav-links');
  if (hbg && nLnk) {
    hbg.addEventListener('click', function(){
      nLnk.classList.toggle('nav-open');
      hbg.classList.toggle('hbg-open');
    });
    document.querySelectorAll('.nav-links a').forEach(function(a){
      a.addEventListener('click', function(){ nLnk.classList.remove('nav-open'); hbg.classList.remove('hbg-open'); });
    });
  }
  var ms = document.createElement('style');
  ms.textContent='@media(max-width:900px){.nav-links{display:flex!important;position:fixed;top:72px;left:0;right:0;background:rgba(3,7,18,.98);backdrop-filter:blur(20px);flex-direction:column;padding:24px 5vw 32px;gap:20px;transform:translateY(-130%);transition:transform .4s ease;border-bottom:1px solid rgba(14,165,233,.18);z-index:999}.nav-links.nav-open{transform:translateY(0)}.nav-links a{font-size:16px;color:#94a3b8}.hbg-open span:nth-child(1){transform:translateY(7px) rotate(45deg)}.hbg-open span:nth-child(2){opacity:0}.hbg-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}}';
  document.head.appendChild(ms);

  /* ══════════════════════════════════════
     7. CUSTOM CURSOR
  ══════════════════════════════════════ */
  var dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
  if (dot && ring && window.matchMedia('(pointer:fine)').matches) {
    var rx=0,ry=0,cx=0,cy=0;
    document.addEventListener('mousemove',function(e){
      cx=e.clientX; cy=e.clientY;
      dot.style.left=cx+'px'; dot.style.top=cy+'px';
    });
    (function animRing(){ rx+=(cx-rx)*0.13; ry+=(cy-ry)*0.13; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animRing); })();
  } else {
    if(dot) dot.style.display='none';
    if(ring) ring.style.display='none';
  }

  /* ══════════════════════════════════════
     8. 3D TILT
  ══════════════════════════════════════ */
  document.querySelectorAll('.tilt-card').forEach(function(card){
    card.addEventListener('mousemove',function(e){
      var b=card.getBoundingClientRect();
      var rX=((e.clientY-b.top-b.height/2)/b.height)*-12;
      var rY=((e.clientX-b.left-b.width/2)/b.width)*12;
      card.style.transform='perspective(700px) rotateX('+rX+'deg) rotateY('+rY+'deg) scale3d(1.03,1.03,1.03)';
      card.style.transition='transform 0.08s linear';
    });
    card.addEventListener('mouseleave',function(){
      card.style.transform='none'; card.style.transition='transform 0.5s ease';
    });
  });

  /* ══════════════════════════════════════
     9. CONTACT FORM — EmailJS
  ══════════════════════════════════════ */
  var form      = document.getElementById('contactForm');
  var formMsg   = document.getElementById('formMsg');
  var submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      /* loading state */
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled  = true;
      submitBtn.style.opacity = '0.8';

      /* collect values */
      var params = {
        name:    document.getElementById('ejs_name').value.trim(),
        email:   document.getElementById('ejs_email').value.trim(),
        company: document.getElementById('ejs_company').value.trim() || 'Not provided',
        service: document.getElementById('ejs_service').value || 'Not selected',
        message: document.getElementById('ejs_message').value.trim()
      };

      /* send via EmailJS */
      emailjs.send('service_kjgvh4l', 'template_e42goq1', params)
        .then(function() {
          submitBtn.innerHTML        = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
          submitBtn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
          submitBtn.style.boxShadow  = '0 0 30px rgba(34,197,94,0.4)';
          submitBtn.style.opacity    = '1';
          submitBtn.disabled         = false;
          formMsg.style.display      = 'block';
          formMsg.style.color        = '#22c55e';
          formMsg.textContent        = 'Thank you! We will get back to you within 24 hours.';
          form.reset();
          setTimeout(function() {
            submitBtn.innerHTML        = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            submitBtn.style.background = '';
            submitBtn.style.boxShadow  = '';
            formMsg.style.display      = 'none';
          }, 4000);
        })
        .catch(function(error) {
          submitBtn.innerHTML        = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
          submitBtn.style.background = '';
          submitBtn.disabled         = false;
          submitBtn.style.opacity    = '1';
          formMsg.style.display      = 'block';
          formMsg.style.color        = '#ef4444';
          formMsg.textContent        = 'Something went wrong. Please email us at vrindaaianalytics@gmail.com';
          console.error('EmailJS error:', error);
        });
    });
  }

  console.log('%c VRINDA AI ANALYTICS — Loaded ✓ ', 'background:#0ea5e9;color:#000;font-weight:bold;font-size:13px;padding:4px 10px;border-radius:4px;');
}

/* ── trigger: whichever fires first ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', vrindaInit);
} else {
  vrindaInit();
}
