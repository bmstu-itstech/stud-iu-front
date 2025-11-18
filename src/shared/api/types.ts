export type PrecisionEnum = 'year' | 'month' | 'day' | 'time';

export interface EventImage {
  id: number;
  image: string | null;
  past_event?: number | null;
  future_event?: number | null;
}

export interface BoardMember {
  id: number;
  name: string;
  telegram_link: string;
  position: string;
  start_date: string;
  description?: string | null;
  image?: string | null;
}

export type BoardMemberPayload = Omit<BoardMember, 'id'>;
export type PatchedBoardMember = Partial<BoardMemberPayload>;

export interface FutureEvent {
  id: number;
  date_range: string;
  images: EventImage[];
  name: string;
  description: string;
  precision: PrecisionEnum;
  start_datetime: string;
  end_datetime?: string | null;
  registration_link?: string | null;
  color: string;
}

export type FutureEventPayload = Omit<FutureEvent, 'id' | 'date_range' | 'images'> & {
  uploaded_images?: string[];
};
export type PatchedFutureEvent = Partial<FutureEventPayload>;

export interface PastEvent {
  id: number;
  date_range: string;
  images: EventImage[];
  name: string;
  description: string;
  precision: PrecisionEnum;
  start_datetime: string;
  end_datetime?: string | null;
  album_link?: string | null;
}

export type PastEventPayload = Omit<
  PastEvent,
  'id' | 'date_range' | 'images'
> & {
  uploaded_images?: string[];
};
export type PatchedPastEvent = Partial<PastEventPayload>;

export interface Partner {
  id: number;
  name: string;
  url: string;
  image: string;
}

export type PartnerPayload = Omit<Partner, 'id'>;
export type PatchedPartner = Partial<PartnerPayload>;

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface News {
  id: number;
  title: string;
  description: string;
  cover_url: string;
  created_at: string;
}

export type NewsPayload = Omit<News, 'id' | 'created_at'>;

export type PatchedNews = Partial<NewsPayload>;
