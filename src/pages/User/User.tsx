import Button from "../../components/Button/Button";
import styles from "./User.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { profile } from "../../store/user.slice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const User = () => {
  // Sample user data (replace with actual data)
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((s: RootState) => s.user.profile);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <div className={styles["userPage"]}>
      <div className={styles["userInfo"]}>
        {/* Display user information */}
        <div className={styles["leftInfo"]}>
          <p
            className={styles["name"]}
          >{`${userProfile?.firstName} ${userProfile?.secondName}`}</p>
          <p className={styles["description"]}>Full Name</p>
          <p className={styles["email"]}>{userProfile?.email}</p>
          <p className={styles["description"]}>Email Address</p>
          <p className={styles["phoneNumber"]}>{userProfile?.number}</p>
          <p className={styles["description"]}>Phone Number</p>
        </div>
        <div className={styles["rightInfo"]}>
          {/* Display account balance */}
          <h1 className={styles["accountBalance"]}>${userProfile?.balance}</h1>
          <p className={styles["description"]}>Account Balance</p>
        </div>
      </div>
      <Button>
        <Link className={styles["links"]} to={"/transafersByUser"}>
          View Transactions
        </Link>
      </Button>
      <p className={styles["userAgreement"]}>
        By using this service, you agree to our terms and conditions.
      </p>
    </div>
  );
};

export default User;
