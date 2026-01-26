import { Link } from "react-router-dom";

const HeroSection = ({data}) => {
  return (
    <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-36">
      <span className="mb-6 inline-block rounded-full border border-emerald-400/30 px-5 py-2 text-sm text-emerald-200 backdrop-blur">
        {data.tagline}
      </span>

      <h2 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl">
        {data.opening_line.split(" ").slice(0,2).join(" ")+ " "}<span className="text-emerald-400">{data.opening_line.split(" ").slice(2,3).join(" ")}</span><br />
        {data.opening_line.split(" ").slice(3,4).join(" ")+ " "} <span className="text-sky-400">{data.opening_line.split(" ").slice(4).join(" ")}</span>
      </h2>

      <p className="mt-8 max-w-2xl text-lg text-emerald-100">
        {data.moto}
      </p>

      <div className="mt-12 flex gap-5">
        <Link to="/opportunities" className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition shadow-xl font-semibold">
          {data.button_1}
        </Link>
        <Link to="/opportunities" className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition">
          {data.button_2}
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
