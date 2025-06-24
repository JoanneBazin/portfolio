import { CoreNodeProps } from "@/lib/types";

export const CoreNode = ({ breakpoint }: CoreNodeProps) => {
  const getContainerClass = () => {
    if (breakpoint === "mobile") return "w-1/5";
    if (breakpoint === "tablet") return "w-1/5";
    return "w-1/5 lg:w-2/5";
  };
  return (
    <div
      className={`${getContainerClass()} flex justify-start items-center sm:justify-center relative z-30`}
    >
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 bg-background rounded-full flex items-center justify-center font-bold text-lg border-4 border-accent shadow-lg"
        style={{
          boxShadow: "0 0 30px rgba(249, 115, 22, 0.7)",
        }}
      >
        <i className="fa-solid fa-code text-xs"></i>
      </div>
    </div>
  );
};
