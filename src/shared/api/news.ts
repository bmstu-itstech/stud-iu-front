import type { AxiosResponse } from 'axios';

import apiClient from './axios';
import { News, NewsPayload, PaginatedResponse, PatchedNews } from './types';

const BASE_URL = '/news';

interface ListParams {
  limit?: number;
  offset?: number;
};

export const getNews = (
  params?: ListParams
): Promise<AxiosResponse<PaginatedResponse<News>>> => {
  return apiClient.get(BASE_URL + '/', { params });
};

export const createNews = (
  data: NewsPayload
): Promise<AxiosResponse<News>> => {
  return apiClient.post(BASE_URL + '/', data);
};

export const getNewsById = (
  id: number
): Promise<AxiosResponse<News>> => {
  return apiClient.get(`${BASE_URL}/${id}/`);
};

export const updateNews = (
  id: number,
  data: NewsPayload
): Promise<AxiosResponse<News>> => {
  return apiClient.put(`${BASE_URL}/${id}/`, data);
};

export const partialUpdateNews = (
  id: number, 
  data: PatchedNews
): Promise<AxiosResponse<News>> => {
  return apiClient.patch(`${BASE_URL}/${id}/`, data);
};

export const deleteNews = (
  id: number
): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`${BASE_URL}/${id}/`);
};
