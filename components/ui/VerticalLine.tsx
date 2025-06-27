import { VerticalLineProps } from "@/app/types";

export const VerticalLine = ({
  isEnd = false,
  positionY = "left-20",
}: VerticalLineProps) => {
  return (
    <div
      className={`hidden sm:block absolute ${positionY} top-0 w-[3px] bg-accent-50 animate-pulse ${
        isEnd
          ? "vertical-line h-[85%]"
          : "h-full shadow-[0_0_6px_rgba(251,191,36,0.8)]"
      }`}
    ></div>
  );
};
