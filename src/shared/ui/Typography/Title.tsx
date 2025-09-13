import React from "react";
import clsx from "clsx";
import { TypographyProps } from ".";

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = `h${TitleLevel}`;

interface TitleProps extends TypographyProps {
  level?: TitleLevel;
};

export const Title: React.FC<TitleProps> = ({
  level = 1,
  children,
  className,
  ...props
}) => {
  const Tag = `h${level}` as HeadingTag;

  const styles: Record<number, string> = {
    1: "clamp(calc(var(--text-4xl)*var(--dpr-ratio)), 5vw, var(--text-h8xl))", // text-4xl -> text-h8xl
    2: "clamp(calc(var(--text-3xl)*var(--dpr-ratio)), 5vw, calc(var(--text-6xl)*var(--dpr-ratio)))", // text-3xl -> text-6xl
    3: "clamp(calc(var(--text-3xl)*var(--dpr-ratio)), 5vw, calc(var(--text-5xl)*var(--dpr-ratio)))", // text-3xl -> text-5xl
    4: "clamp(calc(var(--text-xl)*var(--dpr-ratio)), 5vw, var(--text-h4xl))", // text-xl -> text-h4xl
    5: "clamp(calc(var(--text-xl)*var(--dpr-ratio)), 5vw, calc(var(--text-4xl)*var(--dpr-ratio)))", // text-xl -> text-4xl
    6: "text-2xl"
  };

  return (
    <Tag
      className={clsx(
        styles[level],
        "font-bold",
        className
      )}
      style={{ fontSize: styles[level] }}
      {...props}
    >
      {children}
    </Tag>
  );

};
