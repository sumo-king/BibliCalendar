import { useEffect, useState } from 'react';
import './App.css';
import { Body } from './Body';
import { Header } from './Header';

function App() {

  const mediaMatch = window.matchMedia('(min-width: 768px)');
  const [matches, setMatches] = useState(mediaMatch.matches);
  const [currentView, setCurrentView] = useState(1);

  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  }, [mediaMatch]);

  return (
    <div style={homePageStyles}>
      <Header matches={matches} />
      <Body currentView={currentView} setCurrentView={setCurrentView} matches={matches} />
    </div>
  );
}

const homePageStyles = {
  minHeight: '100vh',
}

export default App;