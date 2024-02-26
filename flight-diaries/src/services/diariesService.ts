import axios from 'axios';
import { Diary, NewDiary } from '../types';

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
  const response = await axios
    .get<Diary[]>(baseUrl);
  return response.data;
}

export const createDiary = async (object: NewDiary) => {
  try {
    const response = await axios.post<Diary>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log(error.response?.data)
      return { 
        status: error.response?.status || 500, 
        response: error.response?.statusText || "internal server error", 
        data: error.response?.data || "" }
    } else {
      console.error(error);
      throw error;
    }
  }
}