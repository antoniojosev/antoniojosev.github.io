import { LanguageProvider } from './contexts/LanguageContext';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </LanguageProvider>
  );
}

export default App;