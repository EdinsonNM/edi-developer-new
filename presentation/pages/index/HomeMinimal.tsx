"use client";

import { useEffect } from "react";
import { useHomeContent } from "./home/content";
import { useHomeEffects } from "./home/effects";
import { Backdrop, SideIndex, Navbar, Footer } from "./home/Chrome";
import { Hero, Products, Resources, About, Services, Talks, Blog, Academy, Contact } from "./home/Sections";
import "./home/home.css";

export default function HomeMinimal() {
  const { lang, setLanguage, t, sections } = useHomeContent();
  const {
    rootRef, canvasRef, dotRef, ringRef, clockRef,
    hwrapRef, htrackRef, hProgRef, videoRef,
  } = useHomeEffects(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div ref={rootRef} className="hm relative">
      <Backdrop videoRef={videoRef} dotRef={dotRef} ringRef={ringRef} />
      <SideIndex sections={sections} />
      <Navbar lang={lang} setLanguage={setLanguage} clockRef={clockRef} />

      <Hero t={t.hero} canvasRef={canvasRef} />
      <Products t={t.products} hwrapRef={hwrapRef} htrackRef={htrackRef} hProgRef={hProgRef} />
      <Resources t={t.resources} />
      <About t={t.about} lang={lang} />
      <Services t={t.services} />
      <Talks t={t.talks} />
      <Blog t={t.blog} />
      <Academy t={t.academy} />
      <Contact t={t.contact} />

      <Footer t={t} sections={sections} />
    </div>
  );
}
