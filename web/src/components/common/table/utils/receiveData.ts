import { Row } from "@tanstack/react-table";
import { HeaderContext } from "@tanstack/react-table";

export interface FooterUtilProps extends HeaderContext<any, unknown> {
  pageData: Row<any>[];
  filter: string;
  isPDF: boolean;
}

export const receiveData = (
  props: FooterUtilProps,
  callback: (props: FooterUtilProps) => JSX.Element
) => callback(props);
