import { useEffect, useState } from "react";
import { HDate} from '@hebcal/core';


export const TraditionCal = () => {

      const [tradDate, setTradDate] = useState({day: '', month: ''});

    useEffect(()=>{
        const hd = new HDate();
        setTradDate({day: hd.getDate(), month: hd.getMonth()});
  
      },[]);
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>Traditional Calendar</h3>
      </div>
      <div style={styles.cardBody}>
        <table>
            <thead>
              <tr>
                <th>Month</th>
                <td>{tradDate.month}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
              <th>Day</th>
                <td>{tradDate.day}</td>
              </tr>
            </tbody>
          </table>
        {/* <div style={styles.comingSoon}>
          <span style={styles.comingSoonIcon}>🕍</span>
          <p style={styles.comingSoonText}>Traditional Jewish calendar details coming soon</p>
        </div> */}
      </div>
    </div>
  );
};

const styles = {
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
  cardHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1.25rem',
    borderBottom: '2px solid #d4af37',
  },
  cardTitle: {
    margin: 0,
    color: '#fff',
    fontSize: '1.25rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  cardBody: {
    padding: '1.5rem',
  }
}
