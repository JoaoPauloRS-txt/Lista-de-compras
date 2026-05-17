import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";

function navLinkClass(isActive: boolean) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

export function NavBar() {
  return (
    <div className={styles.sidebar} aria-label="Menu lateral">
      <NavLink to="/" className={styles.brand}>
        Lista de compras
      </NavLink>

      <nav className={styles.nav}>
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => navLinkClass(isActive)}
            >
              Produtos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-list"
              className={({ isActive }) => navLinkClass(isActive)}
            >
              Minhas listas
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
