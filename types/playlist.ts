export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface User {
  display_name: string;
  id: string;
}

export interface Track {
  name: string;
  artists: { name: string }[];
}

export interface PlaylistTrack {
  track: Track;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: Image[];
  owner: User;
  tracks: {
    total: number;
    items: PlaylistTrack[];
  };
}
