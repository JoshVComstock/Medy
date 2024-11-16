import styles from "../dashboard.module.css";
import PageButton from "./pageButton";
//import ModeButton from "./modeButton";
import { useUser } from "@/context/user";
import LogoButton from "./logoButton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/enums/Routes";
import { useActiveNavPage } from "@/components/hooks/useActiveNavPage";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openNav: boolean;
}

const Left = ({ page, setPage, setOpen, open, openNav }: Props) => {
  const { menu: asideData } = useUser();
  const navigate = useNavigate();
  const { activePage, activeLink } = useActiveNavPage();
  const handleChangePage = (id: number) => {
    setPage(id);
    if (!openNav) {
      setOpen((old) => (page === id ? !old : true));
    }
  };

  return (
    <aside
      className={
        styles.aside +
        " z-50 h-full bg-white w-20 border-r flex flex-col justify-between"
      }
    >
      <div className="flex flex-col h-full">
        <LogoButton
          onClick={() => {
            setOpen(false);
            navigate(ROUTES.INICIO);
          }}
          open={open}
        />
        <div className="h-[90%] flex flex-col overflow-y-auto no-scrollbar">
          {asideData?.map((value) => (
            <PageButton
              key={value.id}
              onClick={() => handleChangePage(value.id)}
              active={page === value.id}
              activePage={activePage?.id === value.id}
              page={value}
              open={open}
              activeLink={activeLink}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Left;
