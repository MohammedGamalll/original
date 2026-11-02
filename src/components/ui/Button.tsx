import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-sand text-ink hover:bg-taupe",
  secondary: "border border-ink/20 bg-transparent text-ink hover:border-taupe hover:text-taupe",
  inverse: "bg-sand text-ink hover:bg-ivory",
  ghost: "border border-ivory/30 bg-transparent text-ivory hover:border-sand hover:text-sand",
} as const;

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: "_blank" | "_self";
  rel?: string;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  target,
  rel,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-center font-sans text-base font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
