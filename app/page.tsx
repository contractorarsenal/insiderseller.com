import Hero from '@/components/home/Hero';
import MarqueeDivider from '@/components/home/MarqueeDivider';
import JustIn from '@/components/home/JustIn';
import EditorialInterruption from '@/components/home/EditorialInterruption';
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
      <DesignerIndex />
      <Categories />
      <SoldArchive />
      <SellToUsPromo />
      <InsiderAccess />
    </>
  );
}
