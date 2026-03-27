import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useI18n } from "@/presentation/utils/use-i18n";

export function FooterSection() {
  const { t } = useI18n();

  const navLinks = [
    { label: t.inicio, href: "/#inicio" },
    { label: t.apps, href: "/#apps" },
    { label: t.contenido, href: "/#contenido" },
    { label: t.sobreMi, href: "/#sobre-mi" },
    { label: t.contacto, href: "/#contacto" },
  ];

  return (
    <footer className="relative z-10 py-12 px-4 md:px-6 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo + tagline */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <picture className="h-8 w-fit">
              <source srcSet="./logo-white.webp" type="image/webp" />
              <img src="logo-white.png" alt="Edi Developer" className="h-8" />
            </picture>
            <p className="text-slate-400 text-sm max-w-xs">
              {t.footerTagline}
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              {t.footerNavTitle}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apps / recursos */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              {t.footerAppsTitle}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/apps"
                  className="text-slate-300 hover:text-white text-sm transition-colors"
                >
                  {t.appsSectionTitle}
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes / contacto */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              {t.footerContactTitle}
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/edinsonnm"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-200"
                title="GitHub"
                aria-label="Visitar mi GitHub"
              >
                <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/edinsonnm"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-200"
                title="LinkedIn"
                aria-label="Visitar mi LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
