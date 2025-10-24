// import {CalendarCheck} from 'lucide-react'

export const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logoContainer}>
          {/* <CalendarCheck style={styles.logoIcon} /> */}
          <h1 style={styles.logoText}>
            BibliCalendar
            </h1>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2c3e50',
    borderBottom: '3px solid #d4af37',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  headerContent: {
    padding: '1rem 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoIcon: {
    fontSize: '2rem',
  },
  logoText: {
    margin: 0,
    color: '#fff',
    fontSize: '2.75rem',
    fontWeight: '300',
    letterSpacing: '0.5px',
    // height: '3rem'
  },
}