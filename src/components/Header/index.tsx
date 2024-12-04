import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/dark-gradient.png"
            width="20"
            height="30"
            alt="next logo"
          />
        </Link>
      </div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="/pets">Pets</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
