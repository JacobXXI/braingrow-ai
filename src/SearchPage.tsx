import { useState, useEffect } from 'react';
import { search } from './request';
import { video } from './structures/video';
import { FaSearch } from 'react-icons/fa';

interface SearchPageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchPage({ searchQuery, onSearchChange }: SearchPageProps) {
  const [videos, setVideos] = useState<video[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      search(searchQuery)
        .then((result) => {
          setVideos([result]); // Assuming search returns a single video
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Search error:', error);
          setIsLoading(false);
        });
    }
  }, [searchQuery]);

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <button className="search-button">
          <FaSearch size={20} />
        </button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="search-results">
          {videos.map((video) => (
            <div key={video._id} className="video-item">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}