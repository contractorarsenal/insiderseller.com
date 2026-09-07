import { Category, ConditionGrade, Measurement, Product, ProductImage } from '@/lib/types';

interface RawSpec {
  brand: string;
  brandSlug: string;
  name: string;
  category: Category;
  color: string;
  size: string;
  price: number;
  compareAtPrice?: number;
  year?: number;
  condition: ConditionGrade;
  conditionScore: number;
  conditionNotes: string;
  status: 'AVAILABLE' | 'SOLD';
  tags: string[];
  archiveNotes?: string;
  angles: ProductImage['angle'][];
  daysAgo: number;
  measurementOverrides?: Measurement[];
}

function slugify(brand: string, name: string, size: string): string {
  return `${brand}-${name}-${size}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function skuFor(brand: string, index: number): string {
  const prefix = brand
    .replace(/[^A-Za-z]/g, '')
    .toUpperCase()
    .slice(0, 3);
  return `IS-${prefix}-${String(index + 1).padStart(4, '0')}`;
}

function defaultMeasurements(category: Category, size: string): Measurement[] {
  const n = size.replace(/[^0-9.]/g, '');
  const seed = n ? parseFloat(n) : size.charCodeAt(0);
  switch (category) {
    case 'OUTERWEAR':
      return [
        { label: 'PIT TO PIT', value: `${(20 + (seed % 6)).toFixed(1)}"` },
        { label: 'LENGTH', value: `${(26 + (seed % 4)).toFixed(1)}"` },
        { label: 'SHOULDER', value: `${(18 + (seed % 3)).toFixed(1)}"` },
        { label: 'SLEEVE', value: `${(24 + (seed % 3)).toFixed(1)}"` },
      ];
    case 'TOPS':
      return [
        { label: 'PIT TO PIT', value: `${(19 + (seed % 5)).toFixed(1)}"` },
        { label: 'LENGTH', value: `${(25 + (seed % 4)).toFixed(1)}"` },
        { label: 'SHOULDER', value: `${(17 + (seed % 3)).toFixed(1)}"` },
      ];
    case 'BOTTOMS':
      return [
        { label: 'WAIST', value: `${(28 + (seed % 8)).toFixed(1)}"` },
        { label: 'INSEAM', value: `${(30 + (seed % 3)).toFixed(1)}"` },
        { label: 'RISE', value: `${(10 + (seed % 2)).toFixed(1)}"` },
        { label: 'LEG OPENING', value: `${(6 + (seed % 3)).toFixed(1)}"` },
      ];
    case 'FOOTWEAR':
      return [
        { label: 'US SIZE', value: `${seed || 9}` },
        { label: 'EU SIZE', value: `${(seed || 9) + 33}` },
        { label: 'INSOLE LENGTH', value: `${(10 + (seed % 2)).toFixed(1)}"` },
      ];
    case 'JEWELRY':
      return [
        { label: 'SIZE', value: size },
        { label: 'WEIGHT', value: `${(8 + (seed % 20)).toFixed(1)}g` },
        { label: 'MATERIAL', value: 'STERLING SILVER' },
      ];
    case 'ACCESSORIES':
    default:
      return [
        { label: 'LENGTH', value: `${(10 + (seed % 6)).toFixed(1)}"` },
        { label: 'WIDTH', value: `${(4 + (seed % 4)).toFixed(1)}"` },
      ];
  }
}

const specs: RawSpec[] = [
  // CHROME HEARTS
  { brand: 'Chrome Hearts', brandSlug: 'chrome-hearts', name: 'Cemetery Cross Zip Hoodie', category: 'OUTERWEAR', color: 'Black', size: 'L', price: 1450, year: 2019, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Light fading throughout. Minor wear near cuffs. No holes or structural damage.', status: 'AVAILABLE', tags: ['hoodie', 'cross', 'silver hardware'], archiveNotes: 'A sought-after Chrome Hearts zip hoodie featuring the brand’s signature cemetery cross motif and sterling silver hardware.', angles: ['FRONT', 'BACK', 'DETAIL', 'HARDWARE', 'TAG', 'FLAW'], daysAgo: 2 },
  { brand: 'Chrome Hearts', brandSlug: 'chrome-hearts', name: 'Dagger Zip Hoodie', category: 'OUTERWEAR', color: 'Grey', size: 'M', price: 1650, year: 2021, condition: 'PRISTINE', conditionScore: 9.5, conditionNotes: 'Museum condition. No visible wear. Appears unworn.', status: 'AVAILABLE', tags: ['hoodie', 'dagger'], angles: ['FRONT', 'BACK', 'DETAIL', 'HARDWARE', 'TAG'], daysAgo: 5 },
  { brand: 'Chrome Hearts', brandSlug: 'chrome-hearts', name: 'Horseshoe Trucker Jacket', category: 'OUTERWEAR', color: 'Washed Indigo', size: 'L', price: 2200, year: 2018, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Natural denim fading. Silver horseshoe hardware shows light patina consistent with age.', status: 'AVAILABLE', tags: ['denim', 'trucker', 'silver hardware'], angles: ['FRONT', 'BACK', 'HARDWARE', 'DETAIL', 'TAG', 'FLAW'], daysAgo: 9 },
  { brand: 'Chrome Hearts', brandSlug: 'chrome-hearts', name: 'Cross Patch Tee', category: 'TOPS', color: 'White', size: 'M', price: 650, year: 2020, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Some yellowing at collar. Print intact with minor cracking.', status: 'SOLD', tags: ['tee', 'cross'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 40 },
  { brand: 'Chrome Hearts', brandSlug: 'chrome-hearts', name: 'Sterling Cross Ring', category: 'JEWELRY', color: 'Silver', size: '9', price: 1200, year: 2017, condition: 'PRISTINE', conditionScore: 9, conditionNotes: 'Hallmark intact. No dents or scratches under inspection.', status: 'AVAILABLE', tags: ['ring', 'sterling silver'], archiveNotes: 'Solid sterling silver cross ring, hallmarked and hand-finished in Los Angeles.', angles: ['FRONT', 'DETAIL', 'HARDWARE', 'TAG'], daysAgo: 12 },
  { brand: 'Chrome Hearts', brandSlug: 'chrome-hearts', name: 'Floral Cross Cardigan', category: 'TOPS', color: 'Black', size: 'L', price: 1850, year: 2022, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Excellent all-over condition. Light pilling under arms.', status: 'SOLD', tags: ['cardigan', 'floral'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 55 },
  { brand: 'Chrome Hearts', brandSlug: 'chrome-hearts', name: 'Matty Boy Heart Tee', category: 'TOPS', color: 'Black', size: 'XL', price: 525, year: 2021, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Some fading from wash. Graphic remains vibrant.', status: 'AVAILABLE', tags: ['tee', 'matty boy'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 3 },
  { brand: 'Chrome Hearts', brandSlug: 'chrome-hearts', name: 'CH Plus Logo Sweatpants', category: 'BOTTOMS', color: 'Grey', size: 'M', price: 890, year: 2022, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Worn a handful of times. No stains or pilling.', status: 'AVAILABLE', tags: ['sweatpants'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 7 },

  // RICK OWENS
  { brand: 'Rick Owens', brandSlug: 'rick-owens', name: 'DRKSHDW Jumbo Tee', category: 'TOPS', color: 'Black', size: 'M', price: 340, year: 2021, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Minor pilling at the seams. Otherwise excellent.', status: 'AVAILABLE', tags: ['tee', 'drkshdw', 'oversized'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 4 },
  { brand: 'Rick Owens', brandSlug: 'rick-owens', name: 'Geobasket Sneakers', category: 'FOOTWEAR', color: 'Black', size: '42', price: 980, year: 2020, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Sole shows expected wear. Leather uppers clean.', status: 'AVAILABLE', tags: ['sneakers', 'geobasket'], angles: ['FRONT', 'SIDE', 'SOLE', 'DETAIL', 'TAG', 'FLAW'], daysAgo: 15 },
  { brand: 'Rick Owens', brandSlug: 'rick-owens', name: 'Cropped Biker Jacket', category: 'OUTERWEAR', color: 'Black Leather', size: '48', price: 2650, year: 2016, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Supple leather with light creasing at elbows consistent with wear.', status: 'SOLD', tags: ['leather', 'biker'], archiveNotes: 'An architectural cropped biker cut from Rick Owens’ mainline, in his signature black leather.', angles: ['FRONT', 'BACK', 'DETAIL', 'HARDWARE', 'TAG'], daysAgo: 62 },
  { brand: 'Rick Owens', brandSlug: 'rick-owens', name: 'Mastodon High-Top', category: 'FOOTWEAR', color: 'White', size: '43', price: 890, year: 2019, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Yellowing on midsole typical of the colorway. Uppers clean.', status: 'AVAILABLE', tags: ['sneakers', 'mastodon'], angles: ['FRONT', 'SIDE', 'SOLE', 'DETAIL', 'TAG'], daysAgo: 20 },
  { brand: 'Rick Owens', brandSlug: 'rick-owens', name: 'Performa Denim', category: 'BOTTOMS', color: 'Grey Wash', size: '32', price: 560, year: 2021, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Light wear at hem. No rips or repairs.', status: 'AVAILABLE', tags: ['denim'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 11 },
  { brand: 'Rick Owens', brandSlug: 'rick-owens', name: 'Larry Tunic', category: 'TOPS', color: 'Black', size: 'S', price: 780, year: 2018, condition: 'ARCHIVAL WEAR', conditionScore: 6, conditionNotes: 'Visible wash fading and one small repaired seam at the hem, noted in the gallery.', status: 'SOLD', tags: ['tunic'], angles: ['FRONT', 'BACK', 'DETAIL', 'FLAW', 'TAG'], daysAgo: 71 },

  // ACNE STUDIOS
  { brand: 'Acne Studios', brandSlug: 'acne-studios', name: '2021M Loose Fit Denim', category: 'BOTTOMS', color: 'Mid Blue', size: '31', price: 220, year: 2022, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Worn a handful of times. No fading beyond factory finish.', status: 'AVAILABLE', tags: ['denim', 'loose fit'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 6 },
  { brand: 'Acne Studios', brandSlug: 'acne-studios', name: 'Face Patch Beanie', category: 'ACCESSORIES', color: 'Black', size: 'ONE SIZE', price: 95, year: 2023, condition: 'PRISTINE', conditionScore: 9.5, conditionNotes: 'Appears unworn. Patch fully intact.', status: 'AVAILABLE', tags: ['beanie', 'face patch'], angles: ['FRONT', 'DETAIL', 'TAG'], daysAgo: 1 },
  { brand: 'Acne Studios', brandSlug: 'acne-studios', name: 'Mohair Blend Sweater', category: 'TOPS', color: 'Ecru', size: 'M', price: 340, year: 2022, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Minor shedding typical of mohair blends. No moth damage.', status: 'AVAILABLE', tags: ['sweater', 'mohair'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 8 },
  { brand: 'Acne Studios', brandSlug: 'acne-studios', name: 'Oversized Wool Coat', category: 'OUTERWEAR', color: 'Camel', size: '46', price: 980, year: 2020, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Light surface pilling. Lining intact.', status: 'SOLD', tags: ['coat', 'wool'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 48 },
  { brand: 'Acne Studios', brandSlug: 'acne-studios', name: 'Musubi Mini Bag', category: 'ACCESSORIES', color: 'Black Leather', size: 'ONE SIZE', price: 650, year: 2021, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Light corner rub. Hardware clean.', status: 'AVAILABLE', tags: ['bag', 'leather'], angles: ['FRONT', 'DETAIL', 'HARDWARE', 'TAG'], daysAgo: 13 },

  // ERD
  { brand: 'ERD', brandSlug: 'erd', name: 'Distressed Knit Sweater', category: 'TOPS', color: 'Black', size: 'L', price: 890, year: 2021, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Distressing is intentional to the design. No unintended damage.', status: 'AVAILABLE', tags: ['knit', 'distressed'], archiveNotes: 'Enfants Riches Déprimés knitwear, hand-distressed and produced in limited runs.', angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 10 },
  { brand: 'ERD', brandSlug: 'erd', name: 'Butterfly Print Tee', category: 'TOPS', color: 'White', size: 'M', price: 320, year: 2020, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Print shows light cracking. No holes.', status: 'SOLD', tags: ['tee', 'print'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 35 },
  { brand: 'ERD', brandSlug: 'erd', name: 'Skull Logo Hoodie', category: 'OUTERWEAR', color: 'Black', size: 'L', price: 650, year: 2022, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Worn twice. No pilling or fading.', status: 'AVAILABLE', tags: ['hoodie', 'skull'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 4 },
  { brand: 'ERD', brandSlug: 'erd', name: 'Frayed Denim Jeans', category: 'BOTTOMS', color: 'Black', size: '32', price: 580, year: 2021, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Fraying at hem intentional to construction. Even wear throughout.', status: 'AVAILABLE', tags: ['denim', 'frayed'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 17 },

  // MAISON MARGIELA
  { brand: 'Maison Margiela', brandSlug: 'maison-margiela', name: 'Replica Sneakers', category: 'FOOTWEAR', color: 'White', size: '42', price: 520, year: 2022, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Light creasing at toe box. Soles show minimal wear.', status: 'AVAILABLE', tags: ['sneakers', 'replica'], angles: ['FRONT', 'SIDE', 'SOLE', 'DETAIL', 'TAG'], daysAgo: 5 },
  { brand: 'Maison Margiela', brandSlug: 'maison-margiela', name: 'Tabi Boots', category: 'FOOTWEAR', color: 'Black', size: '40', price: 1350, year: 2019, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Split-toe seam shows expected flex creasing. Heel stacks intact.', status: 'AVAILABLE', tags: ['tabi', 'boots'], archiveNotes: 'The Tabi boot, unchanged in silhouette since its 1988 debut.', angles: ['FRONT', 'SIDE', 'SOLE', 'DETAIL', 'TAG', 'FLAW'], daysAgo: 21 },
  { brand: 'Maison Margiela', brandSlug: 'maison-margiela', name: 'Glam Slam Bag', category: 'ACCESSORIES', color: 'Black Leather', size: 'ONE SIZE', price: 1450, year: 2020, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Light corner wear. Interior clean.', status: 'SOLD', tags: ['bag'], angles: ['FRONT', 'DETAIL', 'HARDWARE', 'TAG'], daysAgo: 44 },
  { brand: 'Maison Margiela', brandSlug: 'maison-margiela', name: 'Deconstructed Blazer', category: 'OUTERWEAR', color: 'Black', size: '48', price: 890, year: 2018, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Exposed seams are original construction, not damage.', status: 'AVAILABLE', tags: ['blazer', 'deconstructed'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 25 },
  { brand: 'Maison Margiela', brandSlug: 'maison-margiela', name: 'Numbers Logo Tee', category: 'TOPS', color: 'White', size: 'M', price: 210, year: 2021, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Light greying at collar.', status: 'SOLD', tags: ['tee'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 58 },

  // SAINT LAURENT
  { brand: 'Saint Laurent', brandSlug: 'saint-laurent', name: 'Wyatt Boots', category: 'FOOTWEAR', color: 'Black Leather', size: '42', price: 1190, year: 2020, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Sole shows light flex creasing. Uppers clean.', status: 'AVAILABLE', tags: ['boots', 'wyatt'], angles: ['FRONT', 'SIDE', 'SOLE', 'DETAIL', 'TAG'], daysAgo: 9 },
  { brand: 'Saint Laurent', brandSlug: 'saint-laurent', name: 'Teddy Jacket', category: 'OUTERWEAR', color: 'Black', size: '48', price: 2450, year: 2019, condition: 'PRISTINE', conditionScore: 9, conditionNotes: 'Appears rarely worn. Leather sleeves supple, no cracking.', status: 'AVAILABLE', tags: ['teddy', 'varsity'], angles: ['FRONT', 'BACK', 'DETAIL', 'HARDWARE', 'TAG'], daysAgo: 14 },
  { brand: 'Saint Laurent', brandSlug: 'saint-laurent', name: 'Skinny Leather Pants', category: 'BOTTOMS', color: 'Black', size: '30', price: 1650, year: 2018, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Knee area shows expected stretch creasing.', status: 'SOLD', tags: ['leather', 'pants'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 39 },
  { brand: 'Saint Laurent', brandSlug: 'saint-laurent', name: 'Signature Card Holder', category: 'ACCESSORIES', color: 'Black Leather', size: 'ONE SIZE', price: 340, year: 2022, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Light corner wear. Stitching intact.', status: 'AVAILABLE', tags: ['wallet', 'leather'], angles: ['FRONT', 'DETAIL', 'TAG'], daysAgo: 3 },

  // KAPITAL
  { brand: 'Kapital', brandSlug: 'kapital', name: 'Boro Patchwork Jacket', category: 'OUTERWEAR', color: 'Indigo', size: '3', price: 1250, year: 2020, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Patchwork is original construction. Indigo shows natural fade.', status: 'AVAILABLE', tags: ['boro', 'patchwork'], archiveNotes: 'Hand patchworked indigo panels assembled in Kapital’s Okayama workshop.', angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 16 },
  { brand: 'Kapital', brandSlug: 'kapital', name: 'Century Denim', category: 'BOTTOMS', color: 'Indigo', size: '32', price: 420, year: 2021, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Even fade with light whiskering.', status: 'AVAILABLE', tags: ['denim'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 22 },
  { brand: 'Kapital', brandSlug: 'kapital', name: 'Smiley Ivy Cap', category: 'ACCESSORIES', color: 'Navy', size: 'ONE SIZE', price: 180, year: 2022, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Light fading from wear.', status: 'SOLD', tags: ['hat'], angles: ['FRONT', 'DETAIL', 'TAG'], daysAgo: 51 },

  // ALYX
  { brand: 'Alyx', brandSlug: 'alyx', name: 'Rollercoaster Buckle Belt', category: 'ACCESSORIES', color: 'Black', size: 'ONE SIZE', price: 310, year: 2021, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Buckle mechanism functions smoothly. Light strap creasing.', status: 'AVAILABLE', tags: ['belt', 'buckle'], angles: ['FRONT', 'DETAIL', 'HARDWARE', 'TAG'], daysAgo: 6 },
  { brand: 'Alyx', brandSlug: 'alyx', name: 'Tank Boots', category: 'FOOTWEAR', color: 'Black', size: '43', price: 890, year: 2020, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Sole shows moderate tread wear.', status: 'AVAILABLE', tags: ['boots'], angles: ['FRONT', 'SIDE', 'SOLE', 'DETAIL', 'TAG'], daysAgo: 19 },
  { brand: 'Alyx', brandSlug: 'alyx', name: 'Buckle Track Jacket', category: 'OUTERWEAR', color: 'Grey', size: 'M', price: 650, year: 2022, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Worn a handful of times.', status: 'SOLD', tags: ['track jacket'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 33 },

  // BALENCIAGA
  { brand: 'Balenciaga', brandSlug: 'balenciaga', name: 'Track Sneakers', category: 'FOOTWEAR', color: 'Grey Multi', size: '42', price: 890, year: 2021, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Mesh panels clean. Sole shows moderate wear.', status: 'AVAILABLE', tags: ['sneakers', 'track'], angles: ['FRONT', 'SIDE', 'SOLE', 'DETAIL', 'TAG'], daysAgo: 12 },
  { brand: 'Balenciaga', brandSlug: 'balenciaga', name: 'Oversized Hoodie', category: 'TOPS', color: 'Black', size: 'L', price: 780, year: 2022, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Minimal wear. No pilling.', status: 'AVAILABLE', tags: ['hoodie', 'oversized'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 2 },
  { brand: 'Balenciaga', brandSlug: 'balenciaga', name: 'Destroyed Denim', category: 'BOTTOMS', color: 'Blue', size: '32', price: 1150, year: 2020, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Distressing is intentional to the design.', status: 'SOLD', tags: ['denim', 'destroyed'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 46 },

  // STUSSY
  { brand: 'Stüssy', brandSlug: 'stussy', name: '8 Ball Fleece', category: 'TOPS', color: 'Grey', size: 'L', price: 145, year: 2022, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Light pilling on sleeves.', status: 'AVAILABLE', tags: ['fleece', '8 ball'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 1 },
  { brand: 'Stüssy', brandSlug: 'stussy', name: 'Work Jacket', category: 'OUTERWEAR', color: 'Olive', size: 'L', price: 220, year: 2021, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Fading at elbows from wear.', status: 'AVAILABLE', tags: ['jacket', 'workwear'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 18 },
  { brand: 'Stüssy', brandSlug: 'stussy', name: 'World Tour Tee Vintage', category: 'TOPS', color: 'Black', size: 'M', price: 190, year: 1999, condition: 'ARCHIVAL WEAR', conditionScore: 6, conditionNotes: 'Vintage piece with fading and small pinhole noted in the gallery.', status: 'SOLD', tags: ['tee', 'vintage'], archiveNotes: 'Late-90s World Tour graphic tee, a formative piece of the brand’s archive.', angles: ['FRONT', 'BACK', 'DETAIL', 'FLAW', 'TAG'], daysAgo: 64 },

  // SUPREME
  { brand: 'Supreme', brandSlug: 'supreme', name: 'Box Logo Hoodie FW17', category: 'OUTERWEAR', color: 'Red', size: 'L', price: 890, year: 2017, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Light box logo cracking, typical of the print era.', status: 'AVAILABLE', tags: ['hoodie', 'box logo'], archiveNotes: 'Fall/Winter 2017 box logo hoodie, one of the most sought-after colorways of the run.', angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 7 },
  { brand: 'Supreme', brandSlug: 'supreme', name: 'Bandana Box Logo Tee', category: 'TOPS', color: 'Black', size: 'M', price: 320, year: 2019, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Some fading from wash.', status: 'SOLD', tags: ['tee', 'box logo'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 41 },
  { brand: 'Supreme', brandSlug: 'supreme', name: 'Blade Zip Up', category: 'OUTERWEAR', color: 'Black', size: 'L', price: 410, year: 2021, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Worn a handful of times.', status: 'AVAILABLE', tags: ['zip up'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 5 },

  // GALLERY DEPT
  { brand: 'Gallery Dept.', brandSlug: 'gallery-dept', name: 'Flag Painted Tee', category: 'TOPS', color: 'White', size: 'L', price: 290, year: 2022, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Hand-painted finish, unique to this piece.', status: 'AVAILABLE', tags: ['tee', 'hand painted'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 4 },
  { brand: 'Gallery Dept.', brandSlug: 'gallery-dept', name: 'French Terry Sweatpants', category: 'BOTTOMS', color: 'Grey', size: 'M', price: 340, year: 2022, condition: 'EXCELLENT', conditionScore: 8, conditionNotes: 'Light wear at the ankle hem.', status: 'AVAILABLE', tags: ['sweatpants'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 8 },
  { brand: 'Gallery Dept.', brandSlug: 'gallery-dept', name: 'LA Flag Denim', category: 'BOTTOMS', color: 'Blue', size: '32', price: 520, year: 2021, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Reworked flag patch shows light fraying at the edges, original to construction.', status: 'SOLD', tags: ['denim', 'reworked'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 37 },

  // DENIM TEARS
  { brand: 'Denim Tears', brandSlug: 'denim-tears', name: 'Cotton Wreath Jeans', category: 'BOTTOMS', color: 'Blue', size: '32', price: 380, year: 2022, condition: 'EXCELLENT', conditionScore: 8.5, conditionNotes: 'Worn a handful of times. No fading beyond factory finish.', status: 'AVAILABLE', tags: ['denim', 'cotton wreath'], archiveNotes: 'Cotton wreath embroidery referencing the history of cotton and Black American labor.', angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 3 },
  { brand: 'Denim Tears', brandSlug: 'denim-tears', name: 'Cotton Wreath Sweatshirt', category: 'TOPS', color: 'Grey', size: 'L', price: 290, year: 2021, condition: 'GOOD', conditionScore: 7, conditionNotes: 'Light pilling on the body.', status: 'SOLD', tags: ['sweatshirt'], angles: ['FRONT', 'BACK', 'DETAIL', 'TAG'], daysAgo: 53 },
];

function buildProducts(): Product[] {
  const now = Date.now();
  return specs.map((s, i) => {
    const size = s.size;
    const slug = slugify(s.brand, s.name, size);
    const date = new Date(now - s.daysAgo * 24 * 60 * 60 * 1000);
    return {
      id: `p-${i + 1}`,
      slug,
      sku: skuFor(s.brand, i),
      brand: s.brand,
      brandSlug: s.brandSlug,
      name: s.name,
      price: s.price,
      compareAtPrice: s.compareAtPrice,
      size,
      category: s.category,
      color: s.color,
      year: s.year,
      condition: s.condition,
      conditionScore: s.conditionScore,
      conditionNotes: s.conditionNotes,
      description: `${s.brand} ${s.name.toLowerCase()} in ${s.color.toLowerCase()}. Size ${size}.${s.year ? ` Released ${s.year}.` : ''}`,
      archiveNotes: s.archiveNotes,
      measurements: s.measurementOverrides ?? defaultMeasurements(s.category, size),
      images: s.angles.map((angle, idx) => ({ id: `${slug}-${idx}`, angle })),
      tags: s.tags,
      status: s.status,
      isOneOfOne: true,
      dateAdded: date.toISOString(),
      soldDate: s.status === 'SOLD' ? date.toISOString() : undefined,
    };
  });
}

export const products: Product[] = buildProducts();

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAvailableProducts(): Product[] {
  return products.filter((p) => p.status === 'AVAILABLE');
}

export function getSoldProducts(): Product[] {
  return products.filter((p) => p.status === 'SOLD');
}

export function getProductsByBrandSlug(brandSlug: string): Product[] {
  return products.filter((p) => p.brandSlug === brandSlug);
}

export function getNewArrivals(limit = 8): Product[] {
  return [...getAvailableProducts()]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getAvailableProducts()
    .filter((p) => p.id !== product.id && (p.brandSlug === product.brandSlug || p.category === product.category))
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    p.brand.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
