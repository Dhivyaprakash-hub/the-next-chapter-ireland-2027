import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Compass,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Download,
  Smartphone,
  Settings as SettingsIcon,
  Target,
  ChevronRight,
  ChevronLeft,
  Plus,
  Edit3,
  Check,
  X,
  RotateCcw,
  Info,
  ShieldCheck,
  Award,
  Plane,
  BookOpen,
  Landmark,
  FileCheck2,
  Home as HomeIcon,
  Play,
  Pause,
  Sliders,
  Eye,
  EyeOff,
  AlertCircle,
  CalendarPlus,
  Quote,
  ArrowUpRight,
  Layers
} from 'lucide-react';

/**
 * THE NEXT CHAPTER — IRELAND 2027
 * A Cinematic Countdown Lock Screen & Personal Mission Control
 * Designed for a 26-year-old Indian software engineer transitioning to Ireland
 * for an MSc in Business Analytics at the University of Limerick.
 */

// --- DESIGN SYSTEM & THEMES ---
const THEMES = {
  emeraldSunset: {
    id: 'emeraldSunset',
    name: 'Emerald Sunset',
    subtitle: 'Shannon twilight & warm gold horizon',
    bgDeep: '#06131C',
    bgCard: 'rgba(9, 28, 38, 0.72)',
    bgCardSolid: '#091C26',
    primary: '#71F59A',
    primaryDark: '#063D32',
    accent: '#E8C67A',
    textMain: '#F5F7F4',
    textMuted: '#A6B8B3',
    border: 'rgba(113, 245, 154, 0.22)',
    borderAccent: 'rgba(232, 198, 122, 0.35)',
    skyStops: ['#050E17', '#08232C', '#14443E', '#5D4B34', '#C48A49'],
    waterStops: ['#05131B', '#062C29', '#0B463B', '#165344'],
    sunGlow: 'rgba(232, 198, 122, 0.48)',
    mistColor: 'rgba(113, 245, 154, 0.12)',
  },
  midnightIreland: {
    id: 'midnightIreland',
    name: 'Midnight Ireland',
    subtitle: 'Atlantic indigo & emerald aurora mist',
    bgDeep: '#040B14',
    bgCard: 'rgba(8, 20, 36, 0.74)',
    bgCardSolid: '#081424',
    primary: '#6EE7B7',
    primaryDark: '#052E2B',
    accent: '#93C5FD',
    textMain: '#F8FAFC',
    textMuted: '#94A3B8',
    border: 'rgba(110, 231, 183, 0.22)',
    borderAccent: 'rgba(147, 197, 253, 0.32)',
    skyStops: ['#030811', '#07172A', '#0B2B3C', '#114346', '#1D5E58'],
    waterStops: ['#030A13', '#061C2C', '#0A313E', '#11474E'],
    sunGlow: 'rgba(110, 231, 183, 0.34)',
    mistColor: 'rgba(147, 197, 253, 0.12)',
  },
  goldenHorizon: {
    id: 'goldenHorizon',
    name: 'Golden Horizon',
    subtitle: 'Warm amber dusk over Limerick bridges',
    bgDeep: '#0B1017',
    bgCard: 'rgba(22, 22, 28, 0.74)',
    bgCardSolid: '#16161C',
    primary: '#E8C67A',
    primaryDark: '#3A2C14',
    accent: '#71F59A',
    textMain: '#FAF8F5',
    textMuted: '#B8B2A6',
    border: 'rgba(232, 198, 122, 0.25)',
    borderAccent: 'rgba(113, 245, 154, 0.28)',
    skyStops: ['#090D14', '#1A1C24', '#3B2D24', '#7C5132', '#D69449'],
    waterStops: ['#090E15', '#191D22', '#2E2A25', '#4D3D2E'],
    sunGlow: 'rgba(232, 198, 122, 0.55)',
    mistColor: 'rgba(232, 198, 122, 0.14)',
  },
};

// --- INITIAL DATA ---
const DEFAULT_TARGET_DATE = '2027-09-01T09:00:00';
const JOURNEY_BASELINE_DATE = '2026-09-01T00:00:00';

const INITIAL_MILESTONES = [
  {
    id: 'admission',
    title: 'University Admission',
    subtitle: 'University of Limerick • MSc Business Analytics',
    completed: true,
    targetDate: '2026-10-15',
    notes: 'Unconditional admission offer received along with a €2,500 merit scholarship.',
    category: 'Academic',
  },
  {
    id: 'ielts',
    title: 'IELTS Examination (Target Band 8.0)',
    subtitle: 'Academic English proficiency benchmark',
    completed: false,
    targetDate: '2027-01-15',
    notes: 'Focus on Listening 8.5, Reading 8.5, Writing 7.5, Speaking 8.0.',
    category: 'Language',
  },
  {
    id: 'loan',
    title: 'Education Loan & Financial Planning',
    subtitle: 'Tuition balance, living expenses & proof of funds',
    completed: false,
    targetDate: '2027-03-20',
    notes: 'Account for €2,500 scholarship reduction, Irish visa financial thresholds, and sanction letter.',
    category: 'Finance',
  },
  {
    id: 'visa',
    title: 'Irish Student Visa (Stamp 2)',
    subtitle: 'AVATS application, biometrics & VFS submission',
    completed: false,
    targetDate: '2027-06-15',
    notes: 'Prepare PCC, medical insurance, financial statements, UL offer & scholarship letter.',
    category: 'Immigration',
  },
  {
    id: 'travel',
    title: 'Accommodation & Relocation',
    subtitle: 'On-campus / Limerick housing, flights & packing',
    completed: false,
    targetDate: '2027-08-20',
    notes: 'Apply early for UL campus villages (Plassey, Kilmurry, Thomond) and book Bengaluru/Mumbai to Shannon/Dublin flight.',
    category: 'Logistics',
  },
];

const INITIAL_TIMELINE = [
  {
    id: 'tl-1',
    windowLabel: 'November – December 2026',
    editableDate: '2026-12-15',
    title: 'IELTS Preparation Phase',
    description: 'Structured daily practice across Listening, Reading, Writing Task 1/2, and Speaking mock sessions targeting Band 8.0.',
    tag: 'Suggested Window',
  },
  {
    id: 'tl-2',
    windowLabel: 'December 2026 – January 2027',
    editableDate: '2027-01-20',
    title: 'IELTS Examination & Score Reporting',
    description: 'Sit for IELTS Academic exam and upload official TRF score report to the University of Limerick portal.',
    tag: 'Suggested Window',
  },
  {
    id: 'tl-3',
    windowLabel: 'Early 2027 (Feb – Mar 2027)',
    editableDate: '2027-03-15',
    title: 'Education Loan & University Funding',
    description: 'Finalize education loan sanction, disburse initial tuition deposit (net of €2,500 scholarship), and organize liquid living funds.',
    tag: 'Suggested Window',
  },
  {
    id: 'tl-4',
    windowLabel: 'Spring – Summer 2027',
    editableDate: '2027-05-30',
    title: 'Irish Student Visa Preparation & Application',
    description: 'Complete AVATS online application, private medical insurance, police clearance, and submit biometrics (subject to official ISD guidelines).',
    tag: 'Subject to Official Requirements',
  },
  {
    id: 'tl-5',
    windowLabel: 'As Early As Booking Permits',
    editableDate: '2027-04-10',
    title: 'University Accommodation Applications',
    description: 'Submit housing application immediately when University of Limerick accommodation portals open for Autumn 2027 intake.',
    tag: 'Priority Window',
  },
  {
    id: 'tl-6',
    windowLabel: 'July – August 2027',
    editableDate: '2027-08-15',
    title: 'Flights, Packing, Documents & Transition',
    description: 'Book flights to Ireland, organize winter layers, forex card, original academic transcripts, and farewells in India.',
    tag: 'Before Departure',
  },
  {
    id: 'tl-7',
    windowLabel: 'September 2027',
    editableDate: '2027-09-01',
    title: 'The Next Chapter Begins — Limerick',
    description: 'Arrive at the University of Limerick campus along the River Shannon and begin the MSc in Business Analytics.',
    tag: 'Target Horizon',
  },
];

const INITIAL_DAILY_TASKS = [
  {
    id: 'task-1',
    title: 'IELTS practice — 60 minutes',
    duration: '60 min',
    category: 'Band 8.0 Prep',
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Fitness or rehabilitation-appropriate exercise',
    duration: '40 min',
    category: 'Physical Resilience',
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Work on an AI / software engineering project',
    duration: '90 min',
    category: 'Career Craft',
    completed: false,
  },
];

const INITIAL_QUOTES = [
  "Don't just count the days. Make the days count.",
  "Every day is a step toward Ireland.",
  "The future isn't waiting. I'm building it.",
  "Discipline now. Freedom later.",
  "A new country. A new chapter. A stronger me.",
  "From code in India to analytics along the River Shannon.",
];

const TIMEZONE_OPTIONS = [
  { id: 'local', label: 'Device Local Time', offsetLabel: 'Local' },
  { id: 'Asia/Kolkata', label: 'India Standard Time (IST • UTC+5:30)', offsetLabel: 'IST' },
  { id: 'Europe/Dublin', label: 'Ireland Time (Dublin / Limerick)', offsetLabel: 'IST/GMT' },
  { id: 'UTC', label: 'Coordinated Universal Time (UTC)', offsetLabel: 'UTC' },
];

const STORAGE_KEY = 'next_chapter_ireland_2027_v1';

// --- UTILITY FUNCTIONS ---

function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function formatReadableDate(dateStr, timeZone = 'local') {
  if (!dateStr) return 'Date TBD';
  try {
    const parsed = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T09:00:00`);
    if (isNaN(parsed.getTime())) return 'Invalid Date';
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      ...(timeZone !== 'local' ? { timeZone } : {}),
    };
    return new Intl.DateTimeFormat('en-IE', options).format(parsed);
  } catch {
    return dateStr;
  }
}

function calculateTimeRemaining(targetDateStr) {
  const target = new Date(targetDateStr);
  const now = new Date();
  if (isNaN(target.getTime())) {
    return { valid: false, totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
  }
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return { valid: true, totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { valid: true, totalMs: diff, days, hours, minutes, seconds, isPast: false };
}

function generateICSContent(events) {
  const formatICSDate = (dateStr) => {
    const d = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T09:00:00`);
    if (isNaN(d.getTime())) return '20270901T090000Z';
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const nowStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const eventBlocks = events.map((ev, idx) => {
    const start = formatICSDate(ev.date);
    const endDate = new Date(new Date(ev.date.includes('T') ? ev.date : `${ev.date}T09:00:00`).getTime() + 60 * 60 * 1000);
    const end = isNaN(endDate.getTime()) ? '20270901T100000Z' : endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const cleanDesc = (ev.description || '').replace(/\n/g, '\\n').replace(/,/g, '\\,');
    const cleanTitle = (ev.title || 'Ireland 2027 Milestone').replace(/,/g, '\\,');

    return [
      'BEGIN:VEVENT',
      `UID:ireland2027-${ev.id || idx}-${Date.now()}@nextchapter.app`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${cleanTitle} — Ireland 2027`,
      `DESCRIPTION:${cleanDesc} (University of Limerick — MSc Business Analytics)`,
      'LOCATION:Limerick, Ireland',
      'BEGIN:VALARM',
      'TRIGGER:-P7D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Upcoming Milestone in 7 days: ${cleanTitle}`,
      'END:VALARM',
      'END:VEVENT',
    ].join('\r\n');
  });

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Next Chapter//Ireland 2027 Mission Control//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...eventBlocks,
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// --- CINEMATIC RIVER SHANNON / LIMERICK ATMOSPHERIC BACKDROP ---
const CinematicBackdrop = ({ theme, animationsEnabled }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Base Atmospheric Sky Gradient */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `linear-gradient(180deg, ${theme.skyStops[0]} 0%, ${theme.skyStops[1]} 28%, ${theme.skyStops[2]} 52%, ${theme.skyStops[3]} 70%, ${theme.skyStops[4]} 82%, ${theme.waterStops[0]} 100%)`,
        }}
      />

      {/* Horizon Sunset / Aurora Radial Glow */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-[34%] w-[140vw] max-w-[1100px] h-[52vh] rounded-full blur-3xl transition-all duration-1000 ${
          animationsEnabled ? 'animate-pulse-slow' : ''
        }`}
        style={{
          background: `radial-gradient(circle, ${theme.sunGlow} 0%, ${theme.mistColor} 48%, transparent 75%)`,
        }}
      />

      {/* Bespoke Limerick Riverfront & Shannon Bridge Silhouette SVG */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-90"
      >
        <defs>
          <linearGradient id="distantHills" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.bgDeep} stopOpacity="0.45" />
            <stop offset="100%" stopColor={theme.bgDeep} stopOpacity="0.88" />
          </linearGradient>
          <linearGradient id="riverWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.waterStops[3]} stopOpacity="0.85" />
            <stop offset="35%" stopColor={theme.waterStops[2]} stopOpacity="0.92" />
            <stop offset="100%" stopColor={theme.waterStops[0]} stopOpacity="1" />
          </linearGradient>
          <linearGradient id="shimmerGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={theme.accent} stopOpacity="0" />
            <stop offset="50%" stopColor={theme.accent} stopOpacity="0.38" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="shimmerEmerald" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={theme.primary} stopOpacity="0" />
            <stop offset="50%" stopColor={theme.primary} stopOpacity="0.22" />
            <stop offset="100%" stopColor={theme.primary} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Subtle Starfield in upper sky */}
        <g fill="#F5F7F4" opacity="0.35">
          <circle cx="180" cy="95" r="1.2" />
          <circle cx="340" cy="62" r="1.5" />
          <circle cx="520" cy="118" r="1" />
          <circle cx="710" cy="54" r="1.4" />
          <circle cx="890" cy="102" r="1.1" />
          <circle cx="1080" cy="70" r="1.6" />
          <circle cx="1260" cy="125" r="1.2" />
          <circle cx="240" cy="175" r="0.9" />
          <circle cx="980" cy="165" r="1" />
        </g>

        {/* Rolling Irish Hills (County Clare / Limerick horizon) */}
        <path
          d="M0,520 Q240,465 480,505 T960,490 T1440,515 L1440,620 L0,620 Z"
          fill="url(#distantHills)"
        />

        {/* Limerick Riverfront Architectural Silhouette & Historic Castle / Spire */}
        <g fill={theme.bgDeep} opacity="0.88">
          {/* Left bank Georgian roofline & King John's Castle inspired bastion */}
          <path d="M0,565 L0,525 L45,525 L45,512 L62,512 L62,525 L110,525 L110,502 L128,496 L146,502 L146,522 L210,522 L210,535 L285,535 L285,565 Z" />
          {/* Cathedral spire silhouette in distance */}
          <path d="M325,565 L325,528 L334,528 L340,468 L346,528 L355,528 L355,565 Z" />
          {/* Thomond / Sarsfield style multi-arch river bridge */}
          <path d="M350,565 L350,544 L1090,544 L1090,565 L1050,565 Q1020,548 990,565 L930,565 Q900,548 870,565 L810,565 Q780,548 750,565 L690,565 Q660,548 630,565 L570,565 Q540,548 510,565 L450,565 Q420,548 390,565 Z" />
          {/* Right bank University / Plassey wooded treeline */}
          <path d="M1085,565 L1085,532 Q1120,512 1155,530 Q1195,506 1235,528 Q1285,505 1335,525 Q1390,510 1440,528 L1440,565 Z" />
        </g>

        {/* Warm window lights along the Limerick quays */}
        <g fill={theme.accent} opacity="0.55">
          <rect x="75" y="534" width="4" height="6" rx="1" />
          <rect x="92" y="534" width="4" height="6" rx="1" />
          <rect x="165" y="536" width="4" height="6" rx="1" />
          <rect x="182" y="536" width="4" height="6" rx="1" />
          <rect x="242" y="544" width="3" height="5" rx="1" />
          <circle cx="450" cy="541" r="2" />
          <circle cx="570" cy="541" r="2" />
          <circle cx="690" cy="541" r="2" />
          <circle cx="810" cy="541" r="2" />
          <circle cx="930" cy="541" r="2" />
        </g>

        {/* River Shannon Water Surface */}
        <rect x="0" y="564" width="1440" height="336" fill="url(#riverWater)" />

        {/* Subtle Water Reflections */}
        <g className={animationsEnabled ? 'animate-water-shimmer' : ''}>
          <rect x="520" y="582" width="400" height="3" rx="1.5" fill="url(#shimmerGold)" />
          <rect x="460" y="608" width="520" height="4" rx="2" fill="url(#shimmerGold)" />
          <rect x="560" y="642" width="320" height="3" rx="1.5" fill="url(#shimmerEmerald)" />
          <rect x="420" y="684" width="600" height="4" rx="2" fill="url(#shimmerGold)" opacity="0.65" />
          <rect x="500" y="736" width="440" height="3" rx="1.5" fill="url(#shimmerEmerald)" opacity="0.7" />
          <rect x="380" y="796" width="680" height="4" rx="2" fill="url(#shimmerGold)" opacity="0.45" />
        </g>
      </svg>

      {/* Subtle Floating Atmospheric Fireflies / Mist Particles */}
      {animationsEnabled && (
        <div className="absolute inset-0 overflow-hidden">
          {[
            { left: '14%', top: '42%', size: 3, delay: '0s', dur: '9s', color: theme.primary },
            { left: '28%', top: '55%', size: 2.5, delay: '2s', dur: '11s', color: theme.accent },
            { left: '68%', top: '38%', size: 3.5, delay: '1s', dur: '10s', color: theme.accent },
            { left: '82%', top: '52%', size: 2.5, delay: '3.5s', dur: '12s', color: theme.primary },
            { left: '48%', top: '46%', size: 2, delay: '4s', dur: '8.5s', color: theme.textMain },
            { left: '74%', top: '64%', size: 3, delay: '1.5s', dur: '11.5s', color: theme.primary },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full opacity-40 animate-float-particle"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 10px ${p.color}`,
                animationDelay: p.delay,
                animationDuration: p.dur,
              }}
            />
          ))}
        </div>
      )}

      {/* Vignette for editorial depth and crisp text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, transparent 35%, rgba(4, 11, 18, 0.62) 100%)',
        }}
      />
    </div>
  );
};

// --- PROGRESS RING COMPONENT ---
const ProgressRing = ({ percentage, size = 76, strokeWidth = 6, color, trackColor = 'rgba(245, 247, 244, 0.12)', label, sublabel }) => {
  const clamped = Math.max(0, Math.min(100, percentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-sm font-bold tracking-tight tabular-nums" style={{ color: '#F5F7F4' }}>
          {label ?? `${Math.round(clamped)}%`}
        </span>
        {sublabel && (
          <span className="text-[9px] uppercase tracking-wider opacity-70" style={{ color: '#A6B8B3' }}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};

// --- WALLPAPER CANVAS GENERATOR (1080 x 2400 PORTRAIT FOR MOTOROLA EDGE 50 FUSION) ---
function renderWallpaperToCanvas(canvas, options) {
  const {
    theme,
    includeCountdown,
    timeLeft,
    targetDateStr,
    quote,
  } = options;

  const W = 1080;
  const H = 2400;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Sky Gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, theme.skyStops[0]);
  skyGrad.addColorStop(0.28, theme.skyStops[1]);
  skyGrad.addColorStop(0.50, theme.skyStops[2]);
  skyGrad.addColorStop(0.65, theme.skyStops[3]);
  skyGrad.addColorStop(0.75, theme.skyStops[4]);
  skyGrad.addColorStop(1, theme.waterStops[0]);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Atmospheric Horizon Glow
  const glowGrad = ctx.createRadialGradient(W * 0.5, H * 0.62, 20, W * 0.5, H * 0.62, 650);
  glowGrad.addColorStop(0, theme.sunGlow);
  glowGrad.addColorStop(0.55, theme.mistColor);
  glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, W, H);

  // 3. Subtle Celestial Stars in Upper Safe Area
  ctx.fillStyle = 'rgba(245, 247, 244, 0.38)';
  const stars = [
    [160, 220, 2.2], [310, 170, 2.8], [520, 260, 1.8], [760, 190, 2.5],
    [910, 290, 2.0], [230, 390, 1.6], [840, 420, 2.2], [440, 340, 1.7],
    [660, 310, 1.9], [140, 540, 1.5], [940, 510, 1.8],
  ];
  stars.forEach(([sx, sy, sr]) => {
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  });

  // 4. Distant Irish Hills
  const horizonY = 1580;
  ctx.fillStyle = 'rgba(6, 19, 28, 0.55)';
  ctx.beginPath();
  ctx.moveTo(0, horizonY - 70);
  ctx.quadraticCurveTo(280, horizonY - 140, 560, horizonY - 85);
  ctx.quadraticCurveTo(840, horizonY - 135, W, horizonY - 75);
  ctx.lineTo(W, horizonY + 40);
  ctx.lineTo(0, horizonY + 40);
  ctx.closePath();
  ctx.fill();

  // 5. Limerick Riverfront & Shannon Bridge Silhouette
  ctx.fillStyle = theme.bgDeep;
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(0, horizonY - 55);
  ctx.lineTo(95, horizonY - 55);
  ctx.lineTo(95, horizonY - 82);
  ctx.lineTo(132, horizonY - 94);
  ctx.lineTo(168, horizonY - 82);
  ctx.lineTo(168, horizonY - 50);
  ctx.lineTo(255, horizonY - 50);
  // Spire
  ctx.lineTo(265, horizonY - 145);
  ctx.lineTo(275, horizonY - 50);
  // Bridge Deck
  ctx.lineTo(830, horizonY - 50);
  // Plassey wooded bank
  ctx.quadraticCurveTo(910, horizonY - 88, 980, horizonY - 56);
  ctx.quadraticCurveTo(1035, horizonY - 80, W, horizonY - 54);
  ctx.lineTo(W, horizonY);
  ctx.closePath();
  ctx.fill();

  // Bridge Arches (cutout feel using horizon glow color)
  ctx.fillStyle = theme.skyStops[4];
  [330, 445, 560, 675].forEach((ax) => {
    ctx.beginPath();
    ctx.arc(ax, horizonY, 36, Math.PI, 0, false);
    ctx.fill();
  });

  // Warm Quay Lights
  ctx.fillStyle = theme.accent;
  [115, 145, 205, 385, 500, 615, 730].forEach((lx, i) => {
    ctx.beginPath();
    ctx.arc(lx, i < 3 ? horizonY - 34 : horizonY - 54, 3.2, 0, Math.PI * 2);
    ctx.fill();
  });

  // 6. River Shannon Water & Reflections
  const waterGrad = ctx.createLinearGradient(0, horizonY, 0, H);
  waterGrad.addColorStop(0, theme.waterStops[3]);
  waterGrad.addColorStop(0.3, theme.waterStops[2]);
  waterGrad.addColorStop(1, theme.waterStops[0]);
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, horizonY, W, H - horizonY);

  // Shimmer lines on the water
  const shimmers = [
    { y: horizonY + 45, w: 420, h: 4, c: theme.accent, a: 0.35 },
    { y: horizonY + 95, w: 540, h: 5, c: theme.accent, a: 0.28 },
    { y: horizonY + 155, w: 340, h: 4, c: theme.primary, a: 0.22 },
    { y: horizonY + 230, w: 580, h: 5, c: theme.accent, a: 0.20 },
    { y: horizonY + 320, w: 400, h: 4, c: theme.primary, a: 0.16 },
  ];
  shimmers.forEach((s) => {
    const rGrad = ctx.createLinearGradient(W / 2 - s.w / 2, 0, W / 2 + s.w / 2, 0);
    rGrad.addColorStop(0, 'rgba(0,0,0,0)');
    rGrad.addColorStop(0.5, s.c);
    rGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = s.a;
    ctx.fillStyle = rGrad;
    ctx.fillRect(W / 2 - s.w / 2, s.y, s.w, s.h);
  });
  ctx.globalAlpha = 1;

  // 7. SAFE-AREA AWARE EDITORIAL TYPOGRAPHY (Leaves top 560px clear for Android Clock & bottom 360px clear for fingerprint/shortcuts)
  const cardX = 84;
  const cardW = W - 168;
  const cardY = 640;
  const cardH = includeCountdown ? 820 : 650;

  // Frosted Glass Card Background
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 44);
  ctx.fillStyle = 'rgba(6, 19, 28, 0.66)';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = theme.border;
  ctx.stroke();
  ctx.restore();

  // Subtle top accent line inside card
  const barGrad = ctx.createLinearGradient(cardX + 120, 0, cardX + cardW - 120, 0);
  barGrad.addColorStop(0, 'rgba(0,0,0,0)');
  barGrad.addColorStop(0.5, theme.primary);
  barGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = barGrad;
  ctx.fillRect(cardX + 120, cardY + 2, cardW - 240, 3);

  ctx.textAlign = 'center';

  // Eyebrow Label
  ctx.fillStyle = theme.primary;
  ctx.font = '600 24px system-ui, -apple-system, sans-serif';
  ctx.fillText('THE NEXT CHAPTER  •  2027', W / 2, cardY + 86);

  // Destination Headline
  ctx.fillStyle = theme.textMain;
  ctx.font = '700 74px system-ui, -apple-system, sans-serif';
  ctx.fillText('IRELAND', W / 2, cardY + 178);

  // University & Programme
  ctx.fillStyle = theme.accent;
  ctx.font = '600 32px system-ui, -apple-system, sans-serif';
  ctx.fillText('University of Limerick', W / 2, cardY + 240);

  ctx.fillStyle = theme.textMuted;
  ctx.font = '500 28px system-ui, -apple-system, sans-serif';
  ctx.fillText('MSc in Business Analytics', W / 2, cardY + 286);

  // Divider
  ctx.strokeStyle = 'rgba(245, 247, 244, 0.14)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cardX + 90, cardY + 334);
  ctx.lineTo(cardX + cardW - 90, cardY + 334);
  ctx.stroke();

  let nextSectionY = cardY + 410;

  if (includeCountdown) {
    // Countdown Grid (Days / Hours / Minutes)
    const boxes = [
      { val: String(timeLeft.days).padStart(3, '0'), lbl: 'DAYS' },
      { val: String(timeLeft.hours).padStart(2, '0'), lbl: 'HOURS' },
      { val: String(timeLeft.minutes).padStart(2, '0'), lbl: 'MINS' },
    ];
    const boxW = 220;
    const gap = 28;
    const startX = W / 2 - (boxW * 3 + gap * 2) / 2;

    boxes.forEach((b, idx) => {
      const bx = startX + idx * (boxW + gap);
      const by = cardY + 372;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.roundRect(bx, by, boxW, 165, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(113, 245, 154, 0.18)';
      ctx.stroke();

      ctx.fillStyle = theme.textMain;
      ctx.font = '700 64px monospace';
      ctx.fillText(b.val, bx + boxW / 2, by + 94);

      ctx.fillStyle = theme.primary;
      ctx.font = '600 20px system-ui, -apple-system, sans-serif';
      ctx.fillText(b.lbl, bx + boxW / 2, by + 136);
    });

    ctx.fillStyle = theme.textMuted;
    ctx.font = '500 22px system-ui, -apple-system, sans-serif';
    ctx.fillText(`Target Horizon: ${formatReadableDate(targetDateStr)} (Provisional)`, W / 2, cardY + 585);
    nextSectionY = cardY + 668;
  } else {
    // Evergreen Horizon Pill
    ctx.fillStyle = 'rgba(113, 245, 154, 0.10)';
    ctx.beginPath();
    ctx.roundRect(W / 2 - 220, cardY + 376, 440, 64, 32);
    ctx.fill();
    ctx.strokeStyle = theme.border;
    ctx.stroke();

    ctx.fillStyle = theme.primary;
    ctx.font = '600 26px system-ui, -apple-system, sans-serif';
    ctx.fillText('AUTUMN 2027  •  LIMERICK', W / 2, cardY + 417);
    nextSectionY = cardY + 515;
  }

  // Motivational Statement (Wrapped neatly)
  ctx.fillStyle = theme.textMain;
  ctx.font = 'italic 500 32px Georgia, serif';
  const words = `"${quote}"`.split(' ');
  const lines = [];
  let currentLine = '';
  words.forEach((word) => {
    const test = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(test).width > cardW - 120) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = test;
    }
  });
  if (currentLine) lines.push(currentLine);

  lines.slice(0, 3).forEach((line, i) => {
    ctx.fillText(line, W / 2, nextSectionY + i * 44);
  });

  // Subtle footer signature above bottom safe zone
  ctx.fillStyle = 'rgba(245, 247, 244, 0.45)';
  ctx.font = '500 22px system-ui, -apple-system, sans-serif';
  ctx.fillText('EVERY DAY COUNTS', W / 2, 1980);
}

// --- MAIN APPLICATION ---
export default function App() {
  // Load persisted state from localStorage safely
  const loadInitialState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback cleanly if storage is blocked
    }
    return null;
  };

  const savedData = useMemo(() => loadInitialState(), []);

  // Core App State
  const [activeTab, setActiveTab] = useState('home');
  const [showWelcome, setShowWelcome] = useState(() => !savedData?.hasSeenWelcome);
  const [themeId, setThemeId] = useState(savedData?.themeId || 'emeraldSunset');
  const [targetDate, setTargetDate] = useState(savedData?.targetDate || DEFAULT_TARGET_DATE);
  const [timezone, setTimezone] = useState(savedData?.timezone || 'Asia/Kolkata');
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    if (typeof savedData?.animationsEnabled === 'boolean') return savedData.animationsEnabled;
    if (typeof window !== 'undefined' && window.matchMedia) {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });

  // Milestones State
  const [milestones, setMilestones] = useState(savedData?.milestones || INITIAL_MILESTONES);
  const [expandedMilestoneId, setExpandedMilestoneId] = useState(null);

  // Timeline State
  const [timeline, setTimeline] = useState(savedData?.timeline || INITIAL_TIMELINE);
  const [editingTimelineId, setEditingTimelineId] = useState(null);

  // Daily Focus Tasks State (resets completion if calendar date changed, preserves custom titles)
  const [dailyTasks, setDailyTasks] = useState(() => {
    const today = getTodayKey();
    if (savedData?.dailyTasks && savedData?.dailyTaskDate === today) {
      return savedData.dailyTasks;
    }
    if (savedData?.dailyTasks) {
      return savedData.dailyTasks.map((t) => ({ ...t, completed: false }));
    }
    return INITIAL_DAILY_TASKS;
  });
  const [dailyTaskDate, setDailyTaskDate] = useState(getTodayKey());
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Focus Timer State
  const [timerSeconds, setTimerSeconds] = useState(60 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState(60);

  // Motivational Quotes State
  const [quotes, setQuotes] = useState(savedData?.quotes || INITIAL_QUOTES);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [autoRotateQuotes, setAutoRotateQuotes] = useState(true);
  const [newQuoteInput, setNewQuoteInput] = useState('');
  const [showAddQuote, setShowAddQuote] = useState(false);

  // Wallpaper Studio State
  const [wallpaperMode, setWallpaperMode] = useState('clean'); // 'clean' | 'mockup'
  const [wallpaperIncludeCountdown, setWallpaperIncludeCountdown] = useState(true);
  const [wallpaperExportedNotice, setWallpaperExportedNotice] = useState(false);

  // Calendar / ICS Modal & Toast Feedback
  const [calendarGuideOpen, setCalendarGuideOpen] = useState(false);
  const [lastExportedEventName, setLastExportedEventName] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [quickDateModalOpen, setQuickDateModalOpen] = useState(false);
  const [tempDateInput, setTempDateInput] = useState(targetDate.slice(0, 16));
  const [dateError, setDateError] = useState('');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Live Clock Tick
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(targetDate));

  const theme = THEMES[themeId] || THEMES.emeraldSunset;

  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3400);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      const payload = {
        hasSeenWelcome: !showWelcome,
        themeId,
        targetDate,
        timezone,
        animationsEnabled,
        milestones,
        timeline,
        dailyTasks,
        dailyTaskDate,
        quotes,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors
    }
  }, [
    showWelcome,
    themeId,
    targetDate,
    timezone,
    animationsEnabled,
    milestones,
    timeline,
    dailyTasks,
    dailyTaskDate,
    quotes,
  ]);

  // Real-time 1-second Countdown Interval
  useEffect(() => {
    setTimeLeft(calculateTimeRemaining(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Quote Auto-Rotation
  useEffect(() => {
    if (!autoRotateQuotes || quotes.length <= 1) return;
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [autoRotateQuotes, quotes.length]);

  // Focus Session Timer Interval
  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          triggerToast('Focus block completed! Great discipline.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning, triggerToast]);

  // Derived Progress Metrics
  const completedMilestonesCount = milestones.filter((m) => m.completed).length;
  const pendingMilestonesCount = milestones.length - completedMilestonesCount;
  const milestoneCompletionPct = Math.round((completedMilestonesCount / milestones.length) * 100);

  const completedTasksCount = dailyTasks.filter((t) => t.completed).length;
  const dailyTaskPct = dailyTasks.length > 0 ? Math.round((completedTasksCount / dailyTasks.length) * 100) : 0;

  const journeyElapsedPct = useMemo(() => {
    const start = new Date(JOURNEY_BASELINE_DATE).getTime();
    const end = new Date(targetDate).getTime();
    const now = Date.now();
    if (isNaN(end) || end <= start) return 100;
    const pct = ((now - start) / (end - start)) * 100;
    return Math.max(2, Math.min(100, pct));
  }, [targetDate]);

  const nextUpcomingMilestone = useMemo(() => {
    const pending = milestones
      .filter((m) => !m.completed && m.targetDate)
      .sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate));
    return pending[0] || null;
  }, [milestones]);

  // Handlers
  const handleToggleMilestone = (id) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const nextCompleted = !m.completed;
        triggerToast(
          nextCompleted
            ? `Milestone achieved: ${m.title}`
            : `Marked as pending: ${m.title}`
        );
        return { ...m, completed: nextCompleted };
      })
    );
  };

  const handleUpdateMilestone = (id, field, value) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleExportSingleICS = (title, date, description) => {
    const ics = generateICSContent([{ title, date, description }]);
    const safeSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32);
    downloadFile(ics, `ireland-2027-${safeSlug}.ics`, 'text/calendar;charset=utf-8');
    setLastExportedEventName(title);
    setCalendarGuideOpen(true);
  };

  const handleExportAllMilestonesICS = () => {
    const events = milestones.map((m) => ({
      id: m.id,
      title: m.title,
      date: m.targetDate,
      description: `${m.subtitle}. ${m.notes}`,
    }));
    const ics = generateICSContent(events);
    downloadFile(ics, 'ireland-2027-all-milestones.ics', 'text/calendar;charset=utf-8');
    setLastExportedEventName('All 5 Ireland 2027 Milestones');
    setCalendarGuideOpen(true);
  };

  const handleSaveTargetDate = () => {
    const parsed = new Date(tempDateInput);
    if (!tempDateInput || isNaN(parsed.getTime())) {
      setDateError('Please choose a valid calendar date and time.');
      return;
    }
    setDateError('');
    setTargetDate(tempDateInput);
    setQuickDateModalOpen(false);
    triggerToast(`Target date updated to ${formatReadableDate(tempDateInput, timezone)}`);
  };

  const handleToggleDailyTask = (id) => {
    setDailyTaskDate(getTodayKey());
    setDailyTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleUpdateDailyTask = (id, field, value) => {
    setDailyTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const handleAddCustomQuote = (e) => {
    e.preventDefault();
    const trimmed = newQuoteInput.trim();
    if (!trimmed) return;
    setQuotes((prev) => [trimmed, ...prev]);
    setQuoteIndex(0);
    setNewQuoteInput('');
    setShowAddQuote(false);
    triggerToast('Personal mantra added.');
  };

  const handleExportWallpaperPNG = () => {
    const canvas = document.createElement('canvas');
    renderWallpaperToCanvas(canvas, {
      theme,
      includeCountdown: wallpaperIncludeCountdown,
      timeLeft,
      targetDateStr: targetDate,
      quote: quotes[quoteIndex] || INITIAL_QUOTES[0],
    });
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = wallpaperIncludeCountdown
        ? `ireland-2027-lockscreen-${timeLeft.days}d-1080x2400.png`
        : 'ireland-2027-lockscreen-evergreen-1080x2400.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setWallpaperExportedNotice(true);
      triggerToast('1080 × 2400 PNG wallpaper downloaded!');
    }, 'image/png');
  };

  const handleResetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setThemeId('emeraldSunset');
    setTargetDate(DEFAULT_TARGET_DATE);
    setTimezone('Asia/Kolkata');
    setMilestones(INITIAL_MILESTONES);
    setTimeline(INITIAL_TIMELINE);
    setDailyTasks(INITIAL_DAILY_TASKS);
    setQuotes(INITIAL_QUOTES);
    setQuoteIndex(0);
    setConfirmResetOpen(false);
    triggerToast('All progress reset to initial defaults.');
  };

  // Current formatted clock in chosen timezone
  const formattedTimezoneNow = useMemo(() => {
    try {
      const opts = {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
        ...(timezone !== 'local' ? { timeZone: timezone } : {}),
      };
      return new Intl.DateTimeFormat('en-IE', opts).format(new Date());
    } catch {
      return '';
    }
  }, [timezone, timeLeft.seconds]);

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden font-sans antialiased selection:bg-emerald-400/30"
      style={{ backgroundColor: theme.bgDeep, color: theme.textMain }}
    >
      {/* Global Custom Keyframe Animations */}
      <style>{`
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.78; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -8px) scale(1.04); }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
          50% { transform: translateY(-28px) translateX(10px); opacity: 0.65; }
          100% { transform: translateY(-56px) translateX(-6px); opacity: 0.1; }
        }
        @keyframes waterShimmer {
          0%, 100% { opacity: 0.72; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.03); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-slow { animation: pulseSlow 9s ease-in-out infinite; }
        .animate-float-particle { animation: floatParticle 10s ease-in-out infinite; }
        .animate-water-shimmer { animation: waterShimmer 6s ease-in-out infinite; transform-origin: center; }
        .animate-enter { animation: fadeSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow, .animate-float-particle, .animate-water-shimmer, .animate-enter {
            animation: none !important;
          }
        }
      `}</style>

      {/* Atmospheric Limerick / River Shannon Backdrop */}
      <CinematicBackdrop theme={theme} animationsEnabled={animationsEnabled} />

      {/* CINEMATIC WELCOME SPLASH OVERLAY */}
      {showWelcome && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5 backdrop-blur-xl transition-opacity duration-500"
          style={{ backgroundColor: 'rgba(4, 12, 19, 0.86)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to The Next Chapter — Ireland 2027"
        >
          <div
            className="max-w-md w-full rounded-3xl p-7 sm:p-8 border shadow-2xl relative overflow-hidden animate-enter"
            style={{
              backgroundColor: theme.bgCardSolid,
              borderColor: theme.border,
              boxShadow: `0 25px 70px -15px rgba(0,0,0,0.85), 0 0 40px ${theme.mistColor}`,
            }}
          >
            <div
              className="absolute top-0 left-8 right-8 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${theme.primary}, ${theme.accent}, transparent)`,
              }}
            />

            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: theme.primary }}>
              <Sparkles className="w-4 h-4" />
              <span>Personal Transition Command</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-2" style={{ color: theme.textMain }}>
              THE NEXT CHAPTER
            </h1>
            <p className="text-base font-medium mb-5" style={{ color: theme.accent }}>
              Ireland 2027 — Every Day Counts
            </p>

            <div
              className="rounded-2xl p-4 mb-6 border space-y-2.5 text-sm leading-relaxed"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
                color: theme.textMuted,
              }}
            >
              <p style={{ color: theme.textMain }}>
                From software engineering in India to the <strong className="font-semibold">MSc in Business Analytics</strong> at the <strong className="font-semibold">University of Limerick</strong>.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: 'rgba(113, 245, 154, 0.14)', color: theme.primary }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Unconditional Offer
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: 'rgba(232, 198, 122, 0.15)', color: theme.accent }}
                >
                  <Award className="w-3.5 h-3.5" /> €2,500 Scholarship
                </span>
              </div>
            </div>

            <blockquote
              className="italic text-sm border-l-2 pl-3.5 mb-7"
              style={{ borderColor: theme.primary, color: theme.textMain }}
            >
              “Don't just count the days. Make the days count.”
            </blockquote>

            <button
              onClick={() => setShowWelcome(false)}
              className="w-full py-3.5 px-5 rounded-2xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg cursor-pointer"
              style={{
                backgroundColor: theme.primary,
                color: '#041219',
                boxShadow: `0 10px 28px -6px ${theme.sunGlow}`,
              }}
            >
              <span>Enter Mission Control</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TOAST FEEDBACK BANNER */}
      {toastMessage && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full border backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-medium animate-enter max-w-[92vw]"
          style={{
            backgroundColor: theme.bgCardSolid,
            borderColor: theme.primary,
            color: theme.textMain,
          }}
          role="status"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* MAIN SHELL CONTAINER */}
      <div className="relative z-10 max-w-3xl mx-auto min-h-screen flex flex-col pb-28">
        {/* TOP EDITORIAL HEADER */}
        <header className="px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 0 8px ${theme.primary}`,
                }}
              />
              <span
                className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: theme.primary }}
              >
                THE NEXT CHAPTER
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight mt-0.5" style={{ color: theme.textMain }}>
              Ireland 2027 — <span style={{ color: theme.accent }}>Every Day Counts</span>
            </h1>
          </div>

          <button
            onClick={() => setShowWelcome(true)}
            className="px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md transition hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
            style={{
              backgroundColor: theme.bgCard,
              borderColor: theme.border,
              color: theme.textMuted,
            }}
            title="View Story Intro"
          >
            <Compass className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <span className="hidden sm:inline">Story</span>
          </button>
        </header>

        {/* DYNAMIC TAB CONTENT */}
        <main className="flex-1 px-4 sm:px-6 space-y-5">
          {/* ========================================================== */}
          {/* TAB 1: HOME — MISSION CONTROL & LIVE COUNTDOWN             */}
          {/* ========================================================== */}
          {activeTab === 'home' && (
            <div className="space-y-5 animate-enter">
              {/* HERO COUNTDOWN CARD */}
              <section
                className="rounded-3xl p-5 sm:p-7 border backdrop-blur-xl relative overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: theme.bgCard,
                  borderColor: theme.border,
                }}
                aria-label="Live Countdown to Ireland 2027"
              >
                {/* Top illuminate edge */}
                <div
                  className="absolute top-0 left-10 right-10 h-[1.5px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
                  }}
                />

                {/* Destination & Provisional Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium" style={{ color: theme.accent }}>
                      <span>University of Limerick</span>
                      <span>•</span>
                      <span>MSc Business Analytics</span>
                    </div>
                    <p className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: theme.textMuted }}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        Target: <strong style={{ color: theme.textMain }}>{formatReadableDate(targetDate, timezone)}</strong>
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold"
                        style={{ backgroundColor: 'rgba(232, 198, 122, 0.14)', color: theme.accent }}
                      >
                        Provisional
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setTempDateInput(targetDate.slice(0, 16));
                      setDateError('');
                      setQuickDateModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      borderColor: theme.border,
                      color: theme.textMain,
                    }}
                  >
                    <Edit3 className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                    <span>Edit Date</span>
                  </button>
                </div>

                {/* 4-COLUMN LIVE TICKING DIGITS */}
                {timeLeft.isPast ? (
                  <div className="py-6 text-center">
                    <p className="text-2xl font-bold" style={{ color: theme.primary }}>
                      The Next Chapter Has Begun — Welcome to Limerick!
                    </p>
                    <p className="text-sm mt-1" style={{ color: theme.textMuted }}>
                      Update your target horizon anytime if your travel schedule shifts.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-4 my-2">
                    {[
                      { value: String(timeLeft.days).padStart(3, '0'), label: 'Days' },
                      { value: String(timeLeft.hours).padStart(2, '0'), label: 'Hours' },
                      { value: String(timeLeft.minutes).padStart(2, '0'), label: 'Minutes' },
                      { value: String(timeLeft.seconds).padStart(2, '0'), label: 'Seconds', highlight: true },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="rounded-2xl py-3.5 sm:py-5 px-2 text-center border relative overflow-hidden"
                        style={{
                          backgroundColor: 'rgba(4, 12, 19, 0.55)',
                          borderColor: unit.highlight ? theme.borderAccent : 'rgba(255,255,255,0.08)',
                        }}
                      >
                        <div
                          className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight tabular-nums font-mono"
                          style={{ color: unit.highlight ? theme.primary : theme.textMain }}
                        >
                          {unit.value}
                        </div>
                        <div
                          className="text-[10px] sm:text-xs uppercase tracking-[0.16em] mt-1.5 font-medium"
                          style={{ color: unit.highlight ? theme.accent : theme.textMuted }}
                        >
                          {unit.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Journey Timeline Progress Bar & Timezone Info */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: theme.textMuted }}>
                      Horizon Elapsed ({Math.round(journeyElapsedPct)}%)
                    </span>
                    <span className="font-mono text-[11px]" style={{ color: theme.textMuted }}>
                      {formattedTimezoneNow}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full overflow-hidden bg-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${journeyElapsedPct}%`,
                        background: `linear-gradient(90deg, ${theme.primaryDark}, ${theme.primary}, ${theme.accent})`,
                      }}
                    />
                  </div>
                  <p className="text-[11px]" style={{ color: theme.textMuted }}>
                    * 1 September 2027 is a provisional planning horizon, not a confirmed flight or official UL orientation date.
                  </p>
                </div>
              </section>

              {/* PROGRESS INSIGHTS & RINGS */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
                aria-label="Preparation Progress Insights"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2" style={{ color: theme.textMain }}>
                    <Target className="w-4 h-4" style={{ color: theme.primary }} />
                    <span>Mission Readiness</span>
                  </h2>
                  <span className="text-xs font-medium" style={{ color: theme.accent }}>
                    {completedMilestonesCount} of {milestones.length} Milestones
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-center">
                  {/* Rings Pair */}
                  <div className="flex items-center justify-around sm:justify-start gap-4 bg-black/25 rounded-2xl p-3.5 border border-white/5">
                    <ProgressRing
                      percentage={milestoneCompletionPct}
                      color={theme.primary}
                      sublabel="Milestones"
                    />
                    <ProgressRing
                      percentage={dailyTaskPct}
                      color={theme.accent}
                      sublabel="Today"
                    />
                  </div>

                  {/* Key Metrics Summary */}
                  <div className="sm:col-span-2 grid grid-cols-2 gap-2.5">
                    <div className="rounded-2xl p-3 bg-black/25 border border-white/5">
                      <div className="text-[11px] uppercase tracking-wider" style={{ color: theme.textMuted }}>
                        Completed / Pending
                      </div>
                      <div className="text-base font-bold mt-0.5" style={{ color: theme.textMain }}>
                        <span style={{ color: theme.primary }}>{completedMilestonesCount} Done</span>
                        <span className="mx-1.5 opacity-40">•</span>
                        <span>{pendingMilestonesCount} Left</span>
                      </div>
                    </div>

                    <div className="rounded-2xl p-3 bg-black/25 border border-white/5">
                      <div className="text-[11px] uppercase tracking-wider" style={{ color: theme.textMuted }}>
                        Daily Focus
                      </div>
                      <div className="text-base font-bold mt-0.5" style={{ color: theme.textMain }}>
                        {completedTasksCount}/{dailyTasks.length}{' '}
                        <span className="text-xs font-normal" style={{ color: theme.textMuted }}>
                          Tasks Today
                        </span>
                      </div>
                    </div>

                    <div className="col-span-2 rounded-2xl p-3 bg-black/25 border border-white/5 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-wider" style={{ color: theme.textMuted }}>
                          Next Target Milestone
                        </div>
                        <div className="text-xs sm:text-sm font-semibold truncate mt-0.5" style={{ color: theme.textMain }}>
                          {nextUpcomingMilestone
                            ? `${nextUpcomingMilestone.title} (${formatReadableDate(nextUpcomingMilestone.targetDate, timezone)})`
                            : 'All 5 Primary Milestones Completed!'}
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('focus')}
                        className="shrink-0 px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 cursor-pointer"
                        style={{ backgroundColor: 'rgba(113, 245, 154, 0.14)', color: theme.primary }}
                      >
                        <span>Focus</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* MOTIVATIONAL INTELLIGENCE CARD */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl relative"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.borderAccent }}
                aria-label="Motivational Intelligence"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Quote className="w-4 h-4" style={{ color: theme.accent }} />
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.accent }}>
                      Daily Mindset
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setAutoRotateQuotes((v) => !v)}
                      className="px-2 py-1 rounded-lg text-[11px] border border-white/10 transition cursor-pointer"
                      style={{ color: autoRotateQuotes ? theme.primary : theme.textMuted }}
                      title="Toggle auto-rotation"
                    >
                      {autoRotateQuotes ? 'Auto' : 'Manual'}
                    </button>
                    <button
                      onClick={() => setShowAddQuote((v) => !v)}
                      className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer"
                      style={{ color: theme.textMain }}
                      title="Add personal quote"
                      aria-label="Add personal quote"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length)}
                      className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer"
                      aria-label="Previous quote"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setQuoteIndex((prev) => (prev + 1) % quotes.length)}
                      className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer"
                      aria-label="Next quote"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-base sm:text-lg font-medium italic leading-relaxed" style={{ color: theme.textMain }}>
                  “{quotes[quoteIndex]}”
                </p>

                {showAddQuote && (
                  <form onSubmit={handleAddCustomQuote} className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={newQuoteInput}
                      onChange={(e) => setNewQuoteInput(e.target.value)}
                      placeholder="Write your own reminder..."
                      className="flex-1 rounded-xl px-3 py-2 text-xs bg-black/40 border border-white/15 focus:outline-none"
                      style={{ color: theme.textMain }}
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                      style={{ backgroundColor: theme.primary, color: '#041219' }}
                    >
                      Save
                    </button>
                  </form>
                )}
              </section>

              {/* INTERACTIVE MILESTONE TRACKER (5 PRIMARY MILESTONES) */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
                aria-label="Primary Relocation Milestones"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <h2 className="text-base font-bold" style={{ color: theme.textMain }}>
                      Preparation Milestones
                    </h2>
                    <p className="text-xs" style={{ color: theme.textMuted }}>
                      Track completion, adjust target dates & export .ics reminders
                    </p>
                  </div>

                  <button
                    onClick={handleExportAllMilestonesICS}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition hover:bg-white/5 cursor-pointer"
                    style={{ borderColor: theme.borderAccent, color: theme.accent }}
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Export All .ics</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {milestones.map((m) => {
                    const isExpanded = expandedMilestoneId === m.id;
                    return (
                      <div
                        key={m.id}
                        className="rounded-2xl border transition-all duration-300 overflow-hidden"
                        style={{
                          backgroundColor: m.completed
                            ? 'rgba(113, 245, 154, 0.07)'
                            : 'rgba(4, 12, 19, 0.48)',
                          borderColor: m.completed ? 'rgba(113, 245, 154, 0.35)' : 'rgba(255,255,255,0.09)',
                        }}
                      >
                        <div className="p-3.5 sm:p-4 flex items-start gap-3.5">
                          {/* Checkbox Toggle */}
                          <button
                            onClick={() => handleToggleMilestone(m.id)}
                            className="mt-0.5 shrink-0 transition-transform active:scale-90 cursor-pointer"
                            aria-label={`Mark ${m.title} as ${m.completed ? 'pending' : 'completed'}`}
                          >
                            {m.completed ? (
                              <CheckCircle2 className="w-6 h-6" style={{ color: theme.primary }} />
                            ) : (
                              <Circle className="w-6 h-6 opacity-55 hover:opacity-90" style={{ color: theme.textMuted }} />
                            )}
                          </button>

                          {/* Main Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h3
                                className={`text-sm sm:text-base font-semibold ${
                                  m.completed ? 'line-through opacity-85' : ''
                                }`}
                                style={{ color: theme.textMain }}
                              >
                                {m.title}
                              </h3>
                              <span
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                style={{
                                  backgroundColor: m.completed
                                    ? 'rgba(113, 245, 154, 0.18)'
                                    : 'rgba(232, 198, 122, 0.15)',
                                  color: m.completed ? theme.primary : theme.accent,
                                }}
                              >
                                {m.completed ? 'Completed' : 'Pending'}
                              </span>
                            </div>

                            <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>
                              {m.subtitle}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 pt-2 border-t border-white/5 text-xs">
                              <div className="flex items-center gap-1.5" style={{ color: theme.textMuted }}>
                                <Calendar className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                <span>Target: {formatReadableDate(m.targetDate, timezone)}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleExportSingleICS(m.title, m.targetDate, `${m.subtitle}. ${m.notes}`)
                                  }
                                  className="px-2 py-1 rounded-lg text-[11px] font-medium hover:bg-white/10 flex items-center gap-1 cursor-pointer"
                                  style={{ color: theme.accent }}
                                  title="Download .ics calendar reminder"
                                >
                                  <CalendarPlus className="w-3 h-3" />
                                  <span>.ics</span>
                                </button>

                                <button
                                  onClick={() => setExpandedMilestoneId(isExpanded ? null : m.id)}
                                  className="px-2 py-1 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-white/10 cursor-pointer"
                                  style={{ color: theme.textMain }}
                                >
                                  {isExpanded ? 'Close' : 'Details / Edit'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expandable Date & Notes Editor */}
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-2 border-t border-white/10 bg-black/25 space-y-3 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block mb-1 font-medium" style={{ color: theme.textMuted }}>
                                  Target Date
                                </label>
                                <input
                                  type="date"
                                  value={m.targetDate}
                                  onChange={(e) => handleUpdateMilestone(m.id, 'targetDate', e.target.value)}
                                  className="w-full rounded-xl px-3 py-2 bg-black/40 border border-white/15 focus:outline-none"
                                  style={{ color: theme.textMain }}
                                />
                              </div>
                              <div>
                                <label className="block mb-1 font-medium" style={{ color: theme.textMuted }}>
                                  Status
                                </label>
                                <button
                                  onClick={() => handleToggleMilestone(m.id)}
                                  className="w-full rounded-xl px-3 py-2 border text-left font-medium cursor-pointer"
                                  style={{
                                    borderColor: theme.border,
                                    color: m.completed ? theme.primary : theme.accent,
                                  }}
                                >
                                  {m.completed ? '✓ Completed (Click to reopen)' : '○ Pending (Click to complete)'}
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block mb-1 font-medium" style={{ color: theme.textMuted }}>
                                Preparation Notes
                              </label>
                              <textarea
                                rows={2}
                                value={m.notes}
                                onChange={(e) => handleUpdateMilestone(m.id, 'notes', e.target.value)}
                                className="w-full rounded-xl px-3 py-2 bg-black/40 border border-white/15 focus:outline-none"
                                style={{ color: theme.textMain }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 2: TIMELINE — PREPARATION ROADMAP                      */}
          {/* ========================================================== */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 animate-enter">
              <div
                className="rounded-3xl p-5 border backdrop-blur-xl"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: theme.primary }}>
                      Strategic Roadmap
                    </span>
                    <h2 className="text-xl font-bold mt-0.5" style={{ color: theme.textMain }}>
                      India → Ireland Transition Timeline
                    </h2>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: theme.textMuted }}>
                      These are suggested planning windows for your personal roadmap—not verified University of Limerick or Irish Immigration Service (ISD) deadlines. All dates are editable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vertical Timeline List */}
              <div className="relative pl-6 sm:pl-8 space-y-4 before:content-[''] before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-white/15">
                {timeline.map((item, idx) => {
                  const isEditing = editingTimelineId === item.id;
                  const isFinal = idx === timeline.length - 1;

                  return (
                    <div
                      key={item.id}
                      className="relative rounded-3xl p-4 sm:p-5 border backdrop-blur-xl transition"
                      style={{
                        backgroundColor: theme.bgCard,
                        borderColor: isFinal ? theme.borderAccent : theme.border,
                      }}
                    >
                      {/* Timeline Node Dot */}
                      <span
                        className="absolute -left-[21px] sm:-left-[25px] top-6 w-3.5 h-3.5 rounded-full border-2"
                        style={{
                          backgroundColor: isFinal ? theme.accent : theme.bgDeep,
                          borderColor: isFinal ? theme.accent : theme.primary,
                          boxShadow: `0 0 10px ${isFinal ? theme.accent : theme.primary}`,
                        }}
                      />

                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span
                          className="text-xs font-bold tracking-wide"
                          style={{ color: isFinal ? theme.accent : theme.primary }}
                        >
                          {item.windowLabel}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/10" style={{ color: theme.textMuted }}>
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-base font-bold" style={{ color: theme.textMain }}>
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm mt-1.5 leading-relaxed" style={{ color: theme.textMuted }}>
                        {item.description}
                      </p>

                      <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span style={{ color: theme.textMuted }}>
                          Anchor Date: <strong style={{ color: theme.textMain }}>{formatReadableDate(item.editableDate, timezone)}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleExportSingleICS(item.title, item.editableDate, item.description)
                            }
                            className="px-2.5 py-1 rounded-xl border border-white/10 hover:bg-white/5 flex items-center gap-1 cursor-pointer"
                            style={{ color: theme.accent }}
                          >
                            <CalendarPlus className="w-3.5 h-3.5" />
                            <span>Add .ics</span>
                          </button>
                          <button
                            onClick={() => setEditingTimelineId(isEditing ? null : item.id)}
                            className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 font-medium cursor-pointer"
                            style={{ color: theme.textMain }}
                          >
                            {isEditing ? 'Done' : 'Edit'}
                          </button>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="block mb-1" style={{ color: theme.textMuted }}>
                                Planning Window Label
                              </label>
                              <input
                                type="text"
                                value={item.windowLabel}
                                onChange={(e) =>
                                  setTimeline((prev) =>
                                    prev.map((t) =>
                                      t.id === item.id ? { ...t, windowLabel: e.target.value } : t
                                    )
                                  )
                                }
                                className="w-full rounded-xl px-3 py-2 bg-black/40 border border-white/15"
                                style={{ color: theme.textMain }}
                              />
                            </div>
                            <div>
                              <label className="block mb-1" style={{ color: theme.textMuted }}>
                                Anchor Calendar Date
                              </label>
                              <input
                                type="date"
                                value={item.editableDate}
                                onChange={(e) =>
                                  setTimeline((prev) =>
                                    prev.map((t) =>
                                      t.id === item.id ? { ...t, editableDate: e.target.value } : t
                                    )
                                  )
                                }
                                className="w-full rounded-xl px-3 py-2 bg-black/40 border border-white/15"
                                style={{ color: theme.textMain }}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block mb-1" style={{ color: theme.textMuted }}>
                              Notes / Action Items
                            </label>
                            <textarea
                              rows={2}
                              value={item.description}
                              onChange={(e) =>
                                setTimeline((prev) =>
                                  prev.map((t) =>
                                    t.id === item.id ? { ...t, description: e.target.value } : t
                                  )
                                )
                              }
                              className="w-full rounded-xl px-3 py-2 bg-black/40 border border-white/15"
                              style={{ color: theme.textMain }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 3: FOCUS — DAILY DISCIPLINE & SESSION TIMER            */}
          {/* ========================================================== */}
          {activeTab === 'focus' && (
            <div className="space-y-5 animate-enter">
              {/* Today's Focus Header & Ring */}
              <section
                className="rounded-3xl p-5 sm:p-6 border backdrop-blur-xl flex items-center justify-between gap-4"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
              >
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: theme.primary }}>
                    Today’s Focus • {formatReadableDate(getTodayKey(), timezone)}
                  </span>
                  <h2 className="text-xl font-bold mt-1" style={{ color: theme.textMain }}>
                    Make Today Count
                  </h2>
                  <p className="text-xs mt-1" style={{ color: theme.textMuted }}>
                    Three deliberate commitments each day compound into readiness for Limerick.
                  </p>
                </div>

                <ProgressRing
                  percentage={dailyTaskPct}
                  size={80}
                  color={theme.primary}
                  label={`${completedTasksCount}/${dailyTasks.length}`}
                  sublabel="Done"
                />
              </section>

              {/* 3 Customizable Daily Tasks */}
              <section className="space-y-3" aria-label="Daily Focus Tasks">
                {dailyTasks.map((task, idx) => {
                  const isEditing = editingTaskId === task.id;
                  return (
                    <div
                      key={task.id}
                      className="rounded-3xl p-4 sm:p-5 border backdrop-blur-xl transition-all"
                      style={{
                        backgroundColor: task.completed
                          ? 'rgba(113, 245, 154, 0.09)'
                          : theme.bgCard,
                        borderColor: task.completed ? 'rgba(113, 245, 154, 0.4)' : theme.border,
                      }}
                    >
                      <div className="flex items-center gap-3.5">
                        <button
                          onClick={() => handleToggleDailyTask(task.id)}
                          className="shrink-0 transition-transform active:scale-90 cursor-pointer"
                          aria-label={`Toggle task ${task.title}`}
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-7 h-7" style={{ color: theme.primary }} />
                          ) : (
                            <Circle className="w-7 h-7 opacity-60 hover:opacity-100" style={{ color: theme.textMuted }} />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: theme.accent }}
                            >
                              0{idx + 1} • {task.category}
                            </span>
                            <span className="text-xs font-mono" style={{ color: theme.textMuted }}>
                              {task.duration}
                            </span>
                          </div>
                          <h3
                            className={`text-sm sm:text-base font-semibold mt-1 ${
                              task.completed ? 'line-through opacity-80' : ''
                            }`}
                            style={{ color: theme.textMain }}
                          >
                            {task.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => setEditingTaskId(isEditing ? null : task.id)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer"
                          style={{ color: theme.textMuted }}
                          title="Customize task"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>

                      {isEditing && (
                        <div className="mt-3.5 pt-3.5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                          <div className="sm:col-span-2">
                            <label className="block mb-1" style={{ color: theme.textMuted }}>
                              Task Title
                            </label>
                            <input
                              type="text"
                              value={task.title}
                              onChange={(e) => handleUpdateDailyTask(task.id, 'title', e.target.value)}
                              className="w-full rounded-xl px-3 py-2 bg-black/40 border border-white/15"
                              style={{ color: theme.textMain }}
                            />
                          </div>
                          <div>
                            <label className="block mb-1" style={{ color: theme.textMuted }}>
                              Target Duration
                            </label>
                            <input
                              type="text"
                              value={task.duration}
                              onChange={(e) => handleUpdateDailyTask(task.id, 'duration', e.target.value)}
                              className="w-full rounded-xl px-3 py-2 bg-black/40 border border-white/15"
                              style={{ color: theme.textMain }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>

              {/* Deep Work / IELTS Focus Session Timer */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.borderAccent }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: theme.accent }}>
                      Deep Focus Session Timer
                    </h3>
                    <p className="text-xs" style={{ color: theme.textMuted }}>
                      Distraction-free timer for IELTS Band 8.0 or AI engineering sprints
                    </p>
                  </div>

                  <div className="flex gap-1.5">
                    {[25, 45, 60].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => {
                          setTimerRunning(false);
                          setTimerPreset(mins);
                          setTimerSeconds(mins * 60);
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border cursor-pointer"
                        style={{
                          backgroundColor: timerPreset === mins ? 'rgba(113, 245, 154, 0.16)' : 'transparent',
                          borderColor: timerPreset === mins ? theme.primary : 'rgba(255,255,255,0.12)',
                          color: timerPreset === mins ? theme.primary : theme.textMuted,
                        }}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-black/30 rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-wider tabular-nums" style={{ color: theme.textMain }}>
                    {String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:
                    {String(timerSeconds % 60).padStart(2, '0')}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTimerRunning((r) => !r)}
                      className="px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                      style={{ backgroundColor: theme.primary, color: '#041219' }}
                    >
                      {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{timerRunning ? 'Pause' : 'Start'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setTimerSeconds(timerPreset * 60);
                      }}
                      className="p-2.5 rounded-xl border border-white/15 hover:bg-white/5 cursor-pointer"
                      style={{ color: theme.textMuted }}
                      title="Reset timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 4: WALLPAPER — LOCK-SCREEN STUDIO & 1080x2400 EXPORT   */}
          {/* ========================================================== */}
          {activeTab === 'wallpaper' && (
            <div className="space-y-5 animate-enter">
              {/* Studio Header */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: theme.primary }}>
                      Motorola Edge 50 Fusion • 1080 × 2400 (20:9)
                    </span>
                    <h2 className="text-xl font-bold mt-0.5" style={{ color: theme.textMain }}>
                      Cinematic Lock-Screen Studio
                    </h2>
                  </div>

                  {/* Mode Switcher: Clean Artwork vs Phone Mockup */}
                  <div className="inline-flex rounded-2xl p-1 bg-black/40 border border-white/10">
                    <button
                      onClick={() => setWallpaperMode('clean')}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
                      style={{
                        backgroundColor: wallpaperMode === 'clean' ? theme.primary : 'transparent',
                        color: wallpaperMode === 'clean' ? '#041219' : theme.textMuted,
                      }}
                    >
                      Clean Wallpaper
                    </button>
                    <button
                      onClick={() => setWallpaperMode('mockup')}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
                      style={{
                        backgroundColor: wallpaperMode === 'mockup' ? theme.primary : 'transparent',
                        color: wallpaperMode === 'mockup' ? '#041219' : theme.textMuted,
                      }}
                    >
                      Phone Mockup
                    </button>
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <label className="flex items-center gap-2.5 text-xs sm:text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={wallpaperIncludeCountdown}
                      onChange={(e) => setWallpaperIncludeCountdown(e.target.checked)}
                      className="w-4 h-4 accent-emerald-400 rounded"
                    />
                    <span style={{ color: theme.textMain }}>
                      Include static countdown snapshot ({timeLeft.days}d {timeLeft.hours}h)
                    </span>
                  </label>

                  <button
                    onClick={handleExportWallpaperPNG}
                    className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: theme.primary,
                      color: '#041219',
                      boxShadow: `0 8px 24px -4px ${theme.sunGlow}`,
                    }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Export 1080 × 2400 PNG</span>
                  </button>
                </div>

                {/* Honest Limitation Notice */}
                <div
                  className="mt-3.5 rounded-2xl p-3 text-xs flex items-start gap-2.5 border"
                  style={{
                    backgroundColor: 'rgba(232, 198, 122, 0.08)',
                    borderColor: 'rgba(232, 198, 122, 0.25)',
                    color: theme.textMuted,
                  }}
                >
                  <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accent }} />
                  <div>
                    <strong style={{ color: theme.accent }}>Static PNG Note:</strong> Exported wallpapers are high-resolution static images and will not tick every second on your Android lock screen. Uncheck the countdown option above to export an{' '}
                    <strong style={{ color: theme.textMain }}>Evergreen Horizon</strong> edition that stays timeless every day.
                  </div>
                </div>
              </section>

              {/* PORTRAIT LOCK SCREEN PREVIEW FRAME */}
              <div className="flex flex-col items-center">
                <div
                  className={`relative w-[290px] sm:w-[320px] aspect-[9/20] overflow-hidden shadow-2xl transition-all duration-500 ${
                    wallpaperMode === 'mockup'
                      ? 'rounded-[42px] border-[6px] border-neutral-800 ring-2 ring-white/15'
                      : 'rounded-[28px] border border-white/20'
                  }`}
                  style={{
                    background: `linear-gradient(180deg, ${theme.skyStops[0]} 0%, ${theme.skyStops[1]} 28%, ${theme.skyStops[2]} 52%, ${theme.skyStops[3]} 68%, ${theme.skyStops[4]} 76%, ${theme.waterStops[0]} 100%)`,
                  }}
                >
                  {/* Simulated Android OS Elements — ONLY shown in Phone Mockup Mode */}
                  {wallpaperMode === 'mockup' && (
                    <>
                      {/* Punch-hole camera & status bar */}
                      <div className="absolute top-2.5 inset-x-5 flex items-center justify-between text-[10px] font-medium text-white/75 z-20 pointer-events-none">
                        <span>IST</span>
                        <span className="w-3 h-3 rounded-full bg-black border border-white/10" />
                        <span>5G • 94%</span>
                      </div>

                      {/* Android Lock Screen System Clock Safe-Zone Simulation */}
                      <div className="absolute top-11 inset-x-0 text-center z-20 pointer-events-none">
                        <div className="text-5xl font-light tracking-tight text-white/90 font-sans">
                          09:27
                        </div>
                        <div className="text-[11px] text-white/70 mt-0.5">
                          {formatReadableDate(getTodayKey(), timezone)}
                        </div>
                      </div>

                      {/* Android Bottom Fingerprint & Lock Shortcuts Safe-Zone Simulation */}
                      <div className="absolute bottom-5 inset-x-6 flex items-center justify-between z-20 pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] text-white/70">
                          🔦
                        </div>
                        <div className="w-11 h-11 rounded-full border border-white/35 bg-white/5 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full border border-dashed border-white/50" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] text-white/70">
                          📷
                        </div>
                      </div>
                    </>
                  )}

                  {/* River Shannon horizon glow inside preview */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-[58%] w-[140%] h-40 rounded-full blur-2xl pointer-events-none"
                    style={{ background: theme.sunGlow }}
                  />

                  {/* Miniature Riverfront Silhouette */}
                  <svg
                    viewBox="0 0 360 800"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <path
                      d="M0,535 L0,515 L35,515 L35,505 L52,505 L52,518 L85,518 L90,485 L95,518 L280,518 Q315,502 360,516 L360,535 Z"
                      fill={theme.bgDeep}
                    />
                    <rect x="0" y="535" width="360" height="265" fill={theme.waterStops[1]} opacity="0.9" />
                    <rect x="105" y="555" width="150" height="2" fill={theme.accent} opacity="0.4" />
                    <rect x="85" y="575" width="190" height="2" fill={theme.accent} opacity="0.3" />
                    <rect x="120" y="602" width="120" height="2" fill={theme.primary} opacity="0.25" />
                  </svg>

                  {/* SAFE-AREA CENTERED EDITORIAL LOCK SCREEN CARD */}
                  <div className="absolute inset-x-4 top-[27%] z-10">
                    <div
                      className="rounded-2xl p-4 border backdrop-blur-md text-center shadow-xl"
                      style={{
                        backgroundColor: 'rgba(6, 19, 28, 0.68)',
                        borderColor: theme.border,
                      }}
                    >
                      <div
                        className="text-[9px] font-bold uppercase tracking-[0.22em]"
                        style={{ color: theme.primary }}
                      >
                        The Next Chapter • 2027
                      </div>
                      <div className="text-2xl font-bold tracking-tight mt-1" style={{ color: theme.textMain }}>
                        IRELAND
                      </div>
                      <div className="text-xs font-semibold mt-0.5" style={{ color: theme.accent }}>
                        University of Limerick
                      </div>
                      <div className="text-[10px]" style={{ color: theme.textMuted }}>
                        MSc in Business Analytics
                      </div>

                      {wallpaperIncludeCountdown ? (
                        <div className="grid grid-cols-3 gap-1.5 my-3">
                          {[
                            { v: String(timeLeft.days).padStart(3, '0'), l: 'DAYS' },
                            { v: String(timeLeft.hours).padStart(2, '0'), l: 'HRS' },
                            { v: String(timeLeft.minutes).padStart(2, '0'), l: 'MINS' },
                          ].map((box) => (
                            <div
                              key={box.l}
                              className="rounded-lg py-1.5 bg-white/5 border border-white/10"
                            >
                              <div className="text-sm font-bold font-mono" style={{ color: theme.textMain }}>
                                {box.v}
                              </div>
                              <div className="text-[8px] font-semibold" style={{ color: theme.primary }}>
                                {box.l}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="my-3 py-1 px-2.5 rounded-full inline-block text-[9px] font-semibold uppercase tracking-widest border"
                          style={{
                            backgroundColor: 'rgba(113, 245, 154, 0.1)',
                            borderColor: theme.border,
                            color: theme.primary,
                          }}
                        >
                          Autumn 2027 • Limerick
                        </div>
                      )}

                      <p className="text-[10px] italic leading-snug pt-1 border-t border-white/10" style={{ color: theme.textMain }}>
                        “{quotes[quoteIndex]}”
                      </p>
                    </div>
                  </div>

                  {/* Subtle bottom safe-area caption */}
                  <div className="absolute bottom-[16%] inset-x-0 text-center text-[8px] tracking-[0.25em] uppercase text-white/45 pointer-events-none">
                    Every Day Counts
                  </div>
                </div>

                <p className="text-xs mt-3 text-center max-w-sm" style={{ color: theme.textMuted }}>
                  {wallpaperMode === 'clean'
                    ? 'Clean Export Preview: Zero fake system icons—ready for 1080 × 2400 export.'
                    : 'Android Mockup Preview: Shows top clock & bottom fingerprint clearance zones.'}
                </p>
              </div>

              {/* Android / Motorola Edge 50 Fusion Setup Instructions */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl space-y-3"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" style={{ color: theme.primary }} />
                  <h3 className="text-sm font-bold" style={{ color: theme.textMain }}>
                    How to Apply on Motorola Edge 50 Fusion (Android)
                  </h3>
                </div>
                <ol className="text-xs space-y-2 list-decimal list-inside leading-relaxed" style={{ color: theme.textMuted }}>
                  <li>
                    Tap <strong style={{ color: theme.textMain }}>Export 1080 × 2400 PNG</strong> above to save the wallpaper to your phone’s Downloads / Photos folder.
                  </li>
                  <li>
                    Open <strong style={{ color: theme.textMain }}>Google Photos</strong> or the Moto <strong style={{ color: theme.textMain }}>Personalize → Wallpapers</strong> menu.
                  </li>
                  <li>
                    Select the downloaded image, tap <strong style={{ color: theme.textMain }}>Set wallpaper → Lock screen</strong> (pinch slightly if needed so the center card sits cleanly below your Android clock).
                  </li>
                </ol>
                <p className="text-[11px] pt-1 border-t border-white/10" style={{ color: theme.textMuted }}>
                  Note: For security reasons, Android web browsers cannot automatically overwrite your system lock screen without this manual step.
                </p>
              </section>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 5: SETTINGS — CUSTOMIZATION, THEMES & CALENDAR         */}
          {/* ========================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-5 animate-enter">
              {/* Theme Selector */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
              >
                <h2 className="text-base font-bold mb-1" style={{ color: theme.textMain }}>
                  Atmospheric Theme
                </h2>
                <p className="text-xs mb-4" style={{ color: theme.textMuted }}>
                  Applies across both Mission Control and the Lock-Screen Wallpaper Studio.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.values(THEMES).map((t) => {
                    const selected = t.id === themeId;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setThemeId(t.id);
                          triggerToast(`Theme switched to ${t.name}`);
                        }}
                        className="rounded-2xl p-3.5 border text-left transition-all cursor-pointer"
                        style={{
                          backgroundColor: selected ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.3)',
                          borderColor: selected ? t.primary : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.bgDeep, border: '1px solid rgba(255,255,255,0.2)' }} />
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.primary }} />
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.accent }} />
                        </div>
                        <div className="text-xs font-bold" style={{ color: theme.textMain }}>
                          {t.name}
                        </div>
                        <div className="text-[11px] mt-0.5 leading-snug" style={{ color: theme.textMuted }}>
                          {t.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Target Date & Timezone Configuration */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl space-y-4"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
              >
                <h2 className="text-base font-bold" style={{ color: theme.textMain }}>
                  Countdown Horizon & Timezone
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block mb-1.5 font-medium" style={{ color: theme.textMuted }}>
                      Provisional Departure / Arrival Date
                    </label>
                    <input
                      type="datetime-local"
                      value={targetDate.slice(0, 16)}
                      onChange={(e) => {
                        if (e.target.value) setTargetDate(e.target.value);
                      }}
                      className="w-full rounded-xl px-3.5 py-2.5 bg-black/40 border border-white/15 focus:outline-none"
                      style={{ color: theme.textMain }}
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 font-medium" style={{ color: theme.textMuted }}>
                      Display Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full rounded-xl px-3.5 py-2.5 bg-black/40 border border-white/15 focus:outline-none"
                      style={{ color: theme.textMain }}
                    >
                      {TIMEZONE_OPTIONS.map((tz) => (
                        <option key={tz.id} value={tz.id} className="bg-slate-900 text-white">
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Motion & Accessibility Preferences */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl flex items-center justify-between gap-4"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
              >
                <div>
                  <h3 className="text-sm font-bold" style={{ color: theme.textMain }}>
                    Atmospheric Motion & Particles
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>
                    Gentle river reflections & floating light particles (automatically respects OS Reduced Motion).
                  </p>
                </div>
                <button
                  onClick={() => setAnimationsEnabled((v) => !v)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer shrink-0"
                  style={{
                    backgroundColor: animationsEnabled ? 'rgba(113, 245, 154, 0.16)' : 'rgba(255,255,255,0.05)',
                    borderColor: animationsEnabled ? theme.primary : 'rgba(255,255,255,0.15)',
                    color: animationsEnabled ? theme.primary : theme.textMuted,
                  }}
                >
                  {animationsEnabled ? 'Enabled' : 'Reduced'}
                </button>
              </section>

              {/* Calendar Reminders & Google Calendar Instructions */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl space-y-3"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: theme.textMain }}>
                      Google Calendar & .ics Reminders
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>
                      Generate standard RFC 5545 calendar files with 7-day advance alerts.
                    </p>
                  </div>
                  <button
                    onClick={handleExportAllMilestonesICS}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    style={{ backgroundColor: theme.accent, color: '#06131C' }}
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Download All (.ics)</span>
                  </button>
                </div>

                <div className="rounded-2xl p-3.5 bg-black/30 border border-white/10 text-xs space-y-1.5" style={{ color: theme.textMuted }}>
                  <div className="font-semibold" style={{ color: theme.textMain }}>
                    How to import into Google Calendar:
                  </div>
                  <p>1. Download any milestone’s <code className="text-emerald-300">.ics</code> file above or from the Home screen.</p>
                  <p>2. On desktop, open <strong>calendar.google.com</strong> → Settings (⚙️) → <strong>Import & export</strong> → Select the <code className="text-emerald-300">.ics</code> file.</p>
                  <p>3. On Android, tap the downloaded <code className="text-emerald-300">.ics</code> file in your Files/Downloads app and choose <strong>Google Calendar</strong> to save the event.</p>
                </div>
              </section>

              {/* Data Persistence & Reset */}
              <section
                className="rounded-3xl p-5 border backdrop-blur-xl flex flex-wrap items-center justify-between gap-3"
                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
              >
                <div>
                  <h3 className="text-sm font-bold" style={{ color: theme.textMain }}>
                    Local Browser Storage
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>
                    All milestones, custom dates, themes, and daily tasks persist automatically on this device.
                  </p>
                </div>

                {!confirmResetOpen ? (
                  <button
                    onClick={() => setConfirmResetOpen(true)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-rose-400/35 text-rose-300 hover:bg-rose-500/10 cursor-pointer"
                  >
                    Reset All Progress
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetAllData}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500 text-white cursor-pointer"
                    >
                      Confirm Reset
                    </button>
                    <button
                      onClick={() => setConfirmResetOpen(false)}
                      className="px-3 py-1.5 rounded-xl text-xs bg-white/10 text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </section>
            </div>
          )}
        </main>
      </div>

      {/* QUICK TARGET DATE MODAL */}
      {quickDateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-w-sm w-full rounded-3xl p-6 border shadow-2xl space-y-4 animate-enter"
            style={{ backgroundColor: theme.bgCardSolid, borderColor: theme.border }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold" style={{ color: theme.textMain }}>
                Edit Target Horizon Date
              </h3>
              <button
                onClick={() => setQuickDateModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs" style={{ color: theme.textMuted }}>
              Adjust your provisional September 2027 arrival or flight target. The live countdown recalculates immediately.
            </p>

            <div>
              <input
                type="datetime-local"
                value={tempDateInput}
                onChange={(e) => setTempDateInput(e.target.value)}
                className="w-full rounded-xl px-3.5 py-2.5 text-sm bg-black/40 border border-white/15 focus:outline-none"
                style={{ color: theme.textMain }}
              />
              {dateError && (
                <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {dateError}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setQuickDateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTargetDate}
                className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                style={{ backgroundColor: theme.primary, color: '#041219' }}
              >
                Save Target Date
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CALENDAR .ICS IMPORT INSTRUCTION MODAL */}
      {calendarGuideOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-w-md w-full rounded-3xl p-6 border shadow-2xl space-y-4 animate-enter"
            style={{ backgroundColor: theme.bgCardSolid, borderColor: theme.borderAccent }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarPlus className="w-5 h-5" style={{ color: theme.primary }} />
                <h3 className="text-base font-bold" style={{ color: theme.textMain }}>
                  Calendar File Downloaded (.ics)
                </h3>
              </div>
              <button
                onClick={() => setCalendarGuideOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
              Downloaded reminder for <strong style={{ color: theme.textMain }}>{lastExportedEventName}</strong>. Because web apps cannot silently inject events into private calendars without OAuth, import this <code className="text-emerald-300">.ics</code> file into Google Calendar in two quick steps:
            </p>

            <div className="rounded-2xl p-3.5 bg-black/35 border border-white/10 text-xs space-y-2" style={{ color: theme.textMuted }}>
              <p>
                <strong style={{ color: theme.accent }}>Android:</strong> Open your notification shade or <em>Files</em> app, tap the downloaded <code className="text-emerald-300">.ics</code> file, and select <strong>Google Calendar</strong>.
              </p>
              <p>
                <strong style={{ color: theme.accent }}>Desktop:</strong> Visit <em>calendar.google.com</em> → <strong>Settings → Import & export</strong> → Upload the <code className="text-emerald-300">.ics</code> file.
              </p>
            </div>

            <button
              onClick={() => setCalendarGuideOpen(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              style={{ backgroundColor: theme.primary, color: '#041219' }}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* POLISHED FLOATING BOTTOM NAVIGATION BAR */}
      <nav
        className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[540px] z-40 rounded-3xl border backdrop-blur-2xl px-2 py-2 shadow-2xl"
        style={{
          backgroundColor: 'rgba(6, 19, 28, 0.88)',
          borderColor: theme.border,
          boxShadow: '0 20px 50px rgba(0,0,0,0.75)',
        }}
        aria-label="Primary Navigation"
      >
        <div className="grid grid-cols-5 gap-1">
          {[
            { id: 'home', label: 'Home', icon: Compass },
            { id: 'timeline', label: 'Timeline', icon: Layers },
            { id: 'focus', label: 'Focus', icon: CheckCircle2 },
            { id: 'wallpaper', label: 'Wallpaper', icon: Smartphone },
            { id: 'settings', label: 'Settings', icon: SettingsIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive ? 'rgba(113, 245, 154, 0.14)' : 'transparent',
                  color: isActive ? theme.primary : theme.textMuted,
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-semibold tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}