import { useState } from "react";

const useDropdown2 = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = (menuName: string) => {
    setHoveredMenu(menuName);
    setActiveSection(menuName);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
    setActiveSection(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return {
    hoveredMenu,
    activeSection,
    isMobileMenuOpen,
    handleMouseEnter,
    handleMouseLeave,
    toggleMobileMenu,
  };
};

export default useDropdown2;