interface ButtonProps {
  value: string;
  handleClick: () => void;
}
const Button = ({ value, handleClick }: ButtonProps) => {
  return (
    <button
      className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 hover:scale-105 transition-all "
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Button;
