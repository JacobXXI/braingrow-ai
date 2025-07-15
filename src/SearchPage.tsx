import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { search } from './request';
import { video } from './structures/video';
import { FaSearch } from 'react-icons/fa';

interface SearchPageProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const exampleVideo: video = {
  _id: 'example123',
  title: 'Example Video Tutorial',
  description: 'This is an example video demonstrating our platform features',
  author: 'Braingrow Team',
  date: new Date(),
  category: 'Tutorial',
  views: 1000,
  likes: 150,
  dislikes: 5,
  url: 'https://example.com/video.mp4',
  coverUrl: 'https://example.com/cover.jpg'
};

export function SearchPage({ searchQuery, onSearchChange }: SearchPageProps) {
  const [videos, setVideos] = useState<video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      search(searchQuery)
        .then((result) => {
          // Include example video along with search results
          setVideos([exampleVideo, result]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Search error:', error);
          setIsLoading(false);
        });
    } else {
      // Show just the example video when no search query is entered
      setVideos([exampleVideo]);
    }
  }, [searchQuery]);

  const handleVideoClick = (video: video) => {
    navigate(`/watch/${video._id}`, { state: { video } });
  };

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
            <div 
              key={video._id} 
              className="video-item"
              onClick={() => handleVideoClick(video)}
            >
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}