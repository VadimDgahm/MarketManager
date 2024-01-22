import { ComponentProps, FC } from "react";

import clsx from "clsx";

import "@radix-ui/themes/styles.css";

import s from "./Table.module.scss";

type RootProps = ComponentProps<"table">;
const Root = ({ className, ...rest }: RootProps) => {
  const classNames = clsx(className, s.table);

  return <table className={classNames} {...rest} />;
};

type CellProps = { variant?: "body" | "head" } & ComponentProps<"td">;
const Cell: FC<CellProps> = ({ className, variant = "body", ...rest }) => {
  const classNames = clsx(className, s.tableCell, s[variant]);

  return <td className={classNames} {...rest} />;
};

type RowProps = ComponentProps<"tr">;
const Row: FC<RowProps> = ({ ...rest }) => {
  return <tr {...rest} />;
};

type BodyProps = ComponentProps<"tbody">;
const Body: FC<BodyProps> = ({ ...rest }) => {
  return <tbody {...rest} />;
};

type HeadProps = ComponentProps<"tbody">;
const Head: FC<HeadProps> = ({ ...rest }) => {
  return <thead {...rest} />;
};

type HeadRowProps = ComponentProps<"tr">;
const HeadRow: FC<HeadRowProps> = ({ className, ...rest }) => {
  const classNames = clsx(className, s.headRow);

  return <tr className={classNames} {...rest} />;
};

export const Table = {
  Body,
  Cell,
  Head,
  HeadRow,
  Root,
  Row,
};
