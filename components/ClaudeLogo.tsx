// The Claude "starburst" mark, recreated as a crisp, themeable SVG.
// Tapered rays radiating from a center — rendered in Claude coral.

export default function ClaudeLogo({
  className = "",
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) {
  const rays = Array.from({ length: 12 });
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Claude logo"
      style={
        spin
          ? { animation: "spin-slow 60s linear infinite", transformOrigin: "50% 50%" }
          : undefined
      }
    >
      {rays.map((_, i) => {
        const angle = (i * 360) / 12;
        // A tapered ray: narrow rounded tip near the rim, wider base near center.
        return (
          <path
            key={i}
            d="M50 8 L52.8 45 Q50 48.5 47.2 45 Z"
            fill="currentColor"
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
      <circle cx="50" cy="50" r="2.8" fill="currentColor" />
    </svg>
  );
}
