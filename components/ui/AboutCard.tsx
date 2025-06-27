import { AboutCardProps } from "@/app/types";

export const AboutCard = ({
  title,
  children,
  reverse = false,
}: AboutCardProps) => {
  const gradientClass = reverse
    ? "from-accent-50 to-background"
    : "from-background to-accent-50";

  return (
    <div className="w-full flex">
      <div className="sm:w-[9%] lg:w-1/5 h-[2px] mt-12 bg-accent-50"></div>

      <div className="relative group flex flex-col w-full sm:w-5/6 lg:w-[70%]">
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${gradientClass} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300`}
        ></div>
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gold-50 rounded-2xl p-8 hover:border-accent-50 transition-all duration-300 h-full">
          {/* Circuit corner decorations */}
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-50 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-accent-50 rounded-bl-lg"></div>

          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-4 animate-pulse"></span>
              {title}
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-transparent"></div>
          </div>

          {children}

          {/* Animated circuit line */}
          <div className="mt-7">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-50 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
