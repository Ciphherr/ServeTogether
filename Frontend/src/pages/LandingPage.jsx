import { useState, useEffect } from "react";
import { getLandingPage } from "../api/helper";
import ClosingSection from "../components/closingSection";
import HeroSection from "../components/HeroSection";
import ImpactCarousel from "../components/imageCorousel";
import ImpactTimeline from "../components/impactTimeline";
import Navbar from "../components/Navbar";
import { BeatLoader } from "react-spinners";


const LandingPage = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    getLandingPage().then(setPageData);
  }, []);

  if (!pageData) return <div className="flex flex-col items-center justify-center space-y-4 h-screen"><BeatLoader color="#04BD64" size={15} /></div>;


  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-950 via-green-900 to-sky-900 text-white overflow-hidden pt-28">
      {/* Floating background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-160px] left-[-160px] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-[-160px] w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-3xl animate-pulse" />
      </div>


      {pageData.page_components.map((block, index) => {
        if (block.hero_section) {
          return <HeroSection key={index} data={block.hero_section} />;
        }

        if (block.carousel_section) {
          return (
            <section className="relative z-10 max-w-6xl mx-auto px-6 -mt-20">
              <ImpactCarousel key={index} data={block.carousel_section} />
            </section>
          );
        }

        if (block.timeline_section) {
          return (
            <section className="relative z-10  mx-auto px-6 pt-32 pb-15">
              <div className="absolute inset-0 -z-10 bg-grid opacity-[0.50]" />
              <ImpactTimeline key={index} data={block.timeline_section} />
            </section>
          );
        }

        if (block.closing_section) {
          return (
            <section className="relative z-10">
              <ClosingSection key={index} data1={block.closing_section} data2={pageData.title} />
            </section>
          );
        }

        return null;
      })}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-emerald-200">
        © {new Date().getFullYear()} ServeTogether • For Nature • For
        Communities
      </footer>
    </div>
  );
};

export default LandingPage;
