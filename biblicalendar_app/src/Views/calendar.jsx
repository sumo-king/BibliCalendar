import { LunarCal } from "../calendar_controllers/lunar.controller";
import { TraditionCal } from "../calendar_controllers/tradition.controller";
import { ZadokCal } from "../calendar_controllers/zadok.controller";

export const CalendarView = ({ matches }) => {
  return (
    <div style={styles.calendarSection}>
      <h2 style={styles.sectionTitle}>Calendar Events This Week</h2>
      <div style={{...styles.cardGrid, flexDirection: matches ? 'row' : 'column'}}>
        <LunarCal />
        <TraditionCal />
        <ZadokCal />
      </div>
    </div>
  );
};

const styles = {
    calendarSection: {
    marginBottom: '2rem',
  },
  sectionTitle: {
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
  card: {
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