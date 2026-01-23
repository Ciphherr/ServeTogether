import useScrollReveal from "../hooks/useScrollReveal";

const ImpactTimeline = ({data}) => {

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-15">
      {/* Header */}
      <div className="text-center mb-24">
        <h3 className="text-5xl font-bold mb-6">
          {data.heading.split(" ").slice(0,3).join(" ")}<br />{data.heading.split(" ").slice(3).join(" ")}
        </h3>
        <p className="max-w-2xl mx-auto text-lg text-emerald-100">
          {data.fact_line}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-5 md:left-1/2 -translate-x-0 md:-translate-x-1/2 h-full w-[2px] 
          bg-linear-to-b from-emerald-400 via-green-400 to-sky-400" />

        {data.impacts.map((item, index) => {
          const [ref, isVisible] = useScrollReveal();
          const isLeft = index % 2 === 0;

          return (
            <div
              ref={ref}
              key={item.impact_title}
              className={`relative flex mb-24 transition-all duration-700 ease-out
                ${isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${isLeft ? "-translate-x-16" : "translate-x-16"}`}
                ${isLeft ? "justify-start" : "justify-end"}
              `}
            >
              {/* Content */}
              <div
                className={`
                  w-full md:w-[45%]
                  pl-12 md:pl-0
                  md:${isLeft ? "text-right pr-12" : "text-left pl-12"}
                `}
              >
                <h4 className="text-2xl font-semibold mb-3 text-emerald-300">
                  {item.impact_title}
                </h4>
                <p className="text-emerald-100 leading-relaxed">
                  {item.impact}
                </p>
              </div>

              {/* Dot */}
              <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full 
                bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ImpactTimeline;
