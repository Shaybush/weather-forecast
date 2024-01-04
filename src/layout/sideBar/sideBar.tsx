import WindIcon from "../../assets/icons/3D/windIcon3D";
import SunnyCloudyIcon from "../../assets/icons/sunnyCloudyIcon";
import FavoritesIcon from "../../assets/icons/favoritesIcon";
import { sideBarConfig } from "./config/sideBar.config";
import { Link, NavLink } from "react-router-dom";
import SettingsIcon from "../../assets/icons/settingsIcon";
import styles from "./sideBar.module.css";

const Sidebar = () => {
  const icons = [
    <SunnyCloudyIcon styleClass="text-link" />,
    <FavoritesIcon styleClass="text-link" />,
    <SettingsIcon width={40} height={40} styleClass="text-link" />,
  ];

  return (
    <nav className={styles.sideBarWrapper}>
      <div className={styles.windIcon}>
        <Link to={"/"}>
          <WindIcon width={50} height={50} />
        </Link>
      </div>

      <ul className={`nav ${styles.list}`}>
        {sideBarConfig.map((item, index) => (
          <li key={index} className={styles.iconsStyle}>
            <NavLink to={item.route} className={styles.link}>
              <span className="d-flex justify-content-center align-items-center">
                {icons[item.icon]}
              </span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
