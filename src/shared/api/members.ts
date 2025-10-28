import apiClient from './axios';
import { AxiosResponse } from 'axios';
import { BoardMember, BoardMemberPayload, PaginatedResponse, PatchedBoardMember } from './types';

const BASE_URL = '/board_members';

interface ListParams {
  limit?: number;
  offset?: number;
}

export const getBoardMembers = (
  params?: ListParams,
): Promise<AxiosResponse<PaginatedResponse<BoardMember>>> => {
  return apiClient.get(BASE_URL + '/', { params });
};

export const createBoardMember = (
  data: BoardMemberPayload,
): Promise<AxiosResponse<BoardMember>> => {
  return apiClient.post(BASE_URL + '/', data);
};

export const getBoardMemberById = (
  id: number,
): Promise<AxiosResponse<BoardMember>> => {
  return apiClient.get(`${BASE_URL}/${id}/`);
};

export const updateBoardMember = (
  id: number,
  data: BoardMemberPayload,
): Promise<AxiosResponse<BoardMember>> => {
  return apiClient.put(`${BASE_URL}/${id}/`, data);
};

export const partialUpdateBoardMember = (
  id: number, 
  data: PatchedBoardMember,
): Promise<AxiosResponse<BoardMember>> => {
  return apiClient.patch(`${BASE_URL}/${id}/`, data);
};

export const deleteBoardMember = (id: number): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`${BASE_URL}/${id}/`);
};
