export const LineEnd = () => {
  return (
    <svg
      width="300"
      height="150"
      viewBox="0 0 300 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Branche 1 */}
      <path
        d="M10 30 H70 L90 50 H120"
        stroke="rgba(212, 175, 55, 0.5)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="120"
        cy="50"
        r="5"
        fill="rgba(212, 175, 55)"
        stroke="rgba(212, 175, 55, 0.5)"
        strokeWidth="1"
      />

      {/* Branche 2 */}
      <path
        d="M10 70 H80 L100 90 H130"
        stroke="rgba(212, 175, 55, 0.5)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="130"
        cy="90"
        r="5"
        fill="rgba(212, 175, 55)"
        stroke="rgba(212, 175, 55, 0.5)"
        strokeWidth="1"
      />

      {/* Branche 3 */}
      <path
        d="M10 110 H75 L95 130 H125"
        stroke="rgba(212, 175, 55, 0.5)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        cx="125"
        cy="130"
        r="5"
        fill="rgba(212, 175, 55)"
        stroke="rgba(212, 175, 55, 0.5)"
        strokeWidth="1"
      />
    </svg>
  );
};
