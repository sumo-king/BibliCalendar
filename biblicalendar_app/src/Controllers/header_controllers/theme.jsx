import { Moon, Sun } from "lucide-react"

export const ThemeToggle = ({ isDarkMode, setIsDarkMode, matches }) => {
    return(
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              ...styles.themeToggle,
              display: matches ? 'flex' : 'none',
              backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
              color: isDarkMode ? '#d4af37' : '#2c3e50'
            }}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
    )
}

const styles = {

  themeToggle: {
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    marginLeft: '1rem',
  },
}