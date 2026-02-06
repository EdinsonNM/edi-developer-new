/**
 * Iconos mínimos para el hero del landing.
 * Solo Lucide para no cargar react-icons en el chunk inicial (mejor LCP/TBT).
 */
import {
  Code2,
  Cpu,
  Box,
  Layers,
  Sparkles,
  Terminal,
  Globe,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const HERO_ICONS: { Icon: LucideIcon; color: string }[] = [
  { Icon: Code2, color: "text-blue-500" },
  { Icon: Cpu, color: "text-slate-600" },
  { Icon: Box, color: "text-slate-700" },
  { Icon: Layers, color: "text-blue-600" },
  { Icon: Sparkles, color: "text-amber-500" },
  { Icon: Terminal, color: "text-green-600" },
  { Icon: Globe, color: "text-cyan-500" },
  { Icon: Zap, color: "text-yellow-500" },
];
