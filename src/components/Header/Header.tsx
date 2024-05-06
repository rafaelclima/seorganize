import { ClipboardList } from "lucide-react";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.logo}>
          <ClipboardList size={36} strokeWidth={1.25} />
        </span>{" "}
        <span className={styles.brandName}>Se</span>
        <span>Organize</span>
      </h1>
    </header>
  );
}
