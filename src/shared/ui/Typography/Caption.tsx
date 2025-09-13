import React from "react";
import clsx from "clsx";
import { TypographyProps } from ".";

type CaptionLevel = 1 | 2;

interface CaptionProps extends TypographyProps {
  level?: CaptionLevel;
};

export const Caption: React.FC<CaptionProps> = ({
  level = 1,
  children,
  className,
  ...props
}) => {

  const styles: Record<number, string> = {
    1: "calc(var(--text-2xl)*var(--dpr-ratio))",
    2: "clamp(calc(var(--text-sm)*var(--dpr-ratio)), 5vw, calc(var(--text-xl)*var(--dpr-ratio)))" // text-sm -> text-xl
  };

  return (
    <p
      className={clsx(
        styles[level],
        "font-normal",
        className
      )}
      {...props}
      style={{
        fontSize: styles[level]
      }}
    >
      {children}
    </p>
  );

};
