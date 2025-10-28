import apiClient from './axios';
import { AxiosResponse } from 'axios';
import { Partner, PartnerPayload, PaginatedResponse, PatchedPartner } from './types';

const BASE_URL = '/partners';

interface ListParams {
  limit?: number;
  offset?: number;
}

export const getPartners = (
  params?: ListParams,
): Promise<AxiosResponse<PaginatedResponse<Partner>>> => {
  return apiClient.get(BASE_URL + '/', { params });
};

export const createPartner = (
  data: PartnerPayload
): Promise<AxiosResponse<Partner>> => {
  return apiClient.post(BASE_URL + '/', data);
};

export const getPartnerById = (
  id: number
): Promise<AxiosResponse<Partner>> => {
  return apiClient.get(`${BASE_URL}/${id}/`);
};

export const updatePartner = (
  id: number, 
  data: PartnerPayload
): Promise<AxiosResponse<Partner>> => {
  return apiClient.put(`${BASE_URL}/${id}/`, data);
};

export const partialUpdatePartner = (
  id: number, 
  data: PatchedPartner,
): Promise<AxiosResponse<Partner>> => {
  return apiClient.patch(`${BASE_URL}/${id}/`, data);
};

export const deletePartner = (id: number): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`${BASE_URL}/${id}/`);
};
