import { Outlet } from "react-router-dom";
import { NavBar } from "../Components/navBar/navbar";
import styles from "./main-layout.module.scss";

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
