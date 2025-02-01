import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaRupeeSign, FaHandshake, FaUser } from "react-icons/fa";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { SiHomebridge } from "react-icons/si";
import { BiSearch, BiCog } from "react-icons/bi";
import { IoInformationCircle } from "react-icons/io5";
import { AiOutlineUserAdd, AiOutlineFileProtect, AiOutlineFileAdd } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import './SideBar.css';
// import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
// import NavBar from "../NavBar/NavBar";

const routes = [
  {
    path: "/user-panel/user-dashboard",
    name: "Dashboard",
    icon: <SiHomebridge />,
  },
  {
    path: "/user-panel/my-info",
    name: "My Information",
    icon: <IoInformationCircle />,
    exact: true,
    subRoutes: [
      {
        path: "/user-panel/my-info/personal-info",
        name: "Personal Details",
        icon: <FaUser />,
      },
      {
        path: "/user-panel/bank-details",
        name: "Bank Details",
        icon: <HiDocumentArrowUp />,
      },
      // {
      //   path: "/sidebar/my-info/loan-info",
      //   name: "Loan",
      //   icon: <FaRupeeSign />,
      // },
    ],
  },
  {
    path: "/user-panel/kyc-docs",
    name: "KYC Documents",
    icon: <AiOutlineFileAdd />,
  },
  {
    path: "/user-panel/check-status",
    name: "Check Status",
    icon: <AiOutlineFileProtect />,
  },
  {
  	path: "/user-panel/add-inquiry",
    name: "Add Inquiry",
   	icon: <AiOutlineUserAdd />,
    
  },
  {
    path: "/user-panel/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/user-panel/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/user-panel/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/user-panel/settings/helpdesk",
        name: "Help Desk",
        icon: <FaHandshake />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {/* SIDEBAR */}
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.8,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  USER PANEL
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
        <main>{children}</main>

      </div>
    </>
  );
};

export default SideBar
