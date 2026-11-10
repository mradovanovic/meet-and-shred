// Couleur d'un repère = catégorie de la discipline principale (tokens cat-*).
const CATEGORY_COLOR: Record<string, string> = {
  moto: '#FF7A45',
  velo: '#8BD43A',
  eau: '#2FB8FF',
  snow: '#9FB4FF',
  urban: '#E36AF5',
};

const SLUG_CATEGORY: Record<string, keyof typeof CATEGORY_COLOR> = {
  mx: 'moto',
  enduro_moto: 'moto',
  supermoto: 'moto',
  piste: 'moto',
  dh: 'velo',
  enduro_vtt: 'velo',
  dirt: 'velo',
  kite: 'eau',
  wake: 'eau',
  ski: 'snow',
  snow: 'snow',
  skate: 'urban',
};

export function disciplineColor(slug: string | null): string {
  if (!slug) return '#6E7B82';
  const cat = SLUG_CATEGORY[slug];
  return (cat && CATEGORY_COLOR[cat]) || '#6E7B82';
}
