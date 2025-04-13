import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import { useScrollStore } from '../store/useScrollStore';

interface AnimatedMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Home', link: '#', view: 1 },
  { label: 'Projects', link: '#', view: 2 },
  { label: 'About', link: '#', view: 3 },
  { label: 'Contact', link: '#', view: 4 },
];

const AnimatedMenu: React.FC<AnimatedMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBgRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const { setCurrentView, setIsAnimating } = useScrollStore();

  // Navigation handler function
  const handleNavigation = (view: number) => {
    onClose();
    
    // Use a small delay to allow the menu to close first
    setTimeout(() => {
      setIsAnimating(true);
      setCurrentView(view);
      
      // Reset isAnimating after transition completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }, 300);
  };

  // Handle menu visibility and animation
  useEffect(() => {
    if (!menuRef.current) return;
    
    if (isOpen) {
      // Make menu visible first
      gsap.set(menuRef.current, { 
        display: 'block', 
        opacity: 1 
      });
      
      // Animate background
      gsap.to(menuBgRef.current, {
        clipPath: "circle(150% at top right)",
        duration: 0.8,
        ease: "power3.inOut"
      });
      
      // Animate content
      gsap.fromTo(menuContentRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.3 }
      );
      
      // Animate menu items with stagger
      gsap.fromTo(menuItemsRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out", delay: 0.4 }
      );
    } else {
      // Reverse animations for closing
      gsap.to(menuContentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3
      });
      
      gsap.to(menuBgRef.current, {
        clipPath: "circle(0% at top right)",
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.1,
        onComplete: () => {
          gsap.set(menuRef.current, { display: 'none' });
        }
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={menuRef} 
      className="fixed inset-0 z-50"
      style={{ display: 'none' }}
    >
      {/* Menu Background with circle animation */}
      <div 
        ref={menuBgRef} 
        className="absolute inset-0 bg-[#4B4DED]"
        style={{ clipPath: "circle(0% at top right)" }}
      >
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white opacity-5"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-white opacity-5"></div>
      </div>

      {/* Menu Content Container */}
      <div 
        ref={menuContentRef}
        className="relative z-10 h-full flex flex-col justify-center items-center px-6"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-12 text-white hover:text-gray-200 transition-colors"
        >
          <X size={32} strokeWidth={1.5} />
        </button>
        
        {/* Menu Items */}
        <nav className="text-center">
          <ul className="space-y-8">
            {menuItems.map((item, index) => (
              <li 
                key={item.label}
                ref={el => menuItemsRef.current[index] = el}
                className="overflow-hidden"
              >
                <a 
                  href={item.link}
                  className="text-white text-5xl md:text-6xl font-bold hover:text-gray-200 transition-all duration-300 hover:translate-x-2 inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.view);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Social Links */}
        <div className="mt-20">
          <div className="flex items-center gap-8 justify-center">
            <a href="#" className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#4B4DED] transition-colors">
              <span>FB</span>
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#4B4DED] transition-colors">
              <span>TW</span>
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#4B4DED] transition-colors">
              <span>IG</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedMenu;
