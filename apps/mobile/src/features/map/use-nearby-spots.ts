import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import type { NearbySpot } from './types';

// Appelle la RPC Postgres spots_near (PostGIS, respecte la RLS).
export function useNearbySpots(lat: number, lng: number, radiusM = 1_000_000) {
  const [spots, setSpots] = useState<NearbySpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error: rpcError } = await supabase.rpc('spots_near', {
        in_lat: lat,
        in_lng: lng,
        in_radius_m: radiusM,
      });
      if (!active) return;
      if (rpcError) setError(rpcError.message);
      else setSpots((data as NearbySpot[]) ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [lat, lng, radiusM]);

  return { spots, loading, error };
}
