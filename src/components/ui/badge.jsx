import { cn } from '@/lib/utils';

const Badge = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    outline: 'border border-input bg-background text-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  };
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export { Badge };
