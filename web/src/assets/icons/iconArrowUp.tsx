interface Props {
  show?: "none" | "asc" | "desc";
}

const IconArrowUp = ({ show }: Props) => {
  const classNames = ["transition-all duration-300"];

  if (show === "none") {
    classNames.push("opacity-0");
  } else {
    classNames.push("opacity-1");
  }

  if (show === "desc") {
    classNames.push("rotate-180");
  } else {
    classNames.push("rotate-0");
  }

  return (
    <svg
      className={classNames.join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M12 5V19M12 5L6 11M12 5L18 11"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default IconArrowUp;
