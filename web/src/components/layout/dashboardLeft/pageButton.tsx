import { asideIcons } from "@/data/asideIcons";
import { Page, PageLink } from "../../../data/asideData";
import { useState } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  page: Page;
  active: boolean;
  open: boolean;
  activePage: boolean;
  activeLink: PageLink | undefined;
}

const PageButton = ({
  page,
  active,
  open,
  activePage,
  activeLink,
  ...props
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered);
  const classNames = [
    "w-full min-h-20 aspect-square flex transition-all duration-300 flex-col justify-center gap-2 rounded-lg hover:bg-gray-200",
  ];
  if ((open && active) || (!open && activePage)) {
    classNames.push(" text-primary-500");
  } else {
    classNames.push("text-gray-400");
  }

  return (
    <button
      {...props}
      className={classNames.join(" ")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-5 h-5 self-center">{asideIcons[page.icon]}</div>
      <div className="flex flex-col w-full">
        <p className="font-semibold text-[10px] px-1 overflow-hidden text-ellipsis">
          {page.nombre}
        </p>
        {/*  {activePage && (
          <small className="font-semibold text-center text-[5px] px-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {activeLink?.nombre}
          </small>
        )} */}
      </div>
    </button>
  );
};

export default PageButton;
