import { Button } from "../ui/button";

type MediButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

function MediButton({
  variant,
  onClick,
  disabled,
  children,
  className,
}: MediButtonProps) {
  const baseStyles =
    "px-8 py-6 text-base font-medium rounded-full transition-all duration-300 ease-in-out transform";

  const primaryStyles = `
    bg-primary text-background border-1 border-transparent
    hover:-translate-y-0.5 hover:scale-105 hover:opacity-95
    active:scale-97 active:translate-y-0 active:opacity-90
    focus:outline-none
    disabled:border-primary disabled:bg-transparent disabled:text-primary
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100
    motion-safe:transition-transform
  `;

  const secondaryStyles = `
    bg-transparent border-1 border-primary text-primary
    hover:-translate-y-0.5 hover:scale-105 hover:opacity-95
    active:scale-97 active:translate-y-0 active:opacity-90
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100
    motion-safe:transition-transform
  `;

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${
        variant === "primary" ? primaryStyles : secondaryStyles
      } ${className || ""}`}
    >
      {children}
    </Button>
  );
}

export default MediButton;
