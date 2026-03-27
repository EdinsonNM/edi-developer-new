import type { IconType } from "react-icons/lib";
import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPhp,
  SiPython,
  SiPytorch,
  SiReact,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

/**
 * Carrusel del hero: primero stack frontend reconocible, luego backend, datos e IA.
 */
export const HERO_ICONS: { Icon: IconType; color: string }[] = [
  { Icon: SiReact, color: "text-[#61DAFB]" },
  { Icon: SiTypescript, color: "text-[#3178C6]" },
  { Icon: SiJavascript, color: "text-[#F7DF1E]" },
  { Icon: SiNextdotjs, color: "text-slate-900" },
  { Icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { Icon: SiHtml5, color: "text-[#E34F26]" },
  { Icon: SiCss3, color: "text-[#1572B6]" },
  { Icon: SiNodedotjs, color: "text-[#339933]" },
  { Icon: SiPython, color: "text-[#3776AB]" },
  { Icon: SiPhp, color: "text-[#777BB4]" },
  { Icon: SiMongodb, color: "text-[#47A248]" },
  { Icon: SiOpenai, color: "text-slate-800" },
  { Icon: SiPytorch, color: "text-[#EE4C2C]" },
  { Icon: SiTensorflow, color: "text-[#FF6F00]" },
];
