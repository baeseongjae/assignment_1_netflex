import React from "react";
import { useAuth } from "../../contexts/auth.context";
import { useProfile } from "../../contexts/profile.context";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

function Header() {
  const { isLoggedIn, logOut } = useAuth();
  const { nickname } = useProfile();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        NETFLEX
      </Link>

      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              {nickname ? (
                <li className={styles.nickname}>
                  <span>{nickname}</span>
                </li>
              ) : null}
              <li>
                <Link to="/my-page" className={styles.link}>
                  마이페이지
                </Link>
              </li>
              <li>
                <button onClick={logOut} className={styles.buttonLogOut}>
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/sign-in" className={styles.link}>
                로그인
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
