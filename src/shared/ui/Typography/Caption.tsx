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
    1: "calc(var(--text-2xl)*1.5)",
    2: "clamp(calc(var(--text-sm)*1.5), 5vw, calc(var(--text-xl)*1.5))" // text-sm -> text-xl
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
