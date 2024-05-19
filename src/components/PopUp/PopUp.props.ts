import { HTMLAttributes, ReactNode } from "react";

export interface PopUpProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
