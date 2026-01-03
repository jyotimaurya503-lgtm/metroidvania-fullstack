import { cn } from "@/lib/utils";

interface CRTPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const CRTPanel = ({ children, className, glow = false }: CRTPanelProps) => {
  return (
    <div className={cn(
      'crt-screen p-6 rounded border-2 border-primary/30',
      'bg-gradient-to-b from-card/80 to-background/90',
      'backdrop-blur-crt',
      glow && 'shadow-[0_0_20px_hsl(var(--primary)/0.3)]',
      className
    )}>
      {children}
    </div>
  );
};