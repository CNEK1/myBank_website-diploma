import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import styles from "./Register.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

export type RegisterForm = {
  email: {
    value: string;
  };
  firstName: {
    value: string;
  };
  secondName: {
    value: string;
  };
  number: {
    value: string;
  };
  password: {
    value: string;
  };
};

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { msg, registerErrorMassage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (msg === "Register Succeseful") {
      navigate("/auth/login");
      msg === null;
    }
  }, [msg, navigate]);

  const Keksubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, firstName, secondName, number, password } = target;
    // console.log(target.email.value);
    // console.log(target.firstName.value);
    // console.log(target.secondName.value);
    console.log(target.number.value);
    await sendRegister(
      email.value,
      password.value,
      firstName.value,
      secondName.value,
      number.value
    );
  };

  const sendRegister = async (
    email: string,
    password: string,
    firstName: string,
    secondName: string,
    number: string
  ) => {
    dispatch(register({ email, password, firstName, secondName, number }));
  };

  return (
    <div className={styles["login"]}>
      <Heading>Register</Heading>
      {registerErrorMassage && (
        <div className={styles["error"]}>{registerErrorMassage}</div>
      )}
      <form className={styles["form"]} onSubmit={Keksubmit}>
        <div className={styles["field"]}>
          <label htmlFor="firstName">First Name</label>
          <Input
            id="firstName"
            name="firstName"
            type="firstName"
            placeholder="firstname"
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="secondName">Second Name</label>
          <Input
            id="secondName"
            name="secondName"
            type="secondName"
            placeholder="secondname"
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="email">Email</label>
          <Input id="email" name="email" type="email" placeholder="email" />
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
        <div className={styles["field"]}>
          <label htmlFor="phonenumber">Phone Number</label>
          <Input
            id="number"
            name="number"
            type="phonenumber"
            placeholder="phonenumber"
          />
        </div>
        <Button type="submit" appereance="big">
          Register
        </Button>
      </form>
      <div className={styles["links"]}>
        <div>Already have an account?</div>
        <Link to={"/auth/login"}>Login</Link>
      </div>
    </div>
  );
}

export default Register;
