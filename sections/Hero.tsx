export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center xl:gap-16 snap-start pr-0"
    >
      {/* Blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 lg:w-60 lg:h-60 blob-gradient-1 rounded-full blur-2xl"></div>
      <div className="absolute top-1/4 right-20 w-32 h-32 lg:w-48 lg:h-48 blob-gradient-2 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 lg:w-36 lg:h-36 blob-gradient-3 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 lg:w-52 lg:h-52 blob-gradient-1 rounded-full blur-3xl"></div>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">
        <div className="relative w-full">
          <h1 className="flex lg:flex-col justify-center sm:justify-start gap-2 lg:gap-6 text-3xl lg:text-5xl font-playfair text-accent-50 relative animate-slide-right">
            <span className="ml-4">Joanne</span>
            <span>Bazin</span>
          </h1>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[-120px] left-[-10px] w-[3px] bg-accent-50 rotate-[15deg] animate-vertical-line"></div>
          <div className="lg:hidden absolute left-[-90px] sm:left-[-110px] top-0 h-[3px] bg-accent-50 animate-horizontal-line"></div>
        </div>

        <div className="relative">
          <h2 className="flex flex-col items-center sm:items-end lg:items-start text-4xl sm:text-5xl lg:text-7xl sm:ml-6 font-playfair relative animate-slide-left">
            <span className="uppercase mb-8 lg:mb-12 lg:ml-6 sm:mr-10">
              Développeuse
            </span>
            <span className="uppercase">Web</span>
          </h2>
        </div>
      </div>
    </section>
  );
};
