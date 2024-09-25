interface Props {
  children: React.ReactNode;
  color?: "primary" | "danger" | "success";
}

const Tag = ({ children, color = "primary" }: Props) => {
  const classes = [
    "text-white rounded-md gap-[3px] p-[3px] px-2 text-[10px] pointer-events-none select-none",
  ];
  switch (color) {
    case "primary":
      classes.push("bg-primary-700");
      break;
    case "danger":
      classes.push("bg-danger");
      break;
    case "success":
      classes.push("bg-success-500");
      break;
  }
  return <small className={classes.join(" ")}>{children}</small>;
};

export default Tag;
