import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { gsap } from 'gsap';
import { useScrollStore } from '../store/useScrollStore';
import AnimatedMenu from './AnimatedMenu';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { currentView } = useScrollStore();
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle page transitions with fade effect
  useEffect(() => {
    const headerEl = document.querySelector('.sticky-header');
    
    // Fade out/in effect
    gsap.fromTo(
      headerEl, 
      { opacity: 0.5 }, 
      { 
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.inOut" 
      }
    );
  }, [currentView]);

  // Toggle menu function
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    if (onMenuClick) onMenuClick();
  };

  return (
    <>
      <header className="sticky-header fixed top-0 left-0 w-full z-50 px-12 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="logo flex items-center">
          <span className="text-[#4B4DED] text-2xl font-bold">MICA</span>
          <span className="text-[#4B4DED] text-2xl">EL</span>
        </div>
        
        {/* Hamburger Menu */}
        <button 
          className="relative z-50 group p-2" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col justify-between w-6 h-5">
            <span className={`h-0.5 w-full bg-[#4B4DED] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-full bg-[#4B4DED] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-full bg-[#4B4DED] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
        
        {/* Navigation Dots */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {[1, 2, 3, 4].map((dot) => (
            <div 
              key={dot} 
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${dot === currentView ? 'bg-[#4B4DED]' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </header>

      {/* Animated Menu Overlay */}
      <AnimatedMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Header;
