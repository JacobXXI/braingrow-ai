import { useNavigate } from 'react-router-dom';

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
    coverUrl: 'https://example.com/cover.jpg'
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
        style={{ cursor: 'pointer', margin: '20px 0', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
      >
        <h3>{exampleVideo.title}</h3>
        <p>{exampleVideo.description}</p>
        <div style={{ display: 'flex', gap: '15px', color: '#666', marginTop: '10px' }}>
          <span>👤 {exampleVideo.author}</span>
          <span>👁️ {exampleVideo.views}</span>
          <span>📅 {exampleVideo.date.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}