export const Button = ({ text }: { text: string }) => {
  return (
    <button className="bg-gold-light text-background px-3 py-1 my-2 text-sm rounded-md hover:bg-gold-dark transition-colors">
      {text}
    </button>
  );
};
