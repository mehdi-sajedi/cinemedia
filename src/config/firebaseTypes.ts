export type Watchlist = WatchlistItem[];

export interface WatchlistItem {
  date: string;
  id: number;
  name: string;
  poster: string;
  rating: number;
  type: string;
  user: string;
}
