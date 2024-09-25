import { useLocation } from "react-router-dom";
import { ROUTES } from "@/types/enums/Routes";
import Logo from "@assets/images/LodoMedyy.png";

interface Props {
  onClick: () => void;
  open: boolean;
}

const LogoButton = ({ onClick, open }: Props) => {
  const { pathname } = useLocation();

  const classNames = [
    "w-full aspect-square flex transition-all duration-300 flex-col justify-center gap-1",
  ];
  if (pathname === ROUTES.INICIO && !open) {
    classNames.push("bg-primary-100 text-white");
  } else {
    classNames.push("text-gray-400");
  }

  return (
    <button
      onClick={onClick}
      className={classNames.join(" ")}
    >
      <div className="w-3/2 h-3/2 self-center">
        <img className="h-full w-full" src={Logo} />
      </div>
    </button>
  );
};

export default LogoButton;
