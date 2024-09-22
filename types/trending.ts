export interface Artist {
  id: string;
  name: string;
  followers: { href: string | null; total: number };
  images: { url: string }[];
}

export interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: { url: string }[];
  album_type: string;
  release_date: string;
}

export interface TrendingData {
  trending_artists: Artist[];
  trending_albums: Album[];
}
