import Loader from "@/components/common/loader/loader";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const InitialSistem = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  },[]);

  if (isLoading)
    return (
      <div className="w-screen h-screen">
        <Loader text="Cargando datos del sistema..." />
      </div>
    );

  return children;
};

export default InitialSistem;
