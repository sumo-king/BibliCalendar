import BibleView  from "./Controllers/bible_controller/bible.controller";
import { CalendarView } from "./Views/calendar_view";
import { BookOpen, Calendar1Icon } from 'lucide-react';

export const Body = ({ currentView, setCurrentView, matches }) => {
  return (
    <div style={styles.body}>
      <div style={styles.mainContent}>
        {currentView === 0 ? <CalendarView matches={matches} /> : <BibleView />}
      </div>
      
      <nav style={styles.tabBar}>
        <button 
          style={{...styles.tab, ...(currentView === 0 ? styles.tabActive : {})}}
          onClick={() => setCurrentView(0)}
        >
          <Calendar1Icon size={20} strokeWidth={2.5} />
          <span>Calendar</span>
        </button>
        <button 
          style={{...styles.tab, ...(currentView === 1 ? styles.tabActive : {})}}
          onClick={() => setCurrentView(1)}
        >
         <BookOpen size={20} strokeWidth={2.5} />
          <span>Bible</span>
        </button>
      </nav>
    </div>
  );
};

const styles = {
    app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f0',
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
  },

}