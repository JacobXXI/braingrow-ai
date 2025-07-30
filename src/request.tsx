import Cookies from 'js-cookie';
import { video } from './structures/video';

const apiEndpoint = "https://localhost:3000/api";

export const login = async (email: string, password: string): Promise<{ success: boolean; token?: string }> => {
  try {
    // Send API request to login endpoint
    const response = await fetch('https://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Check if response is successful and contains token
    if (response.ok && data.token) {
      Cookies.set('authToken', data.token, { expires: 7, secure: true, sameSite: 'strict' });
      return { success: true, token: data.token };
    } else {
      // Return failure if response not ok or no token
      return { success: false };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false };
  }
};

export const logout = (): void => {
  Cookies.remove('authToken');
};

export const isAuthenticated = (): boolean => {
  return !!Cookies.get('authToken');
};

export const search = async (query: string): Promise<video[]> => {
  // Mock implementation returning array of videos
  return [{
    _id: 'search-1',
    title: `Search result for: ${query}`,
    description: 'This is a search result video',
    author: 'Braingrow Team',
    date: new Date(),
    category: 'Search Results',
    views: 450,
    likes: 30,
    dislikes: 2,
    url: 'https://example.com/search-video.mp4',
    coverUrl: 'https://example.com/search-cover.jpg'
  }];
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

export const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; token?: string }> => {
  try {
    const response = await fetch('https://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      Cookies.set('authToken', data.token, { expires: 7, secure: true, sameSite: 'strict' });
      return { success: true, token: data.token };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false };
  }
};

export const likeVideo = async (videoId: string): Promise<{ success: boolean; likes?: number }> => {
  try {
    const token = Cookies.get('authToken');
    if (!token) return { success: false };

    const response = await fetch(`https://localhost:3000/api/videos/${videoId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return { success: response.ok, likes: data.likes };
  } catch (error) {
    console.error('Like error:', error);
    return { success: false };
  }
};

export const dislikeVideo = async (videoId: string): Promise<{ success: boolean; dislikes?: number }> => {
  try {
    const token = Cookies.get('authToken');
    if (!token) return { success: false };

    const response = await fetch(`https://localhost:3000/api/videos/${videoId}/dislike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return { success: response.ok, dislikes: data.dislikes };
  } catch (error) {
    console.error('Dislike error:', error);
    return { success: false };
  }
};

export const addComment = async (videoId: string, text: string): Promise<{ success: boolean; comment?: any }> => {
  try {
    const token = Cookies.get('authToken');
    if (!token) return { success: false };

    const response = await fetch(`https://localhost:3000/api/videos/${videoId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    return { success: response.ok, comment: data.comment };
  } catch (error) {
    console.error('Add comment error:', error);
    return { success: false };
  }
};