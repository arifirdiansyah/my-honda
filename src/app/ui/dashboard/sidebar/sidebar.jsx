"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { auth, signOut } from "@/app/auth";

const Sidebar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { user } = await auth();
      setUser(user);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          src={user?.img || "/noavatar.png"}
          alt=""
          width={50}
          height={50}
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user?.username}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout} onClick={signOut}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
