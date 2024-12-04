import Link from "next/link";
import styles from "./Footer.module.scss";

const footerLinks = [
  {
    name: "Home",
    url: "/home",
  },
  {
    name: "Pets",
    url: "/pets",
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        {footerLinks &&
          footerLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
      </ul>
      <p className={styles.copyright}>&copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
