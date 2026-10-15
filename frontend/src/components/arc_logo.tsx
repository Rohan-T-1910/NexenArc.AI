export function ArcLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Background soft shield */}
      <path
        d="M16 3L6 7V15C6 21.6 10.3 27.7 16 29C21.7 27.7 26 21.6 26 15V7L16 3Z"
        fill="#352F44"
        stroke="#5C5470"
        strokeWidth="1.5"
      />
      {/* Signature glowing Arc motif */}
      <path
        d="M9 18C10.5 13 14.5 10 19.5 10C21.5 10 23.3 10.6 24.8 11.8"
        stroke="#FAF0E6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="19" r="2.5" fill="#FAF0E6" />
    </svg>
  );
}

export default ArcLogo;
