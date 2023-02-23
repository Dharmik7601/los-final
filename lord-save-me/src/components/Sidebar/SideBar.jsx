import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import './SideBar.css';
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
const routes = [
  {
    path: "dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "kyc-docs",
    name: "KYC Documents",
    icon: <FaUser />,
  },
  {
    path: "add-inquiry",
    name: "Add Inquiry",
    icon: <MdMessage />,
  },
  {
    path: "check-status",
    name: "Check Status",
    icon: <MdMessage />,
  },
  {
    path: "analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
  },

  {
    path: "settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
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
      <Navbar sticky="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            LOS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Products" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/loan/business">
                  Business Loan
                </NavDropdown.Item>
                <NavDropdown.Item href="/loan/home">
                  Home Loan
                </NavDropdown.Item>
                <NavDropdown.Item href="/loan/education">
                  Education Loan
                </NavDropdown.Item>
                <NavDropdown.Item href="/loan/personal">
                  Personal Loan
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Upcoming Products
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/sidebar">SideBar</Nav.Link>
              <NavDropdown title="Login" id="collasible-nav-dropdown">
                <NavDropdown.Item eventKey={2} href="/login/client">
                  Client
                </NavDropdown.Item>
                <NavDropdown.Item href="">
                  Admin
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <br />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* SIDEBAR */}
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
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
                // activeClassName="active"
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
      <Outlet />
    </>
  );
};

export default SideBar;
