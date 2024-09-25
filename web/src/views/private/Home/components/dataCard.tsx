import IconDown from "@assets/icons/iconDown";
import IconMinus from "@assets/icons/iconMinus";
import IconUp from "@assets/icons/iconUp";

interface Props {
  title: string;
  data: number | string;
  icon: JSX.Element;
  incrementPercentage: number | null;
  since: string;
  onClick?: () => void;
}

const DataCard = ({
  data,
  icon,
  since,
  incrementPercentage,
  title,
  onClick,
}: Props) => {
  const isUp = incrementPercentage && incrementPercentage >= 0;
  const accentColor =
    incrementPercentage === null
      ? "text-black/60"
      : isUp
      ? "text-success-500"
      : "text-danger";

  const containerClassname = [
    "bg-gray-50 border w-80 rounded-lg shadow-lg flex flex-col gap-4 p-5 select-none dark:bg-slate-400",
  ];
  if (onClick) {
    containerClassname.push("cursor-pointer hover:opacity-80 transition-all duration-300");
  }

  return (
    <div onClick={onClick} className={containerClassname.join(" ")}>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <span className="h-full w-1 bg-primary-700 rounded-lg" />
          <div className="flex flex-col gap-1">
            <small className="text-black/50 text-base">{title}</small>
            <strong className="text-black/80 text-3xl">{data}</strong>
          </div>
        </div>
        <div className="h-12 p-3 aspect-square bg-primary-200 text-primary-700 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className={["h-5", accentColor].join(" ")}>
          {incrementPercentage === null ? (
            <IconMinus />
          ) : isUp ? (
            <IconUp />
          ) : (
            <IconDown />
          )}
        </div>
        <p className={"text-sm text-black/60"}>
          {incrementPercentage === null ? (
            "No existen datos ahora mismo"
          ) : (
            <>
              <span className={accentColor}>
                {isUp && "+"}
                {incrementPercentage}%
              </span>{" "}
              desde {since}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default DataCard;
