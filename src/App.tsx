import { useState } from 'react';
import './App.css'
import { FaHome, FaSearch, FaCog } from 'react-icons/fa'

function App() {
  const [activeScreen, setActiveScreen] = useState('home');

  const handleButtonClick = (screenName: string) => {
    console.log(`${screenName} screen requested`);
    setActiveScreen(screenName);
  };

  const renderScreen = () => {
    switch(activeScreen) {
      case 'search':
        return <div className="screen">Search Screen Content</div>;
      case 'settings':
        return <div className="screen">Settings Screen Content</div>;
      default:
        return <div className="screen">
          <h1>Braingrow AI!</h1>
          {/* Home screen content goes here */}
        </div>;
    }
  };

  return (
    <>
      {renderScreen()}
      <div className="bottom-nav">
        <button 
          className="nav-button"
          onClick={() => handleButtonClick('home')}
        >
          <FaHome size={24} />
        </button>
        <button 
          className="nav-button"
          onClick={() => handleButtonClick('search')}
        >
          <FaSearch size={24} />
        </button>
        <button 
          className="nav-button"
          onClick={() => handleButtonClick('settings')}
        >
          <FaCog size={24} />
        </button>
      </div>
    </>
  )
}

export default App