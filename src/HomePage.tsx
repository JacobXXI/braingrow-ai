import { useNavigate } from 'react-router-dom';
import reactIcon from './assets/react.svg';

export function HomePage() {
  const navigate = useNavigate();
  
  const exampleVideo = {
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
    coverUrl: reactIcon
  };

  const handleVideoClick = () => {
    navigate(`/watch/${exampleVideo._id}`, { state: { video: exampleVideo } });
  };

  return (
    <div className="screen">
      <h1>Braingrow AI!</h1>
      <div 
        className="video-item" 
        onClick={handleVideoClick} 
      >
        {/* Cover image on the left */}
        <div className="video-image-container">
          <img 
            src={exampleVideo.coverUrl} 
            alt={exampleVideo.title} 
            className="video-cover-image"
            onError={(e) => { (e.target as HTMLImageElement).src = '/vite.svg'; }} 
          />
        </div>
        {/* Text content on the right */}
        <div className="video-details">
          <h3 className="video-title">{exampleVideo.title}</h3>
          <p className="video-description">{exampleVideo.description}</p>
          <div className="video-metadata">
            <span className="video-author">👤 {exampleVideo.author}</span>
            <span className="video-views">👁️ {exampleVideo.views}</span>
            <span className="video-date">{formatRelativeDate(exampleVideo.date)}</span>
          </div>
        </div>
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
