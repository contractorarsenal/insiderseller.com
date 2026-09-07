import type { Metadata, Viewport } from 'next';
import { Archivo, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import MobileMenu from '@/components/layout/MobileMenu';
import SearchOverlay from '@/components/layout/SearchOverlay';
import CartDrawer from '@/components/cart/CartDrawer';
import Footer from '@/components/layout/Footer';
import NewsletterModal from '@/components/modals/NewsletterModal';
import QuickView from '@/components/product/QuickView';

// PRIMARY DISPLAY — oversized editorial headlines, section titles, wordmarks.
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['500', '700', '800', '900'],
});

// SECONDARY — body copy, nav, buttons, labels.
const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['400', '500', '600'],
});

// MONOSPACE — prices, sizes, SKUs, condition data, technical metadata.
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://insidersellers.example'),
  title: {
    default: 'Insider Sellers — Curated Designer Archive & Resale',
    template: '%s | Insider Sellers',
  },
  description:
    'Insider Sellers is a curated destination for rare, authenticated designer, archive and streetwear fashion. Chrome Hearts, Rick Owens, Acne Studios, Margiela and more. One of one. Once it’s gone, it’s gone.',
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FDFDFD',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-yellow focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <MobileMenu />
        <SearchOverlay />
        <CartDrawer />
        <QuickView />
        <NewsletterModal />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
