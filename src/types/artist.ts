export interface Work {
  title: string;
  year: string;
  material: string;
  size: string;
  description: string;
  images: string[];
}

export interface Artist {
  slug: string;
  name_ko: string;
  name_en: string;
  birth_year: string;
  nationality: string;
  bio: string;
  intro: string;
  profile_image: string | null;
  works: Work[];
  venue_ko?: string;
  venue_slug?: string;
}

export interface Venue {
  venue_ko: string;
  venue_slug: string;
  artists: Artist[];
}

export interface ArtistsManifest {
  venues: Venue[];
}

// Generic interface to support both Venues in Site A and Editions in Site B
export interface GenericCategory<T> {
  id: string;
  label: string;
  items: T[];
}

export interface WorkWithArtist {
  work: Work;
  artist: Artist;
  venue_ko?: string;
  venue_slug?: string;
}
