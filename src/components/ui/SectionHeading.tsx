export function SectionHeading({
  eyebrow,
  title,
  text,
  id,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="mb-4 text-sm font-medium text-ink/80">{eyebrow}</p> : null}
      <h2 id={id} className="font-display text-[clamp(2rem,4.2vw,3.7rem)] font-semibold leading-[1.35] text-ink">
        {title}
      </h2>
      {text ? <p className="mt-5 max-w-2xl text-lg leading-9 text-ink/80">{text}</p> : null}
    </div>
  );
}
