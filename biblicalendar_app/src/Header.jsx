export const Header = ()=>{

    const headerStyles = {
      border: 'solid black 1px',
      minHeight: '10vh',
      justifyItems: 'center'
    }
  
    const listStyles = {
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'row',
      gap: '5rem',
      borderRight: ''
    }
    
    return(
      <header style={headerStyles}>
          <h1>BibliCalendar</h1>
          <ul style={listStyles}>
            <li style={{padding: '5px', borderRight: 'solid 1px black',borderLeft: '1px solid black'}}>Lunar</li>
            <li style={{padding: '5px', borderRight: 'solid 1px black',borderLeft: '1px solid black'}}>Traditional</li>
            <li style={{padding: '5px', borderRight: 'solid 1px black',borderLeft: '1px solid black'}}>Zadok</li>
          </ul>
        </header>
    )
  }