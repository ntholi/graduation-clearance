import {
  BookOpen,
  Building2,
  DollarSign,
  LucideIcon,
  Users,
} from 'lucide-react';

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const steps: Step[] = [
  {
    id: 1,
    title: 'Faculty',
    description:
      'Cleared from faculty, no pending repeat modules and GPA above 2.0',
    icon: Users,
  },
  {
    id: 2,
    title: 'Library',
    description: 'You should not have any unreturned books',
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'Resource Department',
    description:
      'All resources should be returned, and no pending dues to the resource department',
    icon: Building2,
  },
  {
    id: 4,
    title: 'Finance',
    description: 'Cleared from finance, no pending dues',
    icon: DollarSign,
  },
];
