import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export function StatsCard({ label, value, icon: Icon, color = 'text-primary' }: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-4" data-testid={`stats-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
