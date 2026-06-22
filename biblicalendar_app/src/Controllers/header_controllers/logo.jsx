export const Logo = () => {

    return(
        <div style={styles.logoContainer}>
            <h1 style={styles.logoText}>BibliCalendar</h1>
          </div>
    )
}

const styles = {
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
  }
}