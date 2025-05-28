import { useState } from 'react';
import './App.css'
import { FaHome, FaSearch, FaCog } from 'react-icons/fa'
import { SearchPage } from './SearchPage'

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleButtonClick = (screenName: string) => {
    console.log(`${screenName} screen requested`);
    setActiveScreen(screenName);
  };

  const renderScreen = () => {
    switch(activeScreen) {
      case 'search':
        return <SearchPage 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />;
      case 'settings':
        return <div className="screen">Settings Screen Content</div>;
      default:
        return <div className="screen">
          <h1>Braingrow AI!</h1>
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