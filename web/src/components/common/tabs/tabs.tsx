import { useState } from "react";
import Button from "../button/button";

interface Props<T extends string> {
  pages: T[];
  children: Record<T, React.ReactNode>;
  padding?: boolean;
  align?: "start" | "center" | "end";
  gap?: string;
}

const Tabs = <T extends string>({
  children,
  pages,
  padding = true,
  align = "center",
  gap = "16px",
}: Props<T>) => {
  const [page, setPage] = useState<T>(pages[0]);

  const bodyClassNames = ["flex-1 overflow-auto animate-[appear_.5s]"];
  if (padding) {
    bodyClassNames.push("px-5");
  }
  const headerClassNames = ["flex"];
  switch (align) {
    case "start":
      headerClassNames.push("self-start");
      break;
    case "center":
      headerClassNames.push("self-center");
      break;
    case "end":
      headerClassNames.push("self-end");
      break;
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{
        gap,
      }}
    >
      <div className={headerClassNames.join(" ")}>
        {pages.map((p) => (
          <Button
            type="button"
            key={p}
            activeType="border-b"
            borderRadius="0"
            toggle={page === p}
            onClick={() => setPage(p)}
            className="dark:text-neutral-200 dark:bg-gray-800"
          >
            {p as string}
          </Button>
        ))}
      </div>
      <div key={page} className={bodyClassNames.join(" ")}>
        {children[page]}
      </div>
    </div>
  );
};

export default Tabs;
