import { cn } from "@/lib/utils";

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  flicker?: boolean;
}

export const GlowText = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  flicker = false 
}: GlowTextProps) => {
  const variants = {
    primary: 'text-primary',
    secondary: 'text-secondary', 
    accent: 'text-accent'
  };

  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  return (
    <div className={cn(
      'glow-text font-retro font-bold tracking-wider',
      variants[variant],
      sizes[size],
      flicker && 'flicker',
      className
    )}>
      {children}
    </div>
  );
};