
// ─── HUD clock ────────────────────────────────────────────
function updateClock() {
  document.getElementById('hud-time').textContent =
    new Date().toLocaleTimeString('es-PE', {hour:'2-digit',minute:'2-digit',second:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

// ─── Video data ───────────────────────────────────────────
const videos = [
  { emoji:'🌙', views:'1.2K', color_a:'#1a0a2e', color_b:'#4a0a6e', pinned:true,  private:false },
  { emoji:'🎵', views:'847',  color_a:'#0a1a2e', color_b:'#0a3a6e', pinned:false, private:false },
  { emoji:'✨', views:'2.1K', color_a:'#2e0a1a', color_b:'#6e0a3a', pinned:false, private:false },
  { emoji:'🖤', views:'534',  color_a:'#0a0a0a', color_b:'#2a1a0a', pinned:false, private:false },
  { emoji:'🎶', views:'3.4K', color_a:'#0a2e1a', color_b:'#0a5e2a', pinned:false, private:false },
  { emoji:'💫', views:'290',  color_a:'#1e1a0a', color_b:'#3e2a0a', pinned:false, private:true  },
  { emoji:'🌸', views:'1.8K', color_a:'#2e0a2a', color_b:'#5e0a5e', pinned:false, private:false },
  { emoji:'🎤', views:'420',  color_a:'#0a2e2a', color_b:'#0a4a4a', pinned:false, private:false },
  { emoji:'🌊', views:'967',  color_a:'#0a1a3e', color_b:'#0a2a6e', pinned:false, private:false },
  { emoji:'🔥', views:'5.7K', color_a:'#3e0a00', color_b:'#8e2a00', pinned:false, private:false },
  { emoji:'🦋', views:'1.1K', color_a:'#1a0a3e', color_b:'#3a0a7e', pinned:false, private:true  },
  { emoji:'🎸', views:'780',  color_a:'#2e1a00', color_b:'#4e2a00', pinned:false, private:false },
  { emoji:'🌺', views:'340',  color_a:'#3e0a1a', color_b:'#6e0a3e', pinned:false, private:false },
  { emoji:'💜', views:'620',  color_a:'#1a0a2e', color_b:'#3a0a5e', pinned:false, private:false },
  { emoji:'🎼', views:'450',  color_a:'#001e2a', color_b:'#003e4a', pinned:false, private:false },
  { emoji:'⭐', views:'2.9K', color_a:'#2e2a00', color_b:'#4e4a00', pinned:false, private:false },
  { emoji:'🕯️', views:'183',  color_a:'#1e1000', color_b:'#3e2200', pinned:false, private:true  },
  { emoji:'🎭', views:'1.5K', color_a:'#0a0a1e', color_b:'#1a1a4e', pinned:false, private:false },
  { emoji:'💎', views:'3.2K', color_a:'#001a2e', color_b:'#003a6e', pinned:false, private:false },
  { emoji:'🌟', views:'890',  color_a:'#1e1a00', color_b:'#4e3a00', pinned:false, private:false },
];

// ─── Render grid ──────────────────────────────────────────
function renderGrid() {
  const grid = document.getElementById('video-grid');
  grid.innerHTML = '';
  videos.forEach((v, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'video-thumb';
    thumb.style.setProperty('--color-a', v.color_a);
    thumb.style.setProperty('--color-b', v.color_b);
    thumb.innerHTML = `
      ${v.pinned ? '<div class="vt-pinned">📌 FIJADO</div>' : ''}
      ${v.private ? '<div class="vt-private">🔒</div>' : ''}
      <div class="vt-emoji">${v.emoji}</div>
      <div class="vt-play">▶</div>
      <div class="vt-overlay">
        <div class="vt-views">
          <span class="vt-icon">▶</span>
          <span>${v.views}</span>
        </div>
      </div>
    `;
    thumb.addEventListener('click', () => openVideo(v, i));
    // Stagger reveal
    thumb.style.opacity = '0';
    thumb.style.transform = 'scale(0.9)';
    thumb.style.transition = `opacity 0.3s ${i*40}ms, transform 0.3s ${i*40}ms`;
    grid.appendChild(thumb);
    requestAnimationFrame(() => {
      thumb.style.opacity = '1';
      thumb.style.transform = 'scale(1)';
    });
  });
}

// ─── Video modal ──────────────────────────────────────────
function openVideo(v, i) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position:fixed;inset:0;z-index:500;
    background:rgba(0,0,0,0.95);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    backdrop-filter:blur(8px);
  `;
  modal.innerHTML = `
    <div style="position:relative;width:220px;height:390px;border-radius:12px;overflow:hidden;
      background:linear-gradient(160deg,${v.color_a},${v.color_b});
      box-shadow:0 0 40px rgba(254,44,85,0.4),0 0 80px rgba(0,255,65,0.1);
      border:1px solid rgba(254,44,85,0.3);">
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:70px">${v.emoji}</div>
      <div style="position:absolute;bottom:0;left:0;right:0;padding:16px;background:linear-gradient(0deg,rgba(0,0,0,0.8),transparent)">
        <div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:4px">@keyviera12345</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.6)">✨ just vibes #parati #fyp</div>
        <div style="margin-top:8px;font-size:12px;color:rgba(255,255,255,0.5);display:flex;gap:12px">
          <span>▶ ${v.views}</span>
          <span>♡ ${Math.floor(Math.random()*80+10)}</span>
          <span>💬 ${Math.floor(Math.random()*15+1)}</span>
        </div>
      </div>
      <!-- Scan effect -->
      <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00ff41,transparent);animation:scan 2s ease-in-out infinite"></div>
      <style>@keyframes scan{0%{top:0}100%{top:100%}}</style>
    </div>
    <div style="margin-top:16px;font-family:'IBM Plex Mono',monospace;font-size:10px;color:rgba(0,255,65,0.6)">
      VIDEO #${i+1} — EXTRAÍDO CON ÉXITO ✓
    </div>
    <button onclick="this.parentElement.remove()" style="
      margin-top:12px;background:transparent;border:1px solid rgba(255,255,255,0.2);
      color:#fff;padding:8px 24px;border-radius:4px;cursor:pointer;
      font-family:'Outfit',sans-serif;font-size:14px;
    ">✕ Cerrar</button>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if(e.target===modal) modal.remove(); });
}

// ─── Tab switching ─────────────────────────────────────────
function switchTab(tab, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const grid = document.getElementById('video-grid');
  const liked = document.getElementById('liked-panel');
  if (tab === 'videos') {
    grid.style.display = 'grid';
    liked.style.display = 'none';
    renderGrid();
  } else if (tab === 'liked') {
    grid.style.display = 'none';
    liked.style.display = 'block';
  } else if (tab === 'private') {
    grid.style.display = 'grid';
    liked.style.display = 'none';
    // Show only private videos
    const grid2 = document.getElementById('video-grid');
    grid2.innerHTML = '';
    videos.filter(v => v.private).forEach((v,i) => {
      const thumb = document.createElement('div');
      thumb.className = 'video-thumb';
      thumb.style.setProperty('--color-a', v.color_a);
      thumb.style.setProperty('--color-b', v.color_b);
      thumb.innerHTML = `
        <div class="vt-private">🔒</div>
        <div class="vt-emoji">${v.emoji}</div>
        <div class="vt-play">▶</div>
        <div class="vt-overlay"><div class="vt-views"><span>🔒 PRIVADO</span></div></div>
      `;
      thumb.style.opacity='0'; thumb.style.transform='scale(0.9)';
      thumb.style.transition=`opacity 0.3s ${i*80}ms, transform 0.3s ${i*80}ms`;
      grid2.appendChild(thumb);
      requestAnimationFrame(()=>{ thumb.style.opacity='1'; thumb.style.transform='scale(1)'; });
    });
  }
}

function navClick(el) {
  document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

// ─── Init ─────────────────────────────────────────────────
renderGrid();