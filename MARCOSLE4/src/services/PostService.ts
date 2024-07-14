import axios from 'axios';

const API_URL = 'http://localhost:5046/api/post'; 

export interface Post {
  id: number;
  title: string;
  body: string;
  dateCreated: string;
  userName: string;
  firstName: string;
  lastName: string;
}

export const listPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.post(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};


export const getPostDetails = async (id: number): Promise<Post> => {
  try {
    const response = await axios.get(`${API_URL}/postdetails/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post details for id ${id}:`, error);
    throw new Error('Failed to fetch post details');
  }
};

