export const Tag = ({ item }: { item: string }) => {
  return (
    <span className="px-3 sm:px-4 py-2 bg-gray text-sm sm:text-base rounded-lg">
      {item}
    </span>
  );
};
