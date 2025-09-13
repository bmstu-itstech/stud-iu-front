import React from "react";
import clsx from "clsx";
import { TypographyProps } from ".";

type TextLevel = 1 | 2 | 3 | 4;

interface TextProps extends TypographyProps {
  level?: TextLevel;
};

export const Text: React.FC<TextProps> = ({
  level = 1,
  children,
  className,
  ...props
}) => {

  const styles: Record<number, string> = {
    1: "clamp(calc(var(--text-xl)*var(--dpr-ratio)), 5vw, var(--text-h4xl))", // text-xl -> text-h4xl
    2: "clamp(calc(var(--text-lg)*var(--dpr-ratio)), 5vw, calc(var(--text-4xl)*var(--dpr-ratio)))", // text-lg -> text-4xl
    3: "clamp(calc(var(--text-base)*var(--dpr-ratio)), 5vw, var(--text-h3xl))", // text-md -> text-h3xl
    4: "clamp(calc(var(--text-lg)*var(--dpr-ratio)), 5vw, var(--text-wh3xl))" // text-lg -> text-wh3xl
  };

  return (
    <p
      className={clsx(
        "font-normal",
        className,
      )}
      style={{
        fontSize: styles[level]
      }}
      {...props}
    >
      {children}
    </p>
  );

};
