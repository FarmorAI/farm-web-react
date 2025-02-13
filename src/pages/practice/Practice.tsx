import React from "react";
import styled, { css } from "styled-components";
import useDropdown from "../../hook/useDropdown";

const DropdownMenu: React.FC = () => {
  const { hoveredMenu, activeSection, handleMouseEnter, handleMouseLeave } = useDropdown();

  return (
    <Wrapper onMouseLeave={handleMouseLeave}>
      {menuData.map(({ name }) => (
        <NavItem
          key={name}
          onMouseEnter={() => handleMouseEnter(name)}
          isActive={activeSection === name}
        >
          {name}
        </NavItem>
      ))}
      {hoveredMenu && (
        <Dropdown>
          {menuData.map(({ name, links }) => (
            <DropdownSection 
              key={name} 
              isActive={activeSection === name} 
              onMouseEnter={() => handleMouseEnter(name)}
            >
              <Ul>
                {links.map((link, index) => (
                  <Li key={index} isHighlighted={activeSection === name}>
                    <LinkWrapper href={link.href}>{link.label}</LinkWrapper>
                  </Li>
                ))}
              </Ul>
            </DropdownSection>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default DropdownMenu;

const menuData = [
  {
    name: "마이페이지",
    links: [
      { href: "#1-1", label: "메뉴1" },
      { href: "#1-2", label: "메뉴2" },
      { href: "#1-3", label: "메뉴3" },
    ],
  },
  {
    name: "게시판",
    links: [
      { href: "#2-1", label: "메뉴1" },
      { href: "#2-2", label: "메뉴2" },
      { href: "#2-3", label: "메뉴3" },
    ],
  },
  {
    name: "로그아웃",
    links: [
      { href: "#3-1", label: "메뉴1" },
      { href: "#3-2", label: "메뉴2" },
    ],
  },
];

const Wrapper = styled.div`
  margin: 50px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: black;
  font-size: 18px;
  background: white;
  width: 600px;
  height: 60px;
  font-weight: bold;
  position: relative;
  border-bottom: 2px solid #ddd;
`;

interface NavItemProps {
  isActive: boolean;
}

const NavItem = styled.div<NavItemProps>`
  cursor: pointer;
  padding: 15px 20px;
  transition: all 0.3s ease-in-out;
  position: relative;

  ${({ isActive }) =>
    isActive &&
    css`
      color: #007aff;
      font-weight: bold;
      border-bottom: 3px solid #007aff;
    `}
`;

const Dropdown = styled.div`
  background: white;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  text-align: left;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
  z-index: 10;
  display: flex;
  padding: 20px;
`;

interface DropdownSectionProps {
  isActive: boolean;
}

const DropdownSection = styled.div<DropdownSectionProps>`
  flex: 1;
  padding: 10px;
  border-left: 2px solid #eee;
  transition: background 0.3s ease;
  &:first-of-type {
    border-left: none;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      border-radius: 5px;
    `}
`;

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

interface LiProps {
  isHighlighted: boolean;
}

const Li = styled.li<LiProps>`
  padding: 8px 0;
  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      border-radius: 5px;
    `}
  &:hover {
    background: #d0d0d0;
  }
`;

const LinkWrapper = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;
