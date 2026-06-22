import { BookOpen, Calendar1Icon } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './header_controllers/logo';
import { CurrentDate } from './header_controllers/current_date';
import { ThemeToggle } from './header_controllers/theme';
export const Header = ({ matches, isDarkMode, setIsDarkMode, setCurrentView }) => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <>
      <header style={{
        ...styles.header,
        backgroundColor: isDarkMode ? '#121212' : '#2c3e50',
        borderBottomColor: isDarkMode ? '#d4af37' : '#d4af37'
      }}>
        <div style={styles.headerContent}>
          {/* Logo */}
          <Logo/>
          {/* Current Date */}
          <CurrentDate
            matches={matches}
            isDarkMode={isDarkMode}
            mobileMenuOpen={mobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
          {/* Dark Mode Toggle */}
          <ThemeToggle
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            matches={matches}
          />
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={toggleMobileMenu}
        style={{
          ...styles.overlay,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'all' : 'none',
        }}
      />

      {/* Sliding Sidebar */}
      <div style={{
        ...styles.sidebar,
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f6f5f0',
        color: isDarkMode ? '#e0e0e0' : '#2c3e50',
      }}>
        <div style={{flexDirection: 'column', display: 'flex', gap: '1rem', padding: '1rem'}}>
          <button
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '0.5rem'}}
            onClick={() => { setCurrentView(1); toggleMobileMenu(); }}
          >
            <BookOpen size={20} strokeWidth={2.5} />
          <span>Bible</span>
          </button>
          <button
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '0.5rem'}}
            onClick={() => { setCurrentView(0); toggleMobileMenu(); }}
          >
            <Calendar1Icon size={20} strokeWidth={2.5} />
            <span>Calendar</span>
          </button>
          <ThemeToggle
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            matches={true}
          />
        </div>
      </div>
    </>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    borderBottom: '3px solid #d4af37',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '4.5rem',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  headerContent: {
    padding: '1rem 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: 'auto',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1001,
    transition: 'opacity 0.3s ease',
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '260px',
    height: '100vh',
    zIndex: 1002,
    boxShadow: '-4px 0 16px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease',
    paddingTop: '5rem',
  },
  sidebarList: {
    listStyle: 'none',
    margin: 0,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  sidebarItem: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  },
  themeToggle: {
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    marginLeft: '1rem',
  },
};