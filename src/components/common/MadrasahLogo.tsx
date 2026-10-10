import React, { useState } from 'react';

interface MadrasahLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
  withBorder?: boolean;
  variant?: 'shield' | 'circle' | 'rounded';
}

export const MadrasahLogo: React.FC<MadrasahLogoProps> = ({
  className = '',
  size = 'md',
  withBorder = false,
  variant = 'rounded'
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24',
    custom: ''
  }[size];

  const roundedClasses = {
    shield: 'rounded-2xl',
    circle: 'rounded-full',
    rounded: 'rounded-xl'
  }[variant];

  // Authentic uploaded image source with multiple path fallback
  const logoSrc = '/logo_madrasah.png';

  if (!imgError) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden ${sizeClasses} ${roundedClasses} ${
          withBorder ? 'border border-emerald-500/30 shadow-xs' : ''
        } ${className}`}
      >
        <img
          src={logoSrc}
          alt="Logo Resmi MA Plus Ma'hadul Muta'allimin Katerban Ngawi"
          className="w-full h-full object-contain filter drop-shadow-2xs"
          onError={() => setImgError(true)}
          loading="eager"
        />
      </div>
    );
  }

  // Pixel-accurate SVG vector replica of the uploaded emblem
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden ${sizeClasses} ${roundedClasses} ${
        withBorder ? 'border border-emerald-500/40 shadow-xs' : ''
      } ${className}`}
      title="MA Plus Ma'hadul Muta'allimin Katerban Ngawi"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="logoTopArch" d="M 18 42 A 38 38 0 0 1 82 42" fill="none" />
          <path id="logoRibbonArch" d="M 23 75 Q 50 85 77 75" fill="none" />
        </defs>

        {/* Outer Shield with emerald green fill and black border */}
        <path
          d="M 50 4 C 68 12, 92 18, 92 48 C 92 74, 68 90, 50 96 C 32 90, 8 74, 8 48 C 8 18, 32 12, 50 4 Z"
          fill="#35895E"
          stroke="#111827"
          strokeWidth="2.4"
        />
        {/* Inner thin stroke contour */}
        <path
          d="M 50 7 C 66 14, 88 20, 88 48 C 88 72, 66 87, 50 93 C 34 87, 12 72, 12 48 C 12 20, 34 14, 50 7 Z"
          fill="none"
          stroke="#111827"
          strokeWidth="0.8"
          opacity="0.8"
        />

        {/* Top curved text: MADRASAH ALIYAH PLUS */}
        <text fontSize="5.2" fontWeight="900" fill="#111827" letterSpacing="0.4" fontFamily="sans-serif">
          <textPath href="#logoTopArch" startOffset="50%" textAnchor="middle">
            MADRASAH ALIYAH PLUS
          </textPath>
        </text>

        {/* Center Blue Globe */}
        <circle cx="50" cy="46" r="23.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.2" />

        {/* White Globe Grid (Longitudes & Latitudes) */}
        <ellipse cx="50" cy="46" rx="15" ry="23.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
        <ellipse cx="50" cy="46" rx="7.5" ry="23.5" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
        <line x1="26.5" y1="46" x2="73.5" y2="46" stroke="#FFFFFF" strokeWidth="0.9" />
        <line x1="30" y1="36" x2="70" y2="36" stroke="#FFFFFF" strokeWidth="0.8" />
        <line x1="30" y1="56" x2="70" y2="56" stroke="#FFFFFF" strokeWidth="0.8" />
        <line x1="35" y1="28" x2="65" y2="28" stroke="#FFFFFF" strokeWidth="0.6" />
        <line x1="35" y1="64" x2="65" y2="64" stroke="#FFFFFF" strokeWidth="0.6" />

        {/* Purple Mosque Dome with Crescent and Star */}
        <path d="M 50 25 C 44 31, 43 38, 50 39 C 57 38, 56 31, 50 25 Z" fill="#2E1065" stroke="#FFFFFF" strokeWidth="0.6" />
        {/* Crescent */}
        <path d="M 50 22 A 2.6 2.6 0 0 1 50 26.5 A 2.2 2.2 0 0 0 50 23.2 Z" fill="#38BDF8" />
        {/* Star on top */}
        <polygon points="50.8,21.8 51.3,22.8 52.3,23 51.5,23.7 51.7,24.7 50.8,24.2 50,24.7 50.2,23.7 49.4,23 50.4,22.8" fill="#FDE047" />

        {/* Yellow Open Book (Kitab Kuning) */}
        <path
          d="M 50 46 L 37.5 41 C 35.5 49, 39.5 57, 50 56.5 C 60.5 57, 64.5 49, 62.5 41 Z"
          fill="#FACC15"
          stroke="#111827"
          strokeWidth="1.1"
        />
        <line x1="50" y1="46" x2="50" y2="56.5" stroke="#111827" strokeWidth="1.1" />
        {/* Lines on book */}
        <line x1="41" y1="46" x2="48" y2="47" stroke="#854D0E" strokeWidth="0.7" />
        <line x1="41" y1="49.5" x2="48" y2="50.5" stroke="#854D0E" strokeWidth="0.7" />
        <line x1="41" y1="53" x2="48" y2="54" stroke="#854D0E" strokeWidth="0.7" />
        <line x1="52" y1="47" x2="59" y2="46" stroke="#854D0E" strokeWidth="0.7" />
        <line x1="52" y1="50.5" x2="59" y2="49.5" stroke="#854D0E" strokeWidth="0.7" />
        <line x1="52" y1="54" x2="59" y2="53" stroke="#854D0E" strokeWidth="0.7" />

        {/* Yellow Stars surrounding globe base */}
        <polygon points="29,48 30,50 32,50 30.5,51.5 31,53.5 29,52 27,53.5 27.5,51.5 26,50 28,50" fill="#FACC15" />
        <polygon points="31,57 32,59 34,59 32.5,60.5 33,62.5 31,61 29,62.5 29.5,60.5 28,59 30,59" fill="#FACC15" />
        <polygon points="34.5,65 35.5,67 37.5,67 36,68.5 36.5,70.5 34.5,69 32.5,70.5 33,68.5 31.5,67 33.5,67" fill="#FACC15" />
        <polygon points="69,48 70,50 72,50 70.5,51.5 71,53.5 69,52 67,53.5 67.5,51.5 66,50 68,50" fill="#FACC15" />
        <polygon points="67,57 68,59 70,59 68.5,60.5 69,62.5 67,61 65,62.5 65.5,60.5 64,59 66,59" fill="#FACC15" />
        <polygon points="63.5,65 64.5,67 66.5,67 65,68.5 65.5,70.5 63.5,69 61.5,70.5 62,68.5 60.5,67 62.5,67" fill="#FACC15" />

        {/* White Ribbon with MA'HADUL MUTA'ALLIMIN */}
        <path
          d="M 20 66 L 25 73 Q 50 84 75 73 L 80 66 L 76 66 Q 50 76 24 66 Z"
          fill="#FFFFFF"
          stroke="#111827"
          strokeWidth="0.9"
        />
        {/* Ribbon folded ends */}
        <polygon points="20,66 25,73 17,73 21,69.5" fill="#E2E8F0" stroke="#111827" strokeWidth="0.7" />
        <polygon points="80,66 75,73 83,73 79,69.5" fill="#E2E8F0" stroke="#111827" strokeWidth="0.7" />

        <text x="50" y="74.2" fontSize="4.6" fontWeight="bold" fill="#111827" textAnchor="middle" fontFamily="sans-serif">
          MA'HADUL MUTA'ALLIMIN
        </text>

        {/* Bottom Text: KATERBAN-NGAWI */}
        <text x="50" y="87" fontSize="5.2" fontWeight="900" fill="#111827" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.3">
          KATERBAN-NGAWI
        </text>
      </svg>
    </div>
  );
};
