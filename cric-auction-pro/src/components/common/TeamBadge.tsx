import React from 'react';

interface TeamBadgeProps {
  teamId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const TeamBadge: React.FC<TeamBadgeProps> = ({ teamId, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl',
  };

  const getTeamIcon = () => {
    switch (teamId) {
      case 'mumbai-meteors':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            <defs>
              <linearGradient id="meteorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="url(#meteorGrad)" stroke="#f59e0b" strokeWidth="4" />
            <circle cx="50" cy="50" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
            <path d="M36 54 L64 36 L52 64 Z" fill="#f59e0b" />
            <circle cx="64" cy="36" r="6" fill="#fbbf24" />
          </svg>
        );

      case 'chennai-chargers':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            <defs>
              <linearGradient id="chargerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            <path d="M50 5 L88 28 L74 88 L50 96 L26 88 L12 28 Z" fill="url(#chargerGrad)" stroke="#1d4ed8" strokeWidth="4" />
            <path d="M54 22 L36 50 L48 50 L42 78 L66 44 L52 44 Z" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1.5" />
          </svg>
        );

      case 'bangalore-blazers':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            <defs>
              <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="url(#blazerGrad)" stroke="#fbbf24" strokeWidth="4" />
            <path d="M50 20 C62 35 72 45 68 65 C64 78 50 82 50 82 C50 82 36 78 32 65 C28 45 38 35 50 20 Z" fill="#fbbf24" />
            <path d="M50 38 C56 48 62 55 60 68 C58 74 50 76 50 76 C50 76 42 74 40 68 C38 55 44 48 50 38 Z" fill="#ef4444" />
          </svg>
        );

      case 'hyderabad-hawks':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            <defs>
              <linearGradient id="hawkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <polygon points="50,6 92,30 80,88 50,96 20,88 8,30" fill="url(#hawkGrad)" stroke="#0f172a" strokeWidth="4" />
            <path d="M25 45 Q50 28 75 45 Q50 56 25 45 Z" fill="#0f172a" />
            <polygon points="50,48 44,66 56,66" fill="#fbbf24" />
          </svg>
        );

      case 'delhi-dynamos':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            <defs>
              <linearGradient id="dynGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <polygon points="50,8 90,32 78,86 50,94 22,86 10,32" fill="url(#dynGrad)" stroke="#dc2626" strokeWidth="4" />
            <circle cx="50" cy="50" r="24" fill="#dc2626" />
            <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="26" fontFamily="sans-serif">D</text>
          </svg>
        );

      case 'gujarat-titansmen':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            <defs>
              <linearGradient id="titanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
            </defs>
            <polygon points="50,8 88,48 50,88 12,48" fill="url(#titanGrad)" stroke="#fbbf24" strokeWidth="4" />
            <polygon points="50,22 74,48 50,74 26,48" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
            <circle cx="50" cy="48" r="8" fill="#fbbf24" />
          </svg>
        );

      case 'rajasthan-royalsmen':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            <defs>
              <linearGradient id="royalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="url(#royalGrad)" stroke="#1e3a8a" strokeWidth="4" />
            {/* Crown */}
            <path d="M28 62 L32 40 L44 52 L50 34 L56 52 L68 40 L72 62 Z" fill="#fbbf24" stroke="#1e3a8a" strokeWidth="2" />
            <rect x="28" y="62" width="44" height="8" rx="2" fill="#1e3a8a" />
          </svg>
        );

      case 'kolkata-knights':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            <defs>
              <linearGradient id="knightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#581c87" />
              </linearGradient>
            </defs>
            <polygon points="50,6 88,24 84,72 50,94 16,72 12,24" fill="url(#knightGrad)" stroke="#f59e0b" strokeWidth="4" />
            {/* Knight Helmet */}
            <path d="M38 35 H62 V58 Q62 70 50 76 Q38 70 38 58 Z" fill="#f59e0b" />
            <rect x="42" y="44" width="16" height="5" rx="1" fill="#0f172a" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full rounded-full bg-slate-800 border-2 border-amber-500 flex items-center justify-center font-bold text-amber-400">
            IPL
          </div>
        );
    }
  };

  return (
    <div className={`inline-flex items-center justify-center relative flex-shrink-0 ${sizeMap[size]} ${className}`}>
      {getTeamIcon()}
    </div>
  );
};
