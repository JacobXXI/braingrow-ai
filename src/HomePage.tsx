// Add this import at the top of the file
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRecommandVideo } from './request';
import { video } from './structures/video';

export function HomePage() {
  const [videos, setVideos] = useState<Array<video>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        const recommendedVideos = await getRecommandVideo(3);
        setVideos(recommendedVideos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedVideos();
  }, []);

    const handleVideoClick = (video: video) => {
    // 问题在于未使用从 react-router-dom 导入的 useNavigate hook，下面添加对 navigate 的初始化
    navigate(`/watch/${video._id}`, { state: { video } });
  };

  if (loading) return <div className="loading">Loading recommended videos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="screen">
      <h1>Braingrow AI!</h1>
      <div className="video-grid">
        {videos.map(video => (
          <div 
            key={video._id}
            className="video-item"
            onClick={() => handleVideoClick(video)}
          >
            {/* Video content using dynamic video data */}
            <div className="video-image-container">
              <img 
                src={video.coverUrl}
                alt={video.title}
                className="video-cover-image"
                onError={(e) => { (e.target as HTMLImageElement).src = '/vite.svg'; }}
              />
            </div>
            <div className="video-details">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">{video.description}</p>
              <div className="video-metadata">
                {video.author && <span className="video-author">👤 {video.author}</span>}
                {video.views != null && <span className="video-views">👁️ {video.views}</span>}
                <span className="video-date">{formatRelativeDate(new Date(video.date))}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 12) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }
}
