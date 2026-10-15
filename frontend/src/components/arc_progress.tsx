interface ArcProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export function ArcProgress({
  percentage,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
}: ArcProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use a 270 degree arc for a classic speedometer/gauge feel
  const arcLength = circumference * 1.00;
  const strokeDashoffset = arcLength - (arcLength * Math.min(percentage, 100)) / 100;

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-135"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Track Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#5C5470"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          fill="transparent"
          className="opacity-40"
        />
        {/* Value Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FAF0E6"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Central readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-bold tracking-tight text-[#FAF0E6]">
          {label ?? `${percentage}%`}
        </span>
        {sublabel && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#B9B4C7]">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

export default ArcProgress;
