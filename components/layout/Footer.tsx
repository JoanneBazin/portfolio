import Link from "next/link";

export const Footer = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <footer className="hidden sm:flex justify-between items-center fixed bottom-0 left-0 w-full bg-background p-6">
      {isAdmin ? null : (
        <Link href="/login" className="text-xs">
          Accès admin
        </Link>
      )}

      <div className="flex justify-end items-center gap-6">
        <a
          href="https://github.com/JoanneBazin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-foreground transition-colors duration-200"
        >
          <i className="fa-brands fa-github text-2xl"></i>
        </a>
        <a
          href="https://fr.linkedin.com/in/joanne-bazin?trk=people-guest_people_search-card"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-foreground transition-colors duration-200"
        >
          <i className="fa-brands fa-linkedin-in text-3xl"></i>
        </a>
      </div>
    </footer>
  );
};
