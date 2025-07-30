import Cookies from 'js-cookie';
import { video } from './structures/video';

const API_BASE = 'http://localhost:8080';

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
  const response = await fetch(`${API_BASE}/api/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Search failed');
  const rawData = await response.json();
  // Convert raw API response to required video format
  return rawData.map((item: any) => ({
    _id: item.id,
    title: item.title,
    description: item.description,
    author: item.creator,
    date: new Date(item.publishedAt),
    category: item.category,
    views: item.viewCount,
    likes: item.likeCount,
    dislikes: item.dislikeCount,
    url: item.videoUrl,
    coverUrl: item.imageUrl
  }));
};

export const getVideo = async (id: string): Promise<video> => {
  const response = await fetch(`${API_BASE}/api/videos/${encodeURIComponent(id)}`);
  if (!response.ok) throw new Error('Get video failed');
  const rawData = await response.json();
  // Convert raw API response to required video format
  return {
    _id: rawData.id,
    title: rawData.title,
    description: rawData.description,
    author: rawData.creator,
    date: new Date(rawData.publishedAt),
    category: rawData.category,
    views: rawData.viewCount,
    likes: rawData.likeCount,
    dislikes: rawData.dislikeCount,
    url: rawData.videoUrl,
    coverUrl: rawData.coverUrl
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