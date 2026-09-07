import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import MobileMenu from '@/components/layout/MobileMenu';
import SearchOverlay from '@/components/layout/SearchOverlay';
import CartDrawer from '@/components/cart/CartDrawer';
import Footer from '@/components/layout/Footer';
import NewsletterModal from '@/components/modals/NewsletterModal';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500'],
});

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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
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
        <NewsletterModal />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
