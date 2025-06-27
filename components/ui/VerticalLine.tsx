import { VerticalLineProps } from "@/app/types";
import { LineEnd } from "./LineEnd";

export const VerticalLine = ({
  isEnd = false,
  positionY = "left-7",
}: VerticalLineProps) => {
  return (
    <>
      <div
        className={`hidden sm:block absolute ${positionY} top-0 w-[3px] bg-accent-50  ${
          isEnd
            ? "h-64"
            : "h-full shadow-[0_0_6px_rgba(251,191,36,0.8)] animate-pulse"
        }`}
      ></div>

      {isEnd && (
        <div className={`hidden sm:block absolute left-5 top-36`}>
          <LineEnd />
        </div>
      )}
    </>
  );
};
