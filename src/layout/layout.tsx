import { Outlet } from "react-router-dom";
import SideBar from "./sideBar";
import styles from "./layout.module.css";

const Layout = () => {
  return (
    <div className={styles.layoutWrapper}>
      {/* side bar */}
      <div className={styles.sideBarContainer}>
        <SideBar />
      </div>

      {/* outlet */}
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
      <></>
    </div>
  );
};

export default Layout;
