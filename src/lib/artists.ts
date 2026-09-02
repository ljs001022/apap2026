import manifestRaw from '../../public/assets/artists/manifest.json';
import { Artist, ArtistsManifest, Venue, WorkWithArtist } from '@/types/artist';

const manifest = manifestRaw as ArtistsManifest;

let hasWarned = false;

function validateManifestData(data: ArtistsManifest) {
  if (hasWarned || typeof window === 'undefined') return;
  hasWarned = true;

  data.venues.forEach((v) => {
    v.artists.forEach((a) => {
      if (!a.name_en || a.name_en.trim() === '' || a.slug === 'unknown') {
        console.warn(
          `[Artists Data Warning] Artist with slug "${a.slug}" (name_ko: "${a.name_ko}") has incomplete metadata (name_en: "${a.name_en}"). Displaying fallback.`
        );
      }
    });
  });
}

// Ensure warnings run once on client
if (typeof window !== 'undefined') {
  validateManifestData(manifest);
}

/**
 * Returns raw manifest
 */
export function getManifest(): ArtistsManifest {
  return manifest;
}

/**
 * Returns venues with artists having venue context attached
 */
export function getVenues(): Venue[] {
  return manifest.venues.map((venue) => ({
    ...venue,
    artists: venue.artists.map((artist) => ({
      ...artist,
      venue_ko: venue.venue_ko,
      venue_slug: venue.venue_slug,
    })),
  }));
}

/**
 * Returns all artists across all venues with attached venue info
 */
export function getAllArtists(): Artist[] {
  const venues = getVenues();
  return venues.flatMap((venue) => venue.artists);
}

/**
 * Returns all works paired with their artist and venue
 */
export function getAllWorksWithArtist(): WorkWithArtist[] {
  const artists = getAllArtists();
  const result: WorkWithArtist[] = [];

  artists.forEach((artist) => {
    artist.works.forEach((work) => {
      result.push({
        work,
        artist,
        venue_ko: artist.venue_ko,
        venue_slug: artist.venue_slug,
      });
    });
  });

  return result;
}

/**
 * Find artist by slug
 */
export function getArtistBySlug(slug: string): Artist | undefined {
  return getAllArtists().find((a) => a.slug === slug);
}

/**
 * Helper to get clean initials / monogram for artists without profile_image
 */
export function getArtistInitials(artist: Artist): string {
  if (artist.name_en && artist.name_en.trim()) {
    const parts = artist.name_en.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (artist.name_ko && artist.name_ko.trim()) {
    return artist.name_ko.trim().slice(0, 2);
  }
  return 'AP';
}
