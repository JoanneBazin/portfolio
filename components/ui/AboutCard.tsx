import { AboutCardProps } from "@/types";

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

      <div className="relative group flex flex-col w-full sm:w-[88%] lg:w-[80%]">
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${gradientClass} rounded-3xl blur opacity-20`}
        ></div>
        <div className="relative bg-gray-800/50 rounded-2xl p-8 h-full">
          <div className="mb-6">
            <h4 className="text-sm sm:text-lg font-semibold mb-2 flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-4 animate-pulse"></span>
              {title}
            </h4>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-transparent"></div>
          </div>

          {children}

          {/* Animated circuit line */}
          <div className="mt-8">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-accent-50 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
