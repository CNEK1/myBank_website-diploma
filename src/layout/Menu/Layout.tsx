import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { profile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((s: RootState) => s.user.profile);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };
  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <NavLink to="/user" className={() => cn(styles["userlink"], {})}>
          <div className={styles["user"]}>
            <div className={styles["name"]}>
              {userProfile?.firstName} {userProfile?.secondName}
            </div>
            <div className={styles["email"]}>${userProfile?.balance}</div>
            <div className={styles["email"]}>Account ID: {userProfile?.id}</div>
          </div>
        </NavLink>
        <div className={styles["menu"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src="./menu.svg" alt="menu icon" />
            How it Works?
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src="./news.svg" alt="news icon" />
            News
          </NavLink>

          <NavLink
            to="/transfer"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src="./transfer.svg" alt="transfer icon" />
            Transfer
          </NavLink>
          <NavLink
            to="/withdraw"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src="./withdraw.svg" alt="withdraw icon" />
            Withdraw
          </NavLink>
        </div>
        <div className={styles["lowerButtons"]}>
          <Link className={styles["addMoney"]} to={"/payment"}>
            <Button>
              <img src="./money_add.svg" alt="money_add icon" />
              Add
            </Button>
          </Link>
          <div className={styles["exit"]}>
            <Button onClick={logout}>
              <img src="./exit.svg" alt="exit icon" />
              Exit
            </Button>
          </div>
        </div>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
