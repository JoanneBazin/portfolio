import { ContactForm } from "@/components/forms/ContactForm";
import { VerticalLine } from "@/components/ui/VerticalLine";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen w-full snap-start px-8 pb-28 sm:pb-0 pt-8 lg:pr-44 flex justify-center items-center"
    >
      <VerticalLine isEnd />
      <div className="w-full h-full flex flex-col gap-6 items-center">
        <h3 className="font-montserrat text-lg sm:text-2xl lg:mb-4 text-center">
          Une question ? Un projet ?
        </h3>
        <ContactForm />
      </div>
    </section>
  );
};
