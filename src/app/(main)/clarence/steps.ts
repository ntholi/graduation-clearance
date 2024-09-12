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
    description: 'No pending repeat modules and GPA above 2.0',
    icon: Users,
  },
  {
    id: 2,
    title: 'Library',
    description: 'No unreturned books or fines',
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'Resource Department',
    description: 'No unreturned resources or fines',
    icon: Building2,
  },
  {
    id: 4,
    title: 'Finance',
    description: 'No pending dues',
    icon: DollarSign,
  },
];
