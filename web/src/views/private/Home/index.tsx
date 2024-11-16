import PageContainer from "@/components/common/pageContainer";
import { useUser } from "../../../context/user";

const Home = () => {
  const { user } = useUser();

  return (
    <PageContainer title="Inicio">
      <div className="flex flex-col gap-6">
         <p className="text-base dark:text-white">
          ¡Bienvenido{" "}
          <span className="text-primary-700 dark:text-sky-400">
            {user?.login}
          </span>
        </p> 
{/*           <ChartDate />
 */}        <div className="flex gap-8"></div>
      </div>
    </PageContainer>
  );
};

export default Home;
