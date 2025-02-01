import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SideBarData } from './SideBarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import './SideBar2.css';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SideBarNav = styled.nav`
  background: #15171c;
  width: 300px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SideBarWrap = styled.div`
  width: 100%;
`;

const SideBar2 = () => {
    const [sideBar, setSideBar] = useState(false);

    const showSideBar = () => setSideBar(!sideBar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavIcon to='#' name="icon-open">
                        <FaIcons.FaBars onClick={showSideBar} />
                    </NavIcon>
                    <NavIcon to='#'>
                        <FaIcons.FaPowerOff onClick={showSideBar} />
                    </NavIcon>
                </Nav>
                <SideBarNav sidebar={sideBar}>
                    <SideBarWrap>
                        <span className='brand'>LOS</span>
                        <NavIcon to='#'>
                            <AiIcons.AiOutlineClose onClick={showSideBar} />
                        </NavIcon>
                        {SideBarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SideBarWrap>
                </SideBarNav>
            </IconContext.Provider>
        </>
    );
};

export default SideBar2;