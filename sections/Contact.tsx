import { ContactForm } from "@/components/forms/ContactForm";
import { VerticalLine } from "@/components/ui/VerticalLine";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen snap-start px-8 sm:px-20 pb-32 sm:pb-12 lg:pr-44"
    >
      <VerticalLine isEnd />
      <h3 className="sr-only">Contact</h3>

      <div className="w-full h-full flex pt-8 sm:pt-40">
        <div className="sm:w-[10%] lg:w-1/5 h-[2px] bg-accent-50 mt-4"></div>

        <div className="relative w-full h-full flex flex-col">
          <div
            className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-accent-50 rounded-full left-0 top-4 transform -translate-y-1/2 z-40"
            style={{
              boxShadow: "0 0 8px rgba(251, 191, 36, 0.8)",
            }}
          />
          <h4 className="font-montserrat lg:text-lg lg:mb-4 px-7">
            Une question ? Un projet ?
          </h4>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
