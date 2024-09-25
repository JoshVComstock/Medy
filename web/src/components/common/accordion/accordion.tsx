import { useState } from "react";
import IconDown from "@assets/icons/iconDown";
import Title from "../title/title";
import IconUp from "@assets/icons/iconUp";
import Expandable from "../utils/expandable";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Accordion = ({ title, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        className="h-10 flex justify-between items-center border border-gray-300 px-4"
      >
        <Title nowrap textSize="sm">
          {title}
        </Title>
        <div className="h-3/4 text-primary-900">
          {open ? <IconUp /> : <IconDown />}
        </div>
      </button>
      <Expandable expand={open}>
        <div className="border border-gray-300 p-4">{children}</div>
      </Expandable>
    </div>
  );
};

export default Accordion;
