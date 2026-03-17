import { BookOpen, Calendar1Icon, Menu, Moon, Sun, X } from 'lucide-react';
import { HebDay } from "./Controllers/calendar_controllers/timedate.controller";
import { useState } from 'react';

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
          <div style={styles.logoContainer}>
            <h1 style={styles.logoText}>BibliCalendar</h1>
          </div>

          <div style={styles.controls}>
            {matches && (
              <div style={{
                ...styles.hebday,
                backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
                color: isDarkMode ? '#e0e0e0' : '#2c3e50'
              }}>
                <HebDay />
              </div>
            )}

            <button
              style={{...styles.menuButton, display: matches ? 'none' : 'flex'}}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen
                ? <X style={{ width: '24px', height: '24px', color: '#fff' }} strokeWidth={2} />
                : <Menu style={{ width: '24px', height: '24px', color: '#fff' }} strokeWidth={2} />
              }
            </button>
          </div>
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
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                ...styles.themeToggle,
                backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
                color: isDarkMode ? '#d4af37' : '#2c3e50'
              }}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
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
  logoContainer: {
    paddingLeft: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoText: {
    margin: 0,
    color: '#fff',
    fontSize: '2.75rem',
    fontWeight: '300',
    letterSpacing: '0.5px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: 'auto',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
  },
  hebday: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
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