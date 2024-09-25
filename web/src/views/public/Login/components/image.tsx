import { Link } from "react-router-dom";
import LoginImg from "@assets/images/login.png";
import { useEnvironment } from "@/context/environment";
const Image = () => {
  const { database } = useEnvironment();

  return (
    <div className="h-60 xl:h-full w-[640px] bg-black relative max-w-[100%]">
      <div className="absolute top-0 right-0 p-2 bg-white/40 backdrop-blur-sm flex flex-col w-28">
        <small className="text-white text-[10px] text-center whitespace-nowrap text-ellipsis overflow-hidden">
          <span>V:{APP_VERSION}</span>
        </small>
        <small className="text-white text-[10px] text-center whitespace-nowrap text-ellipsis overflow-hidden">
          <span>BD: {database || "..."}</span>
        </small>
      </div>
      <img src={LoginImg} className="w-full h-full object-cover" />
      <div className="absolute top-0 sm:top-auto sm:bottom-0 left-0 p-6">
        <small className="text-white">Bienvenido</small>
      </div>
    </div>
  );
};

export default Image;
