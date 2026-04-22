import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import PuntaCanaProposal from './pages/proposals/PuntaCanaProposal';
import { track } from './lib/track';

function Home() {
  useEffect(() => {
    track('portfolio', 'view');
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propuesta/punta-cana" element={<PuntaCanaProposal />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
