import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMassage } = useSelector((s: RootState) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles["login"]}>
      <Heading>Login</Heading>
      {loginErrorMassage && (
        <div className={styles["error"]}>{loginErrorMassage}</div>
      )}
      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Email</label>
          <Input id="email" name="email" placeholder="email" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <Button type="submit" appereance="big">
          Login
        </Button>
      </form>
      <div className={styles["links"]}>
        <div>No Account?</div>
        <Link to={"/auth/register"}>Register</Link>
      </div>
    </div>
  );
}

export default Login;
