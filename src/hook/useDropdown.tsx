import { useState } from "react";

const useDropdown = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // 메뉴에 마우스 올렸을 때 실행
  const handleMouseEnter = (menuName: string) => {
    setHoveredMenu(menuName);
    setActiveSection(menuName);
  };

  // 마우스가 떠났을 때 실행
  const handleMouseLeave = () => {
    setHoveredMenu(null);
    setActiveSection(null);
  };

  return {
    hoveredMenu,
    activeSection,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useDropdown;
