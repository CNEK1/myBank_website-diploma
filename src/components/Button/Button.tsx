import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import cn from "classnames";

function Button({
  children,
  appereance = "small",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles["button"], styles["accent"], className, {
        [styles["small"]]: appereance === "small",
        [styles["big"]]: appereance === "big",
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
