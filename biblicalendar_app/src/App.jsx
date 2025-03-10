import './App.css';
import { Body } from './Body';
import { Header } from './Header';

function App() {

  return (
    <div style={homePageStyles}>
      <Header/>
      <Body/>
    </div>
  );
}

const homePageStyles = {
  minHeight: '100vh',
}

export default App;