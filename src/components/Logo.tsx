export function CatMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 27c-6.6 0-11-4-11-9.5 0-2.4.8-4.6 2.2-6.3L6 4.5c-.1-.8.7-1.3 1.4-.9l5 3.2C13.5 6.3 14.7 6 16 6s2.5.3 3.6.8l5-3.2c.7-.4 1.5.1 1.4.9l-1.2 6.7C26.2 12.9 27 15.1 27 17.5 27 23 22.6 27 16 27Z" />
    </svg>
  );
}

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <CatMark className={`h-7 w-7 ${inverted ? "text-cream" : "text-clay"}`} />
      <span
        className={`font-display text-2xl font-semibold tracking-tight ${
          inverted ? "text-cream" : "text-ink"
        }`}
      >
        Miauu
      </span>
    </span>
  );
}
