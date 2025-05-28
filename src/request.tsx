import { video } from './structures/video'

export const search = async (query: string): Promise<video> => {
  const response = await fetch(`/api/search?query=${query}`);
  return response.json();
}