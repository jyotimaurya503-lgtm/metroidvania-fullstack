import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RetroButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'default' | 'sm' | 'lg';
}

export const RetroButton = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className,
  type = 'button',
  size = 'default'
}: RetroButtonProps) => {
  const variants = {
    primary: 'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    secondary: 'border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground',
    accent: 'border-accent text-accent hover:bg-accent hover:text-accent-foreground'
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      size={size}
      className={cn(
        'retro-btn text-sm tracking-wider',
        variants[variant],
        className
      )}
      variant="outline"
    >
      {children}
    </Button>
  );
};