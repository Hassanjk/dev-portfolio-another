import React, { useEffect } from 'react';
import { Menu } from 'lucide-react';
import { gsap } from 'gsap';
import { useScrollStore } from '../store/useScrollStore';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { currentView } = useScrollStore();

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

  return (
    <header className="sticky-header fixed top-0 left-0 w-full z-50 px-12 py-6 flex justify-between items-center">
      {/* Logo */}
      <div className="logo flex items-center">
        <span className="text-[#4B4DED] text-2xl font-bold">MICA</span>
        <span className="text-[#4B4DED] text-2xl">EL</span>
      </div>
      
      {/* Hamburger Menu */}
      <button className="text-[#4B4DED] hover:text-blue-700 transition-colors" onClick={onMenuClick}>
        <Menu size={24} />
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
  );
};

export default Header;
