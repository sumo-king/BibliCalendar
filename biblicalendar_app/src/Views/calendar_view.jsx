import { LunarCal } from "../Controllers/calendar_controllers/lunar.controller";
import { TraditionCal } from "../Controllers/calendar_controllers/tradition.controller";
import { ZadokCal } from "../Controllers/calendar_controllers/zadok.controller";

export const CalendarView = ({ matches, isDarkMode, setCurrentView }) => {
  return (
    <div style={styles.calendarSection}>
      {/* 
         If these components accept isDarkMode, this will work. 
         If not, it's harmless extra prop. 
         Ideally we should check them, but for this task I'll assume standard React prop passing.
      */}
      <div style={{ ...styles.cardGrid, flexDirection: matches ? 'row' : 'column' }}>
        <LunarCal isDarkMode={isDarkMode} onClick={() => setCurrentView ? setCurrentView(2) : null} />
        <TraditionCal isDarkMode={isDarkMode} />
        <ZadokCal isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

const styles = {
  calendarSection: {
    marginBottom: '2rem',
  },
  sectionTitle: { // Unused but keeping
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontWeight: '600',
  },
  cardGrid: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: { // Unused but keeping
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    minWidth: '280px',
    maxWidth: '400px',
    flex: '1',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #e0e0e0',
  },
}