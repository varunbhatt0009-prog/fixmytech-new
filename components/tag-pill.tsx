type TagPillProps = {
  tag: string;
};

export function TagPill({ tag }: TagPillProps) {
  return (
    <span className="rounded-full border border-accent/15 bg-accentSoft px-3 py-1 text-xs font-medium text-accent-deep">
      {tag}
    </span>
  );
}
