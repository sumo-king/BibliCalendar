import { useEffect, useState } from "react";
import { HDate} from '@hebcal/core';


export const TraditionCal = () => {

      const [tradDate, setTradDate] = useState({day: '', month: ''});

    useEffect(()=>{
        const hd = new HDate();
        setTradDate({day: hd.getDate(), month: hd.getMonth()});
  
      },[]);

    //    const isSabbath = (day) => {
    // if (day === 8 || day === 15 || day === 22 || day === 29) {
    //   return "Sabbath";
    // }
    // return day;
    //     };

  const weeklySabbathAlert = ()=>{
      // const sabbathDays = [8, 15, 22, 29];
      // const moonDay = tradDate.day;
      // const isTodaySabbath = sabbathDays.includes(moonDay);
      // const isSabbathClose = sabbathDays.some(sabbathDay => Math.abs(sabbathDay - moonDay) <=2 && sabbathDay > moonDay);
  
      // if(isSabbathClose && !isTodaySabbath){
      //   return("Reminder: A Sabbath day is approaching soon in the lunar calendar.");
      // } else
      // if(isTodaySabbath){
      //   return("Reminder: Today is a Sabbath day according to the lunar calendar.");
      // } else{
      //   return("");
      // }
    }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>Lunar Calendar</h3>
      </div>
      <div style={styles.cardBody}>
        
        
        <div style={styles.dataRow}>
          {/* <span style={styles.dataLabel}>Alert</span> */}
          <span style={styles.dataValue}>{weeklySabbathAlert()}</span>
        </div>

        <div style={styles.dataRow}>
          <span style={styles.dataLabel}>Month</span>
          <span style={styles.dataValue}>{tradDate.month}</span>
        </div>

        <div style={styles.dataRow}>
          <span style={styles.dataLabel}>Day</span>
          <span style={{...styles.dataValue/*, ...(typeof isSabbath(lunarDate.day) === 'string' ? styles.sabbathHighlight : {})*/}}>
            {tradDate.day}
          </span>
        </div>
        
      </div>
    </div>
    // <div style={styles.card}>
    //   <div style={styles.cardHeader}>
    //     <h3 style={styles.cardTitle}>Traditional Calendar</h3>
    //   </div>
    //   <div style={styles.cardBody}>
    //     <table>
    //         <thead>
    //           <tr>
    //             <th>Month</th>
    //             <td>{tradDate.month}</td>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //           <th>Day</th>
    //             <td>{tradDate.day}</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     {/* <div style={styles.comingSoon}>
    //       <span style={styles.comingSoonIcon}>🕍</span>
    //       <p style={styles.comingSoonText}>Traditional Jewish calendar details coming soon</p>
    //     </div> */}
    //   </div>
    // </div>
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
  },
  moonPhaseDisplay: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  moonEmoji: {
    fontSize: '4rem',
    marginBottom: '0.5rem',
  },
  moonPhaseName: {
    fontSize: '1.1rem',
    color: '#495057',
    fontWeight: '500',
  },
  dataRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 0',
    borderBottom: '1px solid #e9ecef',
  },
  dataLabel: {
    fontSize: '0.95rem',
    color: '#6c757d',
    fontWeight: '500',
  },
  dataValue: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    fontWeight: '600',
  },
  dataValueSmall: {
    fontSize: '1rem',
    color: '#495057',
    fontWeight: '500',
  },
  sabbathHighlight: {
    color: '#d4af37',
    fontWeight: '700',
  },
  comingSoon: {
    textAlign: 'center',
    padding: '2rem 1rem',
  },
  comingSoonIcon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '1rem',
  },
  comingSoonText: {
    color: '#6c757d',
    fontSize: '0.95rem',
    margin: 0,
  },
}
