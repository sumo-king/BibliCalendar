import { useState, useEffect } from 'react';
import BibleView from "./Controllers/bible_controller/bible.controller";
import { CalendarView } from "./Views/calendar_view";
import { BookOpen, Calendar1Icon } from 'lucide-react';

export const Body = ({ currentView, setCurrentView, matches, isDarkMode }) => {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = 300; // pixels to fade
      const minOpacity = 0.2;
      const newOpacity = Math.max(minOpacity, 1 - (scrolled / maxScroll) * (1 - minOpacity));
      setScrollOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeStyles = {
    tabBar: {
      backgroundColor: isDarkMode
        ? `rgba(26, 26, 26, ${scrollOpacity})`
        : `rgba(255, 255, 255, ${scrollOpacity})`,
      borderTopColor: isDarkMode ? '#d4af37' : '#d4af37',
      backdropFilter: 'blur(8px)',
    },
    tab: {
      backgroundColor: isDarkMode ? '#2c2c2c' : '#f8f9fa',
      color: isDarkMode ? '#e0e0e0' : '#495057',
      borderColor: isDarkMode ? '#444' : '#e0e0e0',
    },
    tabActive: {
      backgroundColor: isDarkMode ? '#d4af37' : '#2c3e50',
      color: isDarkMode ? '#1a1a1a' : '#fff',
      borderColor: isDarkMode ? '#d4af37' : '#2c3e50',
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.mainContent}>
        {currentView === 0 ?
          <CalendarView matches={matches} isDarkMode={isDarkMode} /> :
          <BibleView matches={matches} isDarkMode={isDarkMode} />
        }
      </div>

      <nav style={{ ...styles.tabBar, ...themeStyles.tabBar }}>
        <button
          style={{
            ...styles.tab,
            ...themeStyles.tab,
            ...(currentView === 1 ? { ...styles.tabActive, ...themeStyles.tabActive } : {})
          }}
          onClick={() => setCurrentView(1)}
        >
          <BookOpen size={20} strokeWidth={2.5} />
          <span>Bible</span>
        </button>
        <button
          style={{
            ...styles.tab,
            ...themeStyles.tab,
            ...(currentView === 0 ? { ...styles.tabActive, ...themeStyles.tabActive } : {})
          }}
          onClick={() => setCurrentView(0)}
        >
          <Calendar1Icon size={20} strokeWidth={2.5} />
          <span>Calendar</span>
        </button>

      </nav>
    </div>
  );
};

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f6f5f0', // This is overridden by App.jsx
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  body: {
    paddingTop: '80px',
    paddingBottom: '100px',
    minHeight: '100vh',
  },
  mainContent: {
    padding: '2rem 1rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 2rem',
    border: '2px solid #e0e0e0',
    backgroundColor: '#f8f9fa',
    color: '#495057',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s',
    outline: 'none',
  },
  tabActive: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    borderColor: '#2c3e50',
    transform: 'scale(1.05)',
  },
  tabIcon: {
    fontSize: '1.25rem',
  },
  tabBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderTop: '2px solid #d4af37',
    boxShadow: '0 -2px 12px rgba(0,0,0,0.1)',
    zIndex: 1000,
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },

}