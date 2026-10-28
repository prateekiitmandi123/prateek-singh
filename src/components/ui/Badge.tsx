import { cx } from "@/lib/utils";

export function Badge({
  children,
  tone = "sage",
}: {
  children: React.ReactNode;
  tone?: "sage" | "gold" | "blue" | "danger";
}) {
  const tones = {
    sage: "bg-sage-soft/40 text-forest",
    gold: "bg-gold-soft/40 text-forest-deep",
    blue: "bg-blue-soft text-teal",
    danger: "bg-red-100 text-danger",
  };
  return (
    <span className={cx("inline-flex rounded-full px-2.5 py-0.5 text-xs", tones[tone])}>
      {children}
    </span>
  );
}
