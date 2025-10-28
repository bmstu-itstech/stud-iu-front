import apiClient from './axios';
import { AxiosResponse } from 'axios';
import { FutureEvent, PastEvent, PaginatedResponse, FutureEventPayload, PastEventPayload, PatchedFutureEvent, PatchedPastEvent } from './types';

interface ListParams {
  limit?: number;
  offset?: number;
}

const BASE_URL = '/events/future_events';

export const getFutureEvents = (
  params?: ListParams
): Promise<AxiosResponse<PaginatedResponse<FutureEvent>>> => {
  return apiClient.get(BASE_URL + '/', { params });
};

export const createFutureEvent = (
  data: FutureEventPayload
): Promise<AxiosResponse<FutureEvent>> => {
  return apiClient.post(BASE_URL + '/', data);
};

export const getFutureEventById = (
  id: number
): Promise<AxiosResponse<FutureEvent>> => {
  return apiClient.get(`${BASE_URL}/${id}/`);
};

export const updateFutureEvent = (
  id: number, 
  data: FutureEventPayload
): Promise<AxiosResponse<FutureEvent>> => {
  return apiClient.put(`${BASE_URL}/${id}/`, data);
};

export const partialUpdateFutureEvent = (
  id: number, 
  data: PatchedFutureEvent
): Promise<AxiosResponse<FutureEvent>> => {
  return apiClient.patch(`${BASE_URL}/${id}/`, data);
};

export const deleteFutureEvent = (
  id: number
): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`${BASE_URL}/${id}/`);
};

const PAST_EVENTS_URL = '/events/past_events';

export const getPastEvents = (
  params?: ListParams
): Promise<AxiosResponse<PaginatedResponse<PastEvent>>> => {
  return apiClient.get(PAST_EVENTS_URL + '/', { params });
};

export const createPastEvent = (
  data: PastEventPayload
): Promise<AxiosResponse<PastEvent>> => {
  return apiClient.post(PAST_EVENTS_URL + '/', data);
};

export const getPastEventById = (
  id: number
): Promise<AxiosResponse<PastEvent>> => {
  return apiClient.get(`${PAST_EVENTS_URL}/${id}/`);
};

export const updatePastEvent = (
  id: number, 
  data: PastEventPayload
): Promise<AxiosResponse<PastEvent>> => {
  return apiClient.put(`${PAST_EVENTS_URL}/${id}/`, data);
};

export const partialUpdatePastEvent = (
  id: number, 
  data: PatchedPastEvent
): Promise<AxiosResponse<PastEvent>> => {
  return apiClient.patch(`${PAST_EVENTS_URL}/${id}/`, data);
};

export const deletePastEvent = (
  id: number
): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`${PAST_EVENTS_URL}/${id}/`);
};