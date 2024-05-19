import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

function AuthLayout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <img src="/logo.svg" about="Logo"></img>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
