/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./TransactiomForm.module.css";
import Button from "../Button/Button";
import { FormProps } from "./TransactionForm.props";
import Memory from "../../types/global";
import { useEffect, useReducer, useRef } from "react";
import { INITIAL_STATE, formReducer } from "./TransactionForm.state";
import { FormActionKind } from "./TransactionForm.state.interface";
import Input from "../Input/Input";
import classNames from "classnames";

function TransactionForm({ onSubmit }: FormProps): JSX.Element {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const ReceiverIDRef = useRef<HTMLInputElement>(null);
  const TransactionAmountRef = useRef<HTMLInputElement>(null);

  const focusError = (isValid: {
    ReceiverID: boolean;
    TransactionAmount: boolean;
  }) => {
    switch (true) {
      case !isValid.ReceiverID:
        ReceiverIDRef.current?.focus();
        break;
      case !isValid.TransactionAmount:
        TransactionAmountRef.current?.focus();
        break;
    }
  };
  useEffect(() => {
    let timeId: number;
    if (!isValid.ReceiverID || !isValid.TransactionAmount) {
      focusError(isValid);
      timeId = setTimeout(() => {
        dispatchForm({ type: FormActionKind.RESET_VALIDITY });
      }, 4000);
    }
    return () => {
      clearTimeout(timeId);
    };
  }, [isValid]);
  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: FormActionKind.CLEAR });
    }
  }, [isFormReadyToSubmit, onSubmit, values]);

  const onChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      //Should change this line later
      dispatchForm({
        type: FormActionKind.SET_VALUES,
        payload: { [e.target.name]: e.target.value } as unknown as Memory,
      });
    }
  };
  const addNewMemory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatchForm({ type: FormActionKind.SUBMIT });
  };
  return (
    <form className={styles.form} onSubmit={addNewMemory}>
      <div className={styles["form-row"]}>
        <label className={styles["form-label"]}>
          <span>ReceiverID</span>
        </label>
        <Input
          type="ReceiverID"
          name="ReceiverID"
          id="ReceiverID"
          isValid={isValid.ReceiverID}
          ref={ReceiverIDRef}
          onChange={onChange}
          value={values.ReceiverID}
          className={classNames(styles["form-label"], {
            [styles.invalid]: !isValid.ReceiverID,
          })}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <span>Transfer Amount</span>
        </label>
        <Input
          type="TransactionAmount"
          name="TransactionAmount"
          id="TransactionAmount"
          isValid={isValid.TransactionAmount}
          ref={TransactionAmountRef}
          onChange={onChange}
          value={values.TransactionAmount}
          className={classNames(styles["form-label"], {
            [styles.invalid]: !isValid.TransactionAmount,
          })}
        />
      </div>
      <Button>Save</Button>
    </form>
  );
}
export default TransactionForm;
