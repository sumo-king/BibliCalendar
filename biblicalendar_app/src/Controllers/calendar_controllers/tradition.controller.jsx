import { useEffect, useState } from "react";
import { HDate } from '@hebcal/core';

export const TraditionCal = () => {
  const [tradDate, setTradDate] = useState({
    day: '',
    month: '',
    monthName: '',
    year: '',
    hebrewDate: '',
    dayOfWeek: '',
    isShabbat: false,
    parsha: ''
  });

  useEffect(() => {
    const hd = new HDate();

    console.log("Error CHECKING",hd.getMonthName() )
    
    setTradDate({
      day: hd.getDate(),
      month: hd.getMonth(),
      monthName: hd.getMonthName(), // Hebrew month name
      year: hd.getFullYear(),
      hebrewDate: hd.toString(), // Full Hebrew date string
      dayOfWeek: hd.greg().toLocaleDateString('en-US', { weekday: 'long' }),
      isShabbat: hd.getDay() === 6, // Saturday is day 6
      parsha: '' // Could be enhanced with Sedra class for Torah portion
    });
  }, []);

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>Traditional Calendar</h3>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.hebrewDateDisplay}>
          <div style={styles.hebrewDateText}>{tradDate.hebrewDate}</div>
          <div style={styles.dayOfWeekText}>{tradDate.dayOfWeek}</div>
          {tradDate.isShabbat && (
            <div style={styles.shabbatBadge}>🕯️ Shabbat</div>
          )}
        </div>

        <div style={styles.dataRow}>
          <span style={styles.dataLabel}>Hebrew Year</span>
          <span style={styles.dataValue}>{tradDate.year}</span>
        </div>

        <div style={styles.dataRow}>
          <span style={styles.dataLabel}>Month</span>
          <span style={styles.dataValue}>{tradDate.monthName} ({tradDate.month})</span>
        </div>

        <div style={styles.dataRow}>
          <span style={styles.dataLabel}>Day</span>
          <span style={styles.dataValue}>{tradDate.day}</span>
        </div>
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
  },
  hebrewDateDisplay: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    padding: '1.25rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '2px solid #667eea',
  },
  hebrewDateText: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: '0.5rem',
    fontFamily: 'Georgia, serif',
  },
  dayOfWeekText: {
    fontSize: '0.95rem',
    color: '#6c757d',
    marginBottom: '0.5rem',
  },
  shabbatBadge: {
    display: 'inline-block',
    marginTop: '0.5rem',
    padding: '0.4rem 0.9rem',
    backgroundColor: '#d4af37',
    color: '#fff',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '600',
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
};