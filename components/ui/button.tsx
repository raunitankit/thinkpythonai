// components/ui/button.tsx
import React from "react";
import cx from "classnames";

type Props = React.PropsWithChildren<{
  variant?: "primary" | "secondary" | "outline" | "brand";
  size?: "sm" | "default" | "lg";
  href?: string;
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  children,
  variant = "primary",
  size = "default",
  href,
  className,
  ...rest
}: Props) {
  const classes = cx(
    "btn", // base (from globals.css)
    {
      "btn-primary": variant === "primary",
      "btn-secondary": variant === "secondary",
      "btn-outline": variant === "outline",
      // New colorful brand gradient
      "text-white bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-500 hover:opacity-90 border-transparent":
        variant === "brand",
    },
    {
      "px-3 py-1.5 text-xs": size === "sm",
      "px-4 py-2 text-sm": size === "default",
      "px-5 py-2.5 text-base": size === "lg",
    },
    className
  );

  if (href) {
    // Anchor version
    return (
      <a href={href} className={classes} {...(rest as any)}>
        {children}
      </a>
    );
  }

  // Button version
  return (
    <button className={classes} {...(rest as any)}>
      {children}
    </button>
  );
}
