// Small custom "sticker" illustrations in the same spirit as the reference
// collage (outlined starburst sparkles, squiggly connector lines, a badge
// ring) — original line-art, colored via `currentColor` so callers can tint
// them with normal text-color utilities including dark: variants.

export const StarBurst = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M32 2 L37 24 L58 16 L40 30 L58 44 L37 40 L32 62 L27 40 L6 44 L24 30 L6 16 L27 24 Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const Sparkle = (props) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16 2 C16 9 18 15 26 16 C18 17 16 23 16 30 C16 23 14 17 6 16 C14 15 16 9 16 2 Z"
      fill="currentColor"
    />
  </svg>
);

export const Squiggle = (props) => (
  <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2 18 C 10 4, 18 4, 24 14 S 40 24, 46 10 S 54 2, 58 8"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const BadgeRing = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" />
    <circle cx="24" cy="24" r="7" fill="currentColor" />
  </svg>
);

export const CurvedArrow = (props) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M4 8 C 4 24, 16 32, 32 28"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M25 24 L33 29 L27 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const DottedCircle = (props) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2.5" strokeDasharray="1 7" strokeLinecap="round" />
  </svg>
);

export const PlusCross = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 3 V21 M3 12 H21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const ZigZag = (props) => (
  <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2 18 L12 4 L22 18 L32 4 L42 18 L52 4 L58 10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const RingOrbit = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <ellipse cx="24" cy="24" rx="20" ry="9" stroke="currentColor" strokeWidth="2" transform="rotate(-20 24 24)" />
    <circle cx="24" cy="24" r="4.5" fill="currentColor" />
  </svg>
);

export const Blob = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M31 14 C48 4 76 10 86 30 C96 50 90 74 68 86 C46 98 18 92 8 70 C-2 48 8 26 31 14 Z"
      fill="currentColor"
    />
  </svg>
);

export const DiamondOutline = (props) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="7" y="7" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2.5" transform="rotate(45 16 16)" />
  </svg>
);

export const HalfMoonArc = (props) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 20 A16 16 0 0 1 36 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="4" cy="20" r="2" fill="currentColor" />
    <circle cx="36" cy="20" r="2" fill="currentColor" />
  </svg>
);
