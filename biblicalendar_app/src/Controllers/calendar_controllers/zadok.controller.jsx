export const ZadokCal = ({ isDarkMode }) => {
  const themeStyles = {
    card: {
      backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
      borderColor: isDarkMode ? '#444' : '#e0e0e0',
    },
    text: {
      color: isDarkMode ? '#aaa' : '#6c757d',
    }
  };

  return (
    <div style={{ ...styles.card, ...themeStyles.card }}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>Zadok Calendar</h3>
      </div>
      <div style={styles.cardBody}>
        <div style={styles.comingSoon}>
          <span style={styles.comingSoonIcon}>📜</span>
          <p style={{ ...styles.comingSoonText, ...themeStyles.text }}>Zadok/Jubilees calendar details coming soon</p>
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
  }
}