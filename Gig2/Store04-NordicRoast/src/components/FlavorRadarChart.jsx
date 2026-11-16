import React from 'react';

export default function FlavorRadarChart({ metrics, size = 220 }) {
  // Default values if not provided
  const {
    acidity = 85,
    sweetness = 85,
    body = 70,
    clarity = 90,
    floral = 80
  } = metrics || {};

  const values = [
    { label: 'Acidity', val: acidity },
    { label: 'Sweetness', val: sweetness },
    { label: 'Body', val: body },
    { label: 'Clarity', val: clarity },
    { label: 'Floral', val: floral }
  ];

  const center = size / 2;
  const radius = (size / 2) - 34; // leave room for text labels

  // Helper to compute coordinates for an axis at given percentage (0 to 100)
  const getCoordinates = (index, percent) => {
    // 5 axes: angles start at -90 deg (top) and step by 72 deg
    const angleDeg = -90 + (index * 72);
    const angleRad = (angleDeg * Math.PI) / 180;
    const r = (percent / 100) * radius;
    return {
      x: center + r * Math.cos(angleRad),
      y: center + r * Math.sin(angleRad)
    };
  };

  // Concentric guideline rings at 25%, 50%, 75%, 100%
  const rings = [25, 50, 75, 100];

  // Polygon points string for the data
  const dataPoints = values.map((item, idx) => {
    const pt = getCoordinates(idx, item.val);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center select-none font-mono">
      <svg width={size} height={size} className="overflow-visible">
        {/* Concentric pentagon rings */}
        {rings.map((ringVal) => {
          const ringPoints = [0, 1, 2, 3, 4].map(idx => {
            const pt = getCoordinates(idx, ringVal);
            return `${pt.x},${pt.y}`;
          }).join(' ');

          return (
            <polygon
              key={ringVal}
              points={ringPoints}
              fill="none"
              stroke="#ebdcc7"
              strokeWidth={ringVal === 100 ? "1.5" : "1"}
              strokeDasharray={ringVal === 100 ? "none" : "3,3"}
              className="opacity-70"
            />
          );
        })}

        {/* Axis radial spokes */}
        {[0, 1, 2, 3, 4].map((idx) => {
          const endPt = getCoordinates(idx, 100);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={endPt.x}
              y2={endPt.y}
              stroke="#ebdcc7"
              strokeWidth="1"
              className="opacity-60"
            />
          );
        })}

        {/* Filled Data Polygon */}
        <polygon
          points={dataPoints}
          fill="rgba(43, 29, 20, 0.22)"
          stroke="#2b1d14"
          strokeWidth="2.5"
          className="transition-all duration-500 ease-out"
        />

        {/* Vertex Dots & Value Badges */}
        {values.map((item, idx) => {
          const pt = getCoordinates(idx, item.val);
          const labelPt = getCoordinates(idx, 126);

          return (
            <g key={idx}>
              {/* Vertex Circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#2b1d14"
                stroke="#f7f2ea"
                strokeWidth="2"
                className="transition-all duration-500 shadow-sm"
              />

              {/* Axis Label */}
              <text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[9px] font-bold fill-[#594637] uppercase tracking-wider"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-2 text-[10px] text-[#8c7462] uppercase tracking-widest font-bold">
        SCA 5-Axis Cupping Profile
      </div>
    </div>
  );
}
