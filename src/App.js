import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import GuestExperience from './components/GuestExperience';
import PatientExperience from './components/PatientExperience';
import AdminExperience from './components/AdminExperience';
import FeatureHighlights from './components/FeatureHighlights';
import ContactSection from './components/ContactSection';
import SurveyCreator from './components/SurveyCreator';

function MainPage() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    const sections = sectionsRef.current;

    // Check if device is mobile (width < 768px, matching Tailwind's md breakpoint)
    const isMobile = () => window.innerWidth < 768;

    const scrollToSection = (index) => {
      if (index < 0 || index >= sections.length || isScrolling) return;
      
      isScrolling = true;
      setCurrentSection(index);
      
      sections[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    // Expose scrollToSection to window for Header component
    window.scrollToSection = scrollToSection;

    const handleWheel = (e) => {
      // Disable section snapping on mobile
      if (isMobile()) return;
      
      e.preventDefault();
      
      if (isScrolling) return;

      const delta = e.deltaY;
      
      if (delta > 0 && currentSection < sections.length - 1) {
        // Scrolling down
        scrollToSection(currentSection + 1);
      } else if (delta < 0 && currentSection > 0) {
        // Scrolling up
        scrollToSection(currentSection - 1);
      }
    };

    const handleKeyDown = (e) => {
      // Disable section snapping on mobile
      if (isMobile()) return;
      
      if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection]);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="App">
      <Header currentSection={currentSection} />
      <div ref={containerRef} className="scroll-container">
        <div ref={addToRefs} className="section-container">
          <GuestExperience />
        </div>
        <div ref={addToRefs} className="section-container">
          <PatientExperience />
        </div>
        <div ref={addToRefs} className="section-container">
          <AdminExperience />
        </div>
        <div ref={addToRefs} className="section-container">
          <FeatureHighlights />
        </div>
        <div ref={addToRefs} className="section-container">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/portfolio-newborn">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/survey-creator" element={<SurveyCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
