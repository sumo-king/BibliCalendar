import { useEffect, useState } from 'react';
import './App.css';
import { Body } from './Body';
import { Header } from './Controllers/Header';

function App() {

  const mediaMatch = window.matchMedia('(min-width: 768px)');
  const [matches, setMatches] = useState(mediaMatch.matches);
  const [currentView, setCurrentView] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(() => {
  const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  }, [mediaMatch]);

  return (
    <div style={{ ...homePageStyles, backgroundColor: isDarkMode ? '#1a1a1a' : '#f6f5f0' }}>
      <Header 
        matches={matches} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode}
        currentView={currentView}
        setCurrentView={setCurrentView}
        />
      <Body
        matches={matches}
        isDarkMode={isDarkMode}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    </div>
  );
}

const homePageStyles = {
  minHeight: '100vh',
  transition: 'background-color 0.3s ease',
}

export default App;