import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Menu, Twitter, Facebook, Instagram } from 'lucide-react';
import Projects from './pages/Projects';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import SingleProject from './pages/SingleProject';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useScrollStore } from './store/useScrollStore';
import './styles/singleProject.css';

gsap.registerPlugin(Observer);

function AppContent() {
  const { currentView, setCurrentView, isAnimating, setIsAnimating } = useScrollStore();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const view1Ref = useRef<HTMLDivElement>(null);
  const view2Ref = useRef<HTMLDivElement>(null);
  const view3Ref = useRef<HTMLDivElement>(null);
  const view4Ref = useRef<HTMLDivElement>(null);
  const projectViewRef = useRef<HTMLDivElement>(null);

  const handleViewTransition = (direction: 'up' | 'down', targetView: number) => {
    if (isAnimating) return;
    
    // Prevent invalid transitions
    if (currentView === 1 && targetView !== 2) return;
    if (currentView === 2 && targetView !== 1 && targetView !== 3) return;
    if (currentView === 3 && targetView !== 2 && targetView !== 4) return;
    if (currentView === 4 && targetView !== 3) return;

    setIsAnimating(true);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => setIsAnimating(false)
    });

    if (currentView === 1 && targetView === 2) {
      // Home to Projects
      tl.to(view1Ref.current, { yPercent: -100 })
        .fromTo(view2Ref.current, 
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(2));
    } else if (currentView === 2 && targetView === 1) {
      // Projects to Home
      tl.to(view2Ref.current, { yPercent: 100 })
        .fromTo(view1Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(1));
    } else if (currentView === 2 && targetView === 3) {
      // Projects to About
      tl.to(view2Ref.current, { yPercent: -100 })
        .fromTo(view3Ref.current,
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(3));
    } else if (currentView === 3 && targetView === 2) {
      // About to Projects
      tl.to(view3Ref.current, { yPercent: 100 })
        .fromTo(view2Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(2));
    } else if (currentView === 3 && targetView === 4) {
      // About to Contact
      tl.to(view3Ref.current, { yPercent: -100 })
        .fromTo(view4Ref.current,
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(4));
    } else if (currentView === 4 && targetView === 3) {
      // Contact to About
      tl.to(view4Ref.current, { yPercent: 100 })
        .fromTo(view3Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(3));
    }
  };

  const handleProjectSelect = (projectId: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedProjectId(projectId);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => setIsAnimating(false)
    });

    tl.set(projectViewRef.current, { visibility: 'visible', zIndex: 100 })
      .fromTo(projectViewRef.current, 
        { xPercent: 100 },
        { xPercent: 0 }
      );
  };

  const handleReturnFromProject = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => {
        setIsAnimating(false);
        setSelectedProjectId(null);
      }
    });

    tl.to(projectViewRef.current, { xPercent: 100 })
      .set(projectViewRef.current, { visibility: 'hidden', zIndex: -1 });
  };

  useEffect(() => {
    gsap.set([view1Ref.current, view2Ref.current, view3Ref.current, view4Ref.current], { 
      visibility: 'visible' 
    });
    gsap.set(view1Ref.current, { yPercent: currentView === 1 ? 0 : -100 });
    gsap.set(view2Ref.current, { yPercent: currentView === 2 ? 0 : 100 });
    gsap.set(view3Ref.current, { yPercent: currentView === 3 ? 0 : 100 });
    gsap.set(view4Ref.current, { yPercent: currentView === 4 ? 0 : 100 });

    const observer = Observer.create({
      target: window,
      type: 'wheel',
      onChange: (event) => {
        if (isAnimating || currentView === 2) return;
        
        const scrollingDown = event.deltaY > 0;
        
        if (scrollingDown && currentView === 1) {
          handleViewTransition('down', 2);
        } else if (!scrollingDown && currentView === 3) {
          handleViewTransition('up', 2);
        } else if (!scrollingDown && currentView === 4) {
          handleViewTransition('up', 3);
        }
      },
      preventDefault: true
    });

    return () => {
      if (observer) observer.kill();
    };
  }, [currentView, isAnimating]);

  return (
    <div className="bg-[#f8f9ff] min-h-screen text-gray-900 overflow-hidden">
      <div className="relative w-full h-screen overflow-hidden">
        {/* View 1 - Home */}
        <div ref={view1Ref} className="view view--1">
          <div className="relative min-h-screen">
            {/* Header/Navigation */}
            <header className="absolute top-0 left-0 w-full z-10 px-12 py-6 flex justify-between items-center">
              <div className="logo flex items-center">
                <span className="text-[#4B4DED] text-2xl font-bold">MICA</span>
                <span className="text-[#4B4DED] text-2xl">EL</span>
              </div>
              <nav className="hidden md:flex items-center space-x-12">
                <a href="#cases" className="text-gray-600 hover:text-[#4B4DED] transition-colors">CASES</a>
                <a href="#services" className="text-gray-600 hover:text-[#4B4DED] transition-colors">SERVICES</a>
                <a href="#resume" className="text-gray-600 hover:text-[#4B4DED] transition-colors">RESUME</a>
                <a href="#about" className="text-gray-600 hover:text-[#4B4DED] transition-colors">ABOUT ME</a>
                <a href="#contact" className="text-gray-600 hover:text-[#4B4DED] transition-colors">CONTACT</a>
              </nav>
              <button className="md:hidden text-[#4B4DED]">
                <Menu size={24} />
              </button>
            </header>

            {/* Main Content */}
            <div className="flex h-screen relative">
              {/* Left Content */}
              <div className="w-1/2 flex flex-col justify-center px-24">
                {/* Social Links - Left Side */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-6">
                  <a href="#" className="text-gray-400 hover:text-[#4B4DED] transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#4B4DED] transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#4B4DED] transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>

                {/* Main Text Content */}
                <div className="bg-white rounded-full px-6 py-3 inline-flex items-center gap-2 w-max mb-6 shadow-sm">
                  <span className="text-xl">👋 Hello, I am</span>
                </div>
                
                <h1 className="text-7xl font-bold mb-6 text-gray-900">Micael</h1>
                <div className="bg-white rounded-lg px-6 py-3 inline-flex items-center gap-2 w-max">
                  <span className="text-gray-600">3D ILLUSTRATOR</span>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-600">INTERACTION DESIGNER</span>
                </div>
              </div>

              {/* Right Content */}
              <div className="w-1/2 relative">
                {/* Background Circle */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f0f2ff] rounded-full -translate-x-1/4"></div>

                {/* Floating Elements */}
                <div className="absolute right-24 top-1/4 flex flex-col gap-24">
                  <div className="floating-circle w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-medium">ANIMATION</span>
                  </div>
                  <div className="floating-circle w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-medium">INTERACTION</span>
                  </div>
                  <div className="floating-circle w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-medium">ILLUSTRATION</span>
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  {[1, 2, 3, 4, 5, 6].map((dot) => (
                    <div 
                      key={dot} 
                      className={`w-2 h-2 rounded-full ${dot === 1 ? 'bg-[#4B4DED]' : 'bg-gray-300'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="absolute bottom-6 right-12 text-sm text-gray-500">
              © 2020 MICAEL<br />
              ALL RIGHTS RESERVED
            </div>
          </div>
        </div>

        {/* View 2 */}
        <div ref={view2Ref} className="view view--2">
          <Projects 
            onNavigateBack={() => handleViewTransition('up', 1)}
            onNavigateToAbout={() => handleViewTransition('down', 3)}
            onSelectProject={handleProjectSelect}
          />
        </div>

        {/* View 3 */}
        <div ref={view3Ref} className="view view--3">
          <AboutMe 
            onNavigateBack={() => handleViewTransition('up', 2)}
            onNavigateToContact={() => handleViewTransition('down', 4)}
          />
        </div>

        {/* View 4 */}
        <div ref={view4Ref} className="view view--4">
          <Contact onNavigateBack={() => handleViewTransition('up', 3)} />
        </div>

        {/* Project Detail View */}
        <div 
          ref={projectViewRef} 
          className="view project-view"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            visibility: 'hidden',
            zIndex: -1
          }}
        >
          {selectedProjectId !== null && (
            <SingleProject 
              projectId={selectedProjectId}
              onNavigateBack={handleReturnFromProject}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;