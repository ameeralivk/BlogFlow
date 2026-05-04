export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}
export interface FeatureCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: boolean;
  wide?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
}