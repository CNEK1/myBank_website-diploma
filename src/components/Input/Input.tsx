import { InputProps } from "./Input.props";
import cn from "classnames";
import styles from "./Input.module.css";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, isValid = true, ...props },
  ref
): JSX.Element {
  return (
    <div>
      <input
        ref={ref}
        className={cn(className, styles["input"], {
          [styles.invalid]: !isValid,
        })}
        {...props}
      />
    </div>
  );
});
export default Input;
