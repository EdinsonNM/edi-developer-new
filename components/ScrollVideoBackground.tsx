"use client";

/**
 * ScrollVideoBackground
 * ----------------------
 * Fixed full-screen video backdrop whose PLAYHEAD is driven by scroll position
 * ("scroll scrubbing"): as the user scrolls the landing, the single evolving clip
 * advances, so each zone of the page reveals a different part of the video.
 *
 * Our hero clip is one ~30s clip in 3 parts (typing → 3D shapes → AI/neural net),
 * so scrolling top→bottom plays it start→end. Scrolling up rewinds.
 *
 * - Dark overlay keeps foreground text legible on the minimalist dark theme.
 * - Smooth follow (lerp) so the scrub never feels jumpy.
 * - prefers-reduced-motion: shows the poster only, no playback.
 *
 * Usage (render once, outside the scrolling content, e.g. top of app/page.client.tsx):
 *   <ScrollVideoBackground src="/videos/edi-hero.mp4" poster="/brand/edi-hero-poster.jpg" />
 *
 * If you ever prefer it to just play/loop on its own instead of scrubbing,
 * pass autoplayLoop.
 */

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  /** 0..1 base darkness of the veil. Default 0.55 */
  veil?: number;
  /** Play/loop on its own instead of scroll-scrubbing. Default false */
  autoplayLoop?: boolean;
};

export default function ScrollVideoBackground({
  src,
  poster,
  veil = 0.55,
  autoplayLoop = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reduced, setReduced] = useState(false);
  const target = useRef(0); // desired time (from scroll)
  const current = useRef(0); // smoothed time actually applied
  const duration = useRef(0);
  const raf = useRef<number | null>(null);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Autoplay/loop mode
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    if (autoplayLoop) {
      v.loop = true;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }, [autoplayLoop, reduced]);

  // Scroll-scrubbing mode
  useEffect(() => {
    if (autoplayLoop || reduced) return;
    const v = videoRef.current;
    if (!v) return;

    const onMeta = () => {
      duration.current = v.duration || 0;
    };
    v.addEventListener("loadedmetadata", onMeta);
    if (v.readyState >= 1) onMeta();

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      target.current = p * (duration.current || 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Keep the video paused; we set currentTime ourselves, smoothed.
    v.pause();
    const tick = () => {
      const d = duration.current;
      if (d > 0 && v) {
        // ease toward the scroll target
        current.current += (target.current - current.current) * 0.12;
        if (Math.abs(target.current - current.current) > 0.01) {
          try {
            v.currentTime = current.current;
          } catch {}
        }
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      v.removeEventListener("loadedmetadata", onMeta);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [autoplayLoop, reduced, src]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#0A0A0B]">
      {reduced ? (
        poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
        />
      )}

      {/* Legibility veil: flat dark + stronger gradient on the left (where text lives) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.66) 40%, rgba(10,10,11,0.22) 72%, rgba(10,10,11,0.42) 100%), rgba(10,10,11,${veil})`,
        }}
      />
      {/* top/bottom fade into the page */}
      <div className="absolute inset-x-0 top-0 h-24" style={{ background: "linear-gradient(180deg,#0A0A0B,transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28" style={{ background: "linear-gradient(0deg,#0A0A0B,transparent)" }} />
    </div>
  );
}
