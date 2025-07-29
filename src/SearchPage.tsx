import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { search } from './request';
import { video } from './structures/video';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState<video[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const results = await search(query);
        setVideos(results);
      } catch (error) {
        console.error('Search failed:', error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-page">
      <h1 className="page-title">Search Result</h1>

      {loading ? (
        <div className="loading">Loading results...</div>
      ) : videos.length > 0 ? (
        <div className="results-container">
          {videos.map((video) => (
            <div 
              key={video._id} 
              className="video-item" 
              onClick={() => navigate(`/watch/${video._id}`)}
            >
              <img src={video.coverUrl} alt={video.title} className="thumbnail" />
              <div className="video-info">
                <h3 className="title">{video.title}</h3>
                <p className="author">{video.author}</p>
                <p className="stats">{video.views} views • {video.likes} likes</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">No results found for "{query}"</div>
      )}
    </div>
  );
};

export default SearchPage;