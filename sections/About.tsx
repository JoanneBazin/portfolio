export const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen m-10 sm:m-15 lg:m-20 flex flex-col justify-center gap-20"
    >
      <div>
        <h3 className="font-montserrat">Mon profil</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint modi
          distinctio neque itaque odio dignissimos maiores quisquam expedita
          libero pariatur temporibus impedit earum tempora quasi non, minima
          assumenda ab corrupti.
        </p>
      </div>
      <div>
        <h3 className="font-montserrat">Compétences</h3>
        <div className="text-6xl flex gap-6 flex-wrap justify-center">
          <i className="fa-brands fa-html5"></i>
          <i className="fa-brands fa-css3-alt"></i>
          <i className="fa-brands fa-square-js"></i>
          <i className="fa-brands fa-node-js"></i>
          <i className="fa-brands fa-react"></i>
          <i className="fa-brands fa-figma"></i>
          <i className="fa-brands fa-git-alt"></i>
          <i className="fa-brands fa-sass"></i>
        </div>
      </div>
    </section>
  );
};
