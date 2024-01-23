import { ReactNode } from "react";
import cx from "classix";

import { TitleSize } from "../model/types/title";

import classes from "./Title.module.scss";

interface TitleProps {
  size: TitleSize;
  children: ReactNode;
  className: string;
}

export const Title = ({ size, className, children }: TitleProps) => {
  const cls = cx(
    classes.title,
    size === TitleSize.XXL && classes.title__xxl,
    className
  );

  switch (size) {
    case TitleSize.XXL:
      return <h1 className={cls}>{children}</h1>;
  }
};