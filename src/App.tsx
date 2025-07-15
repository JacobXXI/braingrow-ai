import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import { FaCog, FaSearch } from 'react-icons/fa'
import { SearchPage } from './SearchPage'
import { HomePage } from './HomePage';
import WatchPage from './WatchPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/search', { state: { searchQuery } });
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <div className="logo">Braingrow AI</div>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            className="search-button"
            onClick={handleSearch}
          >
            <FaSearch size={20} />
          </button>
        </div>
        <div className="header-auth">
          <button className="button neutral small" title="Settings">
            <FaCog size={20} />
          </button>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage searchQuery={searchQuery} onSearchChange={setSearchQuery} />} />
        <Route path="/watch/:id" element={<WatchPage />} />
      </Routes>
    </div>
  );
}

export default App