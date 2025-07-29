import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { video } from './structures/video';
import { getVideo } from './request';
import './WatchPage.css';

export default function WatchPage() {
  const location = useLocation();
  const { id } = useParams();
  const [video, setVideo] = useState<video | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.video) {
      setVideo(location.state.video);
    } else if (id) {
      setIsLoading(true);
      getVideo(id)
        .then((videoData: video) => setVideo(videoData))
        .catch((error: unknown) => console.error('Error fetching video:', error))
        .finally(() => setIsLoading(false));
    }
  }, [id, location.state]);

  if (isLoading) return <div>Loading...</div>;
  if (!video) return <div>Video not found</div>;

  return (
    <div className="watch-container">
      <div className="video-player-container">
        <div className="video-player">
          <video controls src={video.url} poster={video.coverUrl} />
        </div>
        <div className="video-actions">
          <button className="action-button like-button">
            <span>👍 {video.likes.toString()}</span>
          </button>
          <button className="action-button dislike-button">
            <span>👎 {video.dislikes.toString()}</span>
          </button>
        </div>
      </div>
      
      <div className="video-info">
        <h1 className="video-title">{video.title}</h1>
        
        <div className="video-meta">
          <div className="video-stats">
            <span className="views">👁️ {video.views.toString()} views</span>
            <span className="upload-date">📅 {video.date.toLocaleDateString()}</span>
          </div>
          
          <div className="video-author">
            <span className="author">👤 {video.author}</span>
            <span className="category">🏷️ {video.category}</span>
          </div>
        </div>
        
        <div className="video-description">
          <h3>Description</h3>
          <p>{video.description}</p>
        </div>
        
        <div className="video-comments">
          <h3>Comments</h3>
          <div className="comment-input">
            <textarea placeholder="Add a comment..." />
            <button className="comment-submit">Post</button>
          </div>
          <div className="comments-list">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        </div>
      </div>
    </div>
  );
}