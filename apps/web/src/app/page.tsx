import { LandingHero } from '@/components/landing/hero';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { ProductGallery } from '@/components/landing/product-gallery';
import { FAQSection } from '@/components/landing/faq-section';
import { SiteFooter } from '@/components/landing/site-footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHero />
      <FeatureGrid />
      <ProductGallery />
      <FAQSection />
      <SiteFooter />
    </div>
  );
}
