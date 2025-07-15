import { video } from './structures/video';

export const search = async (query: string): Promise<video> => {
  const response = await fetch(`/api/search?query=${query}`);
  return response.json();
};

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