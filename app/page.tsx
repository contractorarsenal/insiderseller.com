import Hero from '@/components/home/Hero';
import MarqueeDivider from '@/components/home/MarqueeDivider';
import JustIn from '@/components/home/JustIn';
import EditorialInterruption from '@/components/home/EditorialInterruption';
import EditorialGrid from '@/components/home/EditorialGrid';
import DesignerIndex from '@/components/home/DesignerIndex';
import Categories from '@/components/home/Categories';
import SoldArchive from '@/components/home/SoldArchive';
import SellToUsPromo from '@/components/home/SellToUsPromo';
import InsiderAccess from '@/components/home/InsiderAccess';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeDivider />
      <JustIn />
      <EditorialInterruption />
      <EditorialGrid />
      <DesignerIndex />
      <Categories />
      <SoldArchive />
      <SellToUsPromo />
      <InsiderAccess />
    </>
  );
}
