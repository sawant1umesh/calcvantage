export interface PageContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  class?: string;
}

export interface SectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  class?: string;
}

export interface CardProps {
  variant?: 'default' | 'soft' | 'outline' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  class?: string;
}

export interface InputProps {
  id: string;
  name?: string;
  label?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  value?: string | number;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  class?: string;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps {
  id: string;
  name?: string;
  label?: string;
  value?: string | number;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  class?: string;
}

export interface ToggleProps {
  id: string;
  name?: string;
  label?: string;
  checked?: boolean;
  helperText?: string;
  disabled?: boolean;
  class?: string;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: string;
  iconRight?: string;
  class?: string;
}

export interface ResultCardProps {
  label: string;
  value: string;
  currencySymbol?: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  highlight?: boolean;
  badge?: string;
  class?: string;
}
