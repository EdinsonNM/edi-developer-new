"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import AskEdiTerminal from "./AskEdiTerminal";
import "./home-minimal.css";

type Lang = "es" | "en";

const PAD = "clamp(20px,5vw,56px)";

export default function HomeMinimal() {
  const [lang, setLang] = useState<Lang>("es");

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const hwrapRef = useRef<HTMLElement>(null);
  const htrackRef = useRef<HTMLDivElement>(null);
  const hProgRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const data = useMemo(() => buildData(lang), [lang]);
  const { t, sections, heroReadout, products, resources, services, talks, posts, metrics, academy, stack } = data;

  // ----- mantener atributo lang del documento -----
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // ----- toda la lógica imperativa del diseño -----
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
        // al terminar la animación, soltar la capa GPU: texto vuelve a ser estático
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

    /* ---------- video de fondo scrubbed ---------- */
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
        // loop de easing: interpola y solo busca cuando el video no está ya buscando
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
        videoSeek = computeTarget; // el scroll solo actualiza el destino
        computeTarget();
      }
    }

    /* ---------- sección activa + horizontal ---------- */
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

  const sectionPad = `clamp(70px,10vh,130px) ${PAD}`;

  return (
    <div ref={rootRef} className="hm">
      {/* base oscura + video + velo */}
      <div style={{ position: "fixed", inset: 0, zIndex: -3, background: "#0A0A0B", pointerEvents: "none" }} />
      <video
        ref={videoRef}
        src="/videos/video-developer-scrub.mp4"
        muted
        playsInline
        preload="auto"
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: -2, pointerEvents: "none" }}
      />
      <div style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", background: "radial-gradient(120% 120% at 50% 30%, rgba(10,10,11,.42), rgba(10,10,11,.72))" }} />

      {/* cursor custom */}
      <div ref={ringRef} className="obs-ring" />
      <div ref={dotRef} className="obs-dot" />

      {/* grano + viñeta */}
      <div style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none", opacity: 0.04, mixBlendMode: "overlay", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 59, pointerEvents: "none", background: "radial-gradient(130% 100% at 50% 28%, transparent 60%, rgba(0,0,0,.55) 100%)" }} />

      {/* índice lateral */}
      <div className="side-index" style={{ position: "fixed", left: 26, top: "50%", transform: "translateY(-50%)", zIndex: 55, display: "flex", flexDirection: "column", gap: 18 }}>
        {sections.map((s) => (
          <a key={s.id} href={s.href} data-idx={s.id} data-hov className="hm-idx mono" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, letterSpacing: ".05em", color: "#46464c" }}>
            <span data-idx-bar={s.id} className="hm-idx-bar" style={{ width: 16, height: 1, background: "#2c2c30" }} />{s.num}
          </a>
        ))}
      </div>

      {/* navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 58, display: "flex", alignItems: "center", justifyContent: "space-between", padding: `18px ${PAD}`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", background: "linear-gradient(180deg,rgba(10,10,11,.82),rgba(10,10,11,0))" }}>
        <a href="#inicio" data-hov style={{ display: "flex", alignItems: "center", gap: 11, fontWeight: 600, letterSpacing: "-.01em", fontSize: 16 }}>
          <span style={{ width: 9, height: 9, borderRadius: 2, background: "#FAFAF9" }} />
          edi<span style={{ color: "#6b6b70" }}>-developer</span><span className="mono" style={{ color: "#9B9BA1" }}>.dev</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span ref={clockRef} className="mono" style={{ display: "none", fontSize: 12, color: "#5a5a60", letterSpacing: ".05em" }}>--:--:-- LIM</span>
          <div className="mono" style={{ display: "flex", alignItems: "center", border: "1px solid rgba(255,255,255,.1)", borderRadius: 999, overflow: "hidden", fontSize: 12 }}>
            <button data-hov onClick={() => setLang("es")} className="hm-nav-btn" style={{ padding: "6px 11px", border: "none", cursor: "none", background: lang === "es" ? "#FAFAF9" : "transparent", color: lang === "es" ? "#0A0A0B" : "#9B9BA1" }}>ES</button>
            <button data-hov onClick={() => setLang("en")} className="hm-nav-btn" style={{ padding: "6px 11px", border: "none", cursor: "none", background: lang === "en" ? "#FAFAF9" : "transparent", color: lang === "en" ? "#0A0A0B" : "#9B9BA1" }}>EN</button>
          </div>
        </div>
      </nav>

      {/* 01 HERO */}
      <header id="inicio" data-section-el="inicio" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", padding: `clamp(96px,14vh,150px) ${PAD} clamp(40px,7vh,80px)` }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, display: "block" }} />
        <div className="mono edge-readout" style={{ position: "absolute", right: "clamp(20px,3vw,40px)", top: "42%", transform: "translateY(-50%)", writingMode: "vertical-rl", fontSize: 11, letterSpacing: ".3em", color: "#3c3c42", zIndex: 2 }}>EDI-DEVELOPER.DEV · 2026</div>
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1280, margin: "0 auto" }}>
          <div data-reveal className="mono" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, letterSpacing: ".18em", color: "#9B9BA1", marginBottom: 30 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FAFAF9" }} />
            // FRONTEND · IA · 3D
          </div>
          <h1 style={{ fontSize: "clamp(40px,8.4vw,124px)", lineHeight: 0.93, fontWeight: 600, letterSpacing: "-.05em", maxWidth: "14ch" }}>
            <span data-reveal style={{ display: "block", color: "#FAFAF9" }}>{t.heroLine1}</span>
            <span data-reveal style={{ display: "block", color: "#5a5a60", fontWeight: 400 }}>{t.heroLine2}</span>
            <span data-reveal style={{ display: "block", color: "#FAFAF9" }}>{t.heroAccent}</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 40, marginTop: "clamp(32px,5vh,60px)" }}>
            <p data-reveal style={{ fontSize: "clamp(15px,1.5vw,19px)", lineHeight: 1.6, color: "#9B9BA1", maxWidth: "48ch", textWrap: "pretty" } as CSSProperties}>{t.heroLead}</p>
            <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href="#productos" data-hov data-magnetic className="hm-btn-solid" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 26px", borderRadius: 10, fontWeight: 600, fontSize: 15, color: "#0A0A0B", background: "#FAFAF9" }}>{t.heroCta1} <span className="mono">→</span></a>
              <a href="#contacto" data-hov data-magnetic className="hm-btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 26px", borderRadius: 10, fontWeight: 500, fontSize: 15, border: "1px solid rgba(255,255,255,.16)", background: "transparent", color: "#9B9BA1" }}>{t.heroCta2}</a>
            </div>
          </div>
          <div data-reveal className="mono" style={{ display: "flex", flexWrap: "wrap", gap: 48, marginTop: "clamp(40px,6vh,68px)" }}>
            {heroReadout.map((r, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, letterSpacing: ".14em", color: "#5a5a60" }}>{r.k}</div>
                <div style={{ fontSize: 15, color: "#FAFAF9", marginTop: 7 }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mono" style={{ position: "absolute", right: PAD, bottom: "clamp(48px,8vh,96px)", fontSize: 11, letterSpacing: ".2em", color: "#3c3c42", zIndex: 2, display: "flex", alignItems: "center", gap: 8 }}>SCROLL <span style={{ display: "inline-block", width: 1, height: 28, background: "linear-gradient(#9B9BA1,transparent)" }} /></div>
      </header>

      {/* 02 PRODUCTOS — horizontal con pin */}
      <section id="productos" data-section-el="productos" className="h-wrap" ref={hwrapRef as React.RefObject<HTMLElement>} style={{ position: "relative", height: "360vh", background: "transparent" }}>
        <div className="h-pin" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: `0 ${PAD}`, maxWidth: 1400, margin: "0 auto", width: "100%" }}>
            <div>
              <div className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: "#9B9BA1", marginBottom: 12 }}>02 — {t.s2eyebrow}</div>
              <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 600, letterSpacing: "-.035em", maxWidth: "18ch", textWrap: "balance" } as CSSProperties}>{t.s2title}</h2>
            </div>
            <div className="mono" style={{ display: "none", fontSize: 11, color: "#5a5a60", textAlign: "right" }}>{t.hScrollHint}<br /><span ref={hProgRef} style={{ color: "#9B9BA1" }}>00 / 03</span></div>
          </div>
          <div ref={htrackRef} className="h-track" style={{ display: "flex", gap: 28, padding: `36px ${PAD}`, marginTop: 18, willChange: "transform" }}>
            {products.map((p) => (
              <a key={p.n} href={p.url} target="_blank" rel="noopener noreferrer" data-hov className="hm-card-glass" style={{ position: "relative", flex: "none", width: "min(82vw,620px)", borderRadius: 18, overflow: "hidden", display: "block" }}>
                <div style={{ padding: "34px 34px 30px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                    <div className="mono" style={{ fontSize: 12, letterSpacing: ".1em", color: "#6b6b70" }}>{p.tag}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {p.badges.map((b, i) => (
                        <span key={i} className="mono" style={{ fontSize: 11, padding: "5px 11px", borderRadius: 999, color: "#9B9BA1", border: "1px solid rgba(255,255,255,.12)" }}>{b}</span>
                      ))}
                    </div>
                  </div>
                  <h3 style={{ fontSize: "clamp(30px,4.4vw,52px)", fontWeight: 600, letterSpacing: "-.035em", lineHeight: 1.02 }}>{p.name}</h3>
                  <p style={{ marginTop: 16, fontSize: 18, color: "#d4d4d2", lineHeight: 1.4 }}>{p.tagline}</p>
                  <p style={{ marginTop: 14, fontSize: 15, color: "#9B9BA1", lineHeight: 1.6, maxWidth: "48ch", textWrap: "pretty" } as CSSProperties}>{p.desc}</p>
                </div>
                <div style={{ position: "relative", height: 190, background: "rgba(8,8,10,.35)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,.05) 1px,transparent 0)", backgroundSize: "16px 16px" }} />
                  <span className="mono" style={{ position: "absolute", left: 24, bottom: 18, fontSize: 13, color: "#FAFAF9", display: "flex", alignItems: "center", gap: 8 }}>{p.link} <span>↗</span></span>
                  <div className="mono" style={{ position: "absolute", right: 22, top: 16, fontSize: 40, fontWeight: 600, color: "rgba(255,255,255,.06)" }}>0{p.n}</div>
                </div>
              </a>
            ))}
            <div style={{ flex: "none", width: "min(60vw,360px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, padding: "0 12px" }}>
              <div className="mono" style={{ fontSize: 12, color: "#6b6b70", letterSpacing: ".1em" }}>{t.moreComing}</div>
              <div style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 500, color: "#5a5a60", letterSpacing: "-.025em", textWrap: "balance" } as CSSProperties}>{t.moreComingSub}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 RECURSOS */}
      <section id="recursos" data-section-el="recursos" style={{ position: "relative", padding: `clamp(90px,14vh,170px) ${PAD}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div data-reveal className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: "#9B9BA1", marginBottom: 16 }}>03 — {t.s3eyebrow}</div>
          <h2 data-reveal style={{ fontSize: "clamp(28px,4.4vw,52px)", fontWeight: 600, letterSpacing: "-.035em", maxWidth: "20ch", marginBottom: 56, textWrap: "balance" } as CSSProperties}>{t.s3title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 32 }}>
            {resources.map((r, i) => (
              <a key={i} href={r.href} data-reveal data-hov className="hm-card-sm" style={{ position: "relative", display: "flex", gap: 26, padding: 30, borderRadius: 16, background: "#101012" }}>
                <div style={{ flex: "none", width: 84, height: 116, borderRadius: 6, position: "relative", overflow: "hidden", background: "#1a1a1d" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={encodeURI(r.cover)} alt={r.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <span className="mono" style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, color: "#9B9BA1", border: "1px solid rgba(255,255,255,.12)" }}>{r.tag}</span>
                  <h3 style={{ marginTop: 16, fontSize: 21, fontWeight: 600, letterSpacing: "-.02em", lineHeight: 1.15 }}>{r.name}</h3>
                  <p style={{ marginTop: 10, color: "#9B9BA1", fontSize: 14, lineHeight: 1.6, textWrap: "pretty" } as CSSProperties}>{r.desc}</p>
                  <div className="mono" style={{ marginTop: 18, fontSize: 13, color: "#FAFAF9" }}>{r.cta} →</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 04 SOBRE MÍ + TERMINAL */}
      <section id="sobre" data-section-el="sobre" style={{ position: "relative", padding: sectionPad }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(370px,1fr))", gap: "clamp(40px,5vw,80px)", alignItems: "center" }}>
          <div>
            <div data-reveal className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: "#9B9BA1", marginBottom: 16 }}>04 — {t.s4eyebrow}</div>
            <h2 data-reveal style={{ fontSize: "clamp(28px,4.2vw,50px)", fontWeight: 600, letterSpacing: "-.035em", lineHeight: 1.06, textWrap: "balance" } as CSSProperties}>{t.s4titlePre} <span style={{ color: "#FAFAF9" }}>{t.s4titleGrad}</span></h2>
            <p data-reveal style={{ marginTop: 24, fontSize: 16, lineHeight: 1.75, color: "#9B9BA1", maxWidth: "54ch", textWrap: "pretty" } as CSSProperties}>{t.s4p1}</p>
            <p data-reveal style={{ marginTop: 14, fontSize: 16, lineHeight: 1.75, color: "#9B9BA1", maxWidth: "54ch", textWrap: "pretty" } as CSSProperties}>{t.s4p2}</p>
            <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 28 }}>
              {stack.map((tag) => (
                <span key={tag} className="mono" style={{ fontSize: 12, padding: "7px 12px", borderRadius: 7, border: "1px solid rgba(255,255,255,.08)", color: "#9B9BA1" }}>{tag}</span>
              ))}
            </div>
          </div>
          <AskEdiTerminal lang={lang} termTitle={t.termTitle} termComment={t.termComment} chips={t.termChips as unknown as string[]} />
        </div>
      </section>

      {/* 05 QUÉ HAGO */}
      <section id="servicios" data-section-el="servicios" style={{ position: "relative", padding: sectionPad }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: "#9B9BA1", marginBottom: 16 }}>05 — {t.s5eyebrow}</div>
          <h2 data-reveal style={{ fontSize: "clamp(28px,4.4vw,52px)", fontWeight: 600, letterSpacing: "-.035em", maxWidth: "22ch" }}>{t.s5title}</h2>
          <p data-reveal style={{ marginTop: 18, color: "#9B9BA1", fontSize: 16, maxWidth: "60ch", textWrap: "pretty" } as CSSProperties}>{t.s5lead}</p>
          <div style={{ marginTop: 56 }}>
            {services.map((sv) => (
              <div key={sv.n} data-reveal data-hov className="hm-service" style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "clamp(20px,4vw,56px)", alignItems: "baseline", padding: "clamp(24px,3.5vh,38px) 0", borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <div className="mono" style={{ fontSize: 13, color: "#5a5a60", paddingTop: 8 }}>0{sv.n}</div>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 10 }}>
                  <h3 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 500, letterSpacing: "-.03em", lineHeight: 1.05 }}>{sv.title}</h3>
                  <p style={{ color: "#9B9BA1", fontSize: 15, lineHeight: 1.55, maxWidth: "60ch", textWrap: "pretty" } as CSSProperties}>{sv.desc}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,.06)" }} />
          </div>
        </div>
      </section>

      {/* 06 CHARLAS */}
      <section id="charlas" data-section-el="charlas" style={{ position: "relative", padding: `clamp(90px,14vh,170px) ${PAD}`, textAlign: "center" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div data-reveal className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: "#9B9BA1", marginBottom: 16 }}>06 — {t.s6eyebrow}</div>
          <h2 data-reveal style={{ fontSize: "clamp(28px,4.6vw,54px)", fontWeight: 600, letterSpacing: "-.035em", maxWidth: "18ch", margin: "0 auto", textWrap: "balance" } as CSSProperties}>{t.s6title}</h2>
          <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 48 }}>
            {talks.map((topic, i) => (
              <span key={i} data-hov className="hm-pill-soft" style={{ fontSize: 14, padding: "12px 20px", borderRadius: 999, border: "1px solid rgba(255,255,255,.1)", color: "#9B9BA1" }}>{topic}</span>
            ))}
          </div>
          <a data-reveal data-hov data-magnetic href="#contacto" className="hm-btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 44, padding: "14px 26px", borderRadius: 999, fontWeight: 500, border: "1px solid rgba(255,255,255,.16)", color: "#FAFAF9" }}>{t.s6cta} <span className="mono">→</span></a>
        </div>
      </section>

      {/* 07 BLOG */}
      <section id="blog" data-section-el="blog" style={{ position: "relative", padding: sectionPad }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div data-reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 48 }}>
            <div>
              <div className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: "#9B9BA1", marginBottom: 16 }}>07 — {t.s7eyebrow}</div>
              <h2 style={{ fontSize: "clamp(28px,4.4vw,52px)", fontWeight: 600, letterSpacing: "-.035em" }}>{t.s7title}</h2>
            </div>
            <a href="/blog" data-hov className="mono hm-link-mono" style={{ fontSize: 13, color: "#9B9BA1" }}>{t.s7all} →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 28 }}>
            {posts.map((post, i) => (
              <a key={i} href={post.href} data-reveal data-hov className="hm-blog" style={{ display: "flex", flexDirection: "column", borderRadius: 14, overflow: "hidden", background: "#101012" }}>
                <div style={{ height: 160, position: "relative", overflow: "hidden", background: "#0E0E10" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,.05) 1px,transparent 0)", backgroundSize: "14px 14px" }} />
                  <div className="mono" style={{ position: "absolute", right: 14, top: 12, fontSize: 11, color: "#6b6b70" }}>{post.cat}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-.01em", textWrap: "balance" } as CSSProperties}>{post.title}</h3>
                  <div className="mono" style={{ marginTop: 18, fontSize: 12, color: "#5a5a60" }}>{post.meta}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 08 EDI ACADEMY */}
      <section id="academy" data-section-el="academy" style={{ position: "relative", padding: sectionPad }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 44, alignItems: "end", marginBottom: 60 }}>
            <div>
              <div data-reveal className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: "#9B9BA1", marginBottom: 16 }}>08 — EDI ACADEMY</div>
              <h2 data-reveal style={{ fontSize: "clamp(28px,4.4vw,52px)", fontWeight: 600, letterSpacing: "-.035em", textWrap: "balance" } as CSSProperties}>{t.s8titlePre} <span style={{ color: "#FAFAF9" }}>IA</span></h2>
              <p data-reveal style={{ marginTop: 18, color: "#9B9BA1", fontSize: 16, maxWidth: "48ch", textWrap: "pretty" } as CSSProperties}>{t.s8lead}</p>
            </div>
            <div data-reveal style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              {metrics.map((m, i) => (
                <div key={i}>
                  <div data-count={m.count} style={{ fontSize: "clamp(38px,5vw,60px)", fontWeight: 600, letterSpacing: "-.03em", color: "#FAFAF9" }}>{m.n}</div>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: ".1em", color: "#5a5a60", marginTop: 6 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 28 }}>
            {academy.map((col, i) => (
              <div key={i} data-reveal data-hov className="hm-card-sm" style={{ padding: 32, borderRadius: 16, background: "#101012" }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: ".12em", color: "#6b6b70" }}>{col.label}</div>
                <h3 style={{ marginTop: 16, fontSize: 23, fontWeight: 600, letterSpacing: "-.02em" }}>{col.aud}</h3>
                <p style={{ marginTop: 12, color: "#9B9BA1", fontSize: 15, lineHeight: 1.6, textWrap: "pretty" } as CSSProperties}>{col.desc}</p>
              </div>
            ))}
          </div>
          <a data-reveal data-hov data-magnetic href="https://edi-academy.lovable.app/" target="_blank" rel="noopener noreferrer" className="hm-btn-solid" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 40, padding: "14px 26px", borderRadius: 10, fontWeight: 600, color: "#0A0A0B", background: "#FAFAF9" }}>{t.s8cta} <span className="mono">→</span></a>
        </div>
      </section>

      {/* 09 CONTACTO */}
      <section id="contacto" data-section-el="contacto" style={{ position: "relative", padding: `clamp(90px,14vh,170px) ${PAD}` }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <div data-reveal className="mono" style={{ fontSize: 12, letterSpacing: ".14em", color: "#9B9BA1", marginBottom: 16 }}>09 — {t.s9eyebrow}</div>
          <h2 data-reveal style={{ fontSize: "clamp(34px,6vw,76px)", fontWeight: 600, letterSpacing: "-.05em", lineHeight: 0.98, textWrap: "balance" } as CSSProperties}>{t.s9titlePre} <span style={{ color: "#FAFAF9" }}>{t.s9titleGrad}</span></h2>
          <p data-reveal style={{ marginTop: 22, fontSize: 17, color: "#9B9BA1", maxWidth: "46ch", marginLeft: "auto", marginRight: "auto", textWrap: "pretty" } as CSSProperties}>{t.s9lead}</p>
          <div data-reveal style={{ marginTop: 46, padding: 34, borderRadius: 18, textAlign: "left", background: "#101012" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <label style={{ display: "block" }}>
                <span className="mono" style={{ fontSize: 12, color: "#9B9BA1" }}>{t.formName}</span>
                <input data-field data-hov className="hm-field" placeholder={t.formNamePh} style={{ width: "100%", marginTop: 8, padding: "13px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "#0A0A0B", color: "#FAFAF9", fontSize: 15, outline: "none", cursor: "none" }} />
              </label>
              <label style={{ display: "block" }}>
                <span className="mono" style={{ fontSize: 12, color: "#9B9BA1" }}>{t.formEmail}</span>
                <input data-field data-hov className="hm-field" placeholder={t.formEmailPh} style={{ width: "100%", marginTop: 8, padding: "13px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "#0A0A0B", color: "#FAFAF9", fontSize: 15, outline: "none", cursor: "none" }} />
              </label>
            </div>
            <label style={{ display: "block", marginTop: 16 }}>
              <span className="mono" style={{ fontSize: 12, color: "#9B9BA1" }}>{t.formMsg}</span>
              <textarea data-field data-hov className="hm-field" rows={4} placeholder={t.formMsgPh} style={{ width: "100%", marginTop: 8, padding: "13px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "#0A0A0B", color: "#FAFAF9", fontSize: 15, outline: "none", resize: "vertical", cursor: "none" }} />
            </label>
            <button data-hov data-magnetic className="hm-btn-solid" style={{ width: "100%", marginTop: 20, padding: 16, border: "none", cursor: "none", borderRadius: 10, fontWeight: 600, fontSize: 15, color: "#0A0A0B", background: "#FAFAF9" }}>{t.formSend}</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative" }}>
        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)" }} />
        <div style={{ padding: `clamp(54px,9vh,90px) ${PAD} 40px`, maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 44 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 18 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: "#FAFAF9" }} />edi<span style={{ color: "#6b6b70" }}>-developer</span><span className="mono" style={{ color: "#9B9BA1" }}>.dev</span></div>
            <p style={{ marginTop: 16, color: "#9B9BA1", fontSize: 14, lineHeight: 1.6, maxWidth: 280, textWrap: "pretty" } as CSSProperties}>{t.footTag}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
              <a href="https://github.com/edinsonnm" target="_blank" rel="noopener noreferrer" data-hov className="mono hm-pill" style={{ fontSize: 13, padding: "9px 15px", borderRadius: 9, border: "1px solid rgba(255,255,255,.1)", color: "#9B9BA1" }}>GitHub ↗</a>
              <a href="https://linkedin.com/in/edinsonnm" target="_blank" rel="noopener noreferrer" data-hov className="mono hm-pill" style={{ fontSize: 13, padding: "9px 15px", borderRadius: 9, border: "1px solid rgba(255,255,255,.1)", color: "#9B9BA1" }}>LinkedIn ↗</a>
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 12, color: "#5a5a60", letterSpacing: ".08em" }}>{t.footNav}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 18 }}>
              {sections.map((s) => (
                <a key={s.id} href={s.href} data-hov className="hm-link-mono" style={{ fontSize: 14, color: "#d4d4d2" }}>{s.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 12, color: "#5a5a60", letterSpacing: ".08em" }}>{t.footContact}</div>
            <a href="mailto:hola@edi-developer.dev" data-hov className="hm-link-mono" style={{ display: "block", marginTop: 18, fontSize: 14, color: "#d4d4d2" }}>hola@edi-developer.dev</a>
            <a href="#contacto" data-hov data-magnetic style={{ display: "inline-flex", marginTop: 20, padding: "11px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#0A0A0B", background: "#FAFAF9" }}>{t.contactMe}</a>
          </div>
        </div>
        <div className="mono" style={{ padding: `24px ${PAD}`, borderTop: "1px solid rgba(255,255,255,.06)", fontSize: 12, color: "#5a5a60", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span>© 2026 Edinson Nuñez More</span>
          <span>{t.footMade}</span>
        </div>
      </footer>
    </div>
  );
}

/* ===================== datos / traducciones ===================== */
function buildData(lang: Lang) {
  const T = {
    es: {
      contactMe: "Contáctame",
      heroLine1: "Construyo", heroLine2: "productos con", heroAccent: "inteligencia artificial",
      heroLead: "Especialista en frontend, gráficos 3D e IA aplicada. Más de 14 años creando productos y soluciones para personas y marcas globales.",
      heroCta1: "Ver mis productos", heroCta2: "Trabajemos juntos",
      s2eyebrow: "PRODUCTOS · IA", s2title: "Productos que estoy construyendo con IA",
      hScrollHint: "DESPLAZA ↓", moreComing: "// MÁS EN CAMINO", moreComingSub: "Nuevas herramientas y experimentos en desarrollo.",
      s3eyebrow: "RECURSOS", s3title: "Recursos y productos para aprender y construir con IA",
      s4eyebrow: "SOBRE MÍ", s4titlePre: "No solo desarrollo:", s4titleGrad: "construyo producto",
      s4p1: "Soy Edinson Nuñez. Combino frontend, IA aplicada y visión de producto para crear cosas que la gente usa de verdad — no solo demos.",
      s4p2: "Mi diferencia: código que escala, ideas que enseñan y un ecosistema en crecimiento de apps, contenido y comunidad alrededor de la IA.",
      termTitle: "ask-edi · ai", termComment: "pregúntale a la IA sobre mí", termQ: "¿En qué se especializa Edi?",
      termA: "> Frontend de alto nivel, IA aplicada a producto\n> y experiencias gráficas en 3D / WebGL.\n> 14+ años construyendo software real.",
      termChips: ["¿Qué stack usa?", "¿Hace mentorías?", "¿Proyectos con 3D?"],
      s5eyebrow: "QUÉ HAGO", s5title: "Cómo puedo ayudarte", s5lead: "Combino desarrollo, IA aplicada y producto para construir herramientas y experiencias reales.",
      s6eyebrow: "CHARLAS · WORKSHOPS", s6title: "Comparto lo que aprendo en charlas y talleres", s6cta: "Invítame a dar una charla",
      s7eyebrow: "BLOG", s7title: "Notas y artículos", s7all: "Ver todos",
      s8titlePre: "Formación especializada en", s8lead: "Rutas prácticas de IA para distintos perfiles: del aula al código y a los equipos que quieren adoptar IA con criterio.", s8cta: "Explorar Edi Academy",
      s9eyebrow: "CONTACTO", s9titlePre: "¿Tienes una idea?", s9titleGrad: "Trabajemos juntos", s9lead: "Completa el formulario o escríbeme directamente para proyectos, colaboraciones o charlas.",
      formName: "Nombre", formNamePh: "Tu nombre", formEmail: "Email", formEmailPh: "tu@email.com", formMsg: "Mensaje", formMsgPh: "Cuéntame sobre tu proyecto o idea…", formSend: "Enviar mensaje",
      footTag: "Construyendo futuro con tecnología y propósito.", footNav: "NAVEGACIÓN", footContact: "CONTACTO", footMade: "Hecho con código y café · Lima, PE",
    },
    en: {
      contactMe: "Contact me",
      heroLine1: "I build", heroLine2: "products with", heroAccent: "artificial intelligence",
      heroLead: "Frontend specialist, 3D graphics and applied AI. Over 14 years creating products and solutions for people and global brands.",
      heroCta1: "See my products", heroCta2: "Let's work together",
      s2eyebrow: "PRODUCTS · AI", s2title: "Products I'm building with AI",
      hScrollHint: "SCROLL ↓", moreComing: "// MORE COMING", moreComingSub: "New tools and experiments in the works.",
      s3eyebrow: "RESOURCES", s3title: "Resources and products to learn and build with AI",
      s4eyebrow: "ABOUT", s4titlePre: "Not just code:", s4titleGrad: "I build product",
      s4p1: "I'm Edinson Nuñez. I blend frontend, applied AI and product vision to make things people actually use — not just demos.",
      s4p2: "My edge: code that scales, ideas that teach, and a growing ecosystem of apps, content and community around AI.",
      termTitle: "ask-edi · ai", termComment: "ask the AI about me", termQ: "What does Edi specialize in?",
      termA: "> High-end frontend, AI applied to product\n> and 3D / WebGL graphics experiences.\n> 14+ years building real software.",
      termChips: ["What stack?", "Does he mentor?", "3D projects?"],
      s5eyebrow: "WHAT I DO", s5title: "How I can help you", s5lead: "I blend development, applied AI and product to build real tools and experiences.",
      s6eyebrow: "TALKS · WORKSHOPS", s6title: "I share what I learn in talks and workshops", s6cta: "Invite me to speak",
      s7eyebrow: "BLOG", s7title: "Notes and articles", s7all: "View all",
      s8titlePre: "Specialized training in", s8lead: "Practical AI tracks for different profiles: from the classroom to code to teams adopting AI with judgment.", s8cta: "Explore Edi Academy",
      s9eyebrow: "CONTACT", s9titlePre: "Got an idea?", s9titleGrad: "Let's work together", s9lead: "Fill the form or write me directly for projects, collaborations or talks.",
      formName: "Name", formNamePh: "Your name", formEmail: "Email", formEmailPh: "you@email.com", formMsg: "Message", formMsgPh: "Tell me about your project or idea…", formSend: "Send message",
      footTag: "Building the future with technology and purpose.", footNav: "NAVIGATION", footContact: "CONTACT", footMade: "Made with code and coffee · Lima, PE",
    },
  } as const;
  const t = T[lang];

  const sections = ([
    ["inicio", "01", lang === "es" ? "Inicio" : "Home"],
    ["productos", "02", lang === "es" ? "Productos" : "Products"],
    ["recursos", "03", lang === "es" ? "Recursos" : "Resources"],
    ["sobre", "04", lang === "es" ? "Sobre mí" : "About"],
    ["servicios", "05", lang === "es" ? "Qué hago" : "What I do"],
    ["charlas", "06", lang === "es" ? "Charlas" : "Talks"],
    ["blog", "07", "Blog"],
    ["academy", "08", "Academy"],
    ["contacto", "09", lang === "es" ? "Contacto" : "Contact"],
  ] as const).map(([id, num, label]) => ({ id, num, label, href: "#" + id }));

  const heroReadout = lang === "es"
    ? [{ k: "EXPERIENCIA", v: "14+ años" }, { k: "FOCO", v: "Frontend · IA · 3D" }, { k: "PRODUCTOS", v: "Apps en vivo" }, { k: "BASE", v: "Lima, Perú" }]
    : [{ k: "EXPERIENCE", v: "14+ years" }, { k: "FOCUS", v: "Frontend · AI · 3D" }, { k: "PRODUCTS", v: "Live apps" }, { k: "BASED IN", v: "Lima, Peru" }];

  const products = [
    { n: 1, name: "Khipu", url: "https://khipu-landing-production.up.railway.app/es", tag: "AI · INFRAESTRUCTURA",
      badges: [lang === "es" ? "En vivo" : "Live", lang === "es" ? "Empresas" : "Enterprise"],
      tagline: lang === "es" ? "Infraestructura de IA para empresas peruanas." : "AI infrastructure for Peruvian companies.",
      desc: lang === "es" ? "Un solo gateway compatible con OpenAI para rutear entre OpenAI, Anthropic, Gemini, Groq y proveedores locales — con contratos, soporte y facturación en Perú." : "A single OpenAI-compatible gateway to route across OpenAI, Anthropic, Gemini, Groq and local providers — with contracts, support and billing in Peru.",
      link: lang === "es" ? "Visitar Khipu" : "Visit Khipu" },
    { n: 2, name: "Slaim", url: "https://slaim.vercel.app", tag: "AI · PRESENTACIONES",
      badges: [lang === "es" ? "En vivo" : "Live", lang === "es" ? "Gratis" : "Free"],
      tagline: lang === "es" ? "De idea a presentación lista en minutos." : "From idea to a finished deck in minutes.",
      desc: lang === "es" ? "Genera contenido, estructura y notas para tus presentaciones automáticamente usando IA." : "Generates content, structure and speaker notes for your presentations automatically using AI.",
      link: lang === "es" ? "Abrir Slaim" : "Open Slaim" },
    { n: 3, name: "Emotional AI", url: "https://emotional-ai.app", tag: "AI · ASISTENTE",
      badges: [lang === "es" ? "En vivo" : "Live", lang === "es" ? "Experimental" : "Experimental"],
      tagline: lang === "es" ? "Tu negocio con rostro y voz." : "Your business with a face and a voice.",
      desc: lang === "es" ? "Consultas y cuestionarios con un asistente que se siente cercano. Conecta MCP y responde con lo que ya tienes en sistemas internos." : "Queries and quizzes with an assistant that feels close. Connects MCP and answers with what you already have in internal systems.",
      link: lang === "es" ? "Conocer Emotional AI" : "Meet Emotional AI" },
  ];

  const resources = [
    { name: lang === "es" ? "El Programador Aumentado" : "The Augmented Programmer", tag: lang === "es" ? "Producto" : "Product", kind: lang === "es" ? "LIBRO" : "BOOK",
      cover: "/cover.png", href: "/blog/el-programador-aumentado",
      desc: lang === "es" ? "Cómo desarrollar software con IA sin perder el control: delegación con criterio, revisión de resultados y control de arquitectura." : "How to develop software with AI without losing control: delegating with judgment, reviewing results and owning the architecture.",
      cta: lang === "es" ? "Ver libro" : "View book" },
    { name: lang === "es" ? "Fábrica de Programadores" : "Programmer Factory", tag: lang === "es" ? "Gratis" : "Free", kind: lang === "es" ? "CUENTO" : "STORY",
      cover: "/cuentos/Zorrito en la fábrica de programadores.webp", href: "/blog/fabrica-de-programadores",
      desc: lang === "es" ? "Un cuento ilustrado que acerca la programación a los niños con humor y ternura. Léelo en la web o descarga el PDF sin coste." : "An illustrated story that brings programming closer to kids with humor and warmth. Read online or download the free PDF.",
      cta: lang === "es" ? "Leer cuento" : "Read story" },
  ];

  const services = [
    { n: 1, title: lang === "es" ? "Soluciones con IA" : "AI Solutions", desc: lang === "es" ? "Apps inteligentes, asistentes conversacionales, agentes, análisis de datos y automatización." : "Smart apps, conversational assistants, agents, data analysis and automation." },
    { n: 2, title: lang === "es" ? "Arquitectura & Desarrollo" : "Architecture & Development", desc: lang === "es" ? "Sistemas escalables con React, Angular, NestJS, Node, Supabase y arquitecturas limpias." : "Scalable systems with React, Angular, NestJS, Node, Supabase and clean architectures." },
    { n: 3, title: lang === "es" ? "Experiencias 3D & Visuales" : "3D & Visual Experiences", desc: lang === "es" ? "React Three Fiber, WebGL, animaciones, mundos interactivos y visualizaciones técnicas." : "React Three Fiber, WebGL, animation, interactive worlds and technical visualizations." },
    { n: 4, title: lang === "es" ? "Educación & Workshops" : "Education & Workshops", desc: lang === "es" ? "Charlas, mentoría y formación en IA y programación moderna para estudiantes y equipos." : "Talks, mentoring and training in AI and modern programming for students and teams." },
    { n: 5, title: lang === "es" ? "Producto & Innovación" : "Product & Innovation", desc: lang === "es" ? "Diseño de experiencias, prototipos funcionales, estrategia tecnológica y visión técnica." : "Experience design, working prototypes, tech strategy and technical vision." },
  ];

  const talks = lang === "es"
    ? ["IA para desarrolladores", "Storytelling técnico", "Ingeniería de software moderna", "3D con React Three Fiber", "Innovación educativa", "Tecnología con propósito"]
    : ["AI for developers", "Technical storytelling", "Modern software engineering", "3D with React Three Fiber", "Educational innovation", "Technology with purpose"];

  const posts = [
    { cat: lang === "es" ? "// REFLEXIÓN" : "// REFLECTION", href: "/blog/buscar-trabajo-en-2026", meta: "2026",
      title: lang === "es" ? "Mucha experiencia, cero respuestas: buscar trabajo en 2026" : "Lots of experience, zero replies: job hunting in 2026" },
    { cat: lang === "es" ? "// INVESTIGACIÓN" : "// RESEARCH", href: "/blog/interfaces-generativas-llm", meta: "2025",
      title: lang === "es" ? "Interfaces que se generan solas: el futuro de la UX con LLMs" : "Interfaces that generate themselves: the future of UX with LLMs" },
    { cat: lang === "es" ? "// LIBRO" : "// BOOK", href: "/blog/el-programador-aumentado", meta: "2024",
      title: lang === "es" ? "El Programador Aumentado" : "The Augmented Programmer" },
  ];

  const metrics = [
    { n: "14+", count: "14", label: lang === "es" ? "AÑOS DE EXPERIENCIA" : "YEARS OF EXPERIENCE" },
    { n: "100%", count: "100", label: lang === "es" ? "PRÁCTICO" : "HANDS-ON" },
    { n: "IA", count: "", label: lang === "es" ? "ASISTENTE" : "ASSISTANT" },
  ];

  const academy = [
    { label: lang === "es" ? "EDUCADORES" : "EDUCATORS", aud: lang === "es" ? "Docentes" : "Teachers", desc: lang === "es" ? "Actualiza tu metodología: diseña cursos, evalúa estudiantes y crea contenido con IA generativa." : "Modernize your method: design courses, assess students and create content with generative AI." },
    { label: lang === "es" ? "PROGRAMADORES" : "DEVELOPERS", aud: lang === "es" ? "Desarrolladores" : "Developers", desc: lang === "es" ? "Domina Cursor, VS Code + Copilot y técnicas de prompting para código." : "Master Cursor, VS Code + Copilot and prompting techniques for code." },
    { label: lang === "es" ? "CORPORATIVO" : "CORPORATE", aud: lang === "es" ? "Empresas" : "Companies", desc: lang === "es" ? "Capacitación para equipos. Optimiza flujos de trabajo con IA, con criterio." : "Team training. Optimize workflows with AI, with judgment." },
  ];

  const stack = ["React", "Angular", "NestJS", "Node", "Supabase", "Three.js", "WebGL", "LLMs"];

  return { t, sections, heroReadout, products, resources, services, talks, posts, metrics, academy, stack };
}
