import { useEffect, useState } from "react";
import img1 from "../assets/beach_cleaning.jpg";
import img2 from "../assets/tree_plantation.jpg";
import img3 from "../assets/animal_rescue.avif";
import img4 from "../assets/education.jpg";
import img5 from "../assets/health.jpg";

const ImpactCarousel = ({data}) => {
  const images = [data.images[0].url, data.images[1].url, data.images[2].url, data.images[3].url, data.images[4].url];
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Helper: get indexes for desktop
  const getDesktopIndexes = () => {
    const prev = (current - 1 + images.length) % images.length;
    const next = (current + 1) % images.length;
    return [prev, current, next];
  };

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 -mt-20">
      <div className="flex justify-center gap-8">

        {/* Mobile: only center image */}
        <div className="block sm:hidden w-full">
          <div
            className="relative h-[180px] w-full rounded-2xl overflow-hidden
              scale-110 z-10 shadow-2xl
              bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <img
              src={images[current]}
              alt="Impact highlight"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Desktop: show 3 images */}
        {getDesktopIndexes().map((idx, position) => {
          const isCenter = position === 1;

          return (
            <div
              key={idx}
              className={`hidden sm:block relative h-[180px] w-[32%] rounded-2xl overflow-hidden
                transition-all duration-700
                ${isCenter ? "scale-110 z-10 shadow-2xl" : "scale-95 blur-[2px] opacity-70"}
                bg-white/5 backdrop-blur-xl border border-white/10`}
            >
              <img
                src={images[idx]}
                alt="Impact highlight"
                className="w-full h-full object-cover"
              />
              {!isCenter && (
                <div className="absolute inset-0 bg-black/30" />
              )}
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default ImpactCarousel;
