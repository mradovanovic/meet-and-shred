import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import { disciplineColor } from './discipline-color';
import type { MapViewProps } from './types';

mapboxgl.accessToken = process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? '';

// Carte web (Mapbox GL JS). La version native vit dans map-view.tsx.
export function MapView({ spots, center, zoom = 5, onSelectSpot }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [center.lng, center.lat],
      zoom,
    });
    const map = mapRef.current;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // init une seule fois ; le centre initial suffit pour le MVP
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    for (const s of spots) {
      const color = disciplineColor(s.primary_discipline);
      const el = document.createElement('div');
      // pin : couleur = catégorie ; creux = spot libre (public), plein = géré (private)
      el.style.cssText = `width:18px;height:18px;border-radius:50%;border:2px solid ${color};background:${
        s.category === 'public' ? 'transparent' : color
      };box-shadow:0 0 0 2px rgba(0,0,0,.45);cursor:pointer`;
      el.addEventListener('click', (ev) => {
        ev.stopPropagation();
        onSelectSpot?.(s.id);
      });
      const marker = new mapboxgl.Marker({ element: el }).setLngLat([s.lng, s.lat]).addTo(map);
      markersRef.current.push(marker);
    }
  }, [spots]);

  return <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />;
}
