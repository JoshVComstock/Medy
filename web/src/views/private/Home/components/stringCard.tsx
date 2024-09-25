interface Props {
  title: string;
  data: number | string;
  icon: JSX.Element;
  description: string;
  onClick?: () => void;
}

const StringCard = ({ data, icon, description, title, onClick }: Props) => {
  const containerClassname = [
    "bg-gray-50 border w-80 rounded-lg shadow-lg flex flex-col gap-4 p-5 select-none",
  ];
  if (onClick) {
    containerClassname.push(
      "cursor-pointer hover:opacity-80 transition-all duration-300"
    );
  }

  return (
    <div onClick={onClick} className={containerClassname.join(" ")}>
      <div className="flex justify-between">
        <div className="flex flex-1 overflow-y-hidden overflow-x-hidden gap-5">
          <span className="h-full min-w-1 bg-primary-700 rounded-lg" />
          <div className="flex w-[calc(100%_-_24px)] flex-col gap-1">
            <small className="text-black/50 text-base">{title}</small>
            <strong className="w-full text-black/80 text-3xl whitespace-nowrap overflow-hidden overflow-ellipsis" title={String(data)}>
              {data}
            </strong>
          </div>
        </div>
        <div className="h-12 p-3 aspect-square bg-primary-200 text-primary-700 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <p className={"text-sm text-black/60"}>{description}</p>
      </div>
    </div>
  );
};

export default StringCard;
