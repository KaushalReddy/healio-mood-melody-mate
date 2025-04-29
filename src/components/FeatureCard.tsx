
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  className?: string;
}

const FeatureCard = ({ title, description, icon, to, className }: FeatureCardProps) => {
  return (
    <Link to={to} className="block">
      <Card 
        className={cn(
          "overflow-hidden h-full transition-all hover:shadow-lg hover:border-healio-500/50", 
          className
        )}
      >
        <CardContent className="p-6 h-full flex flex-col">
          <div className="h-12 w-12 healio-gradient rounded-lg flex items-center justify-center text-white mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 flex-grow">{description}</p>
          
          <div className="mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="group text-healio-600 hover:text-healio-700 font-medium p-0"
            >
              Explore
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-1 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FeatureCard;
