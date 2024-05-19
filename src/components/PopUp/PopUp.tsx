import { useRef } from "react";
import styles from "./PopUp.module.css";
import { PopUpProps } from "./PopUp.props";
import Button from "../Button/Button";

const PopUp = ({ children, isOpen, onClose }: PopUpProps) => {
  const outsideRef = useRef(null);

  const handleCloseOnOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  };
  return isOpen ? (
    <div className={styles["modal"]}>
      <div
        className={styles["modal_overlay"]}
        ref={outsideRef}
        onClick={handleCloseOnOverlay}
      />
      <div className={styles["modal_box"]}>
        <div className={styles["modal_close_icon"]} onClick={onClose}>
          <img src="./close.svg" alt="exit icon" />
        </div>
        <div className={styles["modal_title"]}>AI Protection</div>
        <div className={styles["content"]}>{children}</div>
        <div className={styles["buttons"]}>
          <Button>Yes</Button>
          <Button>No</Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PopUp;
