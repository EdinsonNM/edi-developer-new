"use client";

import { useEffect, useRef } from "react";

/**
 * Toda la lógica imperativa del landing: grid en perspectiva (canvas),
 * cursor custom, reveals on-scroll, video de fondo con scrubbing suavizado,
 * sección activa, scroll horizontal anclado, botones magnéticos, reloj y contadores.
 * Trabaja por atributos data-* dentro de `rootRef`, así que las secciones solo
 * necesitan declararlos en su markup.
 */
export function useHomeEffects(lang: string) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const hwrapRef = useRef<HTMLElement>(null);
  const htrackRef = useRef<HTMLDivElement>(null);
  const hProgRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    const cleanups: Array<() => void> = [];

    /* ---------- canvas: grid en perspectiva monocromo ---------- */
    let raf = 0;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let cw = 0, ch = 0;
    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = canvas.clientWidth; ch = canvas.clientHeight;
      canvas.width = cw * dpr; canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const drawFrame = (time: number) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, cw, ch);
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      const px = mouse.x - 0.5, py = mouse.y - 0.5;
      const drift = reduced ? 0 : Math.sin(time * 0.15) * 0.01;
      ctx.save();
      ctx.lineWidth = 1;
      const horizon = ch * (0.66 + py * 0.04), vanX = cw * (0.5 + px * 0.12 + drift);
      for (let i = -12; i <= 12; i++) {
        const fx = vanX + (i / 12) * cw * 1.5;
        ctx.strokeStyle = "rgba(255,255,255," + (0.05 - (Math.abs(i) / 12) * 0.035) + ")";
        ctx.beginPath(); ctx.moveTo(vanX, horizon); ctx.lineTo(fx, ch); ctx.stroke();
      }
      for (let j = 1; j <= 9; j++) {
        const yy = horizon + Math.pow(j / 9, 2.3) * (ch - horizon);
        ctx.strokeStyle = "rgba(255,255,255," + 0.06 * (1 - j / 10) + ")";
        ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(cw, yy); ctx.stroke();
      }
      ctx.restore();
    };
    if (canvas && ctx) {
      resizeCanvas();
      const onMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.tx = (e.clientX - rect.left) / rect.width;
        mouse.ty = (e.clientY - rect.top) / rect.height;
      };
      canvas.parentElement?.addEventListener("mousemove", onMove);
      cleanups.push(() => canvas.parentElement?.removeEventListener("mousemove", onMove));
      if (reduced) {
        drawFrame(0);
      } else {
        const t0 = performance.now();
        const loop = (t: number) => { drawFrame((t - t0) / 1000); raf = requestAnimationFrame(loop); };
        raf = requestAnimationFrame(loop);
      }
    }

    /* ---------- cursor custom ---------- */
    let curRaf = 0;
    const dot = dotRef.current, ring = ringRef.current;
    if (dot && ring && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
      let rx = 0, ry = 0, mx = 0, my = 0;
      const onMove = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      };
      window.addEventListener("mousemove", onMove);
      const follow = () => {
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
        curRaf = requestAnimationFrame(follow);
      };
      follow();
      const hovs = q("[data-hov]");
      const enter = () => { ring.style.width = "52px"; ring.style.height = "52px"; ring.style.borderColor = "rgba(255,255,255,.6)"; };
      const leave = () => { ring.style.width = "30px"; ring.style.height = "30px"; ring.style.borderColor = "rgba(255,255,255,.35)"; };
      hovs.forEach((el) => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMove);
        hovs.forEach((el) => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
      });
    }

    /* ---------- reveals ---------- */
    const revEls = q("[data-reveal]");
    let revealCheck: (() => void) | null = null;
    let revealTimer: ReturnType<typeof setTimeout> | null = null;
    if (reduced) {
      revEls.forEach((e) => (e.style.opacity = "1"));
    } else {
      revEls.forEach((e) => {
        delete e.dataset.rv; // estado limpio en cada montaje (evita quedar oculto en StrictMode dev)
        e.style.opacity = "0";
        e.style.transform = "translateY(26px)";
        e.style.transition = "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)";
      });
      const reveal = (el: HTMLElement) => {
        if (el.dataset.rv) return; el.dataset.rv = "1";
        const sibs = Array.from(el.parentElement ? el.parentElement.querySelectorAll<HTMLElement>(":scope > [data-reveal]") : [el]);
        const idx = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = idx * 80 + "ms";
        el.style.opacity = "1"; el.style.transform = "none";
        // al terminar la animación, soltar la capa GPU: el texto vuelve a ser estático
        // (evita re-pintados que cambiaban el color de los títulos al scrollear)
        const done = () => {
          el.removeEventListener("transitionend", done);
          el.style.transition = ""; el.style.transitionDelay = "";
          el.style.transform = ""; el.style.willChange = "";
        };
        el.addEventListener("transitionend", done);
      };
      const inView = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return r.top < (window.innerHeight || 0) * 0.92 && r.bottom > 0;
      };
      revEls.forEach((e) => { if (inView(e)) reveal(e); });
      const io = new IntersectionObserver(
        (ents) => ents.forEach((en) => { if (en.isIntersecting) { reveal(en.target as HTMLElement); io.unobserve(en.target); } }),
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
      );
      revEls.forEach((e) => { if (!e.dataset.rv) io.observe(e); });
      revealCheck = () => revEls.forEach((e) => { if (!e.dataset.rv && inView(e)) reveal(e); });
      revealTimer = setTimeout(() => revEls.forEach((e) => { if (!e.dataset.rv) reveal(e); }), 1400);
      cleanups.push(() => io.disconnect());
    }

    /* ---------- video de fondo con scrubbing suavizado ---------- */
    const v = videoRef.current;
    let videoSeek: (() => void) | null = null;
    let videoRaf = 0;
    if (v) {
      v.muted = true; v.playsInline = true;
      if (!reduced) {
        let targetTime = 0;   // destino según scroll (barato de calcular)
        let displayTime = 0;  // tiempo suavizado que perseguimos
        let metaReady = false;
        const computeTarget = () => {
          if (!isFinite(v.duration) || v.duration <= 0) return;
          const max = document.documentElement.scrollHeight - window.innerHeight || 1;
          const prog = Math.min(1, Math.max(0, window.scrollY / max));
          targetTime = prog * v.duration;
        };
        const onMeta = () => { metaReady = true; displayTime = v.currentTime || 0; computeTarget(); };
        v.addEventListener("loadedmetadata", onMeta);
        if (v.readyState >= 1) onMeta();
        const tickVideo = () => {
          if (metaReady && isFinite(v.duration) && v.duration > 0) {
            displayTime += (targetTime - displayTime) * 0.14;
            if (Math.abs(targetTime - displayTime) < 0.01) displayTime = targetTime;
            if (!v.seeking && Math.abs((v.currentTime || 0) - displayTime) > 0.033) {
              try { v.currentTime = displayTime; } catch { /* noop */ }
            }
          }
          videoRaf = requestAnimationFrame(tickVideo);
        };
        videoRaf = requestAnimationFrame(tickVideo);
        videoSeek = computeTarget;
        computeTarget();
      }
    }

    /* ---------- sección activa + scroll horizontal ---------- */
    const secs = q("[data-section-el]");
    let active: string | null = null;
    const parts = 3;
    const updateHorizontal = () => {
      const wrap = hwrapRef.current, track = htrackRef.current;
      if (!wrap || !track || window.innerWidth <= 980) return;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const prog = Math.min(1, Math.max(0, -rect.top / total));
      const max = track.scrollWidth - window.innerWidth + 40;
      track.style.transform = `translateX(${-prog * Math.max(0, max)}px)`;
      if (hProgRef.current) {
        const n = Math.min(parts, Math.round(prog * parts));
        hProgRef.current.textContent = String(n).padStart(2, "0") + " / " + String(parts).padStart(2, "0");
      }
    };
    const onScroll = () => {
      if (revealCheck) revealCheck();
      if (videoSeek) videoSeek();
      const mid = window.innerHeight * 0.45;
      let act: string | null = null;
      secs.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) act = s.getAttribute("data-section-el");
      });
      if (act && act !== active) {
        active = act;
        q("[data-idx]").forEach((a) => { a.style.color = a.getAttribute("data-idx") === active ? "#FAFAF9" : "#46464c"; });
        q("[data-idx-bar]").forEach((b) => {
          const on = b.getAttribute("data-idx-bar") === active;
          b.style.width = on ? "32px" : "16px";
          b.style.background = on ? "#FAFAF9" : "#2c2c30";
        });
      }
      updateHorizontal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => { resizeCanvas(); updateHorizontal(); };
    window.addEventListener("resize", onResize);
    onScroll();

    /* ---------- botones magnéticos ---------- */
    if (!reduced) {
      q("[data-magnetic]").forEach((btn) => {
        const move = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.36}px)`;
          btn.style.transition = "transform .12s ease-out";
        };
        const leave = () => { btn.style.transform = "translate(0,0)"; btn.style.transition = "transform .4s cubic-bezier(.2,.8,.2,1)"; };
        btn.addEventListener("mousemove", move as EventListener);
        btn.addEventListener("mouseleave", leave);
        cleanups.push(() => { btn.removeEventListener("mousemove", move as EventListener); btn.removeEventListener("mouseleave", leave); });
      });
    }

    /* ---------- reloj Lima ---------- */
    const clockEl = clockRef.current;
    let clockTimer: ReturnType<typeof setInterval> | null = null;
    if (clockEl) {
      clockEl.style.display = "inline";
      const tick = () => {
        try {
          const s = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "America/Lima" }).format(new Date());
          clockEl.textContent = s + " LIM";
        } catch { clockEl.textContent = new Date().toLocaleTimeString(); }
      };
      tick(); clockTimer = setInterval(tick, 1000);
    }

    /* ---------- contadores ---------- */
    const countEls = q("[data-count]");
    const countIo = new IntersectionObserver(
      (ents) => ents.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        if (el.dataset.done) return; el.dataset.done = "1";
        const target = parseFloat(el.getAttribute("data-count") || "");
        if (isNaN(target)) { countIo.unobserve(el); return; }
        const suffix = (el.textContent || "").replace(/[0-9.]/g, "");
        const dur = 1100, t0 = performance.now();
        const step = (tm: number) => {
          const k = Math.min(1, (tm - t0) / dur);
          const e = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.round(target * e) + suffix;
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countIo.unobserve(el);
      }),
      { threshold: 0.5 }
    );
    countEls.forEach((e) => countIo.observe(e));

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(curRaf);
      cancelAnimationFrame(videoRaf);
      if (clockTimer) clearInterval(clockTimer);
      if (revealTimer) clearTimeout(revealTimer);
      countIo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cleanups.forEach((fn) => fn());
    };
  }, [lang]);

  return { rootRef, canvasRef, dotRef, ringRef, clockRef, hwrapRef, htrackRef, hProgRef, videoRef };
}
