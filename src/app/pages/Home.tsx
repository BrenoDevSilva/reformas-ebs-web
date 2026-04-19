import HeroSection from "../components/home/HeroSection";
import ServicesGrid from "../components/home/ServicesGrid";
import PortfolioSneak from "../components/home/PortfolioSneak";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesGrid />
      <PortfolioSneak />
      <Testimonials />
    </div>
  );
}
