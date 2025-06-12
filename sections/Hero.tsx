export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center xl:gap-16">
      <div className="absolute top-0 left-20 w-72 h-72 bg-gold-dark rounded-full opacity-50 blur-3xl"></div>

      <div className="absolute bottom-40 right-0 w-96 h-96 bg-gold-dark rounded-full opacity-30 blur-3xl"></div>

      <h1 className="xl:text-6xl text-accent">
        <span className="block mb-10">Joanne</span>
        <span className="block">Bazin</span>
      </h1>
      <h2 className="xl:text-8xl">
        <span className="block uppercase mb-14">Développeuse</span>
        <span className="block uppercase">Web</span>
      </h2>
    </section>
  );
};
