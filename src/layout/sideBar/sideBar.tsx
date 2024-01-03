import "./sideBar.css";
import WindIcon from "../../assets/icons/3D/windIcon3D";
import SunnyCloudyIcon from "../../assets/icons/sunnyCloudyIcon";
import FavoritesIcon from "../../assets/icons/favoritesIcon";
import { sideBarConfig } from "./config/sideBar.config";
import { Link, NavLink } from "react-router-dom";
import SettingsIcon from "../../assets/icons/settingsIcon";

const Sidebar = () => {
  const icons = [
    <SunnyCloudyIcon styleClass="text-link" />,
    <FavoritesIcon styleClass="text-link" />,
    <SettingsIcon width={48} height={48} styleClass="text-link" />,
  ];

  return (
    <nav className="side-bar-wrapper">
      <div className="wind-icon">
        <Link to={"/"}>
          <WindIcon width={50} height={50} />
        </Link>
      </div>
      <ul className="nav flex-column">
        {sideBarConfig.map((item, index) => (
          <li key={index} className="icons-style">
            <NavLink to={item.route}>
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
