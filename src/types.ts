export interface SpotifyArtist {
    id: string;
    name: string;
  }
  
  export interface SpotifyTrack {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: {
      images: {
        url: string;
      }[];
    };
  }
  
  export interface SpotifyCurrentlyPlaying {
    item: SpotifyTrack;
    is_playing: boolean;
  }