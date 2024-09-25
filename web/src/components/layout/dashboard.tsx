import { Outlet } from "react-router-dom";
import styles from "./dashboard.module.css";
import { useEffect, useState } from "react";
import Left from "./dashboardLeft/left";
import Right from "./dashboardRight/right";
import Header from "./dashboardHeader/header";
import { useSocket } from "../hooks/useSocket";
import { Sockets } from "@/types/enums/Sockets";
import { alertSuccess, alertWarning } from "@/utils/alertsToast";
import { useUser } from "@/context/user";
import { useHeaderPage } from "../hooks/useHeaderPage";
import KeyboardControls from "./keyboardControls";

const Dashboard = () => {
  const [openNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { setUser, getMenus } = useUser();
  useHeaderPage();
  useSocket({
    [Sockets.MESSAGE](res) {
      alertSuccess(res.message);
    },
    /* [Sockets.COUNT](res) {
      alertSuccess(res.message);
    }, */
    [Sockets.USERMODIFY](res) {
      alertWarning(res.message);
      setUser(res.data);
    },
    [Sockets.USERGROUP](res) {
      alertWarning(res.message);
      getMenus();
    },
  });

  useEffect(() => {
    setOpen(openNav);
  }, [openNav]);

  return (
    <KeyboardControls>
      <div className={styles.dashboard}>
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="z-40 fixed inset-0 bg-[rgba(0,0,0,0.3)] animate-[appear_.3s]"
          />
        )}
        <Left
          open={open}
          page={page}
          setPage={setPage}
          setOpen={setOpen}
          openNav={openNav}
        />
        <Right open={open} page={page} setOpen={setOpen} openNav={openNav} />
        <Header />
        <main className={styles.main + " overflow-auto dark:bg-gray-800"}>
          <Outlet />
        </main>
      </div>
    </KeyboardControls>
  );
};

export default Dashboard;
