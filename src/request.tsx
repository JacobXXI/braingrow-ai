import { video } from './structures/video';

const API_BASE = 'http://localhost:8080'; // Change this to your backend URL if needed

export const search = async (query: string): Promise<video[]> => {
  const response = await fetch(`${API_BASE}/api/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Search failed');
  return response.json();
};

export const getVideo = async (id: string): Promise<video> => {
  const response = await fetch(`${API_BASE}/api/videos/${encodeURIComponent(id)}`);
  if (!response.ok) throw new Error('Get video failed');
  return response.json();
};

// The following is a mock implementation for reference only:
/*
export const getVideo = async (id: string): Promise<video> => {
  // Mock implementation since API doesn't exist
  return {
    _id: id,
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
};
*/
