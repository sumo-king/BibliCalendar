import { Menu, X } from "lucide-react"
import { HebDay } from "../calendar_controllers/timedate.controller";

export const CurrentDate = ({matches, isDarkMode, mobileMenuOpen, toggleMobileMenu}) =>{

    return(

          <div style={styles.controls}>
            {matches && (
              <div style={{
                ...styles.hebday,
                backgroundColor: isDarkMode ? '#2c2c2c' : '#fff',
                color: isDarkMode ? '#e0e0e0' : '#2c3e50'
              }}>
                <HebDay />
              </div>
            )}

            <button
              style={{...styles.menuButton, display: matches ? 'none' : 'flex'}}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen
                ? <X style={{ width: '24px', height: '24px', color: '#fff' }} strokeWidth={2} />
                : <Menu style={{ width: '24px', height: '24px', color: '#fff' }} strokeWidth={2} />
              }
            </button>
          </div>
    )
}

const styles = {
  hebday: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  },

  menuButton: {
    background: 'none',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
  },

}