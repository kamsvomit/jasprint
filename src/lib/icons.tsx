import React from 'react';

// Convert emoji ke URL Twemoji — konsisten di semua platform, Apple-like style
function toTwemojiUrl(emoji: string): string {
  const codepoint = [...emoji]
    .map(c => c.codePointAt(0)!.toString(16))
    .filter(c => c !== 'fe0f') // hapus variation selector
    .join('-');
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codepoint}.svg`;
}

function EmojiIcon({ emoji }: { emoji: string }) {
  return (
    <img
      src={toTwemojiUrl(emoji)}
      alt={emoji}
      width={32}
      height={32}
      className="w-7 h-7 sm:w-8 sm:h-8 select-none"
      draggable={false}
    />
  );
}

// SVG hardcoded untuk tool yang gak ada emoji yang cocok
const SvgBpjsKes = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12h6M12 9v6"/>
  </svg>
);

const SvgBpjsTk = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const SvgPkb = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <path d="M12 12v4M10 14h4"/>
  </svg>
);

const SvgPph = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="M14 2v6h6"/>
    <path d="M9 13h6M9 17h4"/>
  </svg>
);

const SvgPesangon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
    <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/>
    <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
  </svg>
);

const SvgWeton = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l3 3"/>
    <path d="M6.5 6.5l1.5 1.5M17.5 6.5l-1.5 1.5"/>
  </svg>
);

const SvgJavanese = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
  </svg>
);

const SvgKnot = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h18M3 12l4-4M3 12l4 4"/>
    <circle cx="17" cy="12" r="3"/>
  </svg>
);

const toolEmojis: Record<string, string | React.ReactNode> = {
  // Keuangan & Gaji
  'gaji-bersih':       '💵',
  'cicilan-bulanan':   '🏦',
  'kpr-calc':          '🏠',
  'car-loan':          '🚗',
  'motor-loan':        '🛵',
  'cc-payoff':         '💳',
  'mortgage-calc':     '🏡',
  'savings-calc':      '🐷',
  'retirement-fund':   '👴',
  'retirement-age':    '🎯',
  'education-fund':    '🎓',
  'emergency-fund':    '🆘',
  'inflation-calc':    '📈',
  'roi-calc':          '💹',
  'net-worth':         '💰',
  'salary-diff':       '🔀',
  'gold-calc':         '🪙',
  'currency-conv-id':  '💱',
  'tax-calc':          '🧾',
  'thr-calc':          '🎁',

  // Pajak & Iuran
  'pph-calc':          <SvgPph />,
  'pbb-calc':          '🏘️',
  'pkb-calc':          <SvgPkb />,
  'motor-tax':         '🔖',
  'bpjs-kes':          <SvgBpjsKes />,
  'bpjs-tk-jht':       <SvgBpjsTk />,
  'pesangon-calc':     <SvgPesangon />,
  'zakat-fitrah':      '🌙',
  'zakat-mal':         '☪️',
  'hajj-calc':         '🕋',

  // Bisnis & Dagang
  'persen':            '➗',
  'hpp':               '🏭',
  'profit-jualan':     '📊',
  'diskon-persen':     '🏷️',
  'double-discount':   '✂️',
  'markup-calc':       '📉',
  'unit-price-id':     '🛒',
  'tip-calc':          '🤝',
  'ratio-calc':        '⚗️',

  // Kesehatan
  'bmi':               '🩺',
  'bmr-calc':          '🔥',
  'tdee-calc':         '🏃',
  'calorie-calc':      '🥗',
  'ideal-weight':      '🏋️',
  'body-fat':          '🫀',
  'water-intake':      '💧',
  'max-hr':            '❤️',
  'pregnancy-calc':    '🤰',
  'ovulation-calc':    '🌸',
  'sleep-calc':        '😴',

  // Rumah & Properti
  'listrik-bulanan':   '💡',
  'renovation-calc':   '🔨',
  'paint-calc':        '🖌️',
  'tile-calc':         '🟫',
  'flooring-calc':     '🏗️',
  'wallpaper-calc':    '🖼️',
  'concrete-calc':     '🧱',

  // Konversi Satuan
  'cm-to-in':          '📐',
  'in-to-cm':          '📏',
  'm-to-ft':           '🔭',
  'ft-to-m':           '🪜',
  'km-to-mi':          '🛣️',
  'mi-to-km':          '🛤️',
  'kg-to-lbs':         '⚖️',
  'lbs-to-kg':         '🫳',
  'g-to-oz':           '🥄',
  'oz-to-g':           '🫙',
  'c-to-f':            '🌡️',
  'f-to-c':            '🌤️',
  'c-to-k':            '🔬',
  'temp-conv':         '♨️',
  'sqm-to-sqft':       '📦',
  'sqft-to-sqm':       '📫',
  'gal-to-l':          '🪣',
  'l-to-gal':          '🫗',
  'cup-to-ml':         '☕',
  'ml-to-cup':         '🥛',
  'acre-to-ha':        '🌾',
  'ha-to-acre':        '🌿',
  'weight-conv':       '🏺',
  'unit-compare':      '🔄',

  // Kecepatan & Jarak
  'kmh-to-mph':        '🚀',
  'mph-to-kmh':        '🛸',
  'knot-to-kmh':       <SvgKnot />,
  'speed-calc-id':     '🏎️',
  'konsumsi-bensin':   '⛽',
  'fuel-cost':         '🔋',
  'pace-calc':         '👟',

  // Matematika & Angka
  'persen-calc':       '🔢',
  'average-calc':      '🔣',
  'sqrt-calc':         '√',
  'circle-area':       '⭕',
  'rect-area':         '🟥',
  'triangle-area':     '🔺',
  'cube-vol':          '🧊',
  'cyl-vol':           '🥫',
  'bin-to-dec':        '💻',
  'dec-to-bin':        '🖥️',
  'random-gen':        '🎲',

  // Waktu & Tanggal
  'age-calc':          '🎂',
  'date-diff':         '📅',
  'time-duration':     '⏱️',
  'pomodoro-calc':     '🍅',
  'weton-calc':        <SvgWeton />,
  'javanese-cal':      <SvgJavanese />,

  // Masak & Dapur
  'recipe-scaler':     '👨‍🍳',
  'cook-convert':      '🍳',

  // Lainnya
  'gpa-calc':          '🏫',
  'grade-calc':        '📝',
  'password-strength': '🔐',
  'target-hp':         '📱',

  // Produk Percetakan
  'brosur':            '📄',
  'spanduk':           '🚩',
  'kartu-nama':        '📇',
  'sticker':           '🏷️',
  'nota':              '📒',
  'undangan':          '✉️',
};

export function getToolIcon(toolId: string) {
  const icon = toolEmojis[toolId];

  // SVG component
  if (icon && typeof icon !== 'string') {
    return { svg: icon };
  }

  // Emoji string, fallback ke 🔢
  const emoji = typeof icon === 'string' ? icon : '🔢';

  return {
    svg: <EmojiIcon emoji={emoji} />,
  };
}