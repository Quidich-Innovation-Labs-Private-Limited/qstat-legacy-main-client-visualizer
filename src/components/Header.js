//import useState hook to create menu collapse state
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import {
  MdOutlineDashboard,
  MdCalendarToday,
  MdGroups,
  MdPerson,
  MdMonitor,
  MdOutlinePersonOutline,
  MdSettings,
  MdSupportAgent,
} from "react-icons/md";
import logo from "../assets/logo.png";
import styled from "styled-components";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "../style/Header.css";

function Header(props) {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const [activeMenu, setAActiveMenu] = useState(window.location.pathname);
  async function setActiveMenu(newval) {
    window.location.pathname = "/" + newval;
  }
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
        rel="stylesheet"
      />
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>
                {menuCollapse ? (
                  "Quidich"
                ) : (
                  <img src={logo} alt="Quidich" class="center" />
                )}
              </p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {/* {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )} */}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                id="home"
                to="/Home"
                active={activeMenu === "/" ? true : false}
                onClick={() => {
                  setActiveMenu("");
                }}
                icon={
                  <MdOutlineDashboard
                    class="mdicon"
                    color={
                      window.location.pathname === "/" ? "white" : "#626262"
                    }
                  />
                }
              >
                <NavLink
                  to="/"
                  class={
                    window.location.pathname === "/" ? "navactive" : "navgrey"
                  }
                >
                  Dashboard
                </NavLink>
              </MenuItem>
              <MenuItem
                id="match"
                to="/match"
                active={activeMenu === "/match" ? true : false}
                onClick={() => {
                  setActiveMenu("match");
                }}
                icon={
                  <MdCalendarToday
                    class="mdicon"
                    color={activeMenu === "/match" ? "white" : "#626262"}
                  />
                }
              >
                <NavLink
                  to="/match"
                  class={
                    window.location.pathname === "/match"
                      ? "navactive"
                      : "navgrey"
                  }
                >
                  {" "}
                  Match{" "}
                </NavLink>
              </MenuItem>
              <MenuItem
                id="team"
                to="/team"
                active={activeMenu === "/team" ? true : false}
                onClick={() => {
                  setActiveMenu("team");
                }}
                icon={
                  <MdGroups
                    class="mdicon"
                    color={activeMenu === "/team" ? "white" : "#626262"}
                  />
                }
              >
                <NavLink
                  to="/team"
                  class={
                    window.location.pathname === "/team"
                      ? "navactive"
                      : "navgrey"
                  }
                >
                  Team
                </NavLink>
              </MenuItem>
              <MenuItem
                id="player"
                to="/player"
                active={activeMenu === "/player" ? true : false}
                onClick={() => {
                  setActiveMenu("player");
                }}
                icon={
                  <MdPerson
                    class="mdicon"
                    color={activeMenu === "/player" ? "white" : "#626262"}
                  />
                }
              >
                <NavLink
                  to="/player"
                  class={
                    window.location.pathname === "/player"
                      ? "navactive"
                      : "navgrey"
                  }
                >
                  Player
                </NavLink>
              </MenuItem>
              <MenuItem
                id="field_simulator"
                to="/field_simulator"
                active={activeMenu === "/field_simulator" ? true : false}
                onClick={() => {
                  setActiveMenu("field_simulator");
                }}
                icon={
                  <MdMonitor
                    class="mdicon"
                    color={
                      activeMenu === "/field_simulator" ? "white" : "#626262"
                    }
                  />
                }
              >
                <NavLink
                  to="/field_simulator"
                  class={
                    window.location.pathname === "/field_simulator"
                      ? "navactive"
                      : "navgrey"
                  }
                >
                  Field Simulator
                </NavLink>
              </MenuItem>
              <MenuItem>
                <span
                  style={{
                    color: "#626262",
                    alignItems: "center",
                    display: "block",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Personal
                </span>
              </MenuItem>
              <MenuItem
                id="profile"
                to="/profile"
                active={activeMenu === "/profile" ? true : false}
                onClick={() => {
                  setActiveMenu("profile");
                }}
                icon={
                  <MdOutlinePersonOutline
                    class="mdicon"
                    color={activeMenu === "/profile" ? "white" : "#626262"}
                  />
                }
              >
                <NavLink
                  to="/profile"
                  class={
                    window.location.pathname === "/profile"
                      ? "navactive"
                      : "navgrey"
                  }
                >
                  Profile
                </NavLink>
              </MenuItem>
              <MenuItem
                id="settings"
                to="/settings"
                active={activeMenu === "/settings" ? true : false}
                onClick={() => {
                  setActiveMenu("settings");
                }}
                icon={
                  <MdSettings
                    class="mdicon"
                    color={activeMenu === "/settings" ? "white" : "#626262"}
                  />
                }
              >
                <NavLink
                  to="/settings"
                  class={
                    window.location.pathname === "/settings"
                      ? "navactive"
                      : "navgrey"
                  }
                >
                  Settings
                </NavLink>
              </MenuItem>
              <MenuItem
                id="support"
                to="/support"
                active={activeMenu === "/support" ? true : false}
                onClick={() => {
                  setActiveMenu("support");
                }}
                icon={
                  <MdSupportAgent
                    class="mdicon"
                    color={activeMenu === "/support" ? "white" : "#626262"}
                  />
                }
              >
                <NavLink
                  to="/support"
                  class={
                    window.location.pathname === "/support"
                      ? "navactive"
                      : "navgrey"
                  }
                >
                  Support
                </NavLink>
              </MenuItem>
              <MenuItem
                onClick={props.signOut}
                icon={<FiLogOut color="#626262" />}
              > 
                <span style={{ color: "#626262" }}>Logout</span>
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
}

export default Header;
