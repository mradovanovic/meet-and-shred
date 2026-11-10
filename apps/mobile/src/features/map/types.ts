export type NearbySpot = {
  id: string;
  name: string;
  category: 'private' | 'public';
  lng: number;
  lat: number;
  distance_m: number;
  primary_discipline: string | null;
  is_free: boolean;
};

export type MapViewProps = {
  spots: NearbySpot[];
  center: { lat: number; lng: number };
  zoom?: number;
};
