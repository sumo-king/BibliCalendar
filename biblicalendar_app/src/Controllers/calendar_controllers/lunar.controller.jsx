import { useEffect, useState } from "react";
import { Moon } from 'lunarphase-js';

export const LunarCal = ({ isDarkMode }) => {
  const [lunarDate, setLunarDate] = useState({
    phase: '',
    day: null,
    phaseEmoji: null,
    rawDay: null,
    month: null
  });

  const themeStyles = {
    card: {
      backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
      borderColor: isDarkMode ? '#444' : '#e0e0e0',
    },
    title: {
      color: '#fff', // Gradient header remains, text is white
    },
    body: {
      color: isDarkMode ? '#e0e0e0' : '#2c3e50',
    },
    displayBox: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa',
      color: isDarkMode ? '#e0e0e0' : '#495057',
    },
    label: {
      color: isDarkMode ? '#aaa' : '#6c757d',
    },
    value: {
      color: isDarkMode ? '#fff' : '#2c3e50',
    },
    row: {
      borderBottomColor: isDarkMode ? '#444' : '#e9ecef',
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const moonPhase = Moon.lunarPhase(currentDate);
    const moonDay = Moon.lunarAge();
    const phaseEmoji = Moon.emojiForLunarPhase(moonPhase);

    const calculateLunarMonth = (date) => {
      const year = date.getFullYear();
      const springEquinox = new Date(year, 2, 20);
      const equinoxDate = date < springEquinox
        ? new Date(year - 1, 2, 20)
        : springEquinox;

      const daysSinceEquinox = (date - equinoxDate) / (1000 * 60 * 60 * 24);
      const lunarCycleLength = 29.53;
      const lunarMonth = Math.floor(daysSinceEquinox / lunarCycleLength) + 1;

      return lunarMonth;
    };

    const lunarMonth = calculateLunarMonth(currentDate);

    setLunarDate({
      phase: moonPhase,
      day: Math.floor(moonDay),
      phaseEmoji: phaseEmoji,
      rawDay: moonDay,
      month: lunarMonth
    });
  }, []);

  const isSabbath = (day) => {
    if (day === 8 || day === 15 || day === 22 || day === 29) {
      return "Sabbath";
    }
    return day;
  };

  const weeklySabbathAlert = () => {
    const sabbathDays = [8, 15, 22, 29];
    const moonDay = Math.floor(Moon.lunarAge());
    const isTodaySabbath = sabbathDays.includes(moonDay);
    const isSabbathClose = sabbathDays.some(sabbathDay => Math.abs(sabbathDay - moonDay) <= 2 && sabbathDay > moonDay);

    if (isSabbathClose && !isTodaySabbath) {
      return ("Reminder: A Sabbath day is approaching soon in the lunar calendar.");
    } else
      if (isTodaySabbath) {
        return ("Reminder: Today is a Sabbath day according to the lunar calendar.");
      } else {
        return ("");
      }
  }


  return (
    <div style={{ ...styles.card, ...themeStyles.card }}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>Lunar Calendar</h3>
      </div>
      <div style={styles.cardBody}>
        <div style={{ ...styles.moonPhaseDisplay, ...themeStyles.displayBox }}>
          <div style={styles.moonEmoji}>{lunarDate.phaseEmoji}</div>
          <div style={{ ...styles.moonPhaseName, color: themeStyles.displayBox.color }}>{lunarDate.phase}</div>
        </div>


        <div style={{ ...styles.dataRow, ...themeStyles.row }}>
          {/* <span style={styles.dataLabel}>Alert</span> */}
          <span style={{ ...styles.dataValue, color: isDarkMode ? '#d4af37' : '#2c3e50' }}>{weeklySabbathAlert()}</span>
        </div>

        <div style={{ ...styles.dataRow, ...themeStyles.row }}>
          <span style={{ ...styles.dataLabel, ...themeStyles.label }}>Month</span>
          <span style={{ ...styles.dataValue, ...themeStyles.value }}>{lunarDate.month || '—'}</span>
        </div>

        <div style={{ ...styles.dataRow, ...themeStyles.row }}>
          <span style={{ ...styles.dataLabel, ...themeStyles.label }}>Day</span>
          <span style={{ ...styles.dataValue, ...themeStyles.value, ...(typeof isSabbath(lunarDate.day) === 'string' ? styles.sabbathHighlight : {}) }}>
            {isSabbath(lunarDate.day)}
          </span>
        </div>

        <div style={{ ...styles.dataRow, ...themeStyles.row }}>
          <span style={{ ...styles.dataLabel, ...themeStyles.label }}>Precise Day</span>
          <span style={{ ...styles.dataValueSmall, color: isDarkMode ? '#888' : '#495057' }}>{lunarDate.rawDay?.toFixed(1) || '—'}</span>
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
    backgroundColor: '#2c3e50',
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