import Image from "next/image";

// The brand mark, served from /public/claude-color.png.
// `spin` reuses the slow-rotate keyframe; className controls the rendered size.
export default function BrandLogo({
  className = "",
  spin = false,
  priority = false,
}: {
  className?: string;
  spin?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src="/claude-color.png"
      alt="Claude"
      width={192}
      height={192}
      priority={priority}
      className={className}
      style={
        spin
          ? {
              animation: "spin-slow 60s linear infinite",
              transformOrigin: "50% 50%",
            }
          : undefined
      }
    />
  );
}
