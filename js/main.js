$(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WEDDING_AT = new Date('2026-11-21T12:00:00+05:30').getTime();
  var NS = 'http://www.w3.org/2000/svg';

  /* ---------- SVG builders ---------- */
  function ring(count, build) {
    var s = '';
    for (var i = 0; i < count; i++) s += build(i * 360 / count, i);
    return s;
  }

  var flowerSymbols =
    '<symbol id="rose" viewBox="-50 -50 100 100">' +
      ring(5, function (a) { return '<ellipse rx="24" ry="30" transform="rotate(' + a + ') translate(0 -16)" fill="url(#gRose)" stroke="#a3203f" stroke-width=".6"/>'; }) +
      ring(5, function (a) { return '<ellipse rx="16" ry="20" transform="rotate(' + (a + 36) + ') translate(0 -9)" fill="url(#gRoseIn)" stroke="#7c0d2c" stroke-width=".5"/>'; }) +
      '<circle r="10" fill="#8e1534"/><path d="M-6 2a7 7 0 1 1 9 4M-2 -2a3 3 0 1 1 3 3" fill="none" stroke="#5c0a20" stroke-width="1.6" stroke-linecap="round"/>' +
    '</symbol>' +
    '<symbol id="marigold" viewBox="-50 -50 100 100">' +
      ring(18, function (a) { return '<ellipse rx="7" ry="20" transform="rotate(' + a + ') translate(0 -24)" fill="url(#gMari)"/>'; }) +
      ring(14, function (a) { return '<ellipse rx="6" ry="14" transform="rotate(' + (a + 10) + ') translate(0 -14)" fill="url(#gMariY)"/>'; }) +
      '<circle r="8" fill="#e2620a"/>' +
    '</symbol>' +
    '<symbol id="jasmine" viewBox="-50 -50 100 100">' +
      ring(5, function (a) { return '<path d="M0 0C-12 -14 -10 -36 0 -42C10 -36 12 -14 0 0Z" transform="rotate(' + a + ')" fill="#fffdf5" stroke="#e8dcc0" stroke-width="1"/>'; }) +
      '<circle r="5" fill="#f2c94c"/>' +
    '</symbol>' +
    '<symbol id="leaf" viewBox="-20 -50 40 100">' +
      '<path d="M0 -46C18 -24 18 22 0 46C-18 22 -18 -24 0 -46Z" fill="url(#gLeaf)"/><path d="M0 -40V40" stroke="#a7c78a" stroke-width="1.2" opacity=".7"/>' +
    '</symbol>';
  var defs = document.getElementById('svgDefs');
  defs.insertAdjacentHTML('beforeend', flowerSymbols);

  function use(id, x, y, size, rot, cls, t, d) {
    return '<g class="' + (cls || '') + '" style="--t:' + (t || 6) + 's;--d:' + (d || 0) + 's">' +
      '<use href="#' + id + '" x="' + (x - size / 2) + '" y="' + (y - size / 2) + '" width="' + size + '" height="' + size + '" transform="rotate(' + (rot || 0) + ' ' + x + ' ' + y + ')"/></g>';
  }

  var clusters = {
    a: use('leaf', 38, 120, 70, -30, 'sway', 7, -1) + use('leaf', 120, 36, 66, 60, 'sway', 8, -3) + use('leaf', 140, 100, 52, 30, 'sway', 6, -2) +
       use('marigold', 112, 80, 58, 0, 'sway', 9, -4) + use('rose', 70, 70, 86, 10, 'sway', 7, -2) +
       use('jasmine', 30, 54, 34, 0, 'bob', 5, -1) + use('jasmine', 150, 140, 26, 20, 'bob', 6, -3) + use('jasmine', 96, 132, 22, 0, 'bob', 4, -2),
    b: use('leaf', 120, 30, 70, 70, 'sway', 8, -2) + use('leaf', 30, 120, 62, -20, 'sway', 7, -4) + use('leaf', 92, 120, 50, 20, 'sway', 6, -1) +
       use('rose', 108, 92, 58, -20, 'sway', 8, -3) + use('marigold', 66, 64, 82, 0, 'sway', 10, -1) +
       use('jasmine', 140, 60, 30, 0, 'bob', 5, -2) + use('jasmine', 40, 40, 24, 30, 'bob', 6, -1) + use('rose', 46, 140, 30, 0, 'bob', 5, -3)
  };
  $('.js-cluster').each(function () {
    this.innerHTML = '<svg viewBox="0 0 180 180">' + clusters[$(this).data('variant')] + '</svg>';
  });

  function mandala() {
    var g = '<g fill="none" stroke="#d4a449" stroke-width="1">';
    var outer = g + '<circle cx="0" cy="0" r="270"/><circle cx="0" cy="0" r="250" stroke-dasharray="2 6"/>' +
      ring(32, function (a) { return '<path d="M0 -250C14 -232 14 -212 0 -196C-14 -212 -14 -232 0 -250Z" transform="rotate(' + a + ')"/>'; }) +
      ring(64, function (a) { return '<circle cx="0" cy="-262" r="2.5" transform="rotate(' + a + ')"/>'; }) + '</g>';
    var mid = g + '<circle cx="0" cy="0" r="186"/>' +
      ring(16, function (a) { return '<path d="M0 -186C34 -150 34 -110 0 -86C-34 -110 -34 -150 0 -186Z" transform="rotate(' + a + ')"/><path d="M0 -170C16 -146 16 -118 0 -102C-16 -118 -16 -146 0 -170Z" transform="rotate(' + a + ')"/>'; }) + '</g>';
    var inner = g + '<circle cx="0" cy="0" r="80"/><circle cx="0" cy="0" r="66" stroke-dasharray="3 4"/>' +
      ring(12, function (a) { return '<path d="M0 -80C20 -60 20 -36 0 -24C-20 -36 -20 -60 0 -80Z" transform="rotate(' + a + ')"/>'; }) +
      '<circle cx="0" cy="0" r="18"/></g>';
    return '<svg viewBox="-280 -280 560 560"><g class="mandala-spin">' + outer + inner + '</g><g class="mandala-spin--rev">' + mid + '</g></svg>';
  }
  $('.js-mandala').html(mandala());

  // Toran: hanging marigold strands
  (function () {
    var $t = $('.js-toran'), w = Math.min(window.innerWidth, 900), n = Math.max(7, Math.round(w / 46));
    for (var i = 0; i < n; i++) {
      var len = 3 + (i % 3 === 1 ? 2 : i % 2), h = len * 15 + 16, balls = '';
      for (var k = 0; k < len; k++) balls += '<circle cx="8" cy="' + (14 + k * 15) + '" r="7" fill="url(#' + (k % 2 ? 'gMariY' : 'gMari') + ')"/>';
      var strand = '<svg viewBox="0 0 16 ' + h + '" style="height:' + h + 'px">' +
        '<line x1="8" y1="0" x2="8" y2="' + (h - 6) + '" stroke="#a8782a" stroke-width="1"/>' + balls +
        '<path d="M8 ' + (h - 10) + 'l-4 8h8z" fill="#7a9a3c"/></svg>';
      var left = (i + .5) * (100 / n);
      $t.append('<span class="toran__strand" style="left:calc(' + left + '% - 8px);top:' + (6 + 20 * Math.sin(Math.PI * (i + .5) / n)) + 'px;--t:' + (3 + (i % 4) * .4) + 's;--d:-' + (i * .3) + 's">' + strand + '</span>');
    }
  })();

  // Event icons
  var icons = {
    diya: '<path d="M4 14c2 4 14 4 16 0z"/><path d="M12 11c-2-2-1-5 0-7 1 2 2 5 0 7z"/><path d="M9 18h6"/>',
    haldi: '<path d="M3 11h18c0 5-4 8-9 8s-9-3-9-8z"/><circle cx="9" cy="8" r="1.2"/><circle cx="13" cy="6.5" r="1.2"/><circle cx="15.5" cy="9" r="1.2"/>',
    mandap: '<path d="M3 9l9-5 9 5"/><path d="M5 9v11M19 9v11M9.5 9v11M14.5 9v11M3 20h18"/>',
    garland: '<path d="M4 4c0 9 4 14 8 14s8-5 8-14"/><circle cx="5" cy="9" r="1.3"/><circle cx="7.5" cy="13.5" r="1.3"/><circle cx="12" cy="18" r="1.5"/><circle cx="16.5" cy="13.5" r="1.3"/><circle cx="19" cy="9" r="1.3"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    dhol: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/><path d="M5 9l14 6M19 9L5 15"/>',
    thali: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><circle cx="7.5" cy="9" r="1.6"/><circle cx="16.5" cy="9" r="1.6"/><circle cx="8" cy="15.5" r="1.6"/><circle cx="16" cy="15.5" r="1.6"/>',
    agni: '<path d="M12 3c3 4 5 6 5 9a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-8z"/><path d="M4 20h16M6 20l1-3h10l1 3"/>',
    doli: '<path d="M2 9h20"/><path d="M6 9c0-3 3-5 6-5s6 2 6 5"/><path d="M7 9v9h10V9"/><path d="M10 12h4v6h-4z"/>'
  };
  $('.event__icon').each(function () {
    this.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + icons[$(this).data('icon')] + '</svg>';
  });

  /* ---------- Guest name from URL (?to=Sharma%20Family) ---------- */
  var guest = new URLSearchParams(window.location.search).get('to');
  if (guest) {
    guest = guest.trim().slice(0, 60);
    $('.js-guest-line').text('Dear ' + guest + ', you have received an invitation');
    $('.js-guest').text('Dear ' + guest).prop('hidden', false);
  }

  /* ---------- Intro twinkles + envelope ---------- */
  var $spark = $('#introSparkles');
  for (var i = 0; i < 26; i++) {
    $spark.append('<span class="twinkle" style="left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;--t:' + (2 + Math.random() * 3) + 's;--d:-' + (Math.random() * 3) + 's"></span>');
  }

  function burst($host, cx, cy, count) {
    for (var i = 0; i < count; i++) {
      var ang = Math.random() * Math.PI * 2, dist = 60 + Math.random() * 140;
      var $s = $('<span class="sparkle' + (i % 3 ? '' : ' sparkle--star') + '"></span>').css({
        left: cx, top: cy, '--x': Math.cos(ang) * dist + 'px', '--y': Math.sin(ang) * dist + 'px', animationDelay: Math.random() * .25 + 's'
      });
      $host.append($s);
      setTimeout(function () { this.remove(); }.bind($s), 1800);
    }
  }

  var opened = false;
  function openInvite() {
    if (opened) return;
    opened = true;
    var $intro = $('#intro'), off = $('#envelope').offset();
    playMusic();
    $intro.addClass('is-opening');
    burst($spark, off.left + $('#envelope').outerWidth() / 2, off.top - $(window).scrollTop() + $('#envelope').outerHeight() * .5, 34);
    setTimeout(function () { burst($spark, window.innerWidth / 2, window.innerHeight * .3, 24); }, 900);
    setTimeout(function () {
      $intro.addClass('is-done');
      $('body').removeClass('is-locked').addClass('is-ready');
      petals.start();
    }, 2100);
    setTimeout(function () { $intro.remove(); }, 3300);
  }
  $('#sealBtn, #openBtn, #envelope').on('click', openInvite);

  /* ---------- Countdown ---------- */
  var $cd = $('#countdown'), last = {};
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tickCountdown() {
    var diff = WEDDING_AT - Date.now();
    if (diff <= 0) { $cd.prop('hidden', true); $('#countdownDone').prop('hidden', false); return false; }
    var v = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
    $.each(v, function (k, n) {
      if (last[k] === n) return;
      last[k] = n;
      var el = $cd.find('[data-unit="' + k + '"]')[0];
      el.textContent = k === 'd' ? n : pad(n);
      el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
    });
    return true;
  }
  if (tickCountdown()) {
    var cdTimer = setInterval(function () { if (!tickCountdown()) clearInterval(cdTimer); }, 1000);
  }

  /* ---------- Scroll reveal ---------- */
  $('.timeline').each(function () {
    $(this).children('[data-anim]').each(function (i) { this.style.setProperty('--d', (i * .12) + 's'); });
  });
  $('.blessings__list li').each(function (i) { this.style.setProperty('--d', (i * .15) + 's'); });

  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    $('[data-anim]').each(function () { io.observe(this); });
  } else {
    $('[data-anim]').addClass('is-in');
  }

  /* ---------- Lazy map ---------- */
  var $map = $('#venueMap'), mapLoaded = false;
  function loadMap() {
    if (mapLoaded) return;
    mapLoaded = true;
    $('<iframe>', { src: $map.data('src'), title: 'Raj Palace, Dehradun on Google Maps', loading: 'lazy', referrerpolicy: 'no-referrer-when-downgrade', allowfullscreen: '' })
      .on('load', function () { $map.find('.venue__map-loader').remove(); })
      .appendTo($map);
  }
  if ('IntersectionObserver' in window) {
    var mo = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { loadMap(); mo.disconnect(); } }, { rootMargin: '400px' });
    mo.observe($map[0]);
  } else { loadMap(); }

  /* ---------- Gold particles in closing ---------- */
  var $gp = $('#goldParticles');
  for (var g = 0; g < 22; g++) {
    $gp.append('<span class="gold-dot" style="left:' + (Math.random() * 100) + '%;--s:' + (2 + Math.random() * 4) + 'px;--t:' + (7 + Math.random() * 7) + 's;--d:-' + (Math.random() * 12) + 's;--x:' + (Math.random() * 60 - 30) + 'px"></span>');
  }

  /* ---------- Falling petals (canvas) ---------- */
  var petals = (function () {
    var cv = document.getElementById('petals'), ctx = cv.getContext('2d'), list = [], running = false, raf, dpr = Math.min(window.devicePixelRatio || 1, 2), W, H;
    var colors = ['#e0607f', '#f6b3c3', '#c93a5e', '#f6941a', '#ffc23a', '#fff5e6'];
    function size() { W = window.innerWidth; H = window.innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function make(fromTop) {
      return { x: Math.random() * W, y: fromTop ? -20 - Math.random() * H * .5 : Math.random() * H, r: 5 + Math.random() * 6, vy: .5 + Math.random() * .9, sw: Math.random() * Math.PI * 2, rot: Math.random() * 6, vr: (Math.random() - .5) * .04, c: colors[(Math.random() * colors.length) | 0], a: .55 + Math.random() * .35 };
    }
    function draw(p) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = p.a; ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.moveTo(0, -p.r); ctx.bezierCurveTo(p.r, -p.r * .6, p.r * .7, p.r * .8, 0, p.r); ctx.bezierCurveTo(-p.r * .7, p.r * .8, -p.r, -p.r * .6, 0, -p.r); ctx.fill();
      ctx.restore();
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (var i = list.length - 1; i >= 0; i--) {
        var p = list[i];
        p.sw += .02; p.y += p.vy; p.x += Math.sin(p.sw) * .6; p.rot += p.vr;
        if (p.y > H + 20) { if (p.burst) { list.splice(i, 1); continue; } list[i] = make(true); }
        draw(list[i]);
      }
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (reduceMotion || running) return;
      size(); running = true;
      var n = W < 640 ? 14 : 24;
      for (var i = 0; i < n; i++) list.push(make(false));
      frame();
    }
    function shower() {
      if (reduceMotion || !running) return;
      for (var i = 0; i < 60; i++) { var p = make(true); p.vy = 1.4 + Math.random() * 1.6; p.burst = true; list.push(p); }
    }
    $(window).on('resize', function () { if (running) size(); });
    document.addEventListener('visibilitychange', function () {
      if (!running) return;
      if (document.hidden) cancelAnimationFrame(raf); else frame();
    });
    return { start: start, shower: shower };
  })();

  var showered = false;
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (e) { if (e[0].isIntersecting && !showered) { showered = true; petals.shower(); } }, { threshold: .4 });
    so.observe(document.querySelector('.finale'));
  }
  $('#showerBtn').on('click', function () {
    petals.shower();
    var r = this.getBoundingClientRect(), host = document.getElementById('goldParticles').getBoundingClientRect();
    burst($('#goldParticles'), r.left - host.left + r.width / 2, r.top - host.top + r.height / 2, 20);
  });

});

/* ---------- Music: local file, loops, starts on the first tap (browsers block sound before any tap) ---------- */
var bgm = document.getElementById('bgm');
bgm.volume = .8;
function playMusic() {
  var p = bgm.play();
  if (p && p.catch) p.catch(function () {});
}
['pointerdown', 'touchstart', 'keydown'].forEach(function (evt) {
  document.addEventListener(evt, function once() {
    if (bgm.paused) playMusic();
    document.removeEventListener(evt, once);
  }, { passive: true });
});
playMusic();
document.addEventListener('visibilitychange', function () {
  if (document.hidden) bgm.pause(); else if (bgm.currentTime > 0) playMusic();
});
