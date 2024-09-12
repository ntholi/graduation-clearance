'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  BookOpen,
  Users,
  Building2,
  DollarSign,
  LucideIcon,
} from 'lucide-react';

interface ClearanceStep {
  id: number;
  title: string;
  icon: LucideIcon;
  color: string;
}

const clearanceSteps: ClearanceStep[] = [
  { id: 1, title: 'Faculty Clearance', icon: Users, color: 'bg-blue-500' },
  { id: 2, title: 'Library Clearance', icon: BookOpen, color: 'bg-purple-500' },
  {
    id: 3,
    title: 'Resource Department Clearance',
    icon: Building2,
    color: 'bg-orange-500',
  },
  {
    id: 4,
    title: 'Finance Clearance',
    icon: DollarSign,
    color: 'bg-green-500',
  },
];

interface TimelineStepProps {
  step: ClearanceStep;
  isCompleted: boolean;
  isLast: boolean;
  onComplete: (id: number) => void;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  step,
  isCompleted,
  isLast,
  onComplete,
}) => {
  const Icon = step.icon;

  return (
    <div className={`flex ${!isLast ? 'mb-8' : ''}`}>
      <div className='mr-4 flex flex-col items-center'>
        <div
          className={`rounded-full p-2 ${step.color} ${isCompleted ? 'bg-opacity-100' : 'bg-opacity-50'}`}
        >
          <Icon className='h-6 w-6 text-white' />
        </div>
        {!isLast && (
          <div className='mt-2 h-full w-0.5 bg-gray-300 dark:bg-gray-700'></div>
        )}
      </div>
      <Card className='flex-grow'>
        <CardContent className='pt-6'>
          <h3 className='mb-2 text-xl font-bold text-gray-800 dark:text-gray-100'>
            {step.title}
          </h3>
          {isCompleted ? (
            <div className='flex items-center text-green-600 dark:text-green-400'>
              <CheckCircle2 className='mr-2 h-5 w-5' />
              <span>Clearance obtained</span>
            </div>
          ) : (
            <Button
              onClick={() => onComplete(step.id)}
              variant='outline'
              className='w-full'
            >
              Request Clearance
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const ClearanceTimeline: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set([1, 2, 3]),
  ); // First three steps start as completed

  const handleComplete = (stepId: number) => {
    setCompletedSteps((prev) => new Set(prev).add(stepId));
  };

  return (
    <div className='min-h-screen bg-gray-100 p-8 dark:bg-gray-900'>
      <div className='mx-auto max-w-2xl'>
        <h1 className='mb-8 text-center text-3xl font-bold text-gray-800 dark:text-gray-200'>
          University Clearance Process
        </h1>
        <div className='space-y-4'>
          {clearanceSteps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              isCompleted={completedSteps.has(step.id)}
              isLast={index === clearanceSteps.length - 1}
              onComplete={handleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClearanceTimeline;
