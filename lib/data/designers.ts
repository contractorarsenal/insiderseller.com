import { Designer } from '@/lib/types';

export const designers: Designer[] = [
  {
    name: 'Chrome Hearts',
    slug: 'chrome-hearts',
    location: 'LOS ANGELES / EST. 1988',
    description:
      'Sterling silver, leather and the cemetery cross. Handmade hardware that never left the shop the same way twice.',
  },
  {
    name: 'Rick Owens',
    slug: 'rick-owens',
    location: 'PARIS / EST. 1994',
    description:
      'Architectural silhouettes, raw hems and a palette that rarely leaves black, dust and bone.',
  },
  {
    name: 'Acne Studios',
    slug: 'acne-studios',
    location: 'STOCKHOLM / EST. 1996',
    description:
      'Scandinavian restraint applied to denim, mohair and the occasional face patch.',
  },
  {
    name: 'ERD',
    slug: 'erd',
    location: 'LOS ANGELES / EST. 2018',
    description:
      'Enfants Riches Déprimés. Distressed knitwear and screen prints built for a small, specific audience.',
  },
  {
    name: 'Maison Margiela',
    slug: 'maison-margiela',
    location: 'PARIS / EST. 1988',
    description:
      'Deconstruction as doctrine. Blank labels, exposed seams, the Tabi.',
  },
  {
    name: 'Saint Laurent',
    slug: 'saint-laurent',
    location: 'PARIS / EST. 1961',
    description:
      'Rock and roll tailoring. Skinny cuts, hardware boots and a house that never softened.',
  },
  {
    name: 'Kapital',
    slug: 'kapital',
    location: 'OKAYAMA / EST. 1985',
    description:
      'Japanese workwear taken apart and rebuilt with boro patchwork and indigo.',
  },
  {
    name: 'Alyx',
    slug: 'alyx',
    location: 'NEW YORK / EST. 2015',
    description:
      'The rollercoaster buckle and technical fabrication built for people who read the tag.',
  },
  {
    name: 'Balenciaga',
    slug: 'balenciaga',
    location: 'PARIS / EST. 1917',
    description:
      'Oversized proportions and a house that turned irony into a silhouette.',
  },
  {
    name: 'Stüssy',
    slug: 'stussy',
    location: 'IRVINE / EST. 1980',
    description:
      'Surf, skate and the signature scrawl that started streetwear as we know it.',
  },
  {
    name: 'Supreme',
    slug: 'supreme',
    location: 'NEW YORK / EST. 1994',
    description:
      'The box logo. Weekly drops that built a resale economy before resale had a name.',
  },
  {
    name: 'Gallery Dept.',
    slug: 'gallery-dept',
    location: 'LOS ANGELES / EST. 2016',
    description:
      'Hand-painted flags and reworked vintage. Every piece finished by hand, not a machine.',
  },
  {
    name: 'Denim Tears',
    slug: 'denim-tears',
    location: 'NEW YORK / EST. 2019',
    description:
      'Cotton wreath denim and garments that carry American history on the surface.',
  },
];

export function getDesignerBySlug(slug: string): Designer | undefined {
  return designers.find((d) => d.slug === slug);
}
